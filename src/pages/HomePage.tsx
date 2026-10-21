import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  FlaskConical,
  Layers3,
  Microscope,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import { categories } from "../data/categories";
import { featuredProducts, products } from "../lib/catalog";
import { CategoryIcon } from "../components/CategoryIcon";
import { ProductGrid } from "../components/ProductGrid";
import { ResearchVisual } from "../components/ResearchVisual";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-graphite-100 bg-linear-to-br from-white via-graphite-50/50 to-ember-50">
        <div className="container-shell grid items-center gap-5 pt-13 pb-12 lg:min-h-143 lg:grid-cols-[1fr_1.05fr] lg:gap-1 lg:py-10">
          <div className="relative z-10 max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ember-100 bg-white/80 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-ember-700">
              <span className="size-1.5 rounded-full bg-ember-500" /> THE NEXT
              CHAPTER IN RESEARCH
            </div>
            <h1 className="font-display text-[48px] leading-[1.09] font-bold tracking-[-2.8px] text-graphite-900 sm:text-[64px] sm:tracking-[-3.7px] xl:text-[70px]">
              Small molecules.
              <br />
              <span className="text-ember-600">Big possibilities.</span>
            </h1>
            <p className="mt-6 max-w-99 text-sm leading-7 text-graphite-500 sm:text-[15px]">
              A clearer path to your next discovery. Explore a thoughtfully
              curated collection of peptides and compounds, built around your
              research.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop/" className="btn-primary">
                Explore the collection <ArrowUpRight size={17} />
              </Link>
              <Link to="/about-us/" className="btn-secondary">
                Our approach <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2.5 text-[10px] font-medium tracking-wide text-graphite-500">
              <FlaskConical size={15} className="text-ember-600" />
              <span>Research-focused.</span>
              <span className="text-graphite-500">/</span>
              <span>Detail-driven.</span>
              <span className="text-graphite-500">/</span>
              <span>Possibility-led.</span>
            </div>
          </div>
          <div className="relative mx-auto -mt-2 h-auto w-full max-w-140 lg:mt-0">
            <ResearchVisual />
            <div className="absolute right-0 bottom-0 rounded-lg border border-white bg-white/85 px-4 py-3 shadow-sm backdrop-blur-sm sm:right-2 sm:bottom-6">
              <p className="text-[9px] font-semibold tracking-widest text-graphite-500">
                ONE COLLECTION. MANY POSSIBILITIES.
              </p>
              <p className="mt-1 text-xs font-semibold text-graphite-700">
                {products.length} compounds. 7 research areas.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="border-b border-graphite-100 bg-white">
        <div className="container-shell grid grid-cols-2 gap-x-5 gap-y-6 py-7 lg:grid-cols-4">
          {[
            {
              icon: FlaskConical,
              title: "Research, at the center",
              text: "A purpose-built compound collection",
            },
            {
              icon: ScanLine,
              title: "Clarity in every detail",
              text: "Transparent product information",
            },
            {
              icon: Layers3,
              title: "A more focused collection",
              text: "Organized around your research",
            },
            {
              icon: ShieldCheck,
              title: "Considered from the start",
              text: "Simple, straightforward shopping",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <Icon
                size={23}
                strokeWidth={1.4}
                className="shrink-0 text-ember-700"
              />
              <div>
                <p className="text-[11px] font-semibold text-graphite-800">
                  {title}
                </p>
                <p className="mt-1 hidden text-[10px] text-graphite-500 sm:block">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="container-shell py-14 lg:py-17">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">A COLLECTION WITH DIRECTION</p>
            <h2 className="mt-3 font-display text-[28px] font-bold tracking-[-1px] text-graphite-900 sm:text-3xl">
              Find your research focus.
            </h2>
          </div>
          <Link
            to="/shop/"
            className="flex items-center gap-2 text-xs font-semibold text-graphite-600 hover:text-ember-700"
          >
            Browse all categories <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/product-category/${category.slug}/`}
              className="group flex min-h-35 flex-col items-start rounded-xl border border-graphite-200/70 bg-white p-4 transition hover:-trangraphite-y-1 hover:border-ember-200 hover:bg-ember-50/50"
            >
              <span className="mb-4 flex size-10 items-center justify-center rounded-lg bg-ember-50 text-ember-700 transition group-hover:bg-white">
                <CategoryIcon name={category.icon} />
              </span>
              <span className="max-w-28 text-[11px] leading-4.5 font-semibold text-graphite-700">
                {category.shortName}
              </span>
              <span className="mt-2 text-[9px] text-graphite-500">
                {
                  products.filter((product) =>
                    product.categories.includes(category.slug),
                  ).length
                }{" "}
                compounds <span className="ml-1 text-ember-600">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="border-y border-graphite-100 bg-graphite-50/65">
        <div className="container-shell py-14 lg:py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">EXPLORE THE ESSENTIALS</p>
              <h2 className="mt-3 font-display text-[28px] font-bold tracking-[-1px] text-graphite-900 sm:text-3xl">
                Your next discovery starts here.
              </h2>
              <p className="mt-3 text-xs text-graphite-500">
                A closer look at compounds from across the collection.
              </p>
            </div>
            <Link
              to="/shop/"
              className="btn-secondary min-h-10 px-4 py-2 text-xs"
            >
              Shop all compounds <ArrowUpRight size={14} />
            </Link>
          </div>
          <ProductGrid
            products={
              featuredProducts.length >= 4
                ? featuredProducts
                : products.slice(0, 4)
            }
          />
        </div>
      </section>
      <section className="container-shell py-16">
        <div className="relative grid gap-8 overflow-hidden rounded-2xl bg-graphite-900 p-7 text-white sm:p-11 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow text-ember-400">BEHIND EVERY DISCOVERY</p>
            <h2 className="mt-4 max-w-md font-display text-3xl leading-tight font-semibold tracking-[-1px] sm:text-[37px]">
              Good research begins
              <br />
              with the right questions.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-graphite-300">
              Know what you’re working with. From compound details to batch
              documentation, we believe clarity should be part of the process.
            </p>
            <Link
              to="/about-us/"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-ember-300 hover:text-white"
            >
              Discover our approach <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="flex flex-col justify-center gap-6 lg:pl-12">
            {[
              {
                icon: Microscope,
                title: "Science with context",
                text: "Product information that helps you explore with intention.",
              },
              {
                icon: ScanLine,
                title: "Documentation matters",
                text: "Check batch-specific analysis and availability before ordering.",
              },
              {
                icon: FlaskConical,
                title: "Built for the research journey",
                text: "A collection organized to make discovery feel straightforward.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div className="flex items-start gap-4" key={title}>
                <span className="rounded-lg border border-graphite-700 bg-graphite-800 p-3 text-ember-400">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-2 max-w-65 text-xs leading-5 text-graphite-300">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-graphite-100 bg-ember-50/40">
        <div className="container-shell flex flex-col items-start justify-between gap-5 py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight">
              A question before your next step?
            </h2>
            <p className="mt-2 text-xs text-graphite-500">
              Let’s make your research journey a little clearer.
            </p>
          </div>
          <Link to="/contact-us/" className="btn-secondary">
            Get in touch <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
