import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  FlaskConical,
  Package,
  ShoppingBag,
} from "lucide-react";
import { categories } from "../data/categories";
import { findProduct, money, products } from "../lib/catalog";
import { useCart } from "../state/cart-context";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ProductImage } from "../components/ProductImage";
import { QuantitySelector } from "../components/QuantitySelector";
import { Accordion } from "../components/Accordion";
import { ProductGrid } from "../components/ProductGrid";
import NotFoundPage from "./NotFoundPage";

export default function ProductPage() {
  const { slug } = useParams();
  const product = findProduct(slug);
  const [quantity, setQuantity] = useState(1);
  const [detail, setDetail] = useState(false);
  const cart = useCart();
  if (!product) return <NotFoundPage />;
  const category = categories.find((category) =>
    product.categories.includes(category.slug),
  );
  const related = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.categories.some((category) =>
          product.categories.includes(category),
        ),
    )
    .slice(0, 4);
  return (
    <>
      <div className="container-shell py-9">
        <Breadcrumbs
          items={[
            { label: "Shop", to: "/shop/" },
            ...(category
              ? [
                  {
                    label: category.shortName,
                    to: `/product-category/${category.slug}/`,
                  },
                ]
              : []),
            { label: product.name },
          ]}
        />
        <div className="grid gap-9 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-graphite-100 bg-graphite-50">
              <ProductImage
                key={product.id}
                src={product.image}
                name={product.name}
                eager
                className={`aspect-square p-8 sm:p-12 ${detail ? "[&_img]:scale-150" : ""}`}
              />
              <span className="absolute top-5 left-5 rounded-full border border-graphite-200 bg-white px-3 py-1.5 text-[10px] font-medium text-graphite-500">
                {detail ? "Label detail" : "Product view"}
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              {[false, true].map((zoom) => (
                <button
                  key={String(zoom)}
                  type="button"
                  aria-label={
                    zoom ? "View product label detail" : "View full product"
                  }
                  aria-pressed={detail === zoom}
                  onClick={() => setDetail(zoom)}
                  className={`size-20 overflow-hidden rounded-lg border p-2 ${detail === zoom ? "border-ember-500 bg-ember-50" : "border-graphite-200 bg-graphite-50"}`}
                >
                  <ProductImage
                    src={product.image}
                    name={zoom ? `${product.name} label` : product.name}
                    className={`size-full ${zoom ? "[&_img]:scale-150" : ""}`}
                  />
                </button>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-graphite-200 p-4">
              <FileText size={20} className="shrink-0 text-ember-600" />
              <div>
                <p className="text-xs font-semibold">Certificate of analysis</p>
                <p className="mt-1 text-xs leading-5 text-graphite-500">
                  {product.certificate
                    ? "Batch documentation is available below."
                    : "Confirm batch documentation availability before placing an order."}
                </p>
                <a
                  href="#hplc"
                  className="mt-2 inline-block text-xs font-semibold text-ember-700"
                >
                  View analysis information →
                </a>
              </div>
            </div>
          </div>
          <div className="py-2">
            <p className="eyebrow">
              {category?.name || "The research collection"}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight font-bold tracking-[-1.5px] sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-graphite-500">
              {product.summary ||
                `${product.name} is part of our ${category?.shortName.toLowerCase() || "research"} collection. Explore the product details and available documentation below.`}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-3xl font-bold tracking-tight">
                {money(product.price, product.currency)}
              </span>
              {product.regularPrice > product.price && (
                <span className="text-lg text-graphite-500 line-through">
                  {money(product.regularPrice, product.currency)}
                </span>
              )}
              <span className="text-[10px] text-graphite-500">
                {product.currency} · starting price
              </span>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs">
              <span
                className={`size-1.5 rounded-full ${product.inStock ? "bg-ember-500" : "bg-graphite-400"}`}
              />
              <span
                className={
                  product.inStock ? "text-ember-700" : "text-graphite-500"
                }
              >
                {product.inStock ? "In stock" : "Currently unavailable"}
              </span>
              {product.sku && (
                <span className="ml-auto text-[10px] text-graphite-500">
                  SKU: {product.sku}
                </span>
              )}
            </div>
            <div className="mt-7 border-y border-graphite-100 py-6">
              <p className="mb-3 text-xs font-semibold">Quantity</p>
              <div className="flex flex-wrap gap-3">
                <QuantitySelector value={quantity} onChange={setQuantity} />
                <button
                  type="button"
                  onClick={() => {
                    cart.addItem(product, quantity);
                    cart.openCart();
                  }}
                  disabled={!product.inStock}
                  className="btn-primary min-w-44 flex-1"
                >
                  <ShoppingBag size={16} />
                  {product.inStock ? "Add to cart" : "Out of stock"}
                  <span className="ml-auto">
                    {money(product.price * quantity, product.currency)}
                  </span>
                </button>
              </div>
              <p className="mt-3 text-[11px] leading-5 text-graphite-500">
                Shipping and applicable taxes are calculated at checkout.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 py-6">
              <span className="flex items-center gap-2 text-[11px] text-graphite-500">
                <FlaskConical size={17} className="text-ember-600" />
                Laboratory research only
              </span>
              <span className="flex items-center gap-2 text-[11px] text-graphite-500">
                <Package size={17} className="text-ember-600" />
                Product details below
              </span>
            </div>
            <Accordion title="Description" open>
              <p>
                {product.description ||
                  `${product.name} is supplied for laboratory research purposes. Refer to the product label and batch-specific documentation for specifications. Not intended for human consumption, diagnostic, or therapeutic use.`}
              </p>
            </Accordion>
            <div id="hplc" className="scroll-mt-28">
              <Accordion title="HPLC Test Results">
                {product.certificate ? (
                  <a
                    href={product.certificate}
                    className="text-ember-700 underline"
                  >
                    Open certificate of analysis
                  </a>
                ) : (
                  <p>
                    A batch-specific HPLC report is not currently published for
                    this product.{" "}
                    <Link to="/contact-us/" className="text-ember-700 underline">
                      Contact us
                    </Link>{" "}
                    to ask about the available certificate of analysis. No
                    purity percentage is claimed without a corresponding report.
                  </p>
                )}
              </Accordion>
            </div>
            <Accordion title="Storage Instructions">
              <p>
                Follow the storage conditions on the product label and batch
                documentation. Conditions may vary by compound and formulation.
                Keep sealed and protected from unauthorized access; request
                product-specific storage information if it is not supplied.
              </p>
            </Accordion>
            <Accordion title="Shipping Rules">
              <p>
                Shipping options, delivery eligibility, and any applicable
                charges are confirmed during checkout. Availability varies by
                destination and compound.{" "}
                <Link
                  to="/contact-us/#shipping"
                  className="text-ember-700 underline"
                >
                  Ask about shipping
                </Link>{" "}
                before ordering if you have specific requirements.
              </p>
            </Accordion>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-10 border-t border-graphite-100 bg-graphite-50/60">
          <div className="container-shell py-14">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">KEEP EXPLORING</p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">
                  More in this research area.
                </h2>
              </div>
              <Link
                to={category ? `/product-category/${category.slug}/` : "/shop/"}
                className="hidden items-center gap-2 text-xs font-semibold text-ember-700 sm:flex"
              >
                View collection <ArrowRight size={14} />
              </Link>
            </div>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </>
  );
}
