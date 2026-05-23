import { Kicker, Placeholder, Reveal } from "../components/primitives";

const OFFERS = [
  {
    id: "romance",
    name: "The Romance Reverie",
    kicker: "Honeymoon · Anniversary",
    nights: "3 nights",
    from: "$1,840",
    includes: [
      "Suite upgrade on arrival",
      "In-room champagne welcome",
      "Couples spa ritual (90 min)",
      "Private rooftop dinner one evening",
    ],
  },
  {
    id: "longer",
    name: "Stay Three, Pay Two",
    kicker: "Extended stay",
    nights: "3 nights",
    from: "$840",
    includes: [
      "Third night complimentary",
      "Daily breakfast",
      "Late checkout to 16:00",
      "Complimentary laundry & pressing",
    ],
  },
  {
    id: "wellness",
    name: "The Bellevue Reset",
    kicker: "Wellness retreat",
    nights: "5 nights",
    from: "$2,650",
    includes: [
      "Daily 60-min treatment",
      "Personal trainer (3 sessions)",
      "Wellness-led tasting menu",
      "Highland sunrise hike",
    ],
  },
  {
    id: "culture",
    name: "Origins of Coffee",
    kicker: "Cultural immersion",
    nights: "4 nights",
    from: "$2,200",
    includes: [
      "Day trip to a Yirgacheffe estate",
      "Cupping masterclass with the head sommelier",
      "Bellevue coffee blend to take home",
      "Visit to Tomoca roastery",
    ],
  },
  {
    id: "family",
    name: "Family Suite Package",
    kicker: "For families",
    nights: "4 nights",
    from: "$1,920",
    includes: [
      "Adjoining suite at half rate",
      "Children dine free up to age 12",
      "Family swim coaching",
      "Curated city excursions for ages 7+",
    ],
  },
  {
    id: "business",
    name: "The Working Sojourn",
    kicker: "Corporate · Mice",
    nights: "2 nights",
    from: "$1,180",
    includes: [
      "Late check-out to 18:00",
      "Boardroom for 4 hours",
      "Airport sedan transfer",
      "Pressing & laundry",
    ],
  },
];

export function OffersPage({ onBook }) {
  return (
    <div className="page-enter page-enter-active">
      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 max-w-2xl">
          <Kicker>Offers &amp; Packages</Kicker>
          <h1 className="font-serif text-5xl md:text-7xl text-navy mt-4 mb-6 leading-[0.95] tracking-[-0.02em]">
            A few <em className="italic font-normal text-gold">considered ways</em>{" "}
            to stay.
          </h1>
          <p className="text-charcoal/80 text-lg leading-relaxed">
            Curated packages for the way you travel. All bookable directly —
            packages booked through this page receive a complimentary in-room
            amenity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERS.map((o) => (
            <Reveal key={o.id}>
              <article className="bg-cream border border-line p-7 flex flex-col h-full hover:border-gold transition-colors duration-300 group">
                <div className="mb-6 overflow-hidden">
                  <Placeholder
                    label={`${o.name} · placeholder`}
                    caption=""
                    aspect="4/3"
                  />
                </div>
                <div className="flex-1">
                  <Kicker>{o.kicker}</Kicker>
                  <h3 className="font-serif text-2xl text-navy mt-3 mb-3 group-hover:text-gold transition-colors">
                    {o.name}
                  </h3>
                  <ul className="text-sm text-charcoal/75 space-y-2 mb-6">
                    {o.includes.map((i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-gold mt-0.5">✦</span>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-line pt-5 flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                      From · {o.nights}
                    </p>
                    <p className="font-serif text-2xl text-navy">{o.from}</p>
                  </div>
                  <button
                    onClick={() => onBook({ offer: o.name })}
                    className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy border-b border-gold pb-1 hover:text-gold transition-colors"
                  >
                    Reserve →
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
