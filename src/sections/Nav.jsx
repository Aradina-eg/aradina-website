import { useState } from "react";
import Container from "../components/Container.jsx";
import { SITE } from "../data/site.js";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container>
        <div className="flex items-center justify-between py-4">
          <a
            href="#top"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              A
            </span>
            <span className="text-neutral-900">{SITE.name}</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-neutral-700 md:flex">
            <a href="#about" className="hover:text-neutral-950">
              About
            </a>
            <a href="#features" className="hover:text-neutral-950">
              What we do
            </a>
            <a href="#pricing" className="hover:text-neutral-950">
              Pricing
            </a>
            <a href="#contact" className="hover:text-neutral-950">
              Contact
            </a>
            <a
              href="#contact"
              className="rounded-xl bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
            >
              {SITE.ctaPrimary}
            </a>
          </nav>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg border p-2 text-neutral-700 md:hidden"
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
              <a
                href="#features"
                className="rounded-lg px-3 py-2 hover:bg-neutral-100"
              >
                What we do
              </a>
              <a
                href="#pricing"
                className="rounded-lg px-3 py-2 hover:bg-neutral-100"
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="rounded-lg px-3 py-2 hover:bg-neutral-100"
              >
                Contact
              </a>
              <a
                href="#contact"
                className="rounded-lg bg-neutral-900 px-3 py-2 text-white hover:bg-neutral-800"
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
