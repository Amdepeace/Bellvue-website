// Vercel serverless function: POST /api/concierge
// Frontend (src/components/ConciergeWidget.jsx) POSTs { messages: [{role, text}, ...] }
// and gets back { reply: "..." } or { error: "..." }.

import { callGemini } from "./_lib/gemini.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const reply = await callGemini(body.messages);
    return res.status(200).json({ reply });
  } catch (e) {
    console.error("[concierge]", e);
    return res
      .status(500)
      .json({ error: e?.message || "Internal error" });
  }
}
