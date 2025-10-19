import { useEffect } from "react";
import { createPortal } from "react-dom";
import IconLeaf from "./icons/IconLeaf.jsx";
import IconSoil from "./icons/IconSoil.jsx";
import IconInsights from "./icons/IconInsights.jsx";
import IconAutomation from "./icons/IconAutomation.jsx";
import IconDeployment from "./icons/IconDeployment.jsx";

const ICONS = {
  soil: IconSoil,
  insights: IconInsights,
  automation: IconAutomation,
  deployment: IconDeployment,
};

const FeatureDetailsModal = ({ feature, onClose }) => {
  useEffect(() => {
    if (!feature) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [feature, onClose]);

  if (!feature || typeof document === "undefined") {
    return null;
  }

  const Icon = ICONS[feature.icon] ?? IconLeaf;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Icon className="h-6 w-6" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-neutral-200 p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Close feature details"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4l8 8" />
              <path d="m12 4-8 8" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            {feature.comingSoon ? (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                Coming soon
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-neutral-900">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-neutral-600">{feature.body}</p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700">
            {(feature.details ?? []).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FeatureDetailsModal;
