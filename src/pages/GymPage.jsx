import {
  CTA,
  Kicker,
  Placeholder,
  SectionHead,
} from "../components/primitives";

export function GymPage({ onBook }) {
  return (
    <div className="page-enter page-enter-active">
      <section
        data-screen-label="05 Gym Hero"
        className="relative h-[70vh] md:h-[85vh] bg-navy text-cream flex items-end overflow-hidden"
      >
        <Placeholder
          tone="dark"
          aspect="auto"
          label="Fitness · Equipment with city light"
          caption="Wide shot of empty Technogym floor with morning light."
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
          <Kicker className="!text-gold-soft mb-5">Fitness</Kicker>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.0] tracking-[-0.02em] max-w-3xl">
            Elevate your <em className="italic text-gold-soft">energy.</em>
          </h1>
          <p className="mt-7 max-w-lg text-cream/80 leading-relaxed">
            A 24-hour Technogym studio, a 25-metre indoor lap pool, and a small
            daylit yoga room for dawn classes. Quiet, generously spaced, and never
            crowded.
          </p>
        </div>
      </section>

      <section className="density-sect max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-32 md:space-y-40">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 md:col-start-2">
            <Kicker>The Studio</Kicker>
            <h2 className="font-serif text-3xl md:text-5xl text-navy mt-5 leading-[1.05]">
              24-hour Technogym studio.
            </h2>
            <p className="mt-5 text-charcoal/75 leading-relaxed">
              Full strength and cardio range — Skillrun treadmills, Excite cardio,
              Kinesis dual-cable stations, and a small free-weight room facing the
              garden. Personal training by appointment.
            </p>
            <CTA
              variant="link"
              className="mt-6"
              onClick={() =>
                onBook({ type: "gym", item: "Day Pass — 2,500 ETB" })
              }
            >
              Reserve equipment →
            </CTA>
          </div>
          <div className="md:col-span-6">
            <Placeholder
              aspect="4/3"
              label="Studio · Free weight room"
              caption="Matte black dumbbells racked along a wood wall."
            />
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 md:order-2">
            <Placeholder
              aspect="4/3"
              label="Pool · 25m lap pool"
              caption="Long indoor lap pool, mosaic floor, soft daylight from clerestory."
            />
          </div>
          <div className="md:col-span-4 md:col-start-1 md:order-1">
            <Kicker>The Pool</Kicker>
            <h2 className="font-serif text-3xl md:text-5xl text-navy mt-5 leading-[1.05]">
              A 25-metre lap pool.
            </h2>
            <p className="mt-5 text-charcoal/75 leading-relaxed">
              Five lanes, temperature controlled to 28°C. Lane reservations
              available at the half-hour. A bath of unhurried light, even at noon.
            </p>
          </div>
        </div>
      </section>

      <section className="density-sect bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <SectionHead
            kicker="Access"
            title="Membership and day pass."
            intro="Open to hotel guests and to a small cohort of city members. We cap memberships to keep the room quiet."
          />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <PricingCard
              tier="Guest"
              price="Included"
              note="For all in-house guests."
              perks={[
                "Unlimited 24-hour access",
                "Pool & yoga classes",
                "Towel service",
                "One spa welcome treatment",
              ]}
              cta={null}
            />
            <PricingCard
              tier="Day Pass"
              price="2,500 ETB"
              note="A single day, 6 AM – 10 PM."
              perks={[
                "Gym, pool, sauna, steam",
                "Towel & locker",
                "Smoothie at the wellness bar",
                "Discount on spa walk-ins",
              ]}
              cta={() => onBook({ type: "gym", item: "Day Pass — 2,500 ETB" })}
              ctaLabel="Reserve a day"
              accent
            />
            <PricingCard
              tier="Monthly"
              price="35,000 ETB"
              note="Capped at 80 active members."
              perks={[
                "Unlimited 24-hour access",
                "2 PT sessions / month",
                "10% off spa",
                "Guest pass once a month",
              ]}
              cta={() =>
                onBook({
                  type: "gym",
                  item: "Monthly Membership — 35,000 ETB",
                })
              }
              ctaLabel="Apply"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function PricingCard({ tier, price, note, perks, cta, ctaLabel, accent = false }) {
  return (
    <div
      className={`p-8 md:p-10 border ${
        accent ? "bg-navy text-cream border-navy" : "bg-cream border-line"
      }`}
    >
      <Kicker className={accent ? "!text-gold-soft" : ""}>{tier}</Kicker>
      <div className="mt-6">
        <div className="font-serif text-4xl md:text-5xl tracking-[-0.01em]">
          {price}
        </div>
        <div
          className={`mt-2 text-sm ${
            accent ? "text-cream/70" : "text-charcoal/70"
          }`}
        >
          {note}
        </div>
      </div>
      <ul
        className={`mt-6 pt-6 border-t ${
          accent ? "border-cream/20" : "border-line"
        } space-y-3 text-sm`}
      >
        {perks.map((p) => (
          <li key={p} className="flex gap-3">
            <span
              className={`material-symbols-outlined text-[16px] ${
                accent ? "text-gold-soft" : "text-gold"
              }`}
            >
              check_small
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      {cta && (
        <div className="mt-8">
          <CTA variant={accent ? "gold" : "ghost"} onClick={cta}>
            {ctaLabel || "Reserve"}
          </CTA>
        </div>
      )}
    </div>
  );
}
