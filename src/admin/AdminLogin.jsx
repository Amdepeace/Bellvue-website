import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

export function AdminLogin() {
  const { user, signIn, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin"); // signin | reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  if (loading) return null;
  if (user) {
    const to = location.state?.from?.pathname || "/admin/bookings";
    return <Navigate to={to} replace />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    const to = location.state?.from?.pathname || "/admin/bookings";
    navigate(to, { replace: true });
  }

  async function onResetSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setResetSent(true);
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background">
      <div className="hidden md:flex flex-col justify-between bg-deep-navy text-warm-gold p-12">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined ms-fill text-warm-gold text-4xl">
            hotel_class
          </span>
          <div>
            <h1 className="playfair text-3xl tracking-tight uppercase">Bellevue</h1>
            <p className="text-[11px] tracking-[0.18em] uppercase opacity-70">
              Staff Portal
            </p>
          </div>
        </div>
        <blockquote className="playfair text-2xl text-cream/85 leading-relaxed max-w-md">
          "There is an unhurried generosity to the place — the way coffee arrives,
          the way the light moves through the corridor at four o'clock."
        </blockquote>
        <p className="text-[11px] tracking-[0.25em] uppercase opacity-60">
          Management Console · v0.1
        </p>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {mode === "signin" ? (
            <form onSubmit={onSubmit}>
              <h2 className="playfair text-headline-lg text-deep-navy mb-2">
                Sign in
              </h2>
              <p className="text-on-surface-variant text-body-md mb-8">
                Use your Bellevue staff credentials.
              </p>

              <label className="block mb-5">
                <span className="text-label-caps text-outline uppercase block mb-1">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-3 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-warm-gold focus:border-warm-gold"
                  placeholder="you@bellevue.com"
                />
              </label>

              <label className="block mb-6">
                <span className="text-label-caps text-outline uppercase block mb-1">
                  Password
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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
                className="w-full bg-warm-gold text-white text-cta-label uppercase py-3 rounded hover:bg-secondary-fixed-dim transition-colors disabled:opacity-50"
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("reset");
                  setError("");
                  setResetSent(false);
                }}
                className="block mx-auto mt-5 text-cta-label uppercase text-warm-gold hover:text-deep-navy"
              >
                Forgot password?
              </button>

              <p className="text-[11px] text-outline mt-6 leading-relaxed">
                Staff accounts are created in Supabase Auth and authorised via the{" "}
                <code className="font-mono">staff_roles</code> table.
              </p>
            </form>
          ) : resetSent ? (
            <div>
              <h2 className="playfair text-headline-lg text-deep-navy mb-2">
                Check your inbox
              </h2>
              <p className="text-on-surface-variant text-body-md mb-8">
                If an account exists for{" "}
                <span className="font-medium text-on-surface">{email}</span>,
                we've sent a password-reset link. Click it from your inbox to set
                a new password.
              </p>
              <button
                onClick={() => {
                  setMode("signin");
                  setResetSent(false);
                  setError("");
                }}
                className="w-full bg-warm-gold text-white text-cta-label uppercase py-3 rounded hover:bg-secondary-fixed-dim"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <form onSubmit={onResetSubmit}>
              <h2 className="playfair text-headline-lg text-deep-navy mb-2">
                Reset password
              </h2>
              <p className="text-on-surface-variant text-body-md mb-8">
                Enter your staff email and we'll send you a reset link.
              </p>

              <label className="block mb-6">
                <span className="text-label-caps text-outline uppercase block mb-1">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-3 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-warm-gold focus:border-warm-gold"
                  placeholder="you@bellevue.com"
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
                {submitting ? "Sending…" : "Send reset link"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setError("");
                }}
                className="block mx-auto mt-5 text-cta-label uppercase text-on-surface-variant hover:text-deep-navy"
              >
                ← Back to sign in
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
