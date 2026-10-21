import { Link } from "react-router-dom";
import { ArrowUpRight, Dna, FileCheck2, Microscope } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ResearchVisual } from "../components/ResearchVisual";

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-graphite-100 bg-graphite-50/70">
        <div className="container-shell py-10">
          <Breadcrumbs items={[{ label: "Our approach" }]} />
          <div className="grid items-center gap-5 lg:grid-cols-2">
            <div>
              <p className="eyebrow">A CLEARER STANDARD FOR RESEARCH</p>
              <h1 className="mt-4 font-display text-4xl leading-tight font-bold tracking-[-1.8px] sm:text-5xl">
                Curiosity is the start.
                <br />
                <span className="text-ember-600">Clarity is the difference.</span>
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-7 text-graphite-500">
                Veltrix brings a considered perspective to research compounds.
                We’re here to make exploring a complex field feel a little more
                focused, informed, and straightforward.
              </p>
              <Link to="/shop/" className="btn-primary mt-7">
                Discover the collection <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="mx-auto w-full max-w-110">
              <ResearchVisual />
            </div>
          </div>
        </div>
      </section>
      <section className="container-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">OUR POINT OF VIEW</p>
            <h2 className="mt-4 max-w-sm font-display text-3xl leading-tight font-bold tracking-tight">
              Thoughtful by design.
              <br />
              Research at heart.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-8 text-graphite-500">
            <p>
              A compound is one part of a much bigger question. Whether you’re
              exploring cellular pathways, metabolic processes, or neurological
              signaling, meaningful research begins with knowing what’s in front
              of you.
            </p>
            <p>
              Our collection is organized across seven research areas, with
              clear product information and a direct path to the details that
              matter. We value useful context over noise, and transparent
              documentation over assumptions.
            </p>
          </div>
        </div>
        <div
          id="quality"
          className="mt-14 grid scroll-mt-28 gap-5 md:grid-cols-3"
        >
          {[
            {
              icon: Microscope,
              title: "A research-first perspective",
              text: "Our collection is presented for laboratory research. Product information is a starting point for investigation, never a substitute for the appropriate scientific and institutional review.",
            },
            {
              icon: FileCheck2,
              title: "Documentation over assumptions",
              text: "Batch-specific certificates matter. Where documentation is not published, we make that clear so you can ask the right questions before taking the next step.",
            },
            {
              icon: Dna,
              title: "An organized way to explore",
              text: "From cellular health to cognitive pathways, our seven research areas make the collection easier to navigate and individual compounds easier to compare.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-graphite-200 bg-graphite-50/40 p-7"
            >
              <Icon size={29} strokeWidth={1.4} className="text-ember-600" />
              <h3 className="mt-6 font-display text-lg font-bold tracking-tight">
                {title}
              </h3>
              <p className="mt-4 text-xs leading-7 text-graphite-500">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-ember-50/50">
        <div className="container-shell flex flex-wrap items-center justify-between gap-5 py-11">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              There’s always another good question.
            </h2>
            <p className="mt-3 text-sm text-graphite-500">
              If something needs a closer look, start a conversation.
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
