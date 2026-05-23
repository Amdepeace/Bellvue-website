import { useState } from "react";
import { Kicker, Placeholder } from "../components/primitives";

const CATEGORIES = ["All", "Suites", "Spa & Pool", "Garden", "Dining", "Details"];

const ITEMS = [
  {
    cat: "Suites",
    label: "Imperial Suite · terrace",
    cap: "Replace with terrace shot at golden hour",
    tone: "light",
    size: "col-span-2 row-span-2",
  },
  {
    cat: "Spa & Pool",
    label: "Spa · copper basin",
    cap: "Hand-hammered basin, candlelight",
    tone: "dark",
  },
  {
    cat: "Garden",
    label: "South garden · path",
    cap: "Stone path through highland flora",
  },
  {
    cat: "Dining",
    label: "Megenagna · place setting",
    cap: "Brass cutlery, linen, candle",
  },
  {
    cat: "Details",
    label: "Cotton drapery weave",
    cap: "Close-up of hand-loomed cotton",
  },
  {
    cat: "Suites",
    label: "Deluxe King · bath",
    cap: "Standalone tub by the window",
  },
  {
    cat: "Spa & Pool",
    label: "Lap pool · dusk",
    cap: "25m pool, indigo water",
    tone: "dark",
    size: "col-span-2",
  },
  { cat: "Garden", label: "Lobby fountain", cap: "Octagonal pool, lily pads" },
  {
    cat: "Dining",
    label: "Conservatory · breakfast",
    cap: "Light-flooded tables",
  },
  {
    cat: "Details",
    label: "Coffee ceremony · jebena",
    cap: "Clay pot over coals",
  },
  {
    cat: "Suites",
    label: "Standard · reading nook",
    cap: "Built-in window seat",
  },
  {
    cat: "Garden",
    label: "Sunrise over the gate",
    cap: "Bellevue facade, dawn",
    tone: "dark",
  },
];

export function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? ITEMS : ITEMS.filter((i) => i.cat === filter);

  return (
    <div className="page-enter page-enter-active">
      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Kicker>Gallery</Kicker>
            <h1 className="font-serif text-5xl md:text-7xl text-navy mt-4 leading-[0.95] tracking-[-0.02em]">
              The house,{" "}
              <em className="italic font-normal text-gold">in pictures.</em>
            </h1>
          </div>
          <div className="flex flex-wrap gap-1 border-b border-line">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`font-mono text-[10px] uppercase tracking-[0.25em] px-4 py-3 border-b-2 transition-colors ${
                  filter === c
                    ? "border-gold text-gold"
                    : "border-transparent text-muted hover:text-navy"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px] gap-3">
          {visible.map((it, i) => (
            <div key={i} className={it.size || ""}>
              <Placeholder
                tone={it.tone || "light"}
                aspect="auto"
                label={it.label}
                caption={it.cap}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
