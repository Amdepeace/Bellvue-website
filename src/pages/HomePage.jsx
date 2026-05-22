import { useState } from "react";
import {
  CTA,
  Field,
  Kicker,
  Placeholder,
  Reveal,
  SectionHead,
} from "../components/primitives";

export function HomePage({ onNavigate, onBook }) {
  return (
    <div className="page-enter page-enter-active">
      <section
        data-screen-label="01 Home Hero"
        className="relative w-full min-h-[88vh] md:min-h-screen overflow-hidden bg-navy text-cream flex items-end"
      >
        <div className="absolute inset-0">
          <div className="hero-zoom w-full h-full">
            <Placeholder
              tone="dark"
              aspect="auto"
              label="Hero · Hotel exterior at dusk"
              caption="Drop a cinematic wide shot of Bellevue's facade glowing at twilight. Lush garden in foreground, deep navy sky."
              className="w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <Kicker className="!text-gold-soft mb-6">Bellevue · Addis Ababa</Kicker>
            <h1 className="font-serif text-[44px] md:text-[88px] leading-[0.95] tracking-[-0.02em] text-cream">
              Timeless hospitality
              <br />
              <em className="italic font-normal text-gold-soft">
                in the heart of Addis.
              </em>
            </h1>
            <p className="mt-8 max-w-lg text-cream/75 text-base leading-relaxed">
              A boutique sanctuary of forty-two suites at Megenagna — nine minutes
              from Bole International. Crafted for the traveller who values
              stillness, ceremony, and considered design.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 items-center">
              <CTA variant="gold" onClick={() => onBook()}>
                Reserve a stay →
              </CTA>
              <CTA variant="ghost-light" onClick={() => onNavigate("rooms")}>
                Explore suites
              </CTA>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex absolute right-8 bottom-24 flex-col items-end gap-3 text-cream/60">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase v-rl">
            N 9°00′ · E 38°45′
          </div>
          <div className="w-px h-16 bg-cream/30" />
        </div>
      </section>

      <section className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 -mt-14 md:-mt-20">
        <BookingWidget onBook={onBook} />
      </section>

      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <Kicker>A note from the house</Kicker>
            <h2 className="font-serif text-3xl md:text-5xl text-navy mt-5 leading-[1.05] tracking-[-0.01em] max-w-2xl">
              We built Bellevue around{" "}
              <em className="italic text-gold">the ceremony of slowing down</em> —
              the morning coffee, the long bath, the quiet read.
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-charcoal/75 leading-relaxed text-[15px]">
              Forty-two suites. One spa. Three dining rooms. A 25-metre indoor
              pool. All set behind a discreet jacaranda-shaded entrance on Diaspora
              Avenue.
            </p>
            <CTA variant="link" onClick={() => onNavigate("about")} className="mt-6">
              Our story →
            </CTA>
          </div>
        </div>
      </section>

      <section className="density-sect bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <SectionHead
            kicker="The Experience"
            title="A house with three doors."
            intro="Each space is its own world — designed independently, then quietly bound by the same restraint and warmth."
          />
          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
            <TeaserCard
              span="md:col-span-7 md:row-span-2"
              kicker="Wellness"
              title="The Spa"
              copy="Six treatment rooms, basalt heat therapy, hammam, ice plunge."
              imgLabel="Spa · Stone treatment room"
              imgCaption="Editorial-style image of a candle-lit spa room with basalt stones and linen drapes."
              tall
              onClick={() => onNavigate("spa")}
            />
            <TeaserCard
              span="md:col-span-5"
              kicker="Cuisine"
              title="Dining"
              copy="Three rooms: the chef's counter, the courtyard, the library bar."
              imgLabel="Dining · Chef's counter"
              imgCaption="Intimate plated dish, low light, golden glassware."
              onClick={() => onNavigate("dining")}
            />
            <TeaserCard
              span="md:col-span-5"
              kicker="Movement"
              title="Fitness"
              copy="24-hour Technogym studio, indoor pool, dawn yoga in the garden."
              imgLabel="Gym · Indoor lap pool"
              imgCaption="25m pool with stone deck and clerestory daylight."
              onClick={() => onNavigate("gym")}
            />
          </div>
        </div>
      </section>

      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Placeholder
              aspect="4/3"
              label="Featured Suite · Bellevue Suite"
              caption="A 65m² corner suite with a freestanding tub, two balconies, and a writing nook."
            />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Kicker>Featured</Kicker>
            <h3 className="font-serif text-3xl md:text-5xl text-navy mt-5 leading-[1.05]">
              The Bellevue Suite
            </h3>
            <p className="mt-5 text-charcoal/75 leading-relaxed">
              Our signature corner suite. Sixty-five square metres facing the
              jacaranda garden. Freestanding copper tub, hand-loomed throws, a
              small library curated quarterly.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/70 border-y border-line py-5">
              <div>65 m²</div>
              <div>King bed</div>
              <div>2 balconies</div>
              <div>Copper tub</div>
            </div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-mono text-[11px] text-gold uppercase tracking-[0.25em]">
                ETB
              </span>
              <span className="font-serif text-4xl text-navy">14,000</span>
              <span className="text-charcoal/60 text-sm">/ night</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <CTA
                variant="solid"
                onClick={() =>
                  onBook({
                    type: "rooms",
                    item: "Bellevue Suite — 14,000 ETB/night",
                  })
                }
              >
                Reserve
              </CTA>
              <CTA variant="link" onClick={() => onNavigate("rooms")}>
                All suites →
              </CTA>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-10 flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/60">
            As featured in
          </span>
          <div className="flex flex-wrap gap-x-12 gap-y-3 items-center">
            {["CONDÉ NAST", "MONOCLE", "T MAGAZINE", "AFAR", "FINANCIAL TIMES"].map(
              (p) => (
                <span
                  key={p}
                  className="font-serif italic text-charcoal/50 text-lg tracking-wide"
                >
                  {p}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <Reveal>
          <Kicker className="justify-center mb-6">From the guestbook</Kicker>
          <blockquote className="font-serif text-2xl md:text-4xl text-navy leading-[1.25] max-w-3xl mx-auto">
            "There is an unhurried generosity to the place — the way coffee
            arrives, the way the light moves through the corridor at four
            o'clock."
          </blockquote>
          <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/60">
            Hana T. <span className="dot" /> Berlin <span className="dot" /> Stayed
            March 2026
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function BookingWidget({ onBook }) {
  const today = new Date().toISOString().slice(0, 10);
  const [d, setD] = useState({
    checkin: today,
    checkout: "",
    guests: "2 Adults",
  });
  return (
    <div className="bg-cream border border-line shadow-xl p-5 md:p-7 grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-8 items-end">
      <Field label="Check-in">
        <input
          type="date"
          min={today}
          className="field-line"
          value={d.checkin}
          onChange={(e) => setD({ ...d, checkin: e.target.value })}
        />
      </Field>
      <Field label="Check-out">
        <input
          type="date"
          min={d.checkin}
          className="field-line"
          value={d.checkout}
          onChange={(e) => setD({ ...d, checkout: e.target.value })}
        />
      </Field>
      <Field label="Guests">
        <select
          className="field-line"
          value={d.guests}
          onChange={(e) => setD({ ...d, guests: e.target.value })}
        >
          {["1 Adult", "2 Adults", "2 Adults, 1 Child", "3 Adults", "4 Adults"].map(
            (o) => (
              <option key={o}>{o}</option>
            )
          )}
        </select>
      </Field>
      <Field label="Suite type">
        <select className="field-line" defaultValue="">
          <option value="">Any</option>
          <option>Standard Retreat</option>
          <option>Deluxe Haven</option>
          <option>Twin Comfort</option>
          <option>Bellevue Suite</option>
        </select>
      </Field>
      <div className="md:pl-4 md:border-l md:border-line">
        <CTA
          variant="gold"
          className="w-full"
          onClick={() =>
            onBook({
              type: "rooms",
              checkin: d.checkin,
              checkout: d.checkout,
              guests: d.guests,
            })
          }
        >
          Check →
        </CTA>
      </div>
    </div>
  );
}

function TeaserCard({
  kicker,
  title,
  copy,
  imgLabel,
  imgCaption,
  onClick,
  span = "",
  tall = false,
}) {
  return (
    <button onClick={onClick} className={`group text-left ${span} flex flex-col`}>
      <div className="relative w-full overflow-hidden">
        <div className="transition-transform duration-700 group-hover:scale-[1.02]">
          <Placeholder
            aspect={tall ? "3/4" : "4/3"}
            label={imgLabel}
            caption={imgCaption}
          />
        </div>
        <div className="absolute top-4 right-4 w-9 h-9 bg-cream/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-navy text-[18px]">
            arrow_outward
          </span>
        </div>
      </div>
      <div className="pt-5">
        <Kicker>{kicker}</Kicker>
        <h3 className="font-serif text-2xl md:text-3xl text-navy mt-3 group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-charcoal/70 max-w-sm">{copy}</p>
      </div>
    </button>
  );
}
