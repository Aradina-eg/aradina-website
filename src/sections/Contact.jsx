import { useEffect, useState } from "react";
import Container from "../components/Container.jsx";
import { CONTACT, PRICING } from "../data/site.js";

const MESSAGE_REASONS = [
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "General inquiry" },
];

const REASON_LABELS = MESSAGE_REASONS.reduce(
  (labels, { value, label }) => ({ ...labels, [value]: label }),
  {},
);

const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = formData.get("name");
  const reason = formData.get("reason");
  const packageChoice = formData.get("package");
  const reasonLabel =
    REASON_LABELS[reason] ?? (reason ? reason : "Not specified");
  const packageLabel =
    reason === "sales"
      ? packageChoice || "Not specified"
      : packageChoice || "Not applicable";
  const subjectParts = [`Aradina inquiry from ${name}`];
  if (reasonLabel && reasonLabel !== "Not specified") {
    subjectParts.push(`- ${reasonLabel}`);
  }
  if (reason === "sales" && packageChoice) {
    subjectParts.push(`(${packageChoice})`);
  }
  const subject = encodeURIComponent(subjectParts.join(" "));
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${formData.get("email")}\nPhone: ${
      formData.get("phone") || "Not provided"
    }\nReason: ${reasonLabel}\nPackage: ${packageLabel}\n---\n${formData.get("message")}`,
  );
  window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
};

const Contact = () => {
  const [reason, setReason] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    const handlePricingSelect = (event) => {
      const planName = event.detail?.planName;
      if (!planName) {
        return;
      }
      setReason("sales");
      setSelectedPackage(planName);
    };

    window.addEventListener("pricing-select", handlePricingSelect);
    return () => {
      window.removeEventListener("pricing-select", handlePricingSelect);
    };
  }, []);

  const handleReasonChange = (event) => {
    const value = event.target.value;
    setReason(value);
    if (value !== "sales") {
      setSelectedPackage("");
    }
  };

  return (
    <section id="contact" className="border-t border-neutral-200 bg-white py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Plan a pilot around your fields.
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              Share the crop, location, and deployment goal. The Aradina team
              will help estimate the right sensor coverage and next steps.
            </p>
            <div className="mt-8 space-y-3 text-sm text-neutral-700">
              <p>
                <span className="font-semibold text-neutral-950">Email:</span>{" "}
                {CONTACT.email}
              </p>
              <p>
                <span className="font-semibold text-neutral-950">Phone:</span>{" "}
                {CONTACT.phone}
              </p>
              <p>
                <span className="font-semibold text-neutral-950">Base:</span>{" "}
                {CONTACT.address}
              </p>
            </div>
          </div>
          <div className="border border-neutral-200 bg-stone-50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-neutral-950">Message us</h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-sm">
              <input
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
              />
              <input
                name="phone"
                placeholder="Phone (optional)"
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
              />
              <select
                name="reason"
                required
                value={reason}
                onChange={handleReasonChange}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="" disabled>
                  Reason for reaching out
                </option>
                {MESSAGE_REASONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {reason === "sales" ? (
                <select
                  name="package"
                  required
                  value={selectedPackage}
                  onChange={(event) => setSelectedPackage(event.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="" disabled>
                    Select a package
                  </option>
                  {PRICING.map((plan) => (
                    <option key={plan.name} value={plan.name}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              ) : null}
              <textarea
                name="message"
                required
                placeholder="Your message"
                rows={5}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-500 px-4 py-2 font-medium text-brand-950 shadow-sm transition hover:bg-brand-400"
              >
                Send via email
              </button>
              <p className="text-xs text-neutral-500">
                Submitting opens your email client with a pre-filled message.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
