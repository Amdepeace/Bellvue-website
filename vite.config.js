import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { callGemini } from "./api/_lib/gemini.js";

export default defineConfig(({ mode }) => {
  // Surface non-VITE_ env vars (e.g. GEMINI_API_KEY) to the Node dev process
  // so the dev middleware below can read them via process.env.
  // NOTE: only assign when the value is truthy — assigning `undefined` to
  // process.env coerces to the string "undefined", which breaks fallbacks.
  const env = loadEnv(mode, process.cwd(), "");
  if (env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  if (env.GEMINI_MODEL) process.env.GEMINI_MODEL = env.GEMINI_MODEL;

  return {
    plugins: [
      react(),
      {
        // Local-dev shim for the Vercel serverless function in api/concierge.js.
        // In prod, Vercel hosts the same logic at /api/concierge automatically.
        name: "concierge-dev-api",
        configureServer(server) {
          server.middlewares.use(
            "/api/concierge",
            async (req, res, next) => {
              if (req.method !== "POST") return next();
              let body = "";
              req.on("data", (chunk) => {
                body += chunk;
              });
              req.on("end", async () => {
                res.setHeader("Content-Type", "application/json");
                try {
                  const parsed = JSON.parse(body || "{}");
                  const reply = await callGemini(parsed.messages);
                  res.statusCode = 200;
                  res.end(JSON.stringify({ reply }));
                } catch (e) {
                  console.error("[concierge dev]", e);
                  res.statusCode = 500;
                  res.end(
                    JSON.stringify({ error: e?.message || "Internal error" })
                  );
                }
              });
            }
          );
        },
      },
    ],
  };
});
