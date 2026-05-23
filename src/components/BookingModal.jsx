import { Fragment, useEffect, useState } from "react";
import { CTA, Field, Kicker } from "./primitives";

export function BookingModal({ open, onClose, prefill, onConfirm }) {
  const today = new Date().toISOString().slice(0, 10);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    type: "rooms",
    item: "",
    checkin: today,
    checkout: "",
    guests: "2 Adults",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setStep(1);
      setErrors({});
      setData((d) => ({ ...d, ...(prefill || {}) }));
    }
  }, [open, prefill]);

  if (!open) return null;

  const isSpa = data.type === "spa";
  const isGym = data.type === "gym";

  const itemOptions = isSpa
    ? [
        "Basalt Renewal — 4,500 ETB",
        "Botanical Facial — 3,200 ETB",
        "Thermal Circuit — 1,800 ETB",
        "Coffee Body Polish — 2,800 ETB",
      ]
    : isGym
    ? [
        "Day Pass — 2,500 ETB",
        "Monthly Membership — 35,000 ETB",
        "Personal Training Session",
        "Pool Lane Reservation",
      ]
    : [
        "Standard Retreat — 5,500 ETB/night",
        "Deluxe Haven — 7,500 ETB/night",
        "Twin Comfort — 6,800 ETB/night",
        "Bellevue Suite — 14,000 ETB/night",
      ];

  function validate(s) {
    const e = {};
    if (s === 1) {
      if (!data.item) e.item = "Please select an option";
      if (!isSpa && !isGym) {
        if (!data.checkin) e.checkin = "Required";
        if (!data.checkout) e.checkout = "Required";
        if (data.checkin && data.checkout && data.checkout <= data.checkin)
          e.checkout = "Must be after check-in";
      } else if (!data.checkin) {
        e.checkin = "Required";
      }
    }
    if (s === 2) {
      if (!data.name.trim()) e.name = "Required";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email))
        e.email = "Valid email required";
      if (!/^\+?[0-9 ()-]{7,}$/.test(data.phone))
        e.phone = "Valid phone required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validate(step)) setStep(step + 1);
  }
  function submit() {
    if (!validate(2)) return;
    setStep(3);
    onConfirm && onConfirm(data);
  }
  function update(k, v) {
    setData((d) => ({ ...d, [k]: v }));
  }

  const titleByType = {
    rooms: "Reserve a Stay",
    spa: "Reserve a Treatment",
    gym: "Book a Session",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative bg-cream w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl border border-line">
        <div className="px-8 md:px-12 pt-10 pb-6 border-b border-line flex items-start justify-between">
          <div>
            <Kicker>Step {step} of 3</Kicker>
            <h3 className="font-serif text-3xl md:text-4xl text-navy mt-3">
              {titleByType[data.type]}
            </h3>
          </div>
          <button onClick={onClose} className="text-charcoal/70 hover:text-navy">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="px-8 md:px-12 py-8">
          {step === 1 && (
            <div className="space-y-8">
              <div className="flex gap-1 border-b border-line">
                {[
                  { id: "rooms", label: "Suites" },
                  { id: "spa", label: "Spa" },
                  { id: "gym", label: "Fitness" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      update("type", t.id);
                      update("item", "");
                    }}
                    className={`font-mono text-[10px] uppercase tracking-[0.25em] px-4 py-3 -mb-px transition-colors ${
                      data.type === t.id
                        ? "text-navy border-b-2 border-gold"
                        : "text-charcoal/60 hover:text-navy"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <Field label="Select" error={errors.item}>
                <select
                  className="field-line"
                  value={data.item}
                  onChange={(e) => update("item", e.target.value)}
                >
                  <option value="">— Choose an option —</option>
                  {itemOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field
                  label={isSpa || isGym ? "Date" : "Check-in"}
                  error={errors.checkin}
                >
                  <input
                    type="date"
                    min={today}
                    className="field-line"
                    value={data.checkin}
                    onChange={(e) => update("checkin", e.target.value)}
                  />
                </Field>
                {!isSpa && !isGym && (
                  <Field label="Check-out" error={errors.checkout}>
                    <input
                      type="date"
                      min={data.checkin || today}
                      className="field-line"
                      value={data.checkout}
                      onChange={(e) => update("checkout", e.target.value)}
                    />
                  </Field>
                )}
                {(isSpa || isGym) && (
                  <Field label="Preferred time">
                    <input
                      type="time"
                      className="field-line"
                      value={data.time || "10:00"}
                      onChange={(e) => update("time", e.target.value)}
                    />
                  </Field>
                )}
              </div>

              {!isSpa && !isGym && (
                <Field label="Guests">
                  <select
                    className="field-line"
                    value={data.guests}
                    onChange={(e) => update("guests", e.target.value)}
                  >
                    {[
                      "1 Adult",
                      "2 Adults",
                      "2 Adults, 1 Child",
                      "2 Adults, 2 Children",
                      "3 Adults",
                      "4 Adults",
                    ].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <Field label="Full name" error={errors.name}>
                <input
                  type="text"
                  className="field-line"
                  placeholder="As it appears on your ID"
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    className="field-line"
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input
                    type="tel"
                    className="field-line"
                    placeholder="+251 …"
                    value={data.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Special requests (optional)">
                <textarea
                  rows="3"
                  className="field-line resize-none"
                  placeholder="Anniversary, dietary, arrival time…"
                  value={data.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-gold/15 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-gold text-3xl ms-fill">
                  check_circle
                </span>
              </div>
              <h4 className="font-serif text-2xl md:text-3xl text-navy mt-6">
                Request received.
              </h4>
              <p className="mt-3 text-charcoal/70 max-w-md mx-auto text-sm leading-relaxed">
                A confirmation has been sent to{" "}
                <span className="font-mono">{data.email}</span>. Our concierge will
                follow up within 4 hours to finalize your reservation.
              </p>
              <div className="mt-8 mx-auto max-w-sm border border-line p-5 text-left font-mono text-[11px] text-charcoal/80 leading-relaxed">
                <div className="text-gold uppercase tracking-[0.25em] mb-2">
                  Summary
                </div>
                <div>{data.item || "—"}</div>
                <div>
                  {data.checkin}
                  {data.checkout ? ` → ${data.checkout}` : ""}
                  {data.time ? ` · ${data.time}` : ""}
                </div>
                <div>{data.guests}</div>
                <div className="mt-2 text-charcoal/60">
                  Ref · BEL-{Math.floor(Math.random() * 90000 + 10000)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-8 md:px-12 py-6 border-t border-line flex items-center justify-between bg-surface">
          {step < 3 ? (
            <Fragment>
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/70 hover:text-navy"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}
              {step === 1 ? (
                <CTA variant="gold" onClick={next}>
                  Continue →
                </CTA>
              ) : (
                <CTA variant="gold" onClick={submit}>
                  Confirm reservation
                </CTA>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60">
                Thank you.
              </span>
              <CTA variant="ghost" onClick={onClose}>
                Close
              </CTA>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [message, onDone]);
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] toast-in">
      <div className="bg-navy text-cream px-5 py-3 flex items-center gap-3 shadow-2xl border border-gold/40">
        <span className="material-symbols-outlined text-gold ms-fill text-[18px]">
          mark_email_read
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
          {message}
        </span>
      </div>
    </div>
  );
}
