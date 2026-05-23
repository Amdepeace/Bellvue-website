import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Drawer, DrawerSection } from "../components/Drawer";
import { Stat } from "../components/Stat";

const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "dirty", label: "Dirty" },
  { id: "in_progress", label: "In progress" },
  { id: "clean", label: "Clean" },
  { id: "inspected", label: "Inspected" },
  { id: "do_not_disturb", label: "DND" },
  { id: "out_of_service", label: "Out of service" },
];

const STATUS_LABELS = {
  clean: "Clean",
  dirty: "Dirty",
  in_progress: "In progress",
  inspected: "Inspected",
  do_not_disturb: "Do not disturb",
  out_of_service: "Out of service",
};

const STATUS_BADGE = {
  clean: "bg-primary-fixed text-on-primary-fixed",
  dirty: "bg-error-container text-on-error-container",
  in_progress: "bg-secondary-fixed text-on-secondary-fixed",
  inspected: "bg-deep-navy text-warm-gold",
  do_not_disturb: "bg-surface-container-highest text-on-surface-variant border border-outline-variant",
  out_of_service: "bg-error-container text-on-error-container border border-error",
};

// Contextual primary actions for each status — what the staff most likely
// wants to do next. The drawer also exposes a "Change to anything" select
// for the long-tail cases.
const NEXT_ACTIONS = {
  dirty: [
    { to: "in_progress", label: "Start cleaning" },
    { to: "out_of_service", label: "Out of service", variant: "ghost" },
  ],
  in_progress: [
    { to: "clean", label: "Mark clean" },
  ],
  clean: [
    { to: "inspected", label: "Mark inspected" },
    { to: "dirty", label: "Mark dirty", variant: "ghost" },
  ],
  inspected: [
    { to: "dirty", label: "Mark dirty", variant: "ghost" },
  ],
  do_not_disturb: [
    { to: "dirty", label: "Clear DND (mark dirty)" },
  ],
  out_of_service: [
    { to: "dirty", label: "Return to service (mark dirty)" },
  ],
};

const FIELD_CLASS =
  "w-full bg-surface-container-low border border-outline-variant rounded px-3 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-warm-gold focus:border-warm-gold";

const ROOM_SELECT =
  "id, number, room_type, floor, view, base_rate_etb, active, cleaning_status, last_cleaned_at, housekeeper, housekeeping_notes";

export function HousekeepingPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("rooms")
      .select(ROOM_SELECT)
      .eq("active", true)
      .order("number");
    if (error) setError(error.message);
    else {
      setRooms(data || []);
      setError("");
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(
    () => ({
      dirty: rooms.filter((r) => r.cleaning_status === "dirty").length,
      in_progress: rooms.filter((r) => r.cleaning_status === "in_progress")
        .length,
      ready: rooms.filter((r) => r.cleaning_status === "inspected").length,
      out_of_service: rooms.filter(
        (r) =>
          r.cleaning_status === "out_of_service" ||
          r.cleaning_status === "do_not_disturb"
      ).length,
    }),
    [rooms]
  );

  const visible =
    filter === "all"
      ? rooms
      : rooms.filter((r) => r.cleaning_status === filter);

  async function updateRoom(id, changes) {
    // When marking clean, also stamp last_cleaned_at.
    const payload = { ...changes };
    if (changes.cleaning_status === "clean") {
      payload.last_cleaned_at = new Date().toISOString();
    }
    const { data, error } = await supabase
      .from("rooms")
      .update(payload)
      .eq("id", id)
      .select(ROOM_SELECT)
      .single();
    if (error) {
      setError(error.message);
      return;
    }
    if (data) setSelected(data);
    await load();
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-label-caps text-outline uppercase mb-2">
            Daily ops
          </p>
          <h2 className="playfair text-headline-xl text-deep-navy">
            Housekeeping
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Stat label="Dirty (need cleaning)" value={stats.dirty} />
        <Stat label="Cleaning in progress" value={stats.in_progress} />
        <Stat label="Ready for guest" value={stats.ready} />
        <Stat label="DND / out of service" value={stats.out_of_service} />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-cta-label uppercase px-4 py-2 rounded transition-colors ${
              filter === f.id
                ? "bg-deep-navy text-white"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-outline text-cta-label uppercase">Loading…</div>
      ) : visible.length === 0 ? (
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-10 text-center text-on-surface-variant">
          <p className="text-body-md">
            {rooms.length === 0
              ? "No rooms set up yet — run the schema migration in supabase/migrations/0001_initial.sql."
              : "No rooms match this filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {visible.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r)}
              className="text-left bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-warm-gold transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="playfair text-3xl text-deep-navy leading-none">
                    {r.number}
                  </p>
                  <p className="text-xs text-on-surface-variant capitalize mt-1">
                    {r.room_type}
                    {r.floor ? ` · floor ${r.floor}` : ""}
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <StatusBadge status={r.cleaning_status} />
              </div>
              <div className="text-xs text-on-surface-variant space-y-1">
                {r.last_cleaned_at && (
                  <p>Cleaned {timeAgo(r.last_cleaned_at)}</p>
                )}
                {r.housekeeper && <p>By {r.housekeeper}</p>}
                {!r.last_cleaned_at && !r.housekeeper && (
                  <p className="opacity-60">No cleaning history</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <RoomDrawer
          room={selected}
          onClose={() => setSelected(null)}
          onUpdate={(changes) => updateRoom(selected.id, changes)}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 rounded ${
        STATUS_BADGE[status] || ""
      }`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}

function RoomDrawer({ room, onClose, onUpdate }) {
  const [housekeeper, setHousekeeper] = useState(room.housekeeper || "");
  const [notes, setNotes] = useState(room.housekeeping_notes || "");
  const [dirty, setDirty] = useState(false);
  const [savingFields, setSavingFields] = useState(false);

  useEffect(() => {
    setHousekeeper(room.housekeeper || "");
    setNotes(room.housekeeping_notes || "");
    setDirty(false);
  }, [room.id, room.housekeeper, room.housekeeping_notes]);

  const actions = NEXT_ACTIONS[room.cleaning_status] || [];

  async function saveFields() {
    setSavingFields(true);
    await onUpdate({
      housekeeper: housekeeper || null,
      housekeeping_notes: notes || null,
    });
    setSavingFields(false);
    setDirty(false);
  }

  return (
    <Drawer
      open
      onClose={onClose}
      eyebrow={`Room · ${room.room_type}`}
      title={`Room ${room.number}`}
      actions={
        <>
          <button
            onClick={onClose}
            className="text-cta-label uppercase px-4 py-2 text-on-surface-variant hover:text-deep-navy"
          >
            Close
          </button>
          {actions.map((a) => (
            <button
              key={a.to}
              onClick={() => onUpdate({ cleaning_status: a.to })}
              className={`text-cta-label uppercase px-4 py-2 rounded ${
                a.variant === "ghost"
                  ? "border border-outline-variant text-on-surface-variant hover:bg-surface-container"
                  : "bg-warm-gold text-white hover:bg-secondary-fixed-dim"
              }`}
            >
              {a.label}
            </button>
          ))}
        </>
      }
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <StatusBadge status={room.cleaning_status} />
          {room.view && (
            <span className="text-xs text-on-surface-variant capitalize">
              {room.view}
            </span>
          )}
        </div>

        <DrawerSection label="Override status">
          <select
            value={room.cleaning_status}
            onChange={(e) => onUpdate({ cleaning_status: e.target.value })}
            className={FIELD_CLASS}
          >
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <p className="text-xs text-outline mt-1">
            Use this for non-standard transitions (e.g. marking a clean room
            DND or back to dirty).
          </p>
        </DrawerSection>

        <DrawerSection label="Assigned housekeeper">
          <input
            value={housekeeper}
            onChange={(e) => {
              setHousekeeper(e.target.value);
              setDirty(true);
            }}
            className={FIELD_CLASS}
            placeholder="Name or shift ID"
          />
        </DrawerSection>

        <DrawerSection label="Notes">
          <textarea
            rows="4"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setDirty(true);
            }}
            className={`${FIELD_CLASS} resize-none`}
            placeholder="Stain on couch, AC not working, etc."
          />
        </DrawerSection>

        {dirty && (
          <button
            onClick={saveFields}
            disabled={savingFields}
            className="w-full text-cta-label uppercase px-4 py-2.5 bg-warm-gold text-white rounded hover:bg-secondary-fixed-dim disabled:opacity-50"
          >
            {savingFields ? "Saving…" : "Save housekeeper & notes"}
          </button>
        )}

        <DrawerSection label="Last cleaned">
          <p className="text-on-surface text-sm">
            {room.last_cleaned_at
              ? new Date(room.last_cleaned_at).toLocaleString()
              : "Never recorded"}
          </p>
        </DrawerSection>
      </div>
    </Drawer>
  );
}

function timeAgo(iso) {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
