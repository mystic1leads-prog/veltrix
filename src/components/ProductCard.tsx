import { Link } from "react-router-dom";
import { ArrowUpRight, Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import type { Product } from "../types";
import { money } from "../lib/catalog";
import { categories } from "../data/categories";
import { useCart } from "../state/cart-context";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [added]);
  const category = categories.find((item) =>
    product.categories.includes(item.slug),
  );
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-graphite-200/80 bg-white p-3.5 transition duration-300 hover:-trangraphite-y-1 hover:border-ember-200 hover:shadow-lg hover:shadow-graphite-200/40 motion-reduce:transform-none">
      <Link
        to={`/product/${product.slug}/`}
        className="relative block rounded-xl bg-graphite-50"
      >
        <ProductImage
          src={product.image}
          name={product.name}
          className="aspect-square p-4"
        />
        <span
          className={`absolute top-3 left-3 rounded-md border px-2 py-1 text-[9px] font-semibold uppercase tracking-wider ${product.inStock ? "border-ember-100 bg-white/95 text-ember-700" : "border-graphite-200 bg-white text-graphite-500"}`}
        >
          {product.inStock ? "In stock" : "Out of stock"}
        </span>
        <span className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full border border-graphite-200 bg-white text-graphite-500 transition group-hover:bg-ember-500 group-hover:text-white">
          <ArrowUpRight size={15} />
        </span>
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-5 pb-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-graphite-500">
          {category?.shortName || "Research collection"}
        </p>
        <Link
          to={`/product/${product.slug}/`}
          className="mt-2 font-display text-[16px] leading-6 font-bold tracking-tight text-graphite-900 hover:text-ember-700"
        >
          {product.name}
        </Link>
        <div className="mt-auto flex items-end justify-between gap-2 pt-5">
          <div>
            <p className="mb-1 text-[10px] text-graphite-500">Starting at</p>
            <span className="text-lg font-bold tracking-tight">
              {money(product.price, product.currency)}
            </span>
            {product.regularPrice > product.price && (
              <span className="ml-2 text-xs text-graphite-500 line-through">
                {money(product.regularPrice, product.currency)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              addItem(product);
              setAdded(true);
            }}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition disabled:bg-graphite-100 disabled:text-graphite-300 ${added ? "bg-ember-600 text-white" : "bg-ember-50 text-ember-700 hover:bg-ember-500 hover:text-white"}`}
          >
            {added ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>
      </div>
    </article>
  );
}
