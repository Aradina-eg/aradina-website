import IconLeaf from "./icons/IconLeaf.jsx";

const FeatureCard = ({ feature }) => (
  <div className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
      <IconLeaf />
    </div>
    <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{feature.body}</p>
  </div>
);

export default FeatureCard;
