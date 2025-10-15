import Container from "../components/Container.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import { FEATURES } from "../data/site.js";

const WhatWeDo = () => (
  <section id="features" className="py-16 md:py-24">
    <Container>
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          What we do
        </h2>
        <p className="mt-3 text-neutral-700">
          Hardware, software, and support for data-driven farming.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </Container>
  </section>
);

export default WhatWeDo;
