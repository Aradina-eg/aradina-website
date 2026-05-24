import Container from "../components/Container.jsx";

const pillars = [
  {
    title: "Born in Egypt",
    body:
      "A Cairo-based team solving irrigation challenges for Egyptian growers, with momentum across the wider MENA region.",
  },
  {
    title: "Hardware plus analytics",
    body:
      "Rugged field sensing and predictive dashboards turn soil data into clear irrigation actions.",
  },
  {
    title: "25 years of software delivery",
    body:
      "Aradina is a spin-out of a software partner with long experience in farming management, CRM, and ERP systems.",
  },
];

const WhoWeAre = () => (
  <section id="about" className="bg-stone-50 py-16 md:py-24">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            Who we are
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            Built close to the farms we serve.
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-700">
            Aradina is an Egyptian company created by a team who believe
            precision irrigation should be accessible to every farm in Egypt,
            the broader MENA region, and the global market.
          </p>
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200 bg-white">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="grid gap-3 px-5 py-5 sm:grid-cols-[3rem_1fr]"
            >
              <div className="text-sm font-bold text-brand-800">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-950">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-700">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default WhoWeAre;
