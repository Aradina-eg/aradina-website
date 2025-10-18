import Container from "../components/Container.jsx";

const pillars = [
  {
    title: "Born in Egypt",
    body:
      "We are a Cairo-based team focused on solving irrigation challenges for Egyptian growers, with momentum across the wider MENA region.",
  },
  {
    title: "Engineers & data scientists",
    body:
      "Our stack blends rugged hardware and predictive analytics to turn sensor data into clear irrigation actions.",
  },
  {
    title: "Backed by 25 years of software delivery",
    body:
      "Aradina is a spin-out of a software partner that has spent decades building management, CRM, and ERP systems for farming operations.",
  },
];

const WhoWeAre = () => (
  <section id="about" className="bg-white py-16 md:py-24">
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Who we are
        </h2>
        <p className="mt-4 text-neutral-600">
          Aradina is an Egyptian company created by a team who believe precision irrigation should be accessible
          to every farm in Egypt, the broader MENA region, and the global market.
        </p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-left shadow-sm"
          >
            <h3 className="text-lg font-semibold text-neutral-900">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export default WhoWeAre;
