import { useState } from "react";
import { Box } from "lucide-react";

export function ProductImage({
  src,
  name,
  className = "",
  eager = false,
}: {
  src: string;
  name: string;
  className?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
    >
      {!loaded && !failed && src && (
        <div
          className="absolute inset-0 animate-pulse rounded-xl bg-graphite-100 motion-reduce:animate-none"
          aria-hidden="true"
        />
      )}
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          loading={eager ? "eager" : "lazy"}
          width={600}
          height={600}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`size-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : (
        <div className="flex flex-col items-center gap-3 p-6 text-center text-graphite-500">
          <Box size={45} strokeWidth={1} />
          <span className="text-xs">{name}</span>
        </div>
      )}
    </div>
  );
}
