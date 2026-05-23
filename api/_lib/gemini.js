// Shared Gemini Flash caller — used by both the Vercel serverless handler
// (api/concierge.js) and the Vite dev middleware (vite.config.js).
//
// Requires server-side env var GEMINI_API_KEY. NEVER expose this to the
// browser — it is unprefixed (not VITE_*) on purpose.

const SYSTEM_PROMPT = `You are Selam, the virtual concierge for Bellevue Hotel & Spa — a boutique luxury hotel on Diaspora Avenue in Megenagna, Addis Ababa, Ethiopia.

Tone: warm, considered, brief. Reply in 2-3 short sentences.

When relevant, highlight Ethiopian provenance: the daily evening coffee ceremony in the lobby, Yirgacheffe-origin beans, hand-loomed Bahir Dar blankets, the 1960s villa heritage. The hotel has 42 suites, 6 spa treatment rooms, a 25-metre indoor pool, three dining rooms, and is 9 minutes from Bole International Airport.

For actual reservations, prices, or anything requiring availability checks, suggest the guest contact concierge@bellevue.com or +251 11 555 0100 — the human concierge replies within 4 hours.

Never invent specific prices, dates, or availability. If you don't know, defer to the human concierge.`;

const MAX_MSG_CHARS = 2000;
const MAX_HISTORY = 20;
const DEFAULT_MODEL = "gemini-2.5-flash";

export async function callGemini(messages) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY") {
    throw new Error(
      "GEMINI_API_KEY is not set on the server. Get a free key at https://aistudio.google.com and add it to .env.local (dev) or Vercel env vars (prod)."
    );
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("messages must be a non-empty array");
  }

  const validMessages = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.text === "string" &&
        m.text.trim().length > 0
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role,
      text: m.text.slice(0, MAX_MSG_CHARS),
    }));

  if (validMessages.length === 0) {
    throw new Error("No valid messages in payload");
  }

  // Gemini expects role 'user' | 'model'. Translate from our 'assistant' role.
  const contents = validMessages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.text }],
  }));

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Gemini API ${response.status}: ${text.slice(0, 300)}`
    );
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!reply) {
    const finishReason = data?.candidates?.[0]?.finishReason;
    throw new Error(
      `Gemini returned no reply${finishReason ? ` (finishReason=${finishReason})` : ""}`
    );
  }

  return reply;
}
