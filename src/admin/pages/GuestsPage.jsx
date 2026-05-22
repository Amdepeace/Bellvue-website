export function GuestsPage() {
  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-label-caps text-outline uppercase mb-2">Directory</p>
          <h2 className="playfair text-headline-xl text-deep-navy">Guests</h2>
        </div>
      </div>
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-10 text-on-surface-variant">
        <p className="text-body-md">
          Guest directory + profile drawer coming in the next pass. Schema is live
          in your Supabase project.
        </p>
      </div>
    </div>
  );
}
