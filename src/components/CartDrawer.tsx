import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../state/cart-context";
import { products, money } from "../lib/catalog";
import { Dialog } from "./Dialog";
import { ProductImage } from "./ProductImage";
import { QuantitySelector } from "./QuantitySelector";

export function CartDrawer() {
  const cart = useCart();
  return (
    <Dialog
      open={cart.isOpen}
      onClose={cart.closeCart}
      title={`Your cart (${cart.count})`}
      drawer
    >
      {cart.items.length ? (
        <>
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            {cart.items.map((item) => {
              const product = products.find(
                (product) => product.id === item.productId,
              );
              if (!product) return null;
              return (
                <div key={item.productId} className="flex gap-4">
                  <Link
                    to={`/product/${product.slug}/`}
                    onClick={cart.closeCart}
                    className="shrink-0"
                  >
                    <ProductImage
                      src={product.image}
                      name={product.name}
                      className="size-21 rounded-xl bg-graphite-50 p-2"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${product.slug}/`}
                      onClick={cart.closeCart}
                      className="text-sm font-semibold hover:text-ember-700"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-graphite-500">
                      {money(product.price, product.currency)}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(quantity) =>
                          cart.setQuantity(item.productId, quantity)
                        }
                        label={product.name}
                      />
                      <button
                        type="button"
                        aria-label={`Remove ${product.name}`}
                        onClick={() => cart.removeItem(item.productId)}
                        className="p-2 text-graphite-500 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-4 border-t border-graphite-100 bg-graphite-50 p-6">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>{money(cart.subtotal)}</span>
            </div>
            <p className="text-xs text-graphite-500">
              Shipping and taxes calculated at checkout.
            </p>
            <Link
              to="/checkout/"
              onClick={cart.closeCart}
              className="btn-primary w-full"
            >
              Continue to checkout <ArrowRight size={16} />
            </Link>
            <Link
              to="/cart/"
              onClick={cart.closeCart}
              className="block text-center text-sm font-medium text-graphite-500 hover:text-ember-700"
            >
              View your cart
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
          <span className="rounded-full bg-ember-50 p-6 text-ember-600">
            <ShoppingBag size={32} strokeWidth={1.5} />
          </span>
          <h3 className="font-display text-xl font-bold">
            Your next discovery starts here.
          </h3>
          <p className="text-sm leading-6 text-graphite-500">
            Explore the collection and add a compound to your cart.
          </p>
          <Link to="/shop/" onClick={cart.closeCart} className="btn-primary">
            Explore the collection <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </Dialog>
  );
}
