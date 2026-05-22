import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey || url.includes("YOUR_PROJECT_REF")) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. Copy .env.example to .env.local and fill in your Supabase project values."
  );
}

export const supabase = createClient(url || "http://localhost", anonKey || "anon", {
  auth: { persistSession: true, autoRefreshToken: true },
});
