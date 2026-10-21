import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export function Accordion({
  title,
  children,
  open = false,
}: {
  title: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details open={open} className="group border-b border-graphite-200 py-5">
      <summary className="flex list-none items-center justify-between gap-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          size={16}
          className="shrink-0 text-graphite-500 transition group-open:rotate-180"
        />
      </summary>
      <div className="pt-4 text-sm leading-7 text-graphite-500">{children}</div>
    </details>
  );
}
