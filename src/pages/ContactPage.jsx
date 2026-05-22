import { useState } from "react";
import { CTA, Field, Kicker } from "../components/primitives";
import { StylizedMap } from "../components/StylizedMap";

export function ContactPage({ onToast }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "General inquiry",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!data.name.trim()) er.name = "Required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email))
      er.email = "Valid email required";
    if (!data.message.trim() || data.message.length < 10)
      er.message = "Please share at least a sentence";
    setErrors(er);
    if (Object.keys(er).length === 0) {
      setSubmitted(true);
      onToast && onToast("Inquiry sent — we'll respond within 4 hours.");
    }
  }

  return (
    <div className="page-enter page-enter-active">
      <section
        data-screen-label="06 Contact Hero"
        className="pt-32 md:pt-40 pb-12 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto"
      >
        <Kicker>Contact</Kicker>
        <h1 className="font-serif text-5xl md:text-7xl text-navy mt-5 leading-[1.0] tracking-[-0.02em] max-w-3xl">
          We are <em className="italic text-gold">listening.</em>
        </h1>
        <p className="mt-7 max-w-xl text-charcoal/75 leading-relaxed">
          For reservations, press requests, private events, or just a question —
          write, call, or come to the front door. Our concierge replies within four
          hours.
        </p>
      </section>

      <section className="px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto pb-24">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
          <div className="md:col-span-7">
            {submitted ? (
              <div className="border border-line p-10 bg-cream">
                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center">
                  <span className="material-symbols-outlined ms-fill text-gold">
                    check
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-navy mt-6">
                  Thank you, {data.name.split(" ")[0]}.
                </h3>
                <p className="mt-3 text-charcoal/70 leading-relaxed max-w-md">
                  Your note is with our concierge desk. Expect a personal reply at{" "}
                  <span className="font-mono">{data.email}</span> within four
                  hours.
                </p>
                <CTA
                  variant="ghost"
                  className="mt-8"
                  onClick={() => {
                    setSubmitted(false);
                    setData({
                      name: "",
                      email: "",
                      subject: "General inquiry",
                      message: "",
                    });
                  }}
                >
                  Send another →
                </CTA>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Field label="Your name" error={errors.name}>
                    <input
                      className="field-line"
                      placeholder="Full name"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      className="field-line"
                      placeholder="you@example.com"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                  </Field>
                </div>
                <Field label="Subject">
                  <select
                    className="field-line"
                    value={data.subject}
                    onChange={(e) =>
                      setData({ ...data, subject: e.target.value })
                    }
                  >
                    <option>General inquiry</option>
                    <option>Reservations</option>
                    <option>Private events</option>
                    <option>Press &amp; media</option>
                    <option>Careers</option>
                  </select>
                </Field>
                <Field label="Message" error={errors.message}>
                  <textarea
                    rows="6"
                    className="field-line resize-none"
                    placeholder="Tell us what you're thinking about."
                    value={data.message}
                    onChange={(e) =>
                      setData({ ...data, message: e.target.value })
                    }
                  />
                </Field>
                <CTA variant="gold" as="button" type="submit">
                  Send inquiry →
                </CTA>
              </form>
            )}
          </div>

          <aside className="md:col-span-4 md:col-start-9 space-y-10">
            <InfoBlock
              icon="place"
              title="Address"
              lines={["Diaspora Avenue, Megenagna", "Addis Ababa, Ethiopia"]}
            />
            <InfoBlock
              icon="call"
              title="Telephone"
              lines={["+251 116 676 700", "+251 911 234 567"]}
            />
            <InfoBlock
              icon="mail"
              title="Email"
              lines={["stay@bellevue.et", "press@bellevue.et"]}
            />
            <InfoBlock
              icon="schedule"
              title="Concierge"
              lines={["Open 24 hours", "Replies within 4 hours"]}
            />

            <div className="border border-line p-6 bg-cream">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-3">
                Getting here
              </div>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li className="flex justify-between">
                  <span>From Bole Airport</span>
                  <span className="font-mono">9 min</span>
                </li>
                <li className="flex justify-between">
                  <span>From Meskel Square</span>
                  <span className="font-mono">14 min</span>
                </li>
                <li className="flex justify-between">
                  <span>From Mercato</span>
                  <span className="font-mono">22 min</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-20">
          <StylizedMap />
        </div>
      </section>
    </div>
  );
}

function InfoBlock({ icon, title, lines }) {
  return (
    <div className="flex gap-4">
      <span className="material-symbols-outlined text-gold ms-fill text-[22px] mt-1">
        {icon}
      </span>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60 mb-2">
          {title}
        </div>
        {lines.map((l) => (
          <div key={l} className="text-sm text-charcoal/90 leading-relaxed">
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
