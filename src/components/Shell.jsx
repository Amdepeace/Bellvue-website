import { Fragment, useState } from "react";
import { Crest, CTA } from "./primitives";

export const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "rooms", label: "Suites", icon: "king_bed" },
  { id: "dining", label: "Dining", icon: "restaurant" },
  { id: "spa", label: "Spa", icon: "spa" },
  { id: "gym", label: "Fitness", icon: "fitness_center" },
  { id: "experiences", label: "Experiences", icon: "explore" },
  { id: "offers", label: "Offers", icon: "local_offer" },
  { id: "venues", label: "Venues", icon: "meeting_room" },
  { id: "gallery", label: "Gallery", icon: "photo_library" },
  { id: "circle", label: "Circle", icon: "workspace_premium" },
  { id: "about", label: "About", icon: "menu_book" },
  { id: "contact", label: "Contact", icon: "mail" },
];

export function SideRail({ active, onNavigate, onBook }) {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-[88px] xl:w-[104px] border-r border-line bg-cream/70 backdrop-blur-md flex-col items-center py-6 gap-4">
      <button
        onClick={() => onNavigate("home")}
        className="flex flex-col items-center gap-2 group"
      >
        <Crest size={26} color="#1A2E4A" />
        <span className="font-serif text-navy text-[13px] tracking-[0.32em] v-rl">
          BELLEVUE
        </span>
      </button>

      <ul className="flex-1 flex flex-col items-center gap-4 overflow-y-auto no-bar w-full px-2">
        {NAV_ITEMS.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id} className="relative">
              <button
                onClick={() => onNavigate(it.id)}
                className={`group flex flex-col items-center gap-1 transition-colors duration-300 ${
                  isActive ? "text-gold" : "text-charcoal/70 hover:text-navy"
                }`}
                title={it.label}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={
                    isActive
                      ? { fontVariationSettings: "'FILL' 1, 'wght' 400" }
                      : undefined
                  }
                >
                  {it.icon}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
                  {it.label}
                </span>
              </button>
              {isActive && (
                <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-5 bg-gold" />
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col items-center gap-3 pt-3 border-t border-line/60 w-full">
        <button
          onClick={onBook}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-navy hover:text-gold transition-colors v-rl py-2"
        >
          Reserve →
        </button>
      </div>
    </aside>
  );
}

export function MobileHeader({ active, onNavigate, onBook }) {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 px-5 bg-cream/90 backdrop-blur-md border-b border-line flex items-center justify-between">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2">
          <Crest size={22} color="#1A2E4A" />
          <span className="font-serif text-navy text-base tracking-[0.32em]">
            BELLEVUE
          </span>
        </button>
        <button
          onClick={() => setOpen(true)}
          aria-label="Menu"
          className="text-navy"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>
      {open && (
        <div className="md:hidden fixed inset-0 z-[60] bg-navy text-cream flex flex-col">
          <div className="flex items-center justify-between px-5 h-14 border-b border-cream/10">
            <div className="inline-flex items-baseline gap-[2px]">
              <span className="font-serif text-xl text-cream tracking-[0.18em]">
                BELLEVUE
              </span>
              <span className="font-mono text-[9px] text-gold uppercase tracking-[0.2em]">
                ·ETH
              </span>
            </div>
            <button onClick={() => setOpen(false)} className="text-cream">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <ul className="flex-1 flex flex-col items-start justify-center gap-6 px-8">
            {NAV_ITEMS.map((it, idx) => (
              <li key={it.id} className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] text-gold">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <button
                  onClick={() => {
                    onNavigate(it.id);
                    setOpen(false);
                  }}
                  className={`font-serif text-4xl tracking-[-0.01em] ${
                    active === it.id ? "text-gold" : "text-cream"
                  }`}
                >
                  {it.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="p-6 border-t border-cream/10">
            <CTA
              variant="gold"
              onClick={() => {
                setOpen(false);
                onBook();
              }}
              className="w-full"
            >
              Reserve a Stay
            </CTA>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export function Footer({ onNavigate, ethiopian = true }) {
  return (
    <footer className="bg-navy text-cream/85 mt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-5">
            <Crest size={28} color="#B8973A" />
            <span className="font-serif text-cream text-2xl tracking-[0.32em]">
              BELLEVUE
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs text-cream/70">
            A sanctuary of timeless hospitality in the heart of Addis Ababa — where
            Ethiopian warmth meets considered, modern design.
          </p>
          <div className="mt-8 hairline" />
          {ethiopian && (
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-soft">
              Megenagna · 9 min from Bole Airport
            </p>
          )}
        </div>

        <div className="md:col-span-2 md:col-start-6">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-5">
            Visit
          </h4>
          <ul className="space-y-3 text-sm">
            {["rooms", "spa", "gym", "about"].map((id) => (
              <li key={id}>
                <button
                  onClick={() => onNavigate(id)}
                  className="hover:text-gold transition-colors capitalize"
                >
                  {NAV_ITEMS.find((n) => n.id === id).label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-5">
            Connect
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-gold">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gold">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gold">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gold">
                Sustainability
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 md:col-start-10">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-5">
            Reach Us
          </h4>
          <address className="not-italic text-sm leading-relaxed text-cream/75">
            Diaspora Avenue, Megenagna
            <br />
            Addis Ababa, Ethiopia
            <br />
            <span className="font-mono text-[12px] mt-3 inline-block">
              +251 116 676 700
            </span>
            <br />
            <span className="font-mono text-[12px]">stay@bellevue.et</span>
          </address>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row gap-4 justify-between items-center font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50">
          <span>© 2026 Bellevue Hotel &amp; Spa</span>
          <span className="hidden md:flex items-center gap-6">
            <a href="#" className="hover:text-gold">
              Privacy
            </a>
            <a href="#" className="hover:text-gold">
              Terms
            </a>
            <a href="#" className="hover:text-gold">
              Accessibility
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
