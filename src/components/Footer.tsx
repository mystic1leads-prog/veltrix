import { Link } from "react-router-dom";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { Brand } from "./Brand";
import { categories } from "../data/categories";

export function Footer() {
  return (
    <footer className="bg-graphite-900 text-graphite-400">
      <div className="container-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Brand light />
          <p className="mt-5 max-w-65 text-xs leading-6">
            A considered approach to research compounds. Explore with clarity.
            Discover what comes next.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-graphite-700 px-3 py-2 text-[10px] tracking-wide">
            <FlaskConical size={13} className="text-ember-400" /> For laboratory
            research only
          </div>
        </div>
        <div>
          <h2 className="mb-5 text-xs font-semibold text-white">
            Explore the collection
          </h2>
          <div className="flex flex-col gap-3 text-xs">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                to={`/product-category/${category.slug}/`}
                className="hover:text-white"
              >
                {category.shortName}
              </Link>
            ))}
            <Link
              to="/shop/"
              className="flex items-center gap-1 text-ember-400 hover:text-ember-300"
            >
              View all compounds <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
        <div>
          <h2 className="mb-5 text-xs font-semibold text-white">Veltrix</h2>
          <div className="flex flex-col gap-3 text-xs">
            <Link to="/about-us/" className="hover:text-white">
              Our approach
            </Link>
            <Link to="/about-us/#quality" className="hover:text-white">
              Quality & documentation
            </Link>
            <Link to="/contact-us/" className="hover:text-white">
              Contact us
            </Link>
            <Link to="/contact-us/#faq" className="hover:text-white">
              Frequently asked questions
            </Link>
          </div>
        </div>
        <div>
          <h2 className="mb-5 text-xs font-semibold text-white">
            Here to help
          </h2>
          <div className="flex flex-col gap-3 text-xs">
            <Link to="/my-account/" className="hover:text-white">
              My account
            </Link>
            <Link to="/cart/" className="hover:text-white">
              Your cart
            </Link>
            <Link to="/contact-us/#shipping" className="hover:text-white">
              Shipping & returns
            </Link>
            <Link to="/privacy/" className="hover:text-white">
              Privacy policy
            </Link>
            <Link to="/terms/" className="hover:text-white">
              Terms of use
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-graphite-800">
        <div className="container-shell flex flex-col gap-3 py-5 text-[10px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Veltrix. All rights reserved.</p>
          <p className="max-w-xl text-graphite-400">
            Research compounds are not intended for human consumption,
            diagnostic, or therapeutic use.
          </p>
        </div>
      </div>
    </footer>
  );
}
