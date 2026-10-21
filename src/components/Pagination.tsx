import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Pagination({
  page,
  total,
  url,
}: {
  page: number;
  total: number;
  url: (page: number) => string;
}) {
  if (total <= 1) return null;
  return (
    <nav
      aria-label="Product pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 && (
        <Link
          to={url(page - 1)}
          aria-label="Previous page"
          className="mr-2 rounded-lg border border-graphite-200 p-2.5 text-graphite-500 hover:bg-ember-50"
        >
          <ArrowLeft size={15} />
        </Link>
      )}
      {Array.from({ length: total }, (_, index) => index + 1).map((number) => (
        <Link
          to={url(number)}
          key={number}
          aria-label={`Page ${number}`}
          aria-current={number === page ? "page" : undefined}
          className={`flex size-9 items-center justify-center rounded-lg text-xs font-semibold ${number === page ? "bg-graphite-900 text-white" : "border border-graphite-200 bg-white text-graphite-500 hover:border-ember-300"}`}
        >
          {number}
        </Link>
      ))}
      {page < total && (
        <Link
          to={url(page + 1)}
          aria-label="Next page"
          className="ml-2 rounded-lg border border-graphite-200 p-2.5 text-graphite-500 hover:bg-ember-50"
        >
          <ArrowRight size={15} />
        </Link>
      )}
    </nav>
  );
}
