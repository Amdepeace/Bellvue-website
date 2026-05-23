import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AdminGuard({ children }) {
  const { user, isStaff, loading, signOut } = useAuth();
  const location = useLocation();
  const [copied, setCopied] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-outline font-mono text-[11px] uppercase tracking-[0.25em]">
          Loading…
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isStaff) {
    async function copy(value, label) {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(label);
        setTimeout(() => setCopied(""), 1500);
      } catch {
        // Ignore — copy is a nice-to-have
      }
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <div className="max-w-lg w-full text-center">
          <h1 className="playfair text-headline-lg text-deep-navy mb-3">
            No staff access
          </h1>
          <p className="text-on-surface-variant text-body-md mb-8">
            Your account is signed in but has no staff role assigned. Send the
            details below to an administrator so they can add you to{" "}
            <code className="font-mono text-[12px] bg-surface-container px-1.5 py-0.5 rounded">
              staff_roles
            </code>
            .
          </p>

          <div className="text-left bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">
            <Row
              label="Email"
              value={user.email || "—"}
              onCopy={() => copy(user.email || "", "email")}
              copied={copied === "email"}
            />
            <Row
              label="User ID"
              value={user.id}
              mono
              onCopy={() => copy(user.id, "uid")}
              copied={copied === "uid"}
            />
          </div>

          <p className="text-xs text-outline mt-6 leading-relaxed">
            An admin can run, in the Supabase SQL editor:
          </p>
          <pre className="font-mono text-[11px] text-on-surface bg-surface-container-low border border-outline-variant rounded p-3 mt-2 text-left overflow-x-auto">{`insert into public.staff_roles (user_id, role, display_name)
values ('${user.id}', 'front_desk', 'Your Name');`}</pre>

          <button
            onClick={signOut}
            className="mt-8 text-cta-label uppercase text-on-surface-variant hover:text-deep-navy"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return children;
}

function Row({ label, value, mono, onCopy, copied }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-label-caps text-outline uppercase mb-1">{label}</p>
        <p
          className={`text-on-surface text-sm break-all ${
            mono ? "font-mono" : ""
          }`}
        >
          {value}
        </p>
      </div>
      <button
        onClick={onCopy}
        className="text-cta-label uppercase text-warm-gold hover:text-deep-navy flex items-center gap-1 mt-5"
      >
        <span className="material-symbols-outlined text-[16px]">
          {copied ? "check" : "content_copy"}
        </span>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
