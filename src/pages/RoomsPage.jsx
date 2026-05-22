import { useState } from "react";
import { CTA, Kicker, Placeholder } from "../components/primitives";

const ROOMS = [
  {
    name: "Standard Retreat",
    size: "32 m²",
    bed: "Queen",
    price: "5,500",
    copy: "A composed, generous room with a writing desk, walk-in shower, and a deep-silled window for reading.",
    features: [
      "Queen premium bed",
      "Walk-in rain shower",
      "Curated mini bar",
      "Nespresso",
      "Free Wi-Fi",
    ],
    imgLabel: "Suite · Standard Retreat",
    imgCaption: "Bed with cream linens, soft morning light, oak nightstand.",
    view: "Courtyard",
  },
  {
    name: "Deluxe Haven",
    size: "42 m²",
    bed: "King",
    price: "7,500",
    copy: "Larger footprint, freestanding tub, and a lounge corner. A favourite for longer business stays.",
    features: [
      "King heritage bed",
      "Freestanding tub",
      "Lounge corner",
      "Private balcony",
      "Nespresso",
    ],
    imgLabel: "Suite · Deluxe Haven",
    imgCaption: "Wide angle of corner room with freestanding tub by window.",
    view: "Garden",
  },
  {
    name: "Twin Comfort",
    size: "38 m²",
    bed: "2 × Twin",
    price: "6,800",
    copy: "Two beds, one room. Designed for friends, siblings, or colleagues who prefer their own pillow.",
    features: [
      "Two twin beds",
      "Shared sitting area",
      "Walk-in shower",
      "Tea station",
      "Free Wi-Fi",
    ],
    imgLabel: "Suite · Twin Comfort",
    imgCaption: "Two beds in parallel, low-slung bench at foot of each.",
    view: "Courtyard",
  },
  {
    name: "Bellevue Suite",
    size: "65 m²",
    bed: "King + Daybed",
    price: "14,000",
    copy: "Our largest suite. Two balconies, a copper soaking tub, and a writing nook lined with a curated library.",
    features: [
      "King + daybed",
      "Copper soaking tub",
      "Two balconies",
      "Writing nook",
      "Curated library",
      "In-room dining",
    ],
    imgLabel: "Suite · Bellevue Suite",
    imgCaption:
      "Corner suite with two balconies and a writing nook in the alcove.",
    view: "Garden + city",
  },
];

export function RoomsPage({ onBook }) {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all"
      ? ROOMS
      : ROOMS.filter((r) => r.bed.toLowerCase().includes(filter));

  return (
    <div className="page-enter page-enter-active">
      <section
        data-screen-label="03 Rooms Hero"
        className="pt-32 md:pt-40 pb-16 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto"
      >
        <Kicker>Suites</Kicker>
        <h1 className="font-serif text-5xl md:text-7xl text-navy mt-5 leading-[1.0] tracking-[-0.02em] max-w-3xl">
          Forty-two rooms.
          <br />
          <em className="italic text-gold">Four temperaments.</em>
        </h1>
        <p className="mt-7 max-w-xl text-charcoal/75 leading-relaxed">
          Every suite is its own composition — but each shares the same hand-loomed
          throws, the same brass door pull, the same morning view of the courtyard
          jacaranda.
        </p>
        <div className="mt-10 flex flex-wrap gap-2 items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60 mr-2">
            Filter
          </span>
          {[
            { id: "all", label: "All four" },
            { id: "queen", label: "Queen" },
            { id: "king", label: "King" },
            { id: "twin", label: "Twin" },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`font-mono text-[10px] uppercase tracking-[0.22em] px-4 py-2 border transition-colors ${
                filter === c.id
                  ? "bg-navy text-cream border-navy"
                  : "border-line text-charcoal/70 hover:border-navy"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <div className="px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto pb-24 space-y-24 md:space-y-32">
        {visible.map((r, i) => (
          <RoomBlock
            key={r.name}
            room={r}
            flip={i % 2 === 1}
            index={i + 1}
            onBook={onBook}
          />
        ))}
      </div>

      <section className="bg-navy text-cream py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <Kicker className="!text-gold-soft mb-6">At a glance</Kicker>
          <h2 className="font-serif text-3xl md:text-5xl mb-10">Compare the four.</h2>
          <div className="overflow-x-auto no-bar">
            <table className="w-full min-w-[720px] font-mono text-[12px] text-cream/85">
              <thead>
                <tr className="border-b border-cream/20">
                  <th className="text-left py-4 font-medium text-cream/60 uppercase tracking-[0.2em]">
                    Suite
                  </th>
                  <th className="text-left py-4 font-medium text-cream/60 uppercase tracking-[0.2em]">
                    Size
                  </th>
                  <th className="text-left py-4 font-medium text-cream/60 uppercase tracking-[0.2em]">
                    Bed
                  </th>
                  <th className="text-left py-4 font-medium text-cream/60 uppercase tracking-[0.2em]">
                    View
                  </th>
                  <th className="text-right py-4 font-medium text-cream/60 uppercase tracking-[0.2em]">
                    From
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROOMS.map((r) => (
                  <tr key={r.name} className="border-b border-cream/10">
                    <td className="py-5 font-serif text-base text-cream">{r.name}</td>
                    <td className="py-5">{r.size}</td>
                    <td className="py-5">{r.bed}</td>
                    <td className="py-5">{r.view}</td>
                    <td className="py-5 text-right text-gold-soft">{r.price} ETB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function RoomBlock({ room, flip, index, onBook }) {
  return (
    <article className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
      <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        <Placeholder
          aspect="4/3"
          label={room.imgLabel}
          caption={room.imgCaption}
        />
      </div>
      <div
        className={`md:col-span-4 ${
          flip ? "md:col-start-2 md:order-1" : "md:col-start-9"
        }`}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-3">
          {String(index).padStart(2, "0")} / 04
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-navy leading-[1.05] tracking-[-0.01em]">
          {room.name}
        </h2>
        <div className="mt-3 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-charcoal/60">
          <span>{room.size}</span>
          <span className="w-1 h-1 bg-gold rounded-full" />
          <span>{room.bed}</span>
        </div>
        <p className="mt-5 text-charcoal/75 leading-relaxed">{room.copy}</p>
        <ul className="mt-6 grid grid-cols-1 gap-2 border-t border-line pt-5">
          {room.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-3 text-sm text-charcoal/80"
            >
              <span className="material-symbols-outlined text-gold text-[16px]">
                check_small
              </span>
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex items-baseline gap-2">
          <span className="font-mono text-[11px] text-gold uppercase tracking-[0.25em]">
            From ETB
          </span>
          <span className="font-serif text-4xl text-navy">{room.price}</span>
          <span className="text-charcoal/60 text-sm">/ night</span>
        </div>
        <div className="mt-6 flex gap-3">
          <CTA
            variant="solid"
            onClick={() =>
              onBook({
                type: "rooms",
                item: `${room.name} — ${room.price} ETB/night`,
              })
            }
          >
            Reserve
          </CTA>
          <CTA variant="link">View suite →</CTA>
        </div>
      </div>
    </article>
  );
}
