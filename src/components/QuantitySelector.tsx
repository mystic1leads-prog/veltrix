import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  label = "Quantity",
}: {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  return (
    <div className="inline-flex h-11 items-center rounded-lg border border-graphite-200 bg-white">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={`Decrease ${label}`}
        className="flex size-10 items-center justify-center rounded-l-lg text-graphite-500 hover:bg-graphite-50 disabled:opacity-30"
      >
        <Minus size={14} />
      </button>
      <span
        role="status"
        aria-label={label}
        className="min-w-7 text-center text-sm font-semibold tabular-nums"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= 99}
        aria-label={`Increase ${label}`}
        className="flex size-10 items-center justify-center rounded-r-lg text-graphite-500 hover:bg-graphite-50 disabled:opacity-30"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
