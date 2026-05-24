import { useState } from "react";
import Container from "../components/Container.jsx";
import { SITE } from "../data/site.js";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-stone-50/95">
      <Container>
        <div className="flex items-center justify-between py-3">
          <a
            href="#top"
            aria-label={`${SITE.name} home`}
            className="flex items-center"
          >
            <span className="flex h-9 items-center overflow-hidden">
              <img
                src="/aradina-logo-3.png"
                alt={`${SITE.name} logo`}
                className="h-16 w-auto"
              />
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-neutral-700 md:flex">
            <a href="#about" className="transition hover:text-brand-800">
              About
            </a>
            <a href="#features" className="transition hover:text-brand-800">
              What we do
            </a>
            <a href="#pricing" className="transition hover:text-brand-800">
              Pricing
            </a>
            <a href="#contact" className="transition hover:text-brand-800">
              Contact
            </a>
            <a
              href="#contact"
              className="rounded-lg bg-brand-500 px-4 py-2 text-brand-950 shadow-sm transition hover:bg-brand-400"
            >
              {SITE.ctaPrimary}
            </a>
          </nav>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-neutral-300 bg-white p-2 text-neutral-700 shadow-sm md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {open && (
          <div className="pb-4 md:hidden">
            <div className="flex flex-col gap-2 text-sm">
              <a href="#about" className="rounded-lg px-3 py-2 hover:bg-white">
                About
              </a>
              <a href="#features" className="rounded-lg px-3 py-2 hover:bg-white">
                What we do
              </a>
              <a
                href="#pricing"
                className="rounded-lg px-3 py-2 hover:bg-white"
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="rounded-lg px-3 py-2 hover:bg-white"
              >
                Contact
              </a>
              <a
                href="#contact"
                className="rounded-lg bg-brand-500 px-3 py-2 text-brand-950 hover:bg-brand-400"
              >
                {SITE.ctaPrimary}
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Nav;
