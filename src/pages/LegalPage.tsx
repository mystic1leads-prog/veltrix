import { useLocation } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

export default function LegalPage() {
  const privacy = useLocation().pathname === "/privacy/";
  const title = privacy ? "Privacy policy" : "Terms of use";
  return (
    <div className="container-shell py-10 pb-20">
      <Breadcrumbs items={[{ label: title }]} />
      <article className="max-w-3xl">
        <p className="eyebrow">THE DETAILS MATTER</p>
        <h1 className="mt-4 mb-10 font-display text-4xl font-bold tracking-tight">
          {title}
        </h1>
        {(privacy
          ? [
              {
                title: "Your browser and your collection",
                text: "The cart stores product identifiers and quantities in your browser’s local storage so your collection is available when you return. Removing an item updates the saved cart. You can remove all saved cart data through your browser’s site-data settings.",
              },
              {
                title: "Forms and personal information",
                text: "Account access, checkout, and messaging are currently unavailable. Submitting a form does not create an account, place an order, or send a message. Form values are not saved by this storefront.",
              },
              {
                title: "External resources",
                text: "Fonts are requested from Google Fonts. Those requests may disclose normal connection information, including your IP address, to the font provider. Product images are served from this storefront.",
              },
              {
                title: "Questions",
                text: "Use the contact page to review the available support options. This policy should be reviewed whenever account, payment, analytics, or messaging services become available.",
              },
            ]
          : [
              {
                title: "Research use",
                text: "The collection is presented for laboratory research only. The compounds are not intended for human consumption, diagnosis, or therapeutic use. Product names and category labels do not constitute medical advice or a claim of suitability for a particular experiment.",
              },
              {
                title: "Product information",
                text: "Review product-specific information and batch documentation before making a purchasing decision. Images are illustrative of the source product. Prices, stock, specifications, and availability may change and must be confirmed before an order is accepted.",
              },
              {
                title: "Orders and payment",
                text: "Adding a product to your cart does not reserve stock or create an order. Checkout is currently unavailable; no payment is collected and no order is accepted through this storefront.",
              },
              {
                title: "Documentation and shipping",
                text: "No purity percentage, laboratory accreditation, delivery time, shipping coverage, or return eligibility is guaranteed without the applicable product or order documentation.",
              },
            ]
        ).map((section) => (
          <section key={section.title} className="mb-8">
            <h2 className="font-display text-lg font-bold">{section.title}</h2>
            <p className="mt-3 text-sm leading-8 text-graphite-500">
              {section.text}
            </p>
          </section>
        ))}
      </article>
    </div>
  );
}
