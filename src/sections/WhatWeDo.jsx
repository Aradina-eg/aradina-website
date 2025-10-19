import { useState } from "react";
import Container from "../components/Container.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import FeatureDetailsModal from "../components/FeatureDetailsModal.jsx";
import { FEATURES } from "../data/site.js";

const WhatWeDo = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleClose = () => {
    setSelectedFeature(null);
  };

  return (
    <section id="features" className="py-16 md:py-24">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            What we do
          </h2>
          <p className="mt-3 text-neutral-700">
            We deliver field data, analytics, and irrigation automation in one
            managed package, providing the tools and services you need to track
            conditions and automate field operations.
          </p>
        </div>
        <div className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              onSelect={() => setSelectedFeature(feature)}
            />
          ))}
        </div>
      </Container>
      {selectedFeature ? (
        <FeatureDetailsModal
          feature={selectedFeature}
          onClose={handleClose}
        />
      ) : null}
    </section>
  );
};

export default WhatWeDo;
