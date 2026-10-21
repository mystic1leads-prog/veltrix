import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  compact = false,
}: {
  products: Product[];
  compact?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 ${compact ? "xl:grid-cols-3" : "lg:grid-cols-4"}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
export function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-5 lg:grid-cols-4"
      aria-label="Loading products"
      role="status"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-graphite-100 p-4 motion-reduce:animate-none"
        >
          <div className="aspect-square rounded-xl bg-graphite-100" />
          <div className="mt-5 h-3 w-1/2 rounded bg-graphite-100" />
          <div className="mt-3 h-5 w-4/5 rounded bg-graphite-100" />
          <div className="mt-7 h-6 w-1/3 rounded bg-graphite-100" />
        </div>
      ))}
    </div>
  );
}
