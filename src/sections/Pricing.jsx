import Container from "../components/Container.jsx";
import PricingCard from "../components/PricingCard.jsx";
import { PRICING } from "../data/site.js";

const Pricing = () => (
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
      <p className="mt-6 text-center text-sm text-neutral-600">
        Prices shown are examples. Replace with your actual pricing or currency.
      </p>
    </Container>
  </section>
);

export default Pricing;
