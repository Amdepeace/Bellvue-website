import { useState } from "react";
import {
  CTA,
  Kicker,
  Placeholder,
  Reveal,
} from "../components/primitives";

const VENUES = [
  {
    id: "conservatory",
    kicker: "The Conservatory · Private Dining",
    name: "Private buyouts & gala dinners",
    lede: "Bellevue's all-day brasserie can be taken in its entirety for private dining. Glass walls open onto the south garden, and a separate kitchen pass lets us serve a tasting menu of up to nine courses for as many as eighty.",
    img: "venue-conservatory",
    caption: "Linen-clad tables, light-flooded room, garden views.",
    capacities: [
      { label: "Banquet (round tables)", value: "80" },
      { label: "Long table (one banquet)", value: "32" },
      { label: "Standing reception", value: "120" },
      { label: "Tasting menu (chef-led)", value: "24" },
    ],
    features: [
      "Wine cellar with 1,400 references",
      "Direct access to south garden for aperitifs",
      "Private entrance via the porte-cochère",
      "Two semi-private alcoves available",
    ],
    pricing: "From $4,200 venue fee · F&B minimums apply",
  },
  {
    id: "boardroom",
    kicker: "The Board Room · Executive",
    name: "Closed-door meetings, the old way",
    lede: "A single rectangular table in solid African olive, twelve seats, leather-bound chairs, and one assistant on call. No video conferencing screen — by design. For when the meeting matters too much to be on camera.",
    img: "venue-boardroom",
    caption: "Olive-wood table, brass sconces, single window.",
    capacities: [
      { label: "Boardroom (around table)", value: "12" },
      { label: "Theatre style", value: "20" },
      { label: "U-shape", value: "14" },
      { label: "Private dining", value: "10" },
    ],
    features: [
      "Soundproofed walls (Stc 55 acoustic glass)",
      "Confidentiality agreements offered to staff on request",
      "Twin secure document safes",
      "Dedicated catering pantry; coffee service on the hour",
    ],
    pricing: "From $850 / day · Half-day from $480",
  },
  {
    id: "hall",
    kicker: "The Highland Hall · Conference",
    name: "Bellevue's largest gathering space",
    lede: "A pillarless, 280-square-metre hall on the ground floor with a separate foyer for registration. Designed for symposiums, product launches, and weddings of up to two hundred. Acoustically treated and rigged with a permanent stage and full AV.",
    img: "venue-hall",
    caption: "Pillarless hall, vaulted ceiling, neutral palette.",
    capacities: [
      { label: "Theatre", value: "200" },
      { label: "Classroom", value: "120" },
      { label: "Banquet (rounds of 8)", value: "144" },
      { label: "Reception (standing)", value: "240" },
    ],
    features: [
      "Permanent stage, lectern, and 12-person panel desk",
      "4K projector, dual LED walls, and 32-channel mixing desk",
      "Simultaneous interpretation booths (up to 4 languages)",
      "Separate breakout suites adjoining the foyer",
    ],
    pricing: "From $3,600 / day · Discounted for multi-day",
  },
];

const STATS = [
  { n: 240, l: "Maximum capacity" },
  { n: 3, l: "Distinct venues" },
  { n: 4, l: "Languages of simultaneous interpretation" },
  { n: 1, l: "Dedicated events manager per booking" },
];

const TECH = [
  { i: "videocam", t: "4K Recording", s: "Multi-cam capture in-house" },
  { i: "podcasts", t: "Audio", s: "32-channel mixer, lapels for 8" },
  { i: "language", t: "Interpretation", s: "Up to 4 simultaneous booths" },
  { i: "wifi", t: "Bandwidth", s: "1 Gbps symmetrical · failover" },
  {
    i: "broadcast_on_home",
    t: "Hybrid",
    s: "Zoom / Teams broadcast bridge",
  },
  { i: "lightbulb", t: "Lighting", s: "DMX rig, two operators on call" },
];

const PAST_EVENTS = [
  {
    y: "2023",
    t: "East Africa Coffee Summit",
    n: "180 delegates · 3 days · Highland Hall",
    img: "event-coffee-summit",
  },
  {
    y: "2023",
    t: "Embassy Reception",
    n: "95 guests · Gala dinner · Conservatory",
    img: "event-embassy-reception",
  },
  {
    y: "2022",
    t: "Family Office Conclave",
    n: "22 principals · 2 days · Board Room",
    img: "event-family-office",
  },
  {
    y: "2022",
    t: "Tech Africa Founders Day",
    n: "160 delegates · Single day · Hall",
    img: "event-tech-africa",
  },
  {
    y: "2022",
    t: "Yohannes Family Wedding",
    n: "220 guests · Full property buyout",
    img: "event-wedding",
  },
  {
    y: "2021",
    t: "NGO Strategy Retreat",
    n: "40 leaders · 4 days · Hall + Board Room",
    img: "event-ngo-retreat",
  },
];

export function VenuesPage({ onToast }) {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    date: "",
    attendees: "",
    venue: "",
    notes: "",
  });

  function submit(e) {
    e.preventDefault();
    if (!contact.name || !contact.email) return;
    onToast &&
      onToast("Enquiry received — our events team will respond within 4 hours.");
    setContact({
      name: "",
      email: "",
      date: "",
      attendees: "",
      venue: "",
      notes: "",
    });
  }

  return (
    <div className="page-enter page-enter-active">
      <section
        data-screen-label="Venues Hero"
        className="relative w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden bg-navy text-cream flex items-end"
      >
        <Placeholder
          tone="dark"
          aspect="auto"
          label="venues-hero-event-setup"
          caption="Drop a wide shot of the Hall at twilight — tables set for a gala."
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20 pb-14 md:pb-20">
          <Kicker className="!text-gold-soft mb-4">Meetings &amp; Events</Kicker>
          <h1 className="font-serif text-[40px] md:text-[72px] leading-[0.95] tracking-[-0.02em] text-cream max-w-3xl">
            Three rooms,
            <br />
            <em className="italic font-normal text-gold-soft">
              one quiet address.
            </em>
          </h1>
          <p className="mt-6 max-w-xl text-cream/75 leading-relaxed">
            From an eight-person board meeting to a two-hundred-person symposium —
            Bellevue's event spaces are managed by a single dedicated team and
            tuned for discretion.
          </p>
        </div>
      </section>

      <section className="bg-cream border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-10 grid md:grid-cols-4 gap-8 md:gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="border-l border-line pl-4 md:pl-6">
              <p className="font-serif text-3xl md:text-4xl text-navy mb-1">
                {s.n}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted leading-relaxed">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-24 md:space-y-32">
        {VENUES.map((v, i) => (
          <Reveal key={v.id}>
            <article
              id={v.id}
              className="grid md:grid-cols-12 gap-8 md:gap-12 items-start"
            >
              <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <Placeholder label={v.img} caption={v.caption} aspect="4/3" />
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {[1, 2, 3].map((n) => (
                    <Placeholder
                      key={n}
                      label={`${v.img}-${n}`}
                      caption=""
                      aspect="4/3"
                    />
                  ))}
                </div>
              </div>

              <div className="md:col-span-5">
                <Kicker>{v.kicker}</Kicker>
                <h2 className="font-serif text-3xl md:text-4xl text-navy mt-3 mb-5 leading-[1.05]">
                  {v.name}
                </h2>
                <p className="text-charcoal/85 leading-relaxed mb-8">{v.lede}</p>

                <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                  Capacity
                </h3>
                <dl className="grid grid-cols-2 gap-y-3 gap-x-6 mb-8 pb-8 border-b border-line">
                  {v.capacities.map((c) => (
                    <div
                      key={c.label}
                      className="flex justify-between gap-2 items-baseline"
                    >
                      <dt className="text-sm text-charcoal/80">{c.label}</dt>
                      <dd className="font-serif text-2xl text-navy">{c.value}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                  Features
                </h3>
                <ul className="space-y-2 mb-8">
                  {v.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-charcoal/85">
                      <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-line flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                      Investment
                    </p>
                    <p className="text-navy text-sm">{v.pricing}</p>
                  </div>
                  <button
                    onClick={() => {
                      setContact((c) => ({ ...c, venue: v.name }));
                      document
                        .getElementById("venue-enquire")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy border-b border-gold pb-1 hover:text-gold transition-colors"
                  >
                    Enquire →
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="bg-navy text-cream/85 py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <Kicker className="!text-gold-soft">Tech &amp; AV</Kicker>
            <h2 className="font-serif text-3xl md:text-4xl text-cream mt-3 mb-5 leading-[1.05]">
              Production-grade
              <br />
              <em className="italic text-gold-soft">without the production</em>.
            </h2>
            <p className="text-cream/70 leading-relaxed">
              Every space carries a permanent technical fit-out — projection,
              audio, lighting, and connectivity — so your team arrives with a
              laptop, not a flight case. Hybrid streaming, live captioning, and
              simultaneous interpretation are available on request.
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-3">
            {TECH.map((x) => (
              <div key={x.t} className="border border-cream/15 p-5">
                <span className="material-symbols-outlined text-gold-soft mb-3 block">
                  {x.i}
                </span>
                <p className="font-serif text-lg text-cream">{x.t}</p>
                <p className="text-cream/60 text-xs mt-1 leading-relaxed">{x.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <Reveal>
          <Kicker>Recent</Kicker>
          <h2 className="font-serif text-3xl md:text-5xl text-navy mt-3 mb-12 leading-[1.05]">
            A selection of events{" "}
            <em className="italic font-normal text-gold">we've hosted.</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {PAST_EVENTS.map((ev) => (
            <Reveal key={ev.t}>
              <article className="group">
                <div className="mb-4 overflow-hidden">
                  <Placeholder
                    label={ev.img}
                    caption=""
                    aspect="4/3"
                    className="group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-1">
                  {ev.y}
                </p>
                <h3 className="font-serif text-xl text-navy mb-1 group-hover:text-gold transition-colors">
                  {ev.t}
                </h3>
                <p className="text-sm text-muted">{ev.n}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="venue-enquire"
        className="bg-cream border-y border-line py-20 md:py-28"
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <Kicker>Plan with us</Kicker>
            <h2 className="font-serif text-3xl md:text-4xl text-navy mt-3 mb-5 leading-[1.05]">
              Tell us what you're planning.
            </h2>
            <p className="text-charcoal/80 leading-relaxed mb-6">
              Send us the broad strokes — date, attendees, type of event — and our
              events team will respond with a tailored proposal within four working
              hours. Site visits welcomed.
            </p>
            <dl className="space-y-3 text-sm border-t border-line pt-5">
              <div className="flex justify-between">
                <dt className="text-muted uppercase tracking-[0.18em] text-[10px] font-mono">
                  Events Team
                </dt>
                <dd className="text-navy">events@bellevue.com</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted uppercase tracking-[0.18em] text-[10px] font-mono">
                  Direct
                </dt>
                <dd className="text-navy">+251 11 555 0142</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted uppercase tracking-[0.18em] text-[10px] font-mono">
                  Site visits
                </dt>
                <dd className="text-navy">By appointment</dd>
              </div>
            </dl>
          </div>

          <form
            onSubmit={submit}
            className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
          >
            <div className="sm:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
                Your name
              </label>
              <input
                type="text"
                required
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="field-line"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                className="field-line"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
                Event date
              </label>
              <input
                type="date"
                value={contact.date}
                onChange={(e) => setContact({ ...contact, date: e.target.value })}
                className="field-line"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
                Attendees
              </label>
              <input
                type="number"
                min="1"
                value={contact.attendees}
                onChange={(e) =>
                  setContact({ ...contact, attendees: e.target.value })
                }
                className="field-line"
                placeholder="Approx."
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
                Venue of interest
              </label>
              <select
                value={contact.venue}
                onChange={(e) =>
                  setContact({ ...contact, venue: e.target.value })
                }
                className="field-line"
              >
                <option value="">No preference</option>
                <option>The Conservatory</option>
                <option>The Board Room</option>
                <option>The Highland Hall</option>
                <option>Full property buyout</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
                Tell us more
              </label>
              <textarea
                rows="4"
                value={contact.notes}
                onChange={(e) =>
                  setContact({ ...contact, notes: e.target.value })
                }
                className="field-line resize-none"
                placeholder="Type of event, AV needs, dietary considerations…"
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-4 pt-2">
              <CTA variant="gold" as="button" type="submit">
                Send enquiry →
              </CTA>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                We respond within 4 hours.
              </span>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
