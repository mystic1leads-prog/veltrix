import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "../lib/catalog";
import { categories } from "../data/categories";
import { ProductGrid } from "../components/ProductGrid";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CategorySidebar } from "../components/CategorySidebar";
import { Pagination } from "../components/Pagination";
import { Dialog } from "../components/Dialog";

const pageSize = 8;
export default function ShopPage() {
  const { categorySlug, page: pageParam } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const category = categories.find(
    (category) => category.slug === categorySlug,
  );
  const query = (params.get("q") || "").trim().toLowerCase();
  const validAmount = (value: string | null, fallback: number) =>
    value !== null && value !== "" && Number.isFinite(Number(value))
      ? Math.max(0, Number(value))
      : fallback;
  const minimum = validAmount(params.get("min"), 0);
  const maximum = validAmount(params.get("max"), Infinity);
  const filtered = products
    .filter(
      (product) =>
        (!categorySlug || product.categories.includes(categorySlug)) &&
        (!query ||
          `${product.name} ${product.sku || ""}`
            .toLowerCase()
            .includes(query)) &&
        product.price >= minimum &&
        product.price <= maximum &&
        (params.get("stock") !== "in" || product.inStock),
    )
    .sort((a, b) =>
      params.get("sort") === "price-asc"
        ? a.price - b.price
        : params.get("sort") === "price-desc"
          ? b.price - a.price
          : params.get("sort") === "name-desc"
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name),
    );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const requestedPage = Number(pageParam || 1);
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const base = categorySlug ? `/product-category/${categorySlug}/` : "/shop/";
  const url = (number: number, search = params) =>
    `${base}${number > 1 ? `page/${number}/` : ""}${search.size ? `?${search.toString()}` : ""}`;
  function update(values: Record<string, string>) {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(values)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    navigate(url(1, next));
  }
  const title =
    category?.name ||
    (categorySlug ? "Collection not found" : "The research collection.");
  return (
    <>
      <section className="border-b border-graphite-100 bg-graphite-50/75">
        <div className="container-shell py-9 sm:py-11">
          <Breadcrumbs
            items={
              category
                ? [
                    { label: "Shop", to: "/shop/" },
                    { label: category.shortName },
                  ]
                : [{ label: "Shop all compounds" }]
            }
          />
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">DISCOVERY, IN EVERY DETAIL</p>
              <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-bold tracking-[-1.3px] sm:text-[42px]">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-graphite-500">
                {category?.description ||
                  "Explore peptides and compounds across seven areas of research. Find the right starting point for what comes next."}
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-graphite-200 bg-white px-4 py-2 text-[10px] font-medium text-graphite-500 sm:flex">
              <span className="size-1.5 rounded-full bg-ember-500" />
              {products.length} compounds. A world of possibility.
            </div>
          </div>
        </div>
      </section>
      <div className="container-shell grid gap-9 py-10 lg:grid-cols-[215px_1fr] lg:gap-10">
        <aside className="hidden lg:block">
          <CategorySidebar
            selected={categorySlug}
            params={params}
            onFilter={update}
          />
        </aside>
        <section aria-label="Product results">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-graphite-100 pb-5">
            <p role="status" className="text-xs text-graphite-500">
              {visible.length ? (
                <>
                  Showing{" "}
                  <span className="font-semibold text-graphite-800">
                    {(page - 1) * pageSize + 1}–
                    {Math.min(page * pageSize, filtered.length)}
                  </span>{" "}
                  of {filtered.length} compounds
                </>
              ) : (
                "No compounds to display"
              )}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-graphite-200 px-3 py-2 text-xs lg:hidden"
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
              <label className="flex items-center gap-2 text-[11px] text-graphite-500">
                Sort by{" "}
                <select
                  aria-label="Sort products"
                  value={params.get("sort") || "name-asc"}
                  onChange={(event) => update({ sort: event.target.value })}
                  className="rounded-md border border-graphite-200 bg-white px-2 py-2 text-xs font-medium text-graphite-600"
                >
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </label>
            </div>
          </div>
          {(query ||
            params.has("min") ||
            params.has("max") ||
            params.has("stock")) && (
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-graphite-500">
              {query && <span>Search: “{params.get("q")}”</span>}
              {params.has("min") && <span>From ${minimum}</span>}
              {params.has("max") && <span>Up to ${maximum}</span>}
              {params.has("stock") && <span>In stock</span>}
              <button
                type="button"
                onClick={() => navigate(base)}
                className="flex items-center gap-1 rounded-full bg-ember-50 px-3 py-1.5 text-ember-700"
              >
                <X size={12} />
                Clear filters
              </button>
            </div>
          )}
          {visible.length ? (
            <ProductGrid products={visible} compact />
          ) : (
            <div className="flex min-h-85 flex-col items-center justify-center rounded-2xl border border-dashed border-graphite-200 px-6 text-center">
              <Search size={30} strokeWidth={1.2} className="text-graphite-300" />
              <h2 className="mt-5 font-display text-xl font-bold">
                {page > totalPages && filtered.length
                  ? "You’ve reached the end of this collection."
                  : "A different direction, perhaps?"}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-graphite-500">
                Try another search or adjust your filters to explore more of the
                collection.
              </p>
              <Link to={base} className="btn-secondary mt-6">
                Reset collection <ArrowUpRight size={15} />
              </Link>
            </div>
          )}
          <Pagination page={page} total={totalPages} url={url} />
        </section>
      </div>
      <Dialog
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filter the collection"
        drawer
      >
        <div className="overflow-y-auto p-6">
          <CategorySidebar
            selected={categorySlug}
            params={params}
            onFilter={update}
            close={() => setFiltersOpen(false)}
          />
        </div>
      </Dialog>
    </>
  );
}
