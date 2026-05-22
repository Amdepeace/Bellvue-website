import { useState } from "react";
import { CTA, Kicker, Placeholder } from "../components/primitives";

const TREATMENTS = [
  {
    name: "Basalt Renewal",
    duration: "90 min",
    price: "4,500",
    category: "Massage",
    desc: "Heated volcanic stones meet deep tissue work. The house signature.",
  },
  {
    name: "Botanical Facial",
    duration: "60 min",
    price: "3,200",
    category: "Face",
    desc: "Organic Ethiopian botanicals layered into a calm, slow restorative ritual.",
  },
  {
    name: "Thermal Circuit",
    duration: "120 min",
    price: "1,800",
    category: "Hydro",
    desc: "Sauna · hammam · cold plunge · relaxation lounge. Move at your own rhythm.",
  },
  {
    name: "Coffee Body Polish",
    duration: "50 min",
    price: "2,800",
    category: "Body",
    desc: "Locally roasted coffee grounds, raw honey, and Rift Valley salt.",
  },
  {
    name: "Mountain Foot Ritual",
    duration: "45 min",
    price: "1,950",
    category: "Body",
    desc: "A short, profound reset for travellers stepping off the long flight.",
  },
  {
    name: "Couples Stillness",
    duration: "120 min",
    price: "9,500",
    category: "Couples",
    desc: "Two basalt renewals, side by side, in our largest treatment suite.",
  },
];

export function SpaPage({ onBook }) {
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(TREATMENTS.map((t) => t.category)))];
  const visible =
    cat === "All" ? TREATMENTS : TREATMENTS.filter((t) => t.category === cat);

  return (
    <div className="page-enter page-enter-active">
      <section
        data-screen-label="04 Spa Hero"
        className="relative h-[70vh] md:h-[85vh] bg-navy text-cream flex items-end overflow-hidden"
      >
        <Placeholder
          tone="dark"
          aspect="auto"
          label="Spa · Reflection pool corridor"
          caption="Calm corridor with shallow reflection pool and pale stone walls."
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
          <Kicker className="!text-gold-soft mb-5">The Spa</Kicker>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.0] tracking-[-0.02em] max-w-3xl">
            A return to <em className="italic text-gold-soft">equilibrium.</em>
          </h1>
          <p className="mt-7 max-w-lg text-cream/80 leading-relaxed">
            Six treatment rooms, a basalt-heated hammam, a cold plunge cut from a
            single block of stone — and therapists trained over two slow years.
          </p>
        </div>
      </section>

      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <Kicker>Menu</Kicker>
            <h2 className="font-serif text-3xl md:text-5xl text-navy mt-5 leading-[1.05]">
              Treatments &amp; rituals.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-2 border transition-colors ${
                  cat === c
                    ? "bg-navy text-cream border-navy"
                    : "border-line text-charcoal/70 hover:border-navy"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul className="border-t border-line">
          {visible.map((t) => (
            <li
              key={t.name}
              className="grid grid-cols-12 gap-4 md:gap-8 items-start py-7 border-b border-line group"
            >
              <div className="col-span-12 md:col-span-1 font-mono text-[10px] uppercase tracking-[0.25em] text-gold pt-1">
                {t.category}
              </div>
              <div className="col-span-12 md:col-span-6">
                <h3 className="font-serif text-2xl md:text-3xl text-navy group-hover:text-gold transition-colors">
                  {t.name}
                </h3>
                <p className="mt-2 text-sm text-charcoal/70 leading-relaxed max-w-xl">
                  {t.desc}
                </p>
              </div>
              <div className="col-span-6 md:col-span-2 font-mono text-[11px] uppercase tracking-[0.2em] text-charcoal/60 pt-1">
                {t.duration}
              </div>
              <div className="col-span-6 md:col-span-2 md:text-right">
                <div className="font-serif text-2xl text-navy">
                  {t.price}{" "}
                  <span className="font-mono text-[10px] text-gold uppercase tracking-[0.2em]">
                    ETB
                  </span>
                </div>
              </div>
              <div className="col-span-12 md:col-span-1 md:text-right">
                <button
                  onClick={() =>
                    onBook({ type: "spa", item: `${t.name} — ${t.price} ETB` })
                  }
                  className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/70 border-b border-charcoal/30 hover:text-gold hover:border-gold pb-1"
                >
                  Book
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="density-sect bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <Placeholder
              aspect="4/5"
              label="Hammam · Stone benches"
              caption="Warmly lit hammam with travertine benches and a domed ceiling."
            />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Kicker>The Hammam</Kicker>
            <h2 className="font-serif text-3xl md:text-5xl text-navy mt-5 leading-[1.05]">
              Heat, water, breath.
            </h2>
            <p className="mt-5 text-charcoal/75 leading-relaxed">
              Half a day in our hammam moves like a quiet liturgy — warm room, hot
              room, cold plunge, mint tea on the long bench. No clocks. Slippers
              handed to you in cream linen.
            </p>
            <CTA
              variant="solid"
              className="mt-7"
              onClick={() =>
                onBook({ type: "spa", item: "Thermal Circuit — 1,800 ETB" })
              }
            >
              Reserve a circuit
            </CTA>
          </div>
        </div>
      </section>

      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <Kicker className="justify-center mb-5">Hours</Kicker>
        <p className="font-serif text-3xl md:text-5xl text-navy leading-tight max-w-2xl mx-auto">
          Daily — 9:00 AM until 9:00 PM. Reservations recommended; walk-ins welcome
          when the room is quiet.
        </p>
        <CTA
          variant="ghost"
          className="mt-10"
          onClick={() => onBook({ type: "spa" })}
        >
          Reserve a treatment →
        </CTA>
      </section>
    </div>
  );
}
