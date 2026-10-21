import { useId } from "react";

function Vial({
  x,
  y,
  scale = 1,
  name,
  strength,
  id,
}: {
  x: number;
  y: number;
  scale?: number;
  name: string;
  strength: string;
  id: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse
        cx="67"
        cy="220"
        rx="66"
        ry="12"
        fill="#1a1817"
        opacity=".08"
        filter={`url(#${id}-blur)`}
      />
      <rect
        x="10"
        y="49"
        width="114"
        height="166"
        rx="19"
        fill={`url(#${id}-glass)`}
        stroke="#f0dcc3"
        strokeWidth="1.3"
      />
      <path
        d="M22 69v116c0 13 5 20 17 20"
        fill="none"
        stroke="white"
        strokeWidth="5"
        opacity=".85"
      />
      <rect
        x="11"
        y="5"
        width="112"
        height="35"
        rx="7"
        fill={`url(#${id}-cap)`}
      />
      <path
        d="M18 12h99M18 19h99M18 26h99M18 33h99"
        stroke="#8a8177"
        strokeWidth="1"
        opacity=".4"
      />
      <rect x="20" y="39" width="94" height="15" rx="3" fill="#b9b0a5" />
      <rect x="11" y="95" width="112" height="86" fill="#fffdfa" />
      <path d="M11 95h112v8H11z" fill="#ea7314" />
      <text
        x="24"
        y="122"
        fontFamily="Arial,sans-serif"
        fontSize="12"
        fontWeight="800"
        fill="#1a1817"
      >
        veltrix<tspan fill="#f7954a">.</tspan>
      </text>
      <text
        x="24"
        y="146"
        fontFamily="Arial,sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="#1a1817"
      >
        {name}
      </text>
      <text
        x="24"
        y="163"
        fontFamily="Arial,sans-serif"
        fontSize="9"
        textLength="88"
        lengthAdjust="spacingAndGlyphs"
        fill="#7a7268"
      >
        {strength} · RESEARCH COMPOUND
      </text>
      <path d="M22 190h89" stroke="#d2ccc4" strokeWidth=".5" />
      <text
        x="24"
        y="199"
        fontFamily="Arial,sans-serif"
        fontSize="5.4"
        letterSpacing="1"
        fill="#7a7268"
      >
        FOR LABORATORY RESEARCH ONLY
      </text>
    </g>
  );
}

export function ResearchVisual() {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 600 460"
      role="img"
      aria-label="Veltrix research vials with a molecular illustration"
      className="h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" x2="1">
          <stop stopColor="#f5e0c6" />
          <stop offset=".18" stopColor="#fffdfa" />
          <stop offset=".55" stopColor="#fdeedd" />
          <stop offset=".85" stopColor="#f0d8bc" />
          <stop offset="1" stopColor="#e6c6a1" />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" x2="1">
          <stop stopColor="#8a8177" />
          <stop offset=".3" stopColor="#efeae2" />
          <stop offset=".65" stopColor="#bcb3a7" />
          <stop offset="1" stopColor="#6e665d" />
        </linearGradient>
        <radialGradient id={`${id}-sphere`} cx=".3" cy=".2">
          <stop stopColor="#fff8f1" />
          <stop offset=".4" stopColor="#f7954a" />
          <stop offset="1" stopColor="#9e4412" />
        </radialGradient>
        <filter id={`${id}-blur`}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id={`${id}-platform`} x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#fffaf4" />
          <stop offset="1" stopColor="#f4ddc1" />
        </linearGradient>
      </defs>
      <circle
        cx="326"
        cy="210"
        r="190"
        fill="none"
        stroke="#f9c07f"
        strokeDasharray="3 8"
      />
      <circle cx="326" cy="210" r="145" fill="none" stroke="#ffeedb" />
      <g fill="none" stroke="#fbbc7d" strokeWidth="5" opacity=".8">
        <path d="m372 52 75 55-17 78 69 47M447 107l68-35M430 185l-73 34M499 232l-4 75M372 52l-66 39" />
      </g>
      {[
        [372, 52, 17],
        [447, 107, 26],
        [430, 185, 19],
        [499, 232, 29],
        [515, 72, 16],
        [357, 219, 12],
        [495, 307, 17],
        [306, 91, 12],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={`url(#${id}-sphere)`} />
      ))}
      <ellipse
        cx="286"
        cy="415"
        rx="220"
        ry="24"
        fill="#e3c19c"
        opacity=".2"
        filter={`url(#${id}-blur)`}
      />
      <path
        d="M78 343h401v44c0 19-90 35-200 35S78 406 78 387Z"
        fill={`url(#${id}-platform)`}
      />
      <ellipse
        cx="279"
        cy="343"
        rx="201"
        ry="35"
        fill="#fff8f0"
        stroke="#f6e0c6"
      />
      <Vial
        x={109}
        y={151}
        scale={0.83}
        name="TB-500"
        strength="10 MG"
        id={id}
      />
      <Vial
        x={322}
        y={144}
        scale={0.91}
        name="NAD+"
        strength="100 MG"
        id={id}
      />
      <Vial
        x={209}
        y={102}
        scale={1.2}
        name="BPC-157"
        strength="10 MG"
        id={id}
      />
      <g transform="translate(55 95)">
        <rect width="151" height="48" rx="10" fill="white" stroke="#f0ddc7" />
        <circle cx="24" cy="24" r="12" fill="#ffeedb" />
        <path d="m19 24 3 3 6-7" fill="none" stroke="#c2560f" strokeWidth="2" />
        <text
          x="45"
          y="21"
          fontSize="9"
          fontFamily="Arial,sans-serif"
          fontWeight="700"
          fill="#1a1817"
        >
          PRECISION IN FOCUS
        </text>
        <text
          x="45"
          y="34"
          fontSize="8"
          fontFamily="Arial,sans-serif"
          fill="#7a7268"
        >
          Every detail matters.
        </text>
      </g>
    </svg>
  );
}
