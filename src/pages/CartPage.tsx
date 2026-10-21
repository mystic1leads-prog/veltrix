import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../state/cart-context";
import { products, money } from "../lib/catalog";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ProductImage } from "../components/ProductImage";
import { QuantitySelector } from "../components/QuantitySelector";
import { OrderSummary } from "../components/OrderSummary";

export default function CartPage() {
  const cart = useCart();
  return (
    <div className="container-shell py-10 pb-20">
      <Breadcrumbs items={[{ label: "Your cart" }]} />
      <p className="eyebrow">YOUR NEXT DISCOVERY</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-[-1.5px]">
        A collection of possibilities.
      </h1>
      <p className="mt-4 text-sm text-graphite-500">
        Review your compounds and make yourself ready for the next step.
      </p>
      {cart.items.length ? (
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_350px]">
          <section aria-label="Cart items">
            <div className="hidden grid-cols-[1fr_130px_100px_30px] gap-4 border-b border-graphite-200 pb-4 text-[10px] font-semibold uppercase tracking-widest text-graphite-500 md:grid">
              <span>Compound</span>
              <span>Quantity</span>
              <span>Total</span>
              <span />
            </div>
            {cart.items.map((item) => {
              const product = products.find(
                (product) => product.id === item.productId,
              );
              if (!product) return null;
              return (
                <article
                  key={item.productId}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-graphite-100 py-6 md:grid-cols-[1fr_130px_100px_30px]"
                >
                  <div className="flex items-center gap-4">
                    <Link to={`/product/${product.slug}/`} className="shrink-0">
                      <ProductImage
                        src={product.image}
                        name={product.name}
                        className="size-20 rounded-xl bg-graphite-50 p-2 sm:size-24"
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/product/${product.slug}/`}
                        className="text-sm font-semibold hover:text-ember-700"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-2 text-xs text-graphite-500">
                        {money(product.price, product.currency)} each
                      </p>
                      <p className="mt-2 text-[10px] text-ember-700">
                        In stock
                      </p>
                    </div>
                  </div>
                  <div className="col-start-1 row-start-2 md:col-auto md:row-auto">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(quantity) =>
                        cart.setQuantity(item.productId, quantity)
                      }
                      label={product.name}
                    />
                  </div>
                  <span className="col-start-2 row-start-2 text-sm font-semibold md:col-auto md:row-auto">
                    {money(product.price * item.quantity, product.currency)}
                  </span>
                  <button
                    type="button"
                    onClick={() => cart.removeItem(item.productId)}
                    aria-label={`Remove ${product.name}`}
                    className="col-start-2 row-start-1 justify-self-end p-2 text-graphite-500 hover:text-red-500 md:col-auto md:row-auto"
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              );
            })}
            <Link
              to="/shop/"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-graphite-500 hover:text-ember-700"
            >
              <ArrowLeft size={14} />
              Continue exploring
            </Link>
          </section>
          <OrderSummary />
        </div>
      ) : (
        <section className="mt-10 flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-graphite-200 bg-graphite-50/50 px-5 text-center">
          <ShoppingBag size={35} strokeWidth={1.2} className="text-ember-600" />
          <h2 className="mt-5 font-display text-xl font-bold">
            Your cart is waiting for a discovery.
          </h2>
          <p className="mt-3 text-sm text-graphite-500">
            Explore the collection and find your starting point.
          </p>
          <Link to="/shop/" className="btn-primary mt-6">
            Explore compounds <ArrowRight size={15} />
          </Link>
        </section>
      )}
    </div>
  );
}
