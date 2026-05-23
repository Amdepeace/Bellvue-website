export function StylizedMap() {
  return (
    <div className="relative w-full aspect-[4/3] bg-cream border border-line overflow-hidden">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 30}
            y1={0}
            x2={i * 30}
            y2={300}
            stroke="#E5E0D8"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 30}
            x2={400}
            y2={i * 30}
            stroke="#E5E0D8"
            strokeWidth="0.5"
          />
        ))}
        <path
          d="M0 180 Q 120 170 220 200 T 400 220"
          stroke="#B8973A"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M120 0 L 180 140 L 230 300"
          stroke="#B8973A"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M0 90 L 180 140 L 400 100"
          stroke="#B8973A"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <rect x="60" y="40" width="60" height="40" fill="#1A2E4A" opacity="0.06" />
        <rect
          x="280"
          y="220"
          width="80"
          height="50"
          fill="#1A2E4A"
          opacity="0.06"
        />
        <g transform="translate(180,140)">
          <circle r="18" fill="#B8973A" opacity="0.18" />
          <circle r="10" fill="#B8973A" opacity="0.35" />
          <circle r="4" fill="#1A2E4A" />
        </g>
        <g transform="translate(340,230)">
          <circle r="5" fill="none" stroke="#1A2E4A" strokeWidth="1" />
          <text
            x="10"
            y="4"
            fontFamily="JetBrains Mono"
            fontSize="9"
            fill="#1A2E4A"
          >
            BOLE INTL
          </text>
        </g>
      </svg>
      <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-navy/70">
        Megenagna · Addis Ababa
      </div>
      <div className="absolute bottom-4 right-4 bg-navy text-cream px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] flex items-center gap-2">
        <span className="material-symbols-outlined text-gold text-[14px]">place</span>{" "}
        Bellevue
      </div>
    </div>
  );
}
