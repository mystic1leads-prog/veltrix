import rawProducts from "../data/catalog.json";
import type { Product } from "../types";

export const products: Product[] = rawProducts;
export const findProduct = (slug: string | undefined) =>
  products.find((product) => product.slug === slug);
export const money = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount,
  );
export const featuredProducts = ["BPC-157", "TB-500", "CJC", "NAD"]
  .map(
    (name) =>
      products.find((product) =>
        product.name.toLowerCase().startsWith(name.toLowerCase()),
      ) ||
      products.find((product) =>
        product.name.toLowerCase().includes(name.toLowerCase()),
      ),
  )
  .filter((product): product is Product => Boolean(product));
