import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-7 flex flex-wrap items-center gap-2 text-[11px] text-graphite-500"
    >
      <Link to="/" className="hover:text-ember-700">
        Home
      </Link>
      {items.map((item, index) => (
        <span
          key={`${item.label}-${index}`}
          className="inline-flex items-center gap-2"
        >
          <ChevronRight size={11} />
          {item.to ? (
            <Link to={item.to} className="hover:text-ember-700">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-graphite-600">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
