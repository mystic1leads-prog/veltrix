import { Link } from "react-router-dom";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useCart } from "../state/cart-context";
import { money, products } from "../lib/catalog";

export function OrderSummary({ checkout = false }: { checkout?: boolean }) {
  const cart = useCart();
  return (
    <aside className="h-fit rounded-2xl border border-graphite-200 bg-graphite-50/70 p-6 sm:p-7">
      <h2 className="font-display text-lg font-bold">Order summary</h2>
      {checkout && (
        <div className="mt-6 space-y-4 border-b border-graphite-200 pb-6">
          {cart.items.map((item) => {
            const product = products.find(
              (product) => product.id === item.productId,
            );
            return product ? (
              <div
                key={item.productId}
                className="flex justify-between gap-4 text-xs"
              >
                <span className="text-graphite-500">
                  {product.name}{" "}
                  <span className="ml-1 font-semibold text-graphite-800">
                    Ã— {item.quantity}
                  </span>
                </span>
                <span className="shrink-0 font-medium">
                  {money(product.price * item.quantity, product.currency)}
                </span>
              </div>
            ) : null;
          })}
        </div>
      )}
      <dl className="mt-6 space-y-4 text-xs">
        <div className="flex justify-between">
          <dt className="text-graphite-500">
            Subtotal ({cart.count} {cart.count === 1 ? "item" : "items"})
          </dt>
          <dd className="font-semibold">{money(cart.subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-graphite-500">Shipping</dt>
          <dd className="text-right text-graphite-500">Calculated at checkout</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-graphite-500">Tax</dt>
          <dd className="text-right text-graphite-500">
            Based on your destination
          </dd>
        </div>
        <div className="flex justify-between border-t border-graphite-200 pt-5 text-base font-bold">
          <dt>Order subtotal</dt>
          <dd>{money(cart.subtotal)}</dd>
        </div>
      </dl>
      {!checkout && (
        <Link to="/checkout/" className="btn-primary mt-6 w-full">
          Continue to checkout <ArrowRight size={16} />
        </Link>
      )}
      <p className="mt-5 flex items-start gap-2 text-[10px] leading-5 text-graphite-500">
        <LockKeyhole size={13} className="mt-1 shrink-0" />
        Your cart stays with you. Review your order before taking the next step.
      </p>
    </aside>
  );
}
