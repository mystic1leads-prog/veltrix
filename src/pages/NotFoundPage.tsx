import { Link } from "react-router-dom";
import { ArrowUpRight, FlaskConical } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="container-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <FlaskConical size={38} strokeWidth={1.2} className="text-ember-600" />
      <p className="eyebrow mt-6">A NEW DIRECTION</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">
        This page is still undiscovered.
      </h1>
      <p className="mt-5 max-w-md text-sm leading-7 text-graphite-500">
        The page you’re looking for couldn’t be found. Head back to the
        collection to find your next starting point.
      </p>
      <Link to="/shop/" className="btn-primary mt-8">
        Explore the collection <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}
