import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, ShoppingBag, UserRound } from "lucide-react";
import { Brand } from "./Brand";
import { SearchBox } from "./SearchBox";
import { Dialog } from "./Dialog";
import { categories } from "../data/categories";
import { CategoryIcon } from "./CategoryIcon";
import { useCart } from "../state/cart-context";

export function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [collections, setCollections] = useState(false);
  const cart = useCart();
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-graphite-100 bg-white/90 backdrop-blur-md">
        <div className="container-shell flex h-20 items-center gap-7">
          <Brand />
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 text-xs font-medium xl:flex"
          >
            <NavLink
              to="/shop/"
              className={({ isActive }) =>
                isActive ? "text-ember-700" : "text-graphite-600 hover:text-ember-700"
              }
            >
              Shop all
            </NavLink>
            <div
              className="relative"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setCollections(false);
              }}
            >
              <button
                type="button"
                aria-expanded={collections}
                aria-controls="collections-menu"
                onClick={() => setCollections(!collections)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setCollections(false);
                }}
                className="flex items-center gap-1 py-4 text-graphite-600 hover:text-ember-700"
              >
                Research focus <ChevronDown size={12} />
              </button>
              {collections && (
                <div
                  id="collections-menu"
                  className="absolute top-12 left-0 w-75 rounded-xl border border-graphite-100 bg-white p-2 shadow-xl"
                >
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/product-category/${category.slug}/`}
                      onClick={() => setCollections(false)}
                      className="flex items-center gap-3 rounded-lg p-3 text-xs text-graphite-600 hover:bg-ember-50 hover:text-ember-700"
                    >
                      <CategoryIcon name={category.icon} size={18} />
                      {category.shortName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <NavLink
              to="/about-us/"
              className="text-graphite-600 hover:text-ember-700"
            >
              Our approach
            </NavLink>
          </nav>
          <div className="ml-auto hidden w-full max-w-65 md:block">
            <SearchBox />
          </div>
          <div className="ml-auto flex items-center gap-4 md:ml-0">
            <Link
              to="/my-account/"
              aria-label="My account"
              className="hidden rounded-lg p-2 text-graphite-600 hover:bg-graphite-50 sm:block"
            >
              <UserRound size={20} strokeWidth={1.6} />
            </Link>
            <span className="hidden h-5 w-px bg-graphite-200 sm:block" />
            <button
              type="button"
              onClick={cart.openCart}
              aria-label={`Open cart, ${cart.count} items`}
              className="relative rounded-lg p-2 text-graphite-600 hover:bg-graphite-50"
            >
              <ShoppingBag size={21} strokeWidth={1.6} />
              <span className="absolute -top-1 -right-1 flex min-w-4.5 items-center justify-center rounded-full bg-ember-700 px-1 text-[9px] leading-4.5 font-semibold text-white">
                {cart.count}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMobile(true)}
              aria-label="Open menu"
              aria-expanded={mobile}
              className="rounded-lg p-2 xl:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>
      <Dialog
        open={mobile}
        onClose={() => setMobile(false)}
        title="Explore Veltrix"
        drawer
      >
        <div className="space-y-6 overflow-y-auto p-6">
          <SearchBox onNavigate={() => setMobile(false)} />
          <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
            <Link
              to="/shop/"
              onClick={() => setMobile(false)}
              className="font-semibold"
            >
              Shop all compounds
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/product-category/${category.slug}/`}
                onClick={() => setMobile(false)}
                className="flex items-center gap-3 py-1 text-sm text-graphite-500"
              >
                <CategoryIcon name={category.icon} size={18} />
                {category.shortName}
              </Link>
            ))}
            {[
              ["/about-us/", "Our approach"],
              ["/contact-us/", "Contact us"],
              ["/my-account/", "My account"],
              ["/cart/", "Your cart"],
            ].map(([url, label]) => (
              <Link
                key={url}
                to={url}
                onClick={() => setMobile(false)}
                className="border-t border-graphite-100 pt-4 text-sm font-medium"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </Dialog>
    </>
  );
}
