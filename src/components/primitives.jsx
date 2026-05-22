import { useEffect, useRef } from "react";

export function Crest({ size = 28, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" stroke={color} strokeWidth="1" />
      <path d="M8 24 V12 L16 6 L24 12 V24" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="16" cy="17" r="2" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}

export function Logo({ size = "md", inverse = false, className = "" }) {
  const colorMain = inverse ? "text-cream" : "text-navy";
  const sz = size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-xl";
  return (
    <div className={`inline-flex items-baseline gap-[2px] ${className}`}>
      <span className={`font-serif ${sz} ${colorMain} tracking-[0.18em]`}>BELLEVUE</span>
      <span className="font-mono text-[9px] text-gold uppercase tracking-[0.2em]">·ETH</span>
    </div>
  );
}

export function Kicker({ children, className = "" }) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.25em] text-gold inline-flex items-center gap-2 ${className}`}
    >
      <span className="inline-block w-6 h-px bg-gold" />
      {children}
    </span>
  );
}

export function SectionHead({ kicker, title, intro, align = "left", inverse = false }) {
  const t = inverse ? "text-cream" : "text-navy";
  const m = inverse ? "text-cream/70" : "text-charcoal/70";
  const centered = align === "center";
  return (
    <div className={`${centered ? "text-center mx-auto max-w-2xl" : ""} mb-10 md:mb-14`}>
      {kicker && (
        <div
          className={`font-mono text-[11px] uppercase tracking-[0.25em] text-gold mb-4 flex items-center gap-3 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="inline-block w-6 h-px bg-gold" />
          {kicker}
        </div>
      )}
      <h2
        className={`font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.01em] ${t} max-w-3xl ${
          centered ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 max-w-xl text-[15px] md:text-base leading-relaxed ${m} ${
            centered ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function CTA({
  children,
  onClick,
  variant = "solid",
  className = "",
  as: Tag = "button",
  href,
  type,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] px-7 py-4 transition-all duration-300 cursor-pointer cta-ripple";
  const styles = {
    solid: "bg-navy text-cream hover:bg-navy-deep",
    gold: "bg-gold text-navy hover:bg-gold-soft",
    ghost: "border border-navy text-navy hover:bg-navy hover:text-cream",
    "ghost-light": "border border-cream/40 text-cream hover:bg-cream hover:text-navy",
    link: "!px-0 !py-2 border-b border-gold text-gold hover:text-navy hover:border-navy bg-transparent",
  };

  function onPointerMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--rx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--ry", `${e.clientY - r.top}px`);
  }

  return (
    <Tag
      type={type}
      href={href}
      onClick={onClick}
      onMouseMove={onPointerMove}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Field({ label, error, children }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/70 block mb-1">
        {label}
      </label>
      {children}
      {error && (
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-700 mt-2">
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

export function Placeholder({
  label,
  caption,
  aspect = "4/3",
  tone = "light",
  className = "",
  src,
  children,
}) {
  const seed = (label || "bellevue")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  const w = aspect === "auto" ? 1800 : 1600;
  const h = aspect === "auto" ? 1200 : 1200;
  const finalSrc = src || `https://picsum.photos/seed/${seed || "bellevue"}/${w}/${h}`;
  const stripeClass = tone === "dark" ? "bg-navy" : "bg-cream";

  return (
    <div
      className={`relative w-full overflow-hidden group ${stripeClass} ${className}`}
      style={aspect !== "auto" ? { aspectRatio: aspect } : undefined}
    >
      <img
        src={finalSrc}
        alt={label || ""}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const parent = e.currentTarget.parentElement;
          parent.classList.add(tone === "dark" ? "stripe-bg-dark" : "stripe-bg");
        }}
      />
      {tone === "dark" && (
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/10 to-transparent pointer-events-none" />
      )}
      {(label || caption) && (
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/75 to-transparent pointer-events-none">
          {label && (
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream mb-1">
              {label}
            </div>
          )}
          {caption && (
            <div className="font-mono text-[10px] text-cream/80 leading-snug">↳ {caption}</div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("in"), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref} className={`fade-up ${className}`}>
      {children}
    </Tag>
  );
}
