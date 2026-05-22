export function BookingsPage() {
  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-label-caps text-outline uppercase mb-2">Today</p>
          <h2 className="playfair text-headline-xl text-deep-navy">Bookings</h2>
        </div>
      </div>
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-10 text-on-surface-variant">
        <p className="text-body-md">
          Bookings table + calendar coming in the next pass. Schema is live in
          your Supabase project (see{" "}
          <code className="font-mono text-[12px]">
            supabase/migrations/0001_initial.sql
          </code>
          ).
        </p>
      </div>
    </div>
  );
}
