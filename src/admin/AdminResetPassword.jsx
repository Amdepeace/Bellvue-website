import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function AdminResetPassword() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("checking"); // checking | ready | done | error
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // When the user arrives via the email link, supabase-js parses the recovery
  // token from the URL hash and emits a PASSWORD_RECOVERY event. We wait for
  // that signal before showing the form.
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setPhase("ready");
    });

    // Also handle the case where the user already has a session from the link
    // (the auto-detect may have fired before we mounted).
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setPhase((p) => (p === "checking" ? "ready" : p));
    });

    // After a short delay, if nothing happened, show an error.
    const t = setTimeout(() => {
      setPhase((p) => {
        if (p === "checking") {
          setError(
            "This password-reset link is invalid or has expired. Request a new one from the sign-in page."
          );
          return "error";
        }
        return p;
      });
    }, 2500);

    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(t);
    };
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setPhase("done");
    setTimeout(() => navigate("/admin/login", { replace: true }), 1800);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined ms-fill text-warm-gold text-3xl">
            hotel_class
          </span>
          <div>
            <h1 className="playfair text-xl text-deep-navy tracking-tight uppercase">
              Bellevue
            </h1>
            <p className="text-[11px] tracking-[0.18em] uppercase text-outline">
              Staff Portal
            </p>
          </div>
        </div>

        {phase === "checking" && (
          <div className="text-outline font-mono text-[11px] uppercase tracking-[0.25em]">
            Validating link…
          </div>
        )}

        {phase === "error" && (
          <div>
            <h2 className="playfair text-headline-lg text-deep-navy mb-3">
              Link invalid
            </h2>
            <p className="text-on-surface-variant text-body-md mb-6">{error}</p>
            <button
              onClick={() => navigate("/admin/login", { replace: true })}
              className="w-full bg-warm-gold text-white text-cta-label uppercase py-3 rounded hover:bg-secondary-fixed-dim"
            >
              Back to sign in
            </button>
          </div>
        )}

        {phase === "ready" && (
          <form onSubmit={onSubmit}>
            <h2 className="playfair text-headline-lg text-deep-navy mb-2">
              Set new password
            </h2>
            <p className="text-on-surface-variant text-body-md mb-8">
              Choose a password you'll remember. Minimum 8 characters.
            </p>

            <label className="block mb-5">
              <span className="text-label-caps text-outline uppercase block mb-1">
                New password
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full bg-surface-container-low border border-outline-variant rounded px-3 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-warm-gold focus:border-warm-gold"
                placeholder="••••••••"
              />
            </label>

            <label className="block mb-6">
              <span className="text-label-caps text-outline uppercase block mb-1">
                Confirm password
              </span>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                className="w-full bg-surface-container-low border border-outline-variant rounded px-3 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-warm-gold focus:border-warm-gold"
                placeholder="••••••••"
              />
            </label>

            {error && (
              <div className="mb-5 px-3 py-2 bg-error-container text-on-error-container text-sm rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-warm-gold text-white text-cta-label uppercase py-3 rounded hover:bg-secondary-fixed-dim disabled:opacity-50"
            >
              {submitting ? "Saving…" : "Update password"}
            </button>
          </form>
        )}

        {phase === "done" && (
          <div>
            <h2 className="playfair text-headline-lg text-deep-navy mb-3">
              Password updated
            </h2>
            <p className="text-on-surface-variant text-body-md">
              Redirecting you to sign in…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
