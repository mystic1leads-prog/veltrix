import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { useCart } from "../state/cart-context";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { OrderSummary } from "../components/OrderSummary";
import { FormField, FormNotice } from "../components/FormField";

export default function CheckoutPage() {
  const { items } = useCart();
  const [message, setMessage] = useState("");
  return (
    <div className="container-shell py-10 pb-20">
      <Breadcrumbs
        items={[{ label: "Cart", to: "/cart/" }, { label: "Checkout" }]}
      />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">THE NEXT STEP</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-[-1.5px]">
            Make it yours.
          </h1>
          <p className="mt-4 text-sm text-graphite-500">
            Review your details before continuing to payment.
          </p>
        </div>
        <p className="flex items-center gap-2 text-[11px] text-graphite-500">
          <LockKeyhole size={15} />
          Your details deserve care.
        </p>
      </div>
      {items.length ? (
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_360px]">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setMessage(
                "Checkout is temporarily unavailable. Your cart is saved, and no order has been placed. Please try again later.",
              );
            }}
            className="space-y-8"
          >
            <section className="rounded-2xl border border-graphite-200 p-6 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-ember-50 text-xs font-bold text-ember-700">
                  1
                </span>
                <h2 className="font-display text-lg font-bold">
                  Contact details
                </h2>
              </div>
              <FormField
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
              <p className="mt-3 text-[11px] text-graphite-500">
                Already have an account?{" "}
                <Link to="/my-account/" className="font-semibold text-ember-700">
                  Sign in
                </Link>
              </p>
            </section>
            <section className="rounded-2xl border border-graphite-200 p-6 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-ember-50 text-xs font-bold text-ember-700">
                  2
                </span>
                <h2 className="font-display text-lg font-bold">
                  Shipping address
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="First name"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  maxLength={80}
                />
                <FormField
                  label="Last name"
                  name="lastName"
                  autoComplete="family-name"
                  required
                  maxLength={80}
                />
                <FormField
                  label="Organization (optional)"
                  name="organization"
                  autoComplete="organization"
                  className="sm:col-span-2"
                  maxLength={120}
                />
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-xs font-medium text-graphite-600">
                    Country / region <span className="text-ember-600">*</span>
                  </span>
                  <select
                    name="country"
                    required
                    autoComplete="country"
                    defaultValue=""
                    className="field"
                  >
                    <option value="" disabled>
                      Select your country
                    </option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="SG">Singapore</option>
                    <option value="NZ">New Zealand</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="OTHER">Other destination</option>
                  </select>
                </label>
                <FormField
                  label="Street address"
                  name="address"
                  autoComplete="address-line1"
                  required
                  className="sm:col-span-2"
                  maxLength={200}
                />
                <FormField
                  label="Apartment, suite, etc. (optional)"
                  name="apartment"
                  autoComplete="address-line2"
                  className="sm:col-span-2"
                  maxLength={100}
                />
                <FormField
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                  required
                  maxLength={100}
                />
                <FormField
                  label="State / province / region"
                  name="region"
                  autoComplete="address-level1"
                  maxLength={100}
                />
                <FormField
                  label="Postal code"
                  name="postalCode"
                  autoComplete="postal-code"
                  required
                  maxLength={20}
                />
                <FormField
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={30}
                />
              </div>
            </section>
            <section className="rounded-2xl border border-graphite-200 p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-graphite-100 text-xs font-bold text-graphite-500">
                  3
                </span>
                <h2 className="font-display text-lg font-bold">
                  Review & payment
                </h2>
              </div>
              <p className="text-xs leading-6 text-graphite-500">
                Available shipping and payment options are confirmed in the next
                step. You can review the final total before an order is placed.
              </p>
              <label className="mt-5 flex items-start gap-3 text-xs leading-6 text-graphite-500">
                <input
                  type="checkbox"
                  required
                  name="terms"
                  className="mt-1 size-4 shrink-0 accent-ember-500"
                />
                <span>
                  I have read the{" "}
                  <Link to="/terms/" className="text-ember-700 underline">
                    terms of use
                  </Link>{" "}
                  and understand that these compounds are intended for
                  laboratory research only.
                </span>
              </label>
            </section>
            <FormNotice message={message} />
            <div className="flex flex-wrap items-center justify-between gap-5">
              <Link
                to="/cart/"
                className="inline-flex items-center gap-2 text-xs font-medium text-graphite-500"
              >
                <ArrowLeft size={14} />
                Back to cart
              </Link>
              <button type="submit" className="btn-primary">
                Continue to payment <ArrowRight size={16} />
              </button>
            </div>
          </form>
          <OrderSummary checkout />
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-graphite-200 bg-graphite-50 p-10 text-center">
          <h2 className="font-display text-xl font-bold">
            Start with your collection.
          </h2>
          <p className="mt-3 text-sm text-graphite-500">
            Add a compound to your cart before checking out.
          </p>
          <Link to="/shop/" className="btn-primary mt-6">
            Explore compounds <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
