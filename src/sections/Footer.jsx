import Container from "../components/Container.jsx";
import { SITE } from "../data/site.js";

const Footer = () => (
  <footer className="border-t border-neutral-200 bg-white py-8">
    <Container>
      <div className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-600 md:flex-row">
        <div className="flex items-center gap-2">
          <img
            src="/aradina-logo-2.png"
            alt="Aradina logo"
            className="h-7 w-7 rounded-lg object-cover"
          />
          <span>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-neutral-900">
            What we do
          </a>
          <a href="#pricing" className="hover:text-neutral-900">
            Pricing
          </a>
          <a href="#contact" className="hover:text-neutral-900">
            Contact
          </a>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
