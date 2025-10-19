import IconCheck from "./icons/IconCheck.jsx";

const PricingCard = ({ plan }) => (
  <div
    className={`flex flex-col rounded-2xl border ${
      plan.highlight
        ? "border-emerald-300 bg-emerald-50"
        : "border-neutral-200 bg-white"
    } p-6 shadow-sm`}
  >
    {plan.capability ? (
      <span
        className={`text-xs font-semibold uppercase tracking-wide ${
          plan.highlight ? "text-emerald-700" : "text-emerald-600"
        }`}
      >
        {plan.capability}
      </span>
    ) : null}
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <h3 className="text-xl font-semibold text-neutral-900">{plan.name}</h3>
    </div>
    {plan.description ? (
      <p className="mt-2 text-sm text-neutral-600">{plan.description}</p>
    ) : null}
    <div className="mt-3 text-3xl font-extrabold text-neutral-900">
      {plan.displayPrice}
    </div>
    {plan.displayUnit ? (
      <div className="text-sm text-neutral-500">
        {plan.displayUnit}
      </div>
    ) : null}
    {plan.savingsNote ? (
      <div className="mt-1 text-xs font-medium text-emerald-700">
        {plan.savingsNote}
      </div>
    ) : null}
    <ul className="mt-4 space-y-2 text-sm">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-neutral-700">
          <span className="mt-0.5 text-emerald-600">
            <IconCheck />
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <div className="mt-auto pt-6">
      {!plan.comingSoon ? (
        <a
          href="#contact"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(
                new CustomEvent("pricing-select", {
                  detail: { planName: plan.name },
                }),
              );
            }
          }}
          className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-2 font-medium shadow ${
            plan.highlight
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "border border-neutral-300 text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          Choose {plan.name}
        </a>
      ) : (
        <div className="flex w-full items-center justify-center rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-amber-700">
          Coming soon
        </div>
      )}
    </div>
  </div>
);

export default PricingCard;
