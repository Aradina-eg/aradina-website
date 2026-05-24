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

const FeatureCard = ({ feature, onSelect, className = "" }) => (
  <button
    type="button"
    onClick={() => onSelect?.(feature)}
    className={`group flex h-full w-full flex-col items-start border border-neutral-200 bg-white p-5 text-left shadow-sm transition hover:border-brand-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${className}`}
    aria-label={`Learn more about ${feature.title}`}
  >
    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
      {(() => {
        const Icon = ICONS[feature.icon] ?? IconLeaf;
        return <Icon className="h-6 w-6" />;
      })()}
    </div>
    {feature.comingSoon ? (
      <span className="mb-3 rounded bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
        Coming soon
      </span>
    ) : null}
    <h3 className="text-lg font-semibold text-neutral-950">{feature.title}</h3>
    <p className="mt-2 text-sm leading-6 text-neutral-700">{feature.body}</p>
    <span className="mt-auto pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
      View details
    </span>
  </button>
);

export default FeatureCard;
