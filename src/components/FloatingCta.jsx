const FloatingCta = () => (
  <a
    href="#contact"
    className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-white shadow-lg hover:bg-emerald-700"
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
