import { Kicker, Placeholder, Reveal } from "../components/primitives";

const EXPERIENCES = [
  {
    name: "Yirgacheffe Coffee Estate",
    duration: "Full day",
    party: "1–6 guests",
    price: "$340 pp",
    region: "4hr south",
    desc: "A private estate visit with cupping, lunch among the trees, and the chance to roast your own blend.",
  },
  {
    name: "Lalibela by Air",
    duration: "1 day · helicopter",
    party: "2–4 guests",
    price: "$2,800 pp",
    region: "North",
    desc: "Take a private chopper over the highlands to the rock-hewn churches; return to Bellevue by dinner.",
  },
  {
    name: "Highland Horseback",
    duration: "½ day",
    party: "2–6 guests",
    price: "$220 pp",
    region: "Entoto Hills",
    desc: "Ride at altitude through the Entoto Hills, breakfast at a tukul, return for a soak.",
  },
  {
    name: "Mercato Textile Tour",
    duration: "½ day",
    party: "1–4 guests",
    price: "$140 pp",
    region: "Addis",
    desc: "A private guide leads you through Africa's largest open-air market — by appointment, with a tailor visit.",
  },
  {
    name: "Mursi-Clay Spa Ritual",
    duration: "3 hours",
    party: "Solo / couple",
    price: "$320 pp",
    region: "On property",
    desc: "A four-stage ritual using highland clays — exfoliation, wrap, massage, and a final coffee-bean rub.",
  },
  {
    name: "Coffee Ceremony Masterclass",
    duration: "2 hours",
    party: "Up to 8",
    price: "$95 pp",
    region: "On property",
    desc: "Learn the abol, tona, baraka tradition from one of our hosts. Take home a hand-thrown jebena.",
  },
];

export function ExperiencesPage({ onToast }) {
  return (
    <div className="page-enter page-enter-active">
      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 max-w-2xl">
          <Kicker>Experiences</Kicker>
          <h1 className="font-serif text-5xl md:text-7xl text-navy mt-4 mb-6 leading-[0.95] tracking-[-0.02em]">
            What lies <em className="italic font-normal text-gold">beyond the gate.</em>
          </h1>
          <p className="text-charcoal/80 text-lg leading-relaxed">
            Bespoke experiences curated by our concierge. All bookable through the
            in-room tablet, or contact us in advance and we'll have it waiting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {EXPERIENCES.map((x) => (
            <Reveal key={x.name}>
              <article className="grid grid-cols-12 gap-6 bg-cream border border-line p-5 hover:border-gold transition-colors group">
                <div className="col-span-5">
                  <Placeholder label={x.name} caption="" aspect="4/3" />
                </div>
                <div className="col-span-7 flex flex-col">
                  <h3 className="font-serif text-2xl text-navy mb-2 group-hover:text-gold transition-colors">
                    {x.name}
                  </h3>
                  <p className="text-sm text-charcoal/75 leading-relaxed mb-4">
                    {x.desc}
                  </p>
                  <dl className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted grid grid-cols-2 gap-y-1 gap-x-2 mb-4">
                    <dt>Duration</dt>
                    <dd className="text-navy">{x.duration}</dd>
                    <dt>Party</dt>
                    <dd className="text-navy">{x.party}</dd>
                    <dt>Where</dt>
                    <dd className="text-navy">{x.region}</dd>
                    <dt>From</dt>
                    <dd className="text-navy">{x.price}</dd>
                  </dl>
                  <div className="mt-auto">
                    <button
                      onClick={() =>
                        onToast(`Concierge will be in touch about ${x.name}`)
                      }
                      className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy border-b border-gold pb-1 hover:text-gold transition-colors"
                    >
                      Enquire →
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
