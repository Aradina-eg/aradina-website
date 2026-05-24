import Container from "../components/Container.jsx";
import { SITE } from "../data/site.js";

const Hero = () => (
  <section id="top" className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="/images/background.png"
        alt="Orchard canopy and sky"
        className="h-full w-full object-cover object-[center_68%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/35 to-stone-950/5" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_bottom,rgba(250,250,249,0)_0%,rgba(250,250,249,0.18)_32%,rgba(250,250,249,0.72)_72%,rgba(250,250,249,1)_100%)]" />
    </div>

    <div className="relative z-10">
      <Container>
        <div className="flex min-h-[28rem] items-start justify-center py-10 text-center md:min-h-[34rem] md:py-14">
          <div className="mx-auto max-w-6xl pt-3 md:pt-6">
            <p className="mx-auto max-w-max rounded bg-brand-100/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-900">
              Precision irrigation, built from the field up
            </p>
            <h1 className="mx-auto mt-4 max-w-6xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:whitespace-nowrap lg:text-6xl xl:text-7xl">
              {SITE.tagline}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-stone-100 sm:text-lg">
              {SITE.subTagline}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                className="rounded-lg bg-brand-500 px-5 py-3 text-sm font-semibold text-brand-950 shadow-lg shadow-stone-950/20 transition hover:bg-brand-400"
              >
                {SITE.ctaPrimary}
              </a>
              <a
                href="#pricing"
                className="rounded-lg border border-stone-100/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-100/10"
              >
                Estimate a deployment
              </a>
            </div>
          </div>

        </div>
      </Container>
    </div>
  </section>
);

export default Hero;
