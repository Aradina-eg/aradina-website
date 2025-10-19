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

const FeatureCard = ({ feature, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect?.(feature)}
    className="group flex h-full w-full flex-col items-center rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    aria-label={`Learn more about ${feature.title}`}
  >
    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
      {(() => {
        const Icon = ICONS[feature.icon] ?? IconLeaf;
        return <Icon className="h-6 w-6" />;
      })()}
    </div>
    {feature.comingSoon ? (
      <span className="mb-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
        Coming soon
      </span>
    ) : null}
    <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{feature.body}</p>
  </button>
);

export default FeatureCard;
