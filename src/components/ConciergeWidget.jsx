import { Fragment, useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "What is your spa known for?",
  "I'd like a Yirgacheffe day trip",
  "Family stay in December — what suits?",
  "Closest airport and transfer time?",
];

const OFFLINE_REPLY =
  "My apologies — I'm momentarily offline. Please email concierge@bellevue.com or call +251 11 555 0100 and one of our team will respond personally within four hours.";

export function ConciergeWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      text: "Good evening — I'm Selam, your virtual concierge. Whether you'd like to plan a stay, ask about our spa, or arrange a dinner reservation, I'm here. How may I help?",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current)
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [msgs, busy]);

  async function send(text) {
    if (busy) return;
    const trimmed = (text || "").trim();
    if (!trimmed) return;
    const nextMsgs = [...msgs, { role: "user", text: trimmed }];
    setMsgs(nextMsgs);
    setDraft("");
    setBusy(true);
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMsgs }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = (data?.reply || "").trim();
      setMsgs((m) => [
        ...m,
        { role: "assistant", text: reply || OFFLINE_REPLY },
      ]);
    } catch (err) {
      console.error("[concierge]", err);
      setMsgs((m) => [...m, { role: "assistant", text: OFFLINE_REPLY }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Fragment>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close concierge" : "Open concierge"}
        className={`fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          open
            ? "bg-navy text-cream rotate-90"
            : "bg-gold text-cream hover:scale-105"
        }`}
      >
        <span className="material-symbols-outlined">
          {open ? "close" : "concierge"}
        </span>
      </button>

      <div
        className={`fixed bottom-24 right-6 z-[69] w-[360px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-cream border border-line shadow-2xl flex flex-col origin-bottom-right transition-all duration-300 ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="px-5 py-4 border-b border-line bg-navy text-cream flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-gold-soft">
              concierge
            </span>
          </div>
          <div className="flex-1">
            <p className="font-serif text-base tracking-[0.18em]">CONCIERGE</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-soft animate-pulse"></span>{" "}
              Online · Selam
            </p>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 no-bar"
        >
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-navy text-cream rounded-2xl rounded-br-sm"
                    : "bg-white border border-line text-charcoal rounded-2xl rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex justify-start">
              <div className="bg-white border border-line rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          )}
        </div>

        {msgs.length <= 1 && !busy && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[11px] text-charcoal/80 bg-white border border-line rounded-full px-3 py-1.5 hover:border-gold hover:text-gold transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="border-t border-line p-3 flex items-center gap-2"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message…"
            disabled={busy}
            className="flex-1 bg-transparent text-sm focus:outline-none px-2 py-2 placeholder:text-muted"
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            className="w-9 h-9 rounded-full bg-gold text-cream flex items-center justify-center disabled:opacity-40 hover:bg-navy transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_upward
            </span>
          </button>
        </form>
      </div>
    </Fragment>
  );
}
