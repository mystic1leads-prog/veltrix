import { Link } from "react-router-dom";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { categories } from "../data/categories";
import { products } from "../lib/catalog";
import { CategoryIcon } from "./CategoryIcon";

export function CategorySidebar({
  selected,
  params,
  onFilter,
  close,
}: {
  selected?: string;
  params: URLSearchParams;
  onFilter: (values: Record<string, string>) => void;
  close?: () => void;
}) {
  return (
    <div className="space-y-7">
      <div>
        <h2 className="mb-4 text-xs font-bold text-graphite-900">
          Research focus
        </h2>
        <nav aria-label="Product categories" className="flex flex-col gap-1">
          <Link
            to={`/shop/${params.get("q") ? `?q=${encodeURIComponent(params.get("q") || "")}` : ""}`}
            onClick={close}
            className={`flex items-center justify-between rounded-lg px-3 py-3 text-xs ${!selected ? "bg-ember-50 font-semibold text-ember-700" : "text-graphite-500 hover:bg-graphite-50"}`}
          >
            All compounds <span className="text-[10px]">{products.length}</span>
          </Link>
          {categories.map((category) => (
            <Link
              to={`/product-category/${category.slug}/`}
              key={category.slug}
              onClick={close}
              className={`flex items-start gap-2.5 rounded-lg px-3 py-3 text-[11px] leading-4 ${selected === category.slug ? "bg-ember-50 font-semibold text-ember-700" : "text-graphite-500 hover:bg-graphite-50"}`}
            >
              <CategoryIcon name={category.icon} size={15} />
              <span className="flex-1">{category.shortName}</span>
              <span className="text-[10px]">
                {
                  products.filter((product) =>
                    product.categories.includes(category.slug),
                  ).length
                }
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <form
        key={params.toString()}
        className="border-t border-graphite-100 pt-6"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          onFilter({
            min: String(form.get("min") || ""),
            max: String(form.get("max") || ""),
          });
          close?.();
        }}
      >
        <h2 className="mb-4 text-xs font-bold">Price range (USD)</h2>
        <div className="flex items-center gap-2">
          <input
            name="min"
            type="number"
            aria-label="Minimum price"
            min="0"
            step="0.01"
            defaultValue={params.get("min") || ""}
            placeholder="Min"
            className="field min-w-0 px-3 py-2"
          />
          <span className="text-graphite-500">–</span>
          <input
            name="max"
            type="number"
            aria-label="Maximum price"
            min="0"
            step="0.01"
            defaultValue={params.get("max") || ""}
            placeholder="Max"
            className="field min-w-0 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="mt-3 w-full rounded-lg border border-graphite-200 px-3 py-2 text-[11px] font-semibold text-graphite-500 hover:border-ember-400 hover:text-ember-700"
        >
          Apply price range
        </button>
      </form>
      <div className="border-t border-graphite-100 pt-6">
        <h2 className="mb-4 text-xs font-bold">Availability</h2>
        <label className="flex cursor-pointer items-center gap-3 text-xs text-graphite-500">
          <input
            type="checkbox"
            checked={params.get("stock") === "in"}
            onChange={(event) =>
              onFilter({ stock: event.target.checked ? "in" : "" })
            }
            className="size-4 accent-ember-500"
          />
          In stock only
        </label>
      </div>
      <div className="rounded-xl bg-graphite-50 p-5">
        <FlaskConical
          size={24}
          strokeWidth={1.4}
          className="mb-4 text-ember-600"
        />
        <p className="text-xs font-semibold">Need a little clarity?</p>
        <p className="mt-2 text-[11px] leading-5 text-graphite-500">
          Get in touch with a question about the collection.
        </p>
        <Link
          to="/contact-us/"
          onClick={close}
          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-ember-700"
        >
          Contact us <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  );
}
