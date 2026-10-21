export interface Category {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon:
    | "growth"
    | "metabolism"
    | "recovery"
    | "longevity"
    | "mind"
    | "vitality"
    | "sleep";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string | null;
  categories: string[];
  price: number;
  regularPrice: number;
  currency: string;
  inStock: boolean;
  image: string;
  sourceImage: string | null;
  sourceUrl: string;
  summary: string;
  description: string;
  format: string;
  certificate: string | null;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
