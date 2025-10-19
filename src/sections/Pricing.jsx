import { useState } from "react";
import Container from "../components/Container.jsx";
import PricingCard from "../components/PricingCard.jsx";
import FieldPlannerModal from "../components/FieldPlannerModal.jsx";
import { PRICING, SENSOR_PRICING } from "../data/site.js";

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
        className="border-y border-neutral-200 bg-neutral-50 py-16 md:py-24"
      >
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Pricing
            </h2>
            <p className="mt-3 text-neutral-700">
              Simple plans that scale with your fields.
            </p>
          </div>
          <div className="mx-auto mb-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 sm:text-left">
            <label className="flex flex-col items-center gap-2 text-sm font-medium text-neutral-700 sm:flex-row sm:items-center">
              <span>Sensors</span>
              <input
                type="number"
                min="1"
                value={sensorCountInput}
                onChange={handleSensorCountChange}
                placeholder="e.g. 1"
                className="w-28 rounded-lg border border-neutral-300 px-3 py-2 text-base text-neutral-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
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
                        ? "bg-white text-emerald-600 shadow"
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
              className="mt-3 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
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
