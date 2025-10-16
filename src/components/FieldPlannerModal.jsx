import { useMemo, useState } from "react";
import IconClose from "./icons/IconClose";
const hectaresToAcres = 2.47105381;
const FieldPlannerModal = ({ onClose }) => {
  const [area, setArea] = useState("");
  const [unit, setUnit] = useState("acres");
  const { parsedArea, estimatedSensors } = useMemo(() => {
    const numericArea = parseFloat(area);
    if (!Number.isFinite(numericArea) || numericArea <= 0) {
      return { parsedArea: 0, estimatedSensors: 0 };
    }
    const areaInAcres =
      unit === "acres" ? numericArea : numericArea * hectaresToAcres;
    const estimate = Math.max(1, Math.round(areaInAcres * 0.5));
    return { parsedArea: numericArea, estimatedSensors: estimate };
  }, [area, unit]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-neutral-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Field Sensor Estimate
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Enter the size of your field to see a quick sensor estimate.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md text-neutral-600 transition hover:text-neutral-900"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 px-6 py-3">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-700">
              Field size
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                value={area}
                onChange={(event) => setArea(event.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder={`Enter area in ${unit}`}
              />
              <select
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                className="rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <option value="acres">Acres</option>
                <option value="hectares">Hectares</option>
              </select>
            </div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 mt-4">
            <p className="text-sm font-semibold text-emerald-800">
              Estimated sensors needed
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-900">
              {estimatedSensors > 0 ? estimatedSensors : "—"}
            </p>
            {estimatedSensors > 0 ? (
              <p className="mt-1 text-xs text-emerald-700">
                Based on {parsedArea.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                {unit === "acres" ? "acres" : "hectares"}
              </p>
            ) : (
              <p className="mt-1 text-xs text-emerald-700">
                Enter a field size above to view the estimate.
              </p>
            )}
          </div>
          <div className="p-2 mb-5 text-xs text-neutral-600">
            <p>
              This is only a rough estimate. The recommended number of sensors
              and their installation points depend on the field&apos;s geographical topology, which we
              will analyse to produce a tailored deployment plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FieldPlannerModal;
