import IconCheck from "./icons/IconCheck.jsx";

const PricingCard = ({ plan }) => (
  <div
    className={`flex flex-col rounded-2xl border ${
      plan.highlight
        ? "border-emerald-300 bg-emerald-50"
        : "border-neutral-200 bg-white"
    } p-6 shadow-sm`}
  >
    <div className="flex items-baseline justify-between">
      <h3 className="text-xl font-semibold text-neutral-900">{plan.name}</h3>
      <span
        className={`text-sm ${
          plan.highlight ? "text-emerald-700" : "text-neutral-500"
        }`}
      >
        {plan.blurb}
      </span>
    </div>
    <div className="mt-3 text-3xl font-extrabold text-neutral-900">
      {plan.price}
    </div>
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
    <a
      href="#contact"
      className={`mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium shadow ${
        plan.highlight
          ? "bg-emerald-600 text-white hover:bg-emerald-700"
          : "border border-neutral-300 text-neutral-900 hover:bg-neutral-100"
      }`}
    >
      Choose {plan.name}
    </a>
  </div>
);

export default PricingCard;
