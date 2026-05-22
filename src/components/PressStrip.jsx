import { Kicker } from "./primitives";

const PRESS = [
  { name: "Condé Nast Traveler", quote: "The most considered new hotel in East Africa." },
  { name: "Monocle", quote: "A house, in the best sense." },
  { name: "Travel + Leisure", quote: "Quiet luxury, done properly." },
  { name: "The World of Interiors", quote: "A small masterpiece of restraint." },
  { name: "Robb Report", quote: "The address in Addis." },
];

export function PressStrip() {
  return (
    <section className="bg-cream border-y border-line py-14 md:py-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-8">
        <Kicker>As Featured In</Kicker>
      </div>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid md:grid-cols-5 gap-10">
        {PRESS.map((p) => (
          <div key={p.name} className="border-l border-line pl-4">
            <p className="font-serif text-base md:text-lg text-navy mb-2 italic">
              "{p.quote}"
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {p.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
