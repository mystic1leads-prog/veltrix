import { Link } from "react-router-dom";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={`inline-flex shrink-0 items-center gap-2.5 ${light ? "text-white" : "text-graphite-900"}`}
      aria-label="Veltrix home"
    >
      <span
        className={`flex size-10 items-center justify-center rounded-xl ${light ?
          "bg-ember-700 text-white" :
          "bg-ember-500 text-graphite-900"}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 40 40" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M6 12 20 32 34 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.6"
          />
          <circle cx="20" cy="15.2" r="1.8" fill="currentColor" />
          <circle cx="16.8" cy="21" r="1.8" fill="currentColor" />
          <circle cx="23.2" cy="21" r="1.8" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-[24px] font-extrabold tracking-[-1.1px]">
        velt
        <span className={light ? "text-ember-400" : "text-ember-600"}>rix</span>
      </span>
    </Link>
  );
}
