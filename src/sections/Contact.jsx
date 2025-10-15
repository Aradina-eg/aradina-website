import Container from "../components/Container.jsx";
import { CONTACT } from "../data/site.js";

const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const subject = encodeURIComponent(
    `Aradina inquiry from ${formData.get("name")}`,
  );
  const body = encodeURIComponent(
    `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\nPhone: ${formData.get("phone")}\n---\n${formData.get("message")}`,
  );
  window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
};

const Contact = () => (
  <section id="contact" className="py-16 md:py-24">
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Get in touch
        </h2>
        <p className="mt-3 text-neutral-700">
          Tell us about your farm and goals; let&apos;s plan a pilot.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900">
            Contact details
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            <li>
              <strong>Email:</strong>{" "}
              <a
                className="text-emerald-700 hover:underline"
                href={`mailto:${CONTACT.email}`}
              >
                {CONTACT.email}
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a
                className="text-emerald-700 hover:underline"
                href={`tel:${CONTACT.phone}`}
              >
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <strong>WhatsApp:</strong>{" "}
              <a
                className="text-emerald-700 hover:underline"
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <strong>Address:</strong> {CONTACT.address}
            </li>
          </ul>
          <div className="mt-6 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-700">
            Prefer a quick estimate? Click a plan above and we&apos;ll email you
            a quote within 24 hours.
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900">Message us</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-sm">
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              name="phone"
              placeholder="Phone (optional)"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              name="message"
              required
              placeholder="Your message"
              rows={5}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white shadow hover:bg-emerald-700"
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

export default Contact;
