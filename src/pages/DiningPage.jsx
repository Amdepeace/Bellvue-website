import {
  CTA,
  Kicker,
  Placeholder,
  Reveal,
} from "../components/primitives";

const RESTAURANTS = [
  {
    name: "Megenagna",
    kicker: "Signature restaurant · Dinner only",
    lede: "A 32-cover dining room set behind hand-loomed cotton curtains. Chef Selamawit Demeke's menu draws from the Ethiopian highlands — wat, kitfo, and tibs reimagined for a tasting format, paired with imported and local wines from her late father's cellar.",
    hours: "Tuesday – Sunday · 18:30 – 22:30",
    dress: "Smart elegant · No trainers after 19:00",
    price: "Tasting menus from 4,800 ETB",
    label: "Megenagna · Tasting room",
    caption: "Drop a candlelit interior shot — wood, brass, cotton drapery.",
  },
  {
    name: "The Conservatory",
    kicker: "All-day brasserie · Garden setting",
    lede: "Bellevue's daytime dining room opens onto the south garden. Mediterranean dishes, an excellent breakfast, and the city's most considered coffee programme. Reservations are not required, though encouraged at weekends.",
    hours: "All week · 06:30 – 22:00",
    dress: "Smart casual",
    price: "Mains from 850 ETB",
    label: "Conservatory · Garden brasserie",
    caption: "Plant-filled brasserie, light-flooded, linen-clad tables.",
  },
];

export function DiningPage({ onBook, onToast }) {
  return (
    <div className="page-enter page-enter-active">
      <section
        data-screen-label="Dining Hero"
        className="relative w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden bg-navy text-cream flex items-end"
      >
        <Placeholder
          tone="dark"
          aspect="auto"
          label="Dining hero · candlelit tasting room"
          caption="Drop a wide shot of Megenagna's dining room, dusk, candles only."
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20 pb-14 md:pb-20">
          <Kicker className="!text-gold-soft mb-4">Dining at Bellevue</Kicker>
          <h1 className="font-serif text-[40px] md:text-[72px] leading-[0.95] tracking-[-0.02em] text-cream max-w-3xl">
            Two rooms,
            <br />
            <em className="italic font-normal text-gold-soft">one cellar.</em>
          </h1>
        </div>
      </section>

      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-24 md:space-y-32">
        {RESTAURANTS.map((r, i) => (
          <Reveal key={r.name}>
            <article className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <Placeholder label={r.label} caption={r.caption} aspect="4/3" />
              </div>
              <div className="md:col-span-5">
                <Kicker>{r.kicker}</Kicker>
                <h2 className="font-serif text-4xl md:text-5xl text-navy mt-3 mb-5">
                  {r.name}
                </h2>
                <p className="text-charcoal/85 leading-relaxed mb-6">{r.lede}</p>
                <dl className="space-y-3 text-sm border-t border-line pt-5">
                  <div className="flex justify-between gap-6">
                    <dt className="text-muted uppercase tracking-[0.18em] text-[10px] font-mono">
                      Hours
                    </dt>
                    <dd className="text-navy text-right">{r.hours}</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-muted uppercase tracking-[0.18em] text-[10px] font-mono">
                      Dress
                    </dt>
                    <dd className="text-navy text-right">{r.dress}</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-muted uppercase tracking-[0.18em] text-[10px] font-mono">
                      From
                    </dt>
                    <dd className="text-navy text-right">{r.price}</dd>
                  </div>
                </dl>
                <div className="mt-8 flex gap-3 flex-wrap">
                  <CTA
                    variant="gold"
                    onClick={() => onBook({ restaurant: r.name })}
                  >
                    Reserve a table
                  </CTA>
                  <CTA
                    variant="ghost"
                    onClick={() => onToast(`${r.name} menu — coming soon`)}
                  >
                    View menu
                  </CTA>
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal>
          <div className="bg-cream border border-line p-10 md:p-14 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <Kicker>Coffee ceremony</Kicker>
              <h3 className="font-serif text-3xl md:text-4xl text-navy mt-3 mb-4">
                Each evening at sunset, the lobby.
              </h3>
              <p className="text-charcoal/80 leading-relaxed">
                The ritual lasts forty-five minutes. Beans are roasted, ground, and
                brewed in front of you. Three rounds — abol, tona, baraka — paired
                with frankincense. Complimentary for all in-house guests. Walk-in
                welcome from 18:00.
              </p>
            </div>
            <div className="md:col-span-5">
              <Placeholder
                label="Coffee ceremony"
                caption="Jebena (clay pot) over coals on a bed of green grass."
                aspect="4/3"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
