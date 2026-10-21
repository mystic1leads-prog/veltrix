import { useId, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ArrowUpRight } from "lucide-react";
import { products } from "../lib/catalog";

export function SearchBox({ onNavigate }: { onNavigate?: () => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const id = useId();
  const navigate = useNavigate();
  const results = query.trim()
    ? products
        .filter((product) =>
          `${product.name} ${product.sku || ""}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
        .slice(0, 5)
    : [];
  function go(url: string) {
    setOpen(false);
    onNavigate?.();
    navigate(url);
  }
  return (
    <form
      role="search"
      className="relative w-full"
      onSubmit={(event) => {
        event.preventDefault();
        go(
          active >= 0 && results[active]
            ? `/product/${results[active].slug}/`
            : `/shop/?q=${encodeURIComponent(query.trim())}`,
        );
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <Search
        size={16}
        className="pointer-events-none absolute top-3 left-3.5 text-graphite-500"
      />
      <input
        type="search"
        aria-label="Search products"
        placeholder="Search your next discovery…"
        role="combobox"
        aria-expanded={open && Boolean(query.trim())}
        aria-controls={id}
        aria-autocomplete="list"
        aria-activedescendant={
          open && results[active] ? `${id}-${active}` : undefined
        }
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            setActive((current) => Math.min(results.length - 1, current + 1));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((current) => Math.max(-1, current - 1));
          } else if (event.key === "Escape") setOpen(false);
        }}
        className="h-10 w-full rounded-lg border border-graphite-200/80 bg-graphite-50 pr-3 pl-10 text-[12px] placeholder:text-graphite-500 focus:border-ember-400 focus:bg-white"
      />
      {open && query.trim() && (
        <div className="absolute top-12 z-40 w-full min-w-60 overflow-hidden rounded-xl border border-graphite-200 bg-white p-2 shadow-xl">
          <ul id={id} role="listbox" aria-label="Search suggestions">
            {results.map((product, index) => (
              <li
                key={product.id}
                id={`${id}-${index}`}
                role="option"
                aria-selected={index === active}
              >
                <Link
                  to={`/product/${product.slug}/`}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 text-xs hover:bg-ember-50 ${index === active ? "bg-ember-50 text-ember-700" : ""}`}
                >
                  {product.name}
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            ))}
          </ul>
          {!results.length && (
            <p className="p-3 text-xs text-graphite-500">
              No matching compounds. Try another name.
            </p>
          )}
          <button
            type="submit"
            className="mt-1 w-full rounded-lg bg-graphite-50 p-3 text-left text-xs font-semibold text-ember-700"
          >
            View all search results →
          </button>
        </div>
      )}
    </form>
  );
}
