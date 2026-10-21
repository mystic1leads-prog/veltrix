import { useState } from "react";
import { ArrowRight, FileText, MessageSquare, Package } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FormField, FormNotice } from "../components/FormField";
import { Accordion } from "../components/Accordion";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  return (
    <div className="container-shell py-10 pb-20">
      <Breadcrumbs items={[{ label: "Contact us" }]} />
      <p className="eyebrow">LET’S MAKE THINGS CLEARER</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-[-1.5px] sm:text-5xl">
        Good questions welcome.
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-7 text-graphite-500">
        A question about a compound, its documentation, or your next step? Start
        here.
      </p>
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_350px]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setMessage(
              "Messaging is temporarily unavailable. Your message has not been sent. Please try again later.",
            );
          }}
          className="space-y-6 rounded-2xl border border-graphite-200 p-6 sm:p-8"
        >
          <h2 className="font-display text-xl font-bold">Send us a message</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              name="name"
              label="Your name"
              autoComplete="name"
              required
              maxLength={120}
            />
            <FormField
              name="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
            />
            <label className="sm:col-span-2">
              <span className="mb-2 block text-xs font-medium text-graphite-600">
                What can we help with? <span className="text-ember-600">*</span>
              </span>
              <select name="topic" className="field" required defaultValue="">
                <option value="" disabled>
                  Select a topic
                </option>
                <option>Product information</option>
                <option>Certificates of analysis</option>
                <option>Shipping & returns</option>
                <option>My account</option>
                <option>Something else</option>
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="mb-2 block text-xs font-medium text-graphite-600">
                Your message <span className="text-ember-600">*</span>
              </span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={4000}
                rows={6}
                placeholder="Tell us a little more about your question…"
                className="field resize-y"
              />
            </label>
          </div>
          <FormNotice message={message} />
          <button className="btn-primary" type="submit">
            Send message <ArrowRight size={16} />
          </button>
        </form>
        <aside className="space-y-4">
          {[
            {
              icon: MessageSquare,
              title: "Questions about the collection?",
              text: "Include the compound name and strength so your question has the right context.",
            },
            {
              icon: FileText,
              title: "Looking for a certificate?",
              text: "Mention the compound and batch number, if you have one, when asking about analysis documentation.",
            },
            {
              icon: Package,
              title: "Shipping to a new destination?",
              text: "Include your country and postal region to ask about destination-specific shipping availability.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-graphite-100 bg-graphite-50 p-6"
            >
              <Icon size={22} strokeWidth={1.5} className="text-ember-600" />
              <h2 className="mt-4 text-sm font-semibold">{title}</h2>
              <p className="mt-3 text-xs leading-6 text-graphite-500">{text}</p>
            </div>
          ))}
        </aside>
      </div>
      <section id="faq" className="mt-16 max-w-3xl scroll-mt-28">
        <p className="eyebrow">A USEFUL STARTING POINT</p>
        <h2 className="mt-3 mb-6 font-display text-2xl font-bold tracking-tight">
          A few common questions.
        </h2>
        <Accordion title="What are these compounds intended for?">
          <p>
            The research collection is intended for laboratory research only.
            These compounds are not presented for human consumption, diagnosis,
            or therapeutic use.
          </p>
        </Accordion>
        <Accordion title="Where can I find a certificate of analysis?">
          <p>
            Check the HPLC Test Results section of the product page. If a
            batch-specific certificate has not been published, ask about its
            availability before ordering.
          </p>
        </Accordion>
        <div id="shipping" className="scroll-mt-28">
          <Accordion title="What are the shipping and returns rules?">
            <p>
              Destination eligibility, shipping charges, and return eligibility
              need to be confirmed for your specific order. Include your
              country, compound, and any applicable order reference when you
              contact us. No shipping time or free-shipping threshold is
              guaranteed here.
            </p>
          </Accordion>
        </div>
        <Accordion title="Can I change the quantity in my cart?">
          <p>
            Yes. Use the quantity controls in your cart or the cart panel. Your
            collection is saved in your browser, so it remains available when
            you return on the same device.
          </p>
        </Accordion>
      </section>
    </div>
  );
}
