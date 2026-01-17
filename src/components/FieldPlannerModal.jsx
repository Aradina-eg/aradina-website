import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const SATELLITE_STYLE = {
  version: 8,
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution:
        'Imagery (c) <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics, and the GIS User Community',
    },
  },
  layers: [
    {
      id: "satellite",
      type: "raster",
      source: "satellite",
      minzoom: 0,
      maxzoom: 20,
      paint: {
        "raster-resampling": "linear",
      },
    },
  ],
};

const EMPTY_COLLECTION = { type: "FeatureCollection", features: [] };

const buildFieldsCollection = (fields) => ({
  type: "FeatureCollection",
  features: fields.map((field) => ({
    type: "Feature",
    id: field.id,
    properties: { label: field.label },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          ...field.coordinates.map((coordinate) => [
            coordinate.lng,
            coordinate.lat,
          ]),
          [field.coordinates[0].lng, field.coordinates[0].lat],
        ],
      ],
    },
  })),
});

const buildCurrentCollection = (points) => {
  if (!points.length) {
    return EMPTY_COLLECTION;
  }

  const coordinates = points.map((point) => [point.lng, point.lat]);
  const closedCoordinates =
    points.length >= 3
      ? [...coordinates, [points[0].lng, points[0].lat]]
      : coordinates;

  const features = [
    {
      type: "Feature",
      id: "current-outline",
      properties: { featureType: "outline" },
      geometry: {
        type: "LineString",
        coordinates: closedCoordinates,
      },
    },
    ...points.map((point, index) => ({
      type: "Feature",
      id: `current-vertex-${index}`,
      properties: { featureType: "vertex" },
      geometry: {
        type: "Point",
        coordinates: [point.lng, point.lat],
      },
    })),
  ];

  if (points.length >= 3) {
    features.push({
      type: "Feature",
      id: "current-fill",
      properties: { featureType: "fill" },
      geometry: {
        type: "Polygon",
        coordinates: [closedCoordinates],
      },
    });
  }

  return {
    type: "FeatureCollection",
    features,
  };
};

const buildApiPayload = (fields) => {
  const fieldEntries = fields.reduce((acc, field, index) => {
    if (!field.coordinates?.length) {
      return acc;
    }
    const ring = [
      ...field.coordinates.map((coordinate) => [
        coordinate.lng,
        coordinate.lat,
      ]),
      [field.coordinates[0].lng, field.coordinates[0].lat],
    ];
    acc[String(index)] = {
      type: "Polygon",
      coordinates: [ring],
    };
    return acc;
  }, {});

  return { fields: fieldEntries };
};

const FieldPlannerModal = ({ onClose }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState([]);
  const [fields, setFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [drawError, setDrawError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: SATELLITE_STYLE,
      center: [30.977, 29.963],
      zoom: 10,
      maxZoom: 20,
      attributionControl: false,
    });

    mapRef.current = map;

    const handleLoad = () => {
      map.addSource("fields", {
        type: "geojson",
        data: EMPTY_COLLECTION,
      });

      map.addLayer({
        id: "fields-fill",
        type: "fill",
        source: "fields",
        paint: {
          "fill-color": "#34d399",
          "fill-opacity": 0.25,
        },
      });

      map.addLayer({
        id: "fields-outline",
        type: "line",
        source: "fields",
        paint: {
          "line-color": "#059669",
          "line-width": 2,
        },
      });

      map.addSource("current-field", {
        type: "geojson",
        data: EMPTY_COLLECTION,
      });

      map.addLayer({
        id: "current-fill",
        type: "fill",
        source: "current-field",
        filter: ["==", ["get", "featureType"], "fill"],
        paint: {
          "fill-color": "#10b981",
          "fill-opacity": 0.2,
        },
      });

      map.addLayer({
        id: "current-outline",
        type: "line",
        source: "current-field",
        filter: ["==", ["get", "featureType"], "outline"],
        paint: {
          "line-color": "#047857",
          "line-width": 2,
          "line-dasharray": [1.5, 1.5],
        },
      });

      map.addLayer({
        id: "current-vertices",
        type: "circle",
        source: "current-field",
        filter: ["==", ["get", "featureType"], "vertex"],
        paint: {
          "circle-radius": 5,
          "circle-color": "#047857",
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1.5,
        },
      });

      map.addControl(
        new maplibregl.NavigationControl({ visualizePitch: true }),
        "top-right"
      );
      map.addControl(
        new maplibregl.ScaleControl({ maxWidth: 120, unit: "metric" }),
        "bottom-left"
      );

      map.scrollZoom.disable();

      map.resize();
      setMapReady(true);
    };

    map.on("load", handleLoad);

    return () => {
      map.off("load", handleLoad);
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapRef.current) {
      return;
    }
    const map = mapRef.current;
    const source = map.getSource("fields");
    if (source) {
      source.setData(buildFieldsCollection(fields));
    }
  }, [fields, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) {
      return;
    }
    const map = mapRef.current;
    const source = map.getSource("current-field");
    if (source) {
      source.setData(buildCurrentCollection(currentPoints));
    }
  }, [currentPoints, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) {
      return;
    }

    const map = mapRef.current;

    const handleClick = (event) => {
      if (!isDrawing) {
        return;
      }

      const { lng, lat } = event.lngLat;
      setCurrentPoints((prev) => [...prev, { lng, lat }]);
      setDrawError(null);
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [isDrawing, mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) {
      return;
    }
    const canvas = mapRef.current.getCanvas();
    canvas.style.cursor = isDrawing ? "crosshair" : "";
  }, [isDrawing, mapReady]);

  useEffect(() => {
    if (!mapContainerRef.current || !mapRef.current) {
      return;
    }

    mapContainerRef.current.style.minHeight = "28rem";
    mapContainerRef.current.style.height = "32rem";
    mapContainerRef.current.style.width = "100%";
  }, []);

  useEffect(() => {
    if (!mapReady || !mapContainerRef.current || !mapRef.current) {
      return;
    }

    const observer = new ResizeObserver(() => {
      mapRef.current.resize();
    });

    observer.observe(mapContainerRef.current);

    return () => observer.disconnect();
  }, [mapReady]);

  const drawingLabel = isDrawing ? "Stop drawing field" : "Start drawing field";

  const drawingButtonIcon = isDrawing ? (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.5 3.5a2.121 2.121 0 0 0-3 0l-9.75 9.75-1.75 4.75 4.75-1.75L20.5 6.5a2.121 2.121 0 0 0 0-3z" />
      <path d="M16 7L19 10" />
      <path d="M5 21h14" />
    </svg>
  );

  const handleToggleDrawing = useCallback(() => {
    setIsDrawing((prev) => !prev);
    setCurrentPoints([]);
    setDrawError(null);
  }, []);

  const handleUndoPoint = useCallback(() => {
    setCurrentPoints((prev) => prev.slice(0, -1));
    setDrawError(null);
  }, []);

  const handleClearCurrent = useCallback(() => {
    setCurrentPoints([]);
    setDrawError(null);
  }, []);

  const handleClearAllFields = useCallback(() => {
    setFields([]);
    setCurrentPoints([]);
    setDrawError(null);
    setSubmissionError(null);
    setResult(null);
  }, []);

  const handleRemoveField = useCallback((id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
    setResult(null);
  }, []);

  const handleCompleteField = useCallback(() => {
    if (currentPoints.length < 3) {
      setDrawError("Add at least three vertices before completing a field.");
      return;
    }

    setFields((prev) => [
      ...prev,
      {
        id: `field-${Date.now()}`,
        coordinates: currentPoints,
        label: `Field ${prev.length + 1}`,
      },
    ]);

    setCurrentPoints([]);
    setDrawError(null);
    setIsDrawing(true);
    setResult(null);
  }, [currentPoints]);

  const apiPayload = useMemo(() => buildApiPayload(fields), [fields]);

  const handleSubmit = useCallback(async () => {
    if (!fields.length) {
      setSubmissionError("Add at least one field before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);
    setResult(null);

    try {
      const response = await fetch(
        "https://api.aradina.solutions/required-devices",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiPayload),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const breakdown = fields.map((field, index) => {
        const responseValue = data?.fields?.[String(index)];
        const suggestedSensors = Number.isFinite(responseValue)
          ? responseValue
          : Number(responseValue) || 0;
        return {
          label: field.label,
          suggestedSensors,
        };
      });

      const sensorsNeeded = breakdown.reduce(
        (total, item) => total + item.suggestedSensors,
        0
      );

      setResult({ sensorsNeeded, breakdown });
    } catch (error) {
      setSubmissionError(
        "Unable to reach the planning service. Please try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [apiPayload, fields]);

  const totalSensorLabel = result?.sensorsNeeded === 1 ? "sensor" : "sensors";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60">
      <div className="flex min-h-full items-center justify-center px-4 py-12 md:py-16">
        <div
          className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
          style={{ maxHeight: "calc(100vh - 6rem)" }}
        >
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                Field Sensor Planner
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Toggle drawing to place vertices on the map. Complete a field
                to add it to your submission, then repeat for each distinct
                field.
              </p>
            </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-10 pb-8 space-y-12">
          <div
            className="relative mt-4 w-full overflow-hidden rounded-xl border border-neutral-200"
            style={{ height: "clamp(18rem, 50vh, 26rem)" }}
          >
            <div ref={mapContainerRef} className="h-full w-full" />
            <div className="pointer-events-none absolute left-3 top-3 rounded-lg bg-neutral-900/70 px-3 py-1.5 text-xs font-medium text-white">
              {isDrawing
                ? "Drawing mode: click to add vertices."
                : 'Click "Start drawing field" to begin.'}
            </div>
          </div>

          <div className="mt-6 mb-12 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleToggleDrawing}
              className={`inline-flex items-center justify-center rounded-lg p-2 text-neutral-50 shadow-sm transition ${
                isDrawing
                  ? "bg-neutral-900 hover:bg-neutral-800"
                  : "bg-brand-600 hover:bg-brand-700"
              }`}
              title={drawingLabel}
              aria-pressed={isDrawing}
              aria-label={drawingLabel}
            >
              {drawingButtonIcon}
            </button>

            <button
              type="button"
              onClick={handleUndoPoint}
              disabled={!currentPoints.length}
              className="inline-flex items-center justify-center rounded-lg border border-neutral-300 p-2 text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-400"
              title="Undo last point"
              aria-label="Undo last point"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 10H5V6" />
                <path d="M5 10a9 9 0 1 1 9 9" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearCurrent}
                disabled={!currentPoints.length}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 p-2 text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-400"
                title="Clear current points"
                aria-label="Clear current points"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h5l3-3h8a2 2 0 0 1 2 2v1" />
                  <path d="M3 6l3 12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2l1-7H7" />
                  <path d="M10 11l-1 7" />
                  <path d="M14 11l1 7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleClearAllFields}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 p-2 text-neutral-700 hover:bg-neutral-100"
                title="Clear all fields"
                aria-label="Clear all fields"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>
            </div>

            <button
              type="button"
              onClick={handleCompleteField}
              disabled={currentPoints.length < 3}
              className="inline-flex items-center justify-center rounded-lg border border-brand-600 p-2 text-brand-700 hover:bg-brand-50 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-400"
              title="Complete field"
              aria-label="Complete field"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 13 4 4L19 7" />
              </svg>
            </button>

            <div className="ml-auto">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-500"
              >
                {isSubmitting ? "Calculating..." : "Calculate"}
              </button>
            </div>
          </div>

          {drawError ? (
            <p className="text-sm text-red-600">{drawError}</p>
          ) : null}

          {submissionError ? (
            <p className="text-sm text-red-600">{submissionError}</p>
          ) : null}

          {result ? (
            <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-neutral-800">
              <p className="font-semibold text-brand-700">
                {result.sensorsNeeded} {totalSensorLabel} recommended.
              </p>
              <ul className="mt-2 space-y-1 text-neutral-700">
                {result.breakdown.map((item) => (
                  <li key={item.label}>
                    {item.label}: {item.suggestedSensors}{" "}
                    {item.suggestedSensors === 1 ? "sensor" : "sensors"}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-neutral-800">
                Field summary
              </h4>
              <span className="text-xs text-neutral-500">
                Fields ready: {fields.length}
              </span>
            </div>
            <ul className="mt-3 space-y-3 text-sm text-neutral-600">
              {fields.length ? (
                fields.map((field, index) => (
                  <li
                    key={field.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2"
                  >
                    <div>
                      <p className="font-medium text-neutral-800">
                        {field.label ?? `Field ${index + 1}`}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {field.coordinates.length} vertices
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.id)}
                      className="rounded-md border border-neutral-300 px-3 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-100"
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <li className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-500">
                  No fields added yet.
                </li>
              )}
            </ul>
            <p className="mt-3 text-xs text-neutral-500">
              This tool sends each field's vertices as WGS84 (lat/lng) to the
              planner API for device estimation.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FieldPlannerModal;
