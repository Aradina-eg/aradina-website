import { useState } from "react";
import Container from "../components/Container.jsx";
import PricingCard from "../components/PricingCard.jsx";
import FieldPlannerModal from "../components/FieldPlannerModal.jsx";
import { PRICING, SENSOR_HARDWARE, SENSOR_PRICING } from "../data/site.js";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatCurrency = (value) => currencyFormatter.format(value);

const Pricing = () => {
  const [isPlannerOpen, setPlannerOpen] = useState(false);
  const [sensorCountInput, setSensorCountInput] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const handleSensorCountChange = (event) => {
    const { value } = event.target;
    if (value === "") {
      setSensorCountInput("");
      return;
    }
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return;
    }
    if (parsed <= 0) {
      setSensorCountInput("");
      return;
    }
    setSensorCountInput(String(Math.round(parsed)));
  };

  const getTierDiscount = (count) => {
    const tier = SENSOR_PRICING.tiers.find(
      ({ min, max }) => count >= min && (max === null || count <= max),
    );
    if (tier) {
      return tier.discount ?? 0;
    }
    const fallback = SENSOR_PRICING.tiers[SENSOR_PRICING.tiers.length - 1];
    return fallback?.discount ?? 0;
  };

  const sensorCount = Number(sensorCountInput);
  const hasValidSensorCount = Number.isFinite(sensorCount) && sensorCount > 0;
  const tierDiscount = hasValidSensorCount ? getTierDiscount(sensorCount) : 0;
  const isYearly = billingCycle === "yearly";
  const yearlyDiscountPercent = Math.round(SENSOR_PRICING.yearlyDiscount * 100);
  const yearlyMultiplier = 1 - SENSOR_PRICING.yearlyDiscount;

  const displayedPlans = PRICING.map((plan) => {
    if (plan.monthlyRate === null) {
      return {
        ...plan,
        displayPrice: plan.customLabel ?? "Custom",
        displayUnit: isYearly
          ? plan.unitYearly || plan.unitMonthly
          : plan.unitMonthly,
        savingsNote: null,
      };
    }

    const appliedVolumeDiscount = tierDiscount;
    const discountMultiplier = Math.max(1 - appliedVolumeDiscount, 0);
    const effectiveMonthlyRate = hasValidSensorCount
      ? Math.max(plan.monthlyRate * discountMultiplier, 0)
      : plan.monthlyRate;

    const billedMonthly = hasValidSensorCount
      ? effectiveMonthlyRate * sensorCount
      : plan.monthlyRate;
    const priceValue = isYearly
      ? billedMonthly * 12 * yearlyMultiplier
      : billedMonthly;

    const sensorLabel = sensorCount === 1 ? "device" : "devices";

    const displayUnit = hasValidSensorCount
      ? isYearly
        ? `per year for ${sensorCount} ${sensorLabel}`
        : `per month for ${sensorCount} ${sensorLabel}`
      : isYearly
        ? plan.unitYearly || plan.unitMonthly
        : plan.unitMonthly;

    let savingsNote = null;
    if (hasValidSensorCount && (appliedVolumeDiscount > 0 || isYearly)) {
      const discountParts = [];
      if (appliedVolumeDiscount > 0) {
        discountParts.push(
          `${Math.round(appliedVolumeDiscount * 100)}% volume discount`,
        );
      }
      if (isYearly) {
        discountParts.push(`${yearlyDiscountPercent}% annual discount`);
      }
      savingsNote =
        discountParts.length > 0
          ? `Includes ${discountParts.join(" and ")}`
          : null;
    }

    return {
      ...plan,
      displayPrice: formatCurrency(priceValue),
      displayUnit,
      savingsNote,
    };
  });

  return (
    <>
      <section
        id="pricing"
        className="bg-stone-50 py-16 md:py-24"
      >
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
              Pricing
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Plans that scale by device count.
            </h2>
            <p className="mt-3 text-neutral-700">
              Enter a sensor count to see monthly or annual deployment costs.
            </p>
          </div>
          <div className="mx-auto mb-10 grid max-w-4xl gap-4 md:grid-cols-2">
            {SENSOR_HARDWARE.map((sensor) => (
              <div
                key={sensor.name}
                className="grid gap-4 border border-neutral-200 bg-white p-4 shadow-sm sm:grid-cols-[9rem_1fr]"
              >
                {sensor.imageSrc ? (
                  <img
                    src={sensor.imageSrc}
                    alt={sensor.imageAlt}
                    className="aspect-[4/3] w-full rounded-lg border border-neutral-200 bg-stone-100 object-cover object-[center_35%]"
                  />
                ) : (
                  <div
                    className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-stone-100 px-4 text-center text-xs font-medium uppercase tracking-[0.12em] text-neutral-500"
                    role="img"
                    aria-label={sensor.imageAlt}
                  >
                    Image
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-neutral-950">
                    {sensor.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">
                    {sensor.description}
                  </p>
                  <p className="mt-4 text-2xl font-extrabold text-brand-900">
                    {formatCurrency(sensor.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 border border-neutral-200 bg-white p-4 text-center shadow-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 sm:text-left">
            <label className="flex flex-col items-center gap-2 text-sm font-medium text-neutral-700 sm:flex-row sm:items-center">
              <span>Sensors</span>
              <input
                type="number"
                min="1"
                value={sensorCountInput}
                onChange={handleSensorCountChange}
                placeholder="e.g. 1"
                className="w-28 rounded-lg border border-neutral-300 px-3 py-2 text-base text-neutral-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </label>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
              <div className="inline-flex rounded-lg bg-neutral-100 p-1">
                {["monthly", "yearly"].map((cycle) => (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() => setBillingCycle(cycle)}
                    className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                      billingCycle === cycle
                        ? "bg-white text-brand-800 shadow"
                        : "text-neutral-600 hover:text-neutral-800"
                    }`}
                  >
                    {cycle === "monthly" ? "Monthly" : "Yearly"}
                  </button>
                ))}
              </div>
              <span className="text-xs text-neutral-500 sm:ml-2">
                {isYearly
                  ? `${yearlyDiscountPercent}% discount when billed annually`
                  : "Flexible month-to-month billing"}
              </span>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {displayedPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
          <div className="mt-8 text-center text-sm text-neutral-600">
            <p>Use our tool to estimate how many sensors you need for your field.</p>
            <button
              type="button"
              onClick={() => setPlannerOpen(true)}
              className="mt-3 inline-flex items-center justify-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-brand-950 shadow-sm transition hover:bg-brand-400"
            >
              Field Sensor Estimator
            </button>
          </div>
        </Container>
      </section>
      {isPlannerOpen ? (
        <FieldPlannerModal onClose={() => setPlannerOpen(false)} />
      ) : null}
    </>
  );
};

export default Pricing;
