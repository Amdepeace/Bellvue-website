import { CTA, Kicker } from "../components/primitives";

const TIERS = [
  {
    name: "Bronze",
    kicker: "1–3 nights / year",
    perks: [
      "Welcome amenity on arrival",
      "Early check-in subject to availability",
      "5% off direct bookings",
    ],
    cta: "Automatic",
  },
  {
    name: "Gold",
    kicker: "4–9 nights / year",
    perks: [
      "Suite upgrade once per year",
      "Daily breakfast for two",
      "Late checkout to 16:00",
      "10% off direct bookings",
    ],
    cta: "Invite-based",
    accent: true,
  },
  {
    name: "Platinum",
    kicker: "10+ nights / year",
    perks: [
      "Suite upgrade every stay (subject to availability)",
      "Private butler on every stay",
      "Guaranteed late checkout to 18:00",
      "Annual two-night gift stay",
      "15% off direct bookings",
    ],
    cta: "Invite-based",
  },
];

export function CirclePage({ onToast }) {
  return (
    <div className="page-enter page-enter-active">
      <section className="density-sect max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Kicker className="justify-center">Founder's Circle</Kicker>
          <h1 className="font-serif text-5xl md:text-6xl text-navy mt-4 mb-6 leading-[0.95] tracking-[-0.02em]">
            A small <em className="italic font-normal text-gold">circle</em> of
            guests.
          </h1>
          <p className="text-charcoal/80 text-lg leading-relaxed">
            Bellevue's loyalty programme is invitation-based above the entry tier.
            We keep it small on purpose — so that our staff, who in many cases have
            been here for two generations, can recognise you on sight.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`border p-8 ${
                t.accent
                  ? "bg-navy text-cream border-navy"
                  : "bg-cream border-line"
              }`}
            >
              <Kicker className={t.accent ? "!text-gold-soft" : ""}>
                {t.kicker}
              </Kicker>
              <h3
                className={`font-serif text-3xl mt-3 mb-6 ${
                  t.accent ? "text-cream" : "text-navy"
                }`}
              >
                {t.name}
              </h3>
              <ul className="space-y-3 text-sm mb-8">
                {t.perks.map((p) => (
                  <li
                    key={p}
                    className={`flex gap-2 ${
                      t.accent ? "text-cream/80" : "text-charcoal/80"
                    }`}
                  >
                    <span className="text-gold mt-0.5">✦</span>
                    {p}
                  </li>
                ))}
              </ul>
              <p
                className={`text-xs font-mono uppercase tracking-[0.2em] ${
                  t.accent ? "text-gold-soft" : "text-muted"
                }`}
              >
                {t.cta}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-cream border border-line p-10 md:p-14 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <Kicker>Wait-list</Kicker>
            <h3 className="font-serif text-3xl md:text-4xl text-navy mt-3 mb-4">
              Join the wait-list.
            </h3>
            <p className="text-charcoal/80 leading-relaxed mb-6">
              We open Founder's Circle on a small number of new memberships each
              season. Leave your name and we'll be in touch.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onToast && onToast("Wait-list confirmed — we'll be in touch.");
            }}
            className="md:col-span-5 flex flex-col gap-4"
          >
            <input
              type="text"
              required
              placeholder="Full name"
              className="field-line"
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="field-line"
            />
            <CTA variant="gold" as="button" type="submit">
              Request invite
            </CTA>
          </form>
        </div>
      </section>
    </div>
  );
}
