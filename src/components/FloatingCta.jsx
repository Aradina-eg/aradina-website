const FloatingCta = () => (
  <a
    href="#contact"
    className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-semibold text-brand-950 shadow-lg transition hover:bg-brand-400"
  >
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10H7m8-7-7 7 7 7" />
    </svg>
    <span>Talk to us</span>
  </a>
);

export default FloatingCta;
