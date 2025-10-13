// AradinaLanding.jsx
// Single-file React component landing page using Tailwind-style classes.
// Edit the data objects (SITE, FEATURES, PRICING, CONTACT) to customize.

import React, { useState } from "react";

const SITE = {
  name: "aradina",
  tagline: "Smart agriculture made simple.",
  subTagline:
    "Sensors, insights, and automation to save water, boost yield, and cut costs.",
  ctaPrimary: "Get a quote",
  ctaSecondary: "View pricing",
};

const FEATURES = [
  {
    title: "Soil & climate sensing",
    body:
      "Solar-powered field sensors track moisture, salinity, temperature and more.",
  },
  {
    title: "Real-time dashboard",
    body:
      "See live field conditions, set alerts, and track trends over time on web & mobile.",
  },
  {
    title: "Irrigation guidance",
    body:
      "AI-driven recommendations tell you when and how much to irrigate.",
  },
  {
    title: "Easy deployment",
    body:
      "Plug-and-play kits with BLE setup, 4G connectivity, and rugged enclosures.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$49/mo",
    highlight: false,
    blurb: "For trials and small plots",
    features: [
      "1 sensor kit",
      "Live moisture & temp",
      "Email support",
      "Basic analytics",
    ],
  },
  {
    name: "Grower",
    price: "$149/mo",
    highlight: true,
    blurb: "Best for mid-size farms",
    features: [
      "3 sensor kits",
      "Full soil metrics",
      "Irrigation guidance",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    highlight: false,
    blurb: "Large farms & agribusiness",
    features: [
      "10+ sensor kits",
      "Fleet management",
      "API & integrations",
      "On-site onboarding",
    ],
  },
];

const CONTACT = {
  email: "hello@aradina.solutions",
  phone: "+20 000 000 0000",
  address: "Cairo, Egypt",
  whatsapp: "https://wa.me/200000000000", // replace with your WhatsApp number link
};

// Simple icon set (inline SVG) for visual polish
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
    <path d="M5 19C5 12 12 5 19 5c0 7-7 14-14 14Z" stroke="currentColor" strokeWidth="2" />
    <path d="M9 15c2 0 6-4 6-6" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-neutral-200">
      <Container>
        <div className="flex items-center justify-between py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">A</span>
            <span className="text-neutral-900">{SITE.name}</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-700">
            <a href="#features" className="hover:text-neutral-950">What we do</a>
            <a href="#pricing" className="hover:text-neutral-950">Pricing</a>
            <a href="#contact" className="hover:text-neutral-950">Contact</a>
            <a href="#contact" className="rounded-xl bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800">{SITE.ctaPrimary}</a>
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden rounded-lg border p-2 text-neutral-700" aria-label="Toggle menu">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2 text-sm">
              <a href="#features" className="rounded-lg px-3 py-2 hover:bg-neutral-100">What we do</a>
              <a href="#pricing" className="rounded-lg px-3 py-2 hover:bg-neutral-100">Pricing</a>
              <a href="#contact" className="rounded-lg px-3 py-2 hover:bg-neutral-100">Contact</a>
              <a href="#contact" className="rounded-lg bg-neutral-900 px-3 py-2 text-white hover:bg-neutral-800">{SITE.ctaPrimary}</a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

const Hero = () => (
  <section id="top" className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 to-white" />
    <Container>
      <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs text-emerald-800 mb-4 shadow-sm">
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
            <a href="#contact" className="rounded-xl bg-emerald-600 px-5 py-3 text-white shadow hover:bg-emerald-700">
              {SITE.ctaPrimary}
            </a>
            <a href="#pricing" className="rounded-xl border border-neutral-300 px-5 py-3 text-neutral-900 hover:bg-neutral-100">
              {SITE.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
            {/* Placeholder illustration */}
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

const WhatWeDo = () => (
  <section id="features" className="py-16 md:py-24">
    <Container>
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">What we do</h2>
        <p className="mt-3 text-neutral-700">Hardware, software, and support for data-driven farming.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <div key={i} className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <IconLeaf />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{f.body}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const PricingCard = ({ plan }) => (
  <div className={`flex flex-col rounded-2xl border ${
    plan.highlight ? "border-emerald-300 bg-emerald-50" : "border-neutral-200 bg-white"
  } p-6 shadow-sm`}
  >
    <div className="flex items-baseline justify-between">
      <h3 className="text-xl font-semibold text-neutral-900">{plan.name}</h3>
      <span className={`text-sm ${plan.highlight ? "text-emerald-700" : "text-neutral-500"}`}>{plan.blurb}</span>
    </div>
    <div className="mt-3 text-3xl font-extrabold text-neutral-900">{plan.price}</div>
    <ul className="mt-4 space-y-2 text-sm">
      {plan.features.map((feat, idx) => (
        <li key={idx} className="flex items-start gap-2 text-neutral-700">
          <span className="mt-0.5 text-emerald-600"><IconCheck /></span>
          <span>{feat}</span>
        </li>
      ))}
    </ul>
    <a href="#contact" className={`mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium shadow ${
      plan.highlight ? "bg-emerald-600 text-white hover:bg-emerald-700" : "border border-neutral-300 text-neutral-900 hover:bg-neutral-100"
    }`}>
      Choose {plan.name}
    </a>
  </div>
);

const Pricing = () => (
  <section id="pricing" className="border-y border-neutral-200 bg-neutral-50 py-16 md:py-24">
    <Container>
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Pricing</h2>
        <p className="mt-3 text-neutral-700">Simple plans that scale with your fields.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {PRICING.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-neutral-600">
        Prices shown are examples. Replace with your actual pricing or currency.
      </p>
    </Container>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-16 md:py-24">
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Get in touch</h2>
        <p className="mt-3 text-neutral-700">Tell us about your farm and goals; let's plan a pilot.</p>
      </div>
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900">Contact details</h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            <li><strong>Email:</strong> <a className="text-emerald-700 hover:underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li><strong>Phone:</strong> <a className="text-emerald-700 hover:underline" href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a></li>
            <li><strong>WhatsApp:</strong> <a className="text-emerald-700 hover:underline" href={CONTACT.whatsapp} target="_blank" rel="noreferrer">Chat on WhatsApp</a></li>
            <li><strong>Address:</strong> {CONTACT.address}</li>
          </ul>
          <div className="mt-6 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-700">
            Prefer a quick estimate? Click a plan above and we'll email you a quote within 24 hours.
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900">Message us</h3>
          <form onSubmit={(e) => { e.preventDefault(); const data = new FormData(e.currentTarget); const subject = encodeURIComponent(`Aradina inquiry from ${data.get('name')}`); const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\n---\n${data.get('message')}`); window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`; }} className="mt-4 space-y-3 text-sm">
            <input name="name" required placeholder="Your name" className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
            <input name="email" type="email" required placeholder="Email" className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
            <input name="phone" placeholder="Phone (optional)" className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
            <textarea name="message" required placeholder="Your message" rows={5} className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
            <button type="submit" className="w-full rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white shadow hover:bg-emerald-700">Send via email</button>
            <p className="text-xs text-neutral-500">Submitting opens your email client with a pre-filled message.</p>
          </form>
        </div>
      </div>
    </Container>
  </section>
);

const Footer = () => (
  <footer className="border-t border-neutral-200 bg-white py-8">
    <Container>
      <div className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-600 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white">A</span>
          <span>&copy; {new Date().getFullYear()} aradina. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-neutral-900">What we do</a>
          <a href="#pricing" className="hover:text-neutral-900">Pricing</a>
          <a href="#contact" className="hover:text-neutral-900">Contact</a>
        </div>
      </div>
    </Container>
  </footer>
);

const AradinaLanding = () => {
  return (
    <div className="text-neutral-900">
      <Nav />
      <Hero />
      <WhatWeDo />
      <Pricing />
      <Contact />
      <Footer />
      {/* Floating CTA */}
      <a href="#contact" className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-white shadow-lg hover:bg-emerald-700">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10H7m8-7-7 7 7 7"/></svg>
        <span>Talk to us</span>
      </a>
    </div>
  );
}

export default function App() { return <AradinaLanding />; }

