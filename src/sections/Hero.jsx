import Container from "../components/Container.jsx";
import IconLeaf from "../components/icons/IconLeaf.jsx";
import { SITE } from "../data/site.js";

const Hero = () => (
  <section id="top" className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 to-white" />
    <Container>
      <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs text-emerald-800 shadow-sm">
            <IconLeaf />
            <span>Water-smart farming</span>
          </div>
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
            <a
              href="#pricing"
              className="rounded-xl border border-neutral-300 px-5 py-3 text-neutral-900 hover:bg-neutral-100"
            >
              {SITE.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,#c7f9cc,transparent_40%),radial-gradient(circle_at_70%_60%,#a7f3d0,transparent_40%)]" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-neutral-200 bg-white p-4 text-sm shadow-lg md:block">
            <div className="font-semibold text-neutral-900">Save up to 30% water</div>
            <div className="text-neutral-600">Using sensor-driven irrigation</div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default Hero;
