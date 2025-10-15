import { useState } from "react";
import Container from "../components/Container.jsx";
import PricingCard from "../components/PricingCard.jsx";
import FieldPlannerModal from "../components/FieldPlannerModal.jsx";
import { PRICING } from "../data/site.js";

const Pricing = () => {
  const [isPlannerOpen, setPlannerOpen] = useState(false);

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
          <div className="grid gap-6 md:grid-cols-3">
            {PRICING.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
          <div className="mt-6 text-center text-sm text-neutral-600">
            <p>Use our tool to find how many sensors you need for your field.</p>
            <button
              type="button"
              onClick={() => setPlannerOpen(true)}
              className="mt-3 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
            >
              Open field planner
            </button>
            <p className="mt-2 text-xs text-neutral-500">
              The number of sensors required depends on each field. Choose them
              yourself or let our analytics suggest optimal placement.
            </p>
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
