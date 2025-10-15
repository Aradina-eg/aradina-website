import Nav from "../sections/Nav.jsx";
import Hero from "../sections/Hero.jsx";
import WhatWeDo from "../sections/WhatWeDo.jsx";
import Pricing from "../sections/Pricing.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../sections/Footer.jsx";
import FloatingCta from "../components/FloatingCta.jsx";

const AradinaLanding = () => (
  <div className="text-neutral-900">
    <Nav />
    <Hero />
    <WhatWeDo />
    <Pricing />
    <Contact />
    <Footer />
    <FloatingCta />
  </div>
);

export default AradinaLanding;
