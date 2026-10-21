import { createContext, useContext } from "react";
import type { CartItem, Product } from "../types";

export interface CartState {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  notice: string;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
}
export const CartContext = createContext<CartState | null>(null);
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider is required");
  return context;
}
