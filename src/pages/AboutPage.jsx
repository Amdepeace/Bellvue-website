import {
  CTA,
  Kicker,
  Placeholder,
  SectionHead,
} from "../components/primitives";
import { StylizedMap } from "../components/StylizedMap";

const TIMELINE = [
  {
    y: "2021",
    t: "The Geda villa is acquired and surveyed.",
    d: "Architects from Addis and Lisbon begin a year of conversation with the existing building.",
  },
  {
    y: "2022",
    t: "Foundations and the courtyard restoration begin.",
    d: "The original jacaranda — over sixty years old — is encased, protected, and kept.",
  },
  {
    y: "2023",
    t: "First test treatments in the spa.",
    d: "Local therapists begin developing what becomes the Basalt Renewal protocol.",
  },
  {
    y: "2024",
    t: "Soft opening. Six suites only.",
    d: "Eight months of careful adjustment before public reservations open.",
  },
  {
    y: "2025",
    t: "Full opening — forty-two suites, three dining rooms.",
    d: "Bellevue receives its first Condé Nast Hot List nod.",
  },
  {
    y: "2026",
    t: "The Bellevue Suite is added to the corner of the third floor.",
    d: "Our largest space, conceived as a private residence for longer stays.",
  },
];

export function AboutPage({ onNavigate }) {
  return (
    <div className="page-enter page-enter-active">
      <section
        data-screen-label="02 About Hero"
        className="relative h-[60vh] md:h-[78vh] bg-navy text-cream flex items-end overflow-hidden"
      >
        <Placeholder
          tone="dark"
          aspect="auto"
          label="Lobby · Morning light"
          caption="Wide editorial photo of the lobby — marble floor, jacaranda branches, high windows."
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-20 w-full">
          <Kicker className="!text-gold-soft mb-5">Our story</Kicker>
          <h1 className="font-serif text-5xl md:text-7xl text-cream leading-[1.0] tracking-[-0.02em] max-w-3xl">
            Where Ethiopian warmth meets{" "}
            <em className="italic text-gold-soft">elevated stillness.</em>
          </h1>
        </div>
      </section>

      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 md:col-start-2">
            <Kicker>Est. MMXXI</Kicker>
            <h2 className="font-serif text-3xl md:text-5xl text-navy mt-5 leading-[1.05] tracking-[-0.01em]">
              A heritage written quietly.
            </h2>
            <div className="mt-6 space-y-5 text-charcoal/75 leading-relaxed">
              <p>
                Bellevue was built on the bones of a 1960s villa once owned by the
                Geda family — a quiet line of merchants who hosted travellers,
                scholars, and the occasional diplomat at this exact corner of
                Megenagna.
              </p>
              <p>
                We kept the courtyard. We kept the jacaranda. Everything else was
                made new — but in conversation with what was already there. The
                brass door pulls are by a smith in Mercato. The blankets are loomed
                in Bahir Dar. The coffee is roasted by hand, in the lobby, twice
                each morning.
              </p>
            </div>
            <CTA
              variant="link"
              className="mt-7"
              onClick={() => onNavigate("contact")}
            >
              Visit us →
            </CTA>
          </div>
          <div className="md:col-span-5">
            <Placeholder
              aspect="3/4"
              label="Detail · Brass door pull"
              caption="Hand-forged brass detail by a Mercato smith."
            />
          </div>
        </div>
      </section>

      <section className="bg-navy text-cream py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { n: "42", l: "Suites" },
            { n: "6", l: "Treatment rooms" },
            { n: "25m", l: "Indoor lap pool" },
            { n: "9 min", l: "From Bole Airport" },
          ].map((s, i) => (
            <div key={i} className="border-l border-cream/20 pl-6">
              <div className="font-serif text-5xl md:text-6xl text-gold-soft">
                {s.n}
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-cream/70">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <SectionHead
          kicker="Timeline"
          title="Five years, six rooms, and one jacaranda."
        />
        <ol className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {TIMELINE.map((e, i) => (
            <li key={i} className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <div className="font-serif text-3xl text-gold">{e.y}</div>
              </div>
              <div className="col-span-9">
                <h3 className="font-serif text-xl text-navy">{e.t}</h3>
                <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">
                  {e.d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="density-sect bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <Kicker>Location</Kicker>
              <h2 className="font-serif text-3xl md:text-5xl text-navy mt-5 leading-[1.05]">
                Megenagna, quietly.
              </h2>
              <p className="mt-5 text-charcoal/75 leading-relaxed">
                A tree-lined side street off Diaspora Avenue — close enough to walk
                to the National Theatre, far enough to hear the dawn calls only as
                a gentle distant chorus.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-charcoal/80">
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-gold text-[20px]">
                    flight_takeoff
                  </span>
                  <span>9 min from Bole International Airport</span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-gold text-[20px]">
                    museum
                  </span>
                  <span>12 min from the National Museum</span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-gold text-[20px]">
                    coffee
                  </span>
                  <span>4 min walk to Tomoca</span>
                </li>
              </ul>
              <CTA
                variant="solid"
                className="mt-7"
                onClick={() => onNavigate("contact")}
              >
                Get directions →
              </CTA>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <StylizedMap />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
