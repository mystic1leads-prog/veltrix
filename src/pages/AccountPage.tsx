import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Box, LockKeyhole, UserRound } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FormField, FormNotice } from "../components/FormField";

type AccountView = "signin" | "register" | "reset";
export default function AccountPage() {
  const [view, setView] = useState<AccountView>("signin");
  const [message, setMessage] = useState("");
  function changeView(view: AccountView) {
    setView(view);
    setMessage("");
  }
  return (
    <div className="container-shell py-10 pb-20">
      <Breadcrumbs items={[{ label: "My account" }]} />
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-graphite-200 lg:grid-cols-2">
        <section className="flex flex-col justify-center bg-graphite-900 px-8 py-12 text-white sm:px-11">
          <span className="mb-8 flex size-13 items-center justify-center rounded-xl border border-graphite-700 bg-graphite-800 text-ember-400">
            <UserRound size={25} strokeWidth={1.4} />
          </span>
          <p className="eyebrow text-ember-400">YOUR RESEARCH, IN FOCUS</p>
          <h1 className="mt-4 font-display text-4xl leading-tight font-semibold tracking-[-1.5px]">
            A space for your
            <br />
            next discovery.
          </h1>
          <p className="mt-6 text-sm leading-7 text-graphite-300">
            One place to keep your research journey organized, from your first
            question to your next collection.
          </p>
          <div className="mt-10 flex items-center gap-3 border-t border-graphite-700 pt-6 text-xs text-graphite-300">
            <Box size={18} className="text-ember-400" />
            Explore. Consider. Discover.
          </div>
        </section>
        <section className="px-7 py-10 sm:px-10">
          <p className="eyebrow">MY ACCOUNT</p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">
            {view === "signin"
              ? "Welcome back."
              : view === "register"
                ? "Start your journey."
                : "Let’s get you back in."}
          </h2>
          <p className="mt-3 text-xs leading-6 text-graphite-500">
            {view === "signin"
              ? "Sign in to access your account."
              : view === "register"
                ? "Create your Veltrix account."
                : "Enter your email to request a password reset."}
          </p>
          {view !== "reset" && (
            <div className="mt-6 grid grid-cols-2 rounded-lg bg-graphite-100 p-1">
              {(["signin", "register"] as const).map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => changeView(tab)}
                  aria-pressed={view === tab}
                  className={`rounded-md px-4 py-2.5 text-xs font-semibold ${view === tab ? "bg-white text-graphite-900 shadow-sm" : "text-graphite-600"}`}
                >
                  {tab === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>
          )}
          <form
            key={view}
            className="mt-6 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              setMessage(
                view === "reset"
                  ? "Password reset is temporarily unavailable. No reset email has been sent. Please try again later."
                  : "Account access is temporarily unavailable. Please try again later. Your details have not been saved.",
              );
            }}
          >
            {view === "register" && (
              <FormField
                label="Full name"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
              />
            )}
            <FormField
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
            {view !== "reset" && (
              <FormField
                label="Password"
                name="password"
                type="password"
                autoComplete={
                  view === "register" ? "new-password" : "current-password"
                }
                required
                minLength={view === "register" ? 8 : 1}
                maxLength={128}
              />
            )}
            {view === "signin" && (
              <button
                type="button"
                onClick={() => changeView("reset")}
                className="text-xs font-medium text-ember-700 hover:underline"
              >
                Forgot your password?
              </button>
            )}
            {view === "register" && (
              <p className="text-[11px] leading-6 text-graphite-500">
                Use at least 8 characters. By continuing, you agree to the{" "}
                <Link to="/terms/" className="text-ember-700 underline">
                  terms of use
                </Link>
                .
              </p>
            )}
            <FormNotice message={message} />
            <button type="submit" className="btn-primary w-full">
              {view === "signin"
                ? "Sign in"
                : view === "register"
                  ? "Create account"
                  : "Request reset link"}
              <ArrowRight size={15} />
            </button>
            {view === "reset" && (
              <button
                type="button"
                onClick={() => changeView("signin")}
                className="w-full text-center text-xs font-medium text-graphite-500"
              >
                Back to sign in
              </button>
            )}
          </form>
          <p className="mt-7 flex items-center justify-center gap-2 text-[10px] text-graphite-500">
            <LockKeyhole size={12} />
            Your details deserve care.
          </p>
        </section>
      </div>
    </div>
  );
}
