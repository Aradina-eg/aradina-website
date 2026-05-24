import { useState } from "react";
import Container from "../components/Container.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import FeatureDetailsModal from "../components/FeatureDetailsModal.jsx";
import { FEATURES } from "../data/site.js";

const featureLayouts = [
  "lg:col-span-3 lg:min-h-72 lg:p-7",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-4",
];

const WhatWeDo = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleClose = () => {
    setSelectedFeature(null);
  };

  return (
    <section id="features" className="border-y border-neutral-200 bg-white py-16 md:py-24">
      <Container>
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
              What we do
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Field data you can act on.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-neutral-700 lg:ml-auto">
            We deliver sensing, analytics, and irrigation automation in one
            managed package, so teams can track conditions and standardize field
            operations without stitching together separate tools.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              onSelect={() => setSelectedFeature(feature)}
              className={featureLayouts[index] ?? ""}
            />
          ))}
        </div>
        <div className="mt-10 grid border border-neutral-200 bg-stone-50 text-sm text-neutral-700 md:grid-cols-3">
          {["Measure soil conditions", "Decide irrigation timing", "Coordinate field action"].map(
            (step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 border-neutral-200 p-4 md:border-r md:last:border-r-0"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-xs font-bold text-brand-950">
                  {index + 1}
                </span>
                <span className="font-medium text-neutral-900">{step}</span>
              </div>
            ),
          )}
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
