const STYLES = {
  pending:
    "bg-surface-container-highest text-on-surface-variant border border-outline-variant",
  confirmed: "bg-secondary-fixed text-on-secondary-fixed",
  checked_in: "bg-primary-fixed text-on-primary-fixed",
  checked_out: "bg-surface-container text-on-surface-variant",
  cancelled: "bg-error-container text-on-error-container",
  no_show: "bg-error-container text-on-error-container",
};

const LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  checked_in: "Checked-in",
  checked_out: "Checked-out",
  cancelled: "Cancelled",
  no_show: "No-show",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 rounded ${
        STYLES[status] || ""
      }`}
    >
      {LABELS[status] || status}
    </span>
  );
}
