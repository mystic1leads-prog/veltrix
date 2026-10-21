import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { ProductGridSkeleton } from "./components/ProductGrid";
import { CartProvider } from "./state/CartProvider";
import { useCart } from "./state/cart-context";
import { findProduct } from "./lib/catalog";
import { categories } from "./data/categories";
import HomePage from "./pages/HomePage";

const ShopPage = lazy(() => import("./pages/ShopPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function PageEffects() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "A clearer standard for research",
      "/shop/": "The research collection",
      "/about-us/": "Our approach",
      "/contact-us/": "Contact us",
      "/my-account/": "My account",
      "/cart/": "Your cart",
      "/checkout/": "Checkout",
      "/privacy/": "Privacy policy",
      "/terms/": "Terms of use",
    };
    const parts = pathname.split("/").filter(Boolean);
    const title =
      titles[pathname] ||
      (parts[0] === "product"
        ? findProduct(parts[1])?.name
        : parts[0] === "product-category"
          ? categories.find((category) => category.slug === parts[1])?.name
          : parts[0] === "shop"
            ? "The research collection"
            : "Page not found");
    document.title = `${title || "Page not found"} | Veltrix`;
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
    else {
      const scrollToAnchor = () => {
        const target = document.getElementById(hash.slice(1));
        if (!target) return false;
        target.scrollIntoView();
        return true;
      };
      if (scrollToAnchor()) return;
      const observer = new MutationObserver(() => {
        if (scrollToAnchor()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      const timer = window.setTimeout(() => observer.disconnect(), 5000);
      return () => {
        observer.disconnect();
        window.clearTimeout(timer);
      };
    }
  }, [pathname, search, hash]);
  return null;
}

function Layout() {
  const { notice } = useCart();
  const location = useLocation();
  return (
    <>
      <PageEffects />
      <a
        href="#main-content"
        className="sr-only z-50 rounded-lg bg-white p-4 text-sm text-ember-700 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-[50vh] outline-none"
      >
        <Suspense
          fallback={
            <div className="container-shell py-14">
              <ProductGridSkeleton />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop/" element={<ShopPage />} />
            <Route path="/shop/page/:page/" element={<ShopPage />} />
            <Route
              path="/product-category/:categorySlug/"
              element={<ShopPage />}
            />
            <Route
              path="/product-category/:categorySlug/page/:page/"
              element={<ShopPage />}
            />
            <Route
              path="/product/:slug/"
              element={<ProductPage key={location.pathname} />}
            />
            <Route path="/about-us/" element={<AboutPage />} />
            <Route path="/contact-us/" element={<ContactPage />} />
            <Route path="/my-account/" element={<AccountPage />} />
            <Route path="/cart/" element={<CartPage />} />
            <Route path="/checkout/" element={<CheckoutPage />} />
            <Route path="/privacy/" element={<LegalPage />} />
            <Route path="/terms/" element={<LegalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -trangraphite-x-1/2"
      >
        {notice && (
          <div className="flex items-center gap-3 rounded-xl bg-graphite-900 px-5 py-4 text-xs text-white shadow-xl">
            <span className="rounded-full bg-ember-500 p-1">
              <Check size={12} />
            </span>
            {notice}
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout />
      </CartProvider>
    </BrowserRouter>
  );
}
