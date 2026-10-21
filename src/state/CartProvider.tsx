import { useEffect, useState, type ReactNode } from "react";
import { products } from "../lib/catalog";
import type { CartItem, Product } from "../types";
import { CartContext } from "./cart-context";

const storageKey = "veltrix.cart.v1";
const legacyStorageKey = "pepexpert.cart.v1";

function migrateLegacyCart() {
  try {
    if (localStorage.getItem(storageKey) !== null) return;
    const legacy = localStorage.getItem(legacyStorageKey);
    if (legacy === null) return;
    localStorage.setItem(storageKey, legacy);
    localStorage.removeItem(legacyStorageKey);
  } catch {
    // storage unavailable — nothing to migrate
  }
}

function readCart(): CartItem[] {
  try {
    migrateLegacyCart();
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(saved)) return [];
    const valid = new Map<string, number>();
    for (const item of saved as unknown[]) {
      if (
        typeof item !== "object" ||
        item === null ||
        !("productId" in item) ||
        !("quantity" in item)
      )
        continue;
      if (
        typeof item.productId !== "string" ||
        typeof item.quantity !== "number" ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      )
        continue;
      if (
        products.some(
          (product) => product.id === item.productId && product.inStock,
        )
      )
        valid.set(item.productId, Math.min(99, item.quantity));
    }
    return [...valid].map(([productId, quantity]) => ({ productId, quantity }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);
  const [isOpen, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      /* Cart remains usable when storage is unavailable. */
    }
  }, [items]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);
  function addItem(product: Product, quantity = 1) {
    if (!product.inStock || !Number.isInteger(quantity) || quantity < 1) return;
    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id);
      return existing
        ? current.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
              : item,
          )
        : [
            ...current,
            { productId: product.id, quantity: Math.min(99, quantity) },
          ];
    });
    setNotice(`${product.name} added to your cart`);
  }
  function setQuantity(productId: string, quantity: number) {
    if (!Number.isFinite(quantity)) return;
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.productId !== productId)
        : current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.min(99, Math.floor(quantity)) }
              : item,
          ),
    );
  }
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal =
    items.reduce(
      (total, item) =>
        total +
        Math.round(
          (products.find((product) => product.id === item.productId)?.price ||
            0) * 100,
        ) *
          item.quantity,
      0,
    ) / 100;
  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        isOpen,
        notice,
        openCart: () => setOpen(true),
        closeCart: () => setOpen(false),
        addItem,
        setQuantity,
        removeItem: (id) =>
          setItems((current) =>
            current.filter((item) => item.productId !== id),
          ),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
