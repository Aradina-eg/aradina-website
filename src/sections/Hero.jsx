import Container from "../components/Container.jsx";
import IconLeaf from "../components/icons/IconLeaf.jsx";
import { SITE } from "../data/site.js";

const Hero = () => (
  <section id="top" className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="/images/background.png"
        alt="Orchard canopy and sky"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white" />
    </div>
    <div className="relative z-10">
      <Container>
        <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            {SITE.tagline}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-neutral-700">
            {SITE.subTagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-white shadow hover:bg-emerald-700"
            >
              {SITE.ctaPrimary}
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full border-4 border-white/70 bg-white/80 shadow-xl backdrop-blur">
            <img
              src="/images/sensor.png"
              alt="Aradina sensor hardware"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-neutral-200 bg-white p-4 text-sm shadow-lg md:block">
            <div className="font-semibold text-neutral-900">Save up to 30% water</div>
            <div className="text-neutral-600">Using sensor-driven irrigation</div>
          </div>
        </div>
      </div>
      </Container>
    </div>
  </section>
);

export default Hero;
