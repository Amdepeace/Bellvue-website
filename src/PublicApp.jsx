import { useEffect, useState } from "react";
import { Footer, MobileHeader, NAV_ITEMS, SideRail } from "./components/Shell";
import { BookingModal, Toast } from "./components/BookingModal";
import { HomePage } from "./pages/HomePage";
import { RoomsPage } from "./pages/RoomsPage";
import { SpaPage } from "./pages/SpaPage";
import { GymPage } from "./pages/GymPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DiningPage } from "./pages/DiningPage";
import { OffersPage } from "./pages/OffersPage";
import { ExperiencesPage } from "./pages/ExperiencesPage";
import { GalleryPage } from "./pages/GalleryPage";
import { CirclePage } from "./pages/CirclePage";
import { VenuesPage } from "./pages/VenuesPage";
import { PressStrip } from "./components/PressStrip";
import { ConciergeWidget } from "./components/ConciergeWidget";

const PAGES = NAV_ITEMS.map((n) => n.id);

export default function PublicApp() {
  const [page, setPage] = useState(() => {
    const h = window.location.hash.replace(/^#/, "");
    return PAGES.includes(h) ? h : "home";
  });

  useEffect(() => {
    function onHash() {
      const h = window.location.hash.replace(/^#/, "");
      if (PAGES.includes(h)) setPage(h);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-density", "spacious");
  }, []);

  useEffect(() => {
    const handlers = new Map();
    let raf;
    function attach() {
      document
        .querySelectorAll('section[data-screen-label*="Hero"]')
        .forEach((el) => {
          if (handlers.has(el)) return;
          const onMove = (e) => {
            const r = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${e.clientX - r.left}px`);
            el.style.setProperty("--my", `${e.clientY - r.top}px`);
            el.style.setProperty("--blob-opacity", "1");
          };
          const onLeave = () => el.style.setProperty("--blob-opacity", "0");
          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
          handlers.set(el, { onMove, onLeave });
        });
    }
    function loop() {
      attach();
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      handlers.forEach(({ onMove, onLeave }, el) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  function navigate(p) {
    setPage(p);
    window.location.hash = p;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  const [modal, setModal] = useState({ open: false, prefill: null });
  const [toast, setToast] = useState("");

  function openBooking(prefill) {
    setModal({ open: true, prefill: prefill || null });
  }
  function closeBooking() {
    setModal({ open: false, prefill: null });
  }
  function confirmBooking() {
    setToast("Confirmation sent — check your inbox.");
  }

  function renderPage() {
    const props = {
      onNavigate: navigate,
      onBook: openBooking,
      onToast: (m) => setToast(m),
    };
    switch (page) {
      case "home":
        return <HomePage {...props} />;
      case "rooms":
        return <RoomsPage {...props} />;
      case "dining":
        return <DiningPage {...props} />;
      case "spa":
        return <SpaPage {...props} />;
      case "gym":
        return <GymPage {...props} />;
      case "experiences":
        return <ExperiencesPage {...props} />;
      case "offers":
        return <OffersPage {...props} />;
      case "venues":
        return <VenuesPage {...props} />;
      case "gallery":
        return <GalleryPage {...props} />;
      case "circle":
        return <CirclePage {...props} />;
      case "about":
        return <AboutPage {...props} />;
      case "contact":
        return <ContactPage {...props} />;
      default:
        return <HomePage {...props} />;
    }
  }

  return (
    <div className="min-h-screen">
      <SideRail
        active={page}
        onNavigate={navigate}
        onBook={() => openBooking()}
      />
      <MobileHeader
        active={page}
        onNavigate={navigate}
        onBook={() => openBooking()}
      />

      <main className="md:ml-[88px] xl:ml-[104px] pt-14 md:pt-0">
        <div key={page}>{renderPage()}</div>
        {page === "home" && <PressStrip />}
        <Footer onNavigate={navigate} ethiopian />
      </main>

      <BookingModal
        open={modal.open}
        prefill={modal.prefill}
        onClose={closeBooking}
        onConfirm={confirmBooking}
      />

      <Toast message={toast} onDone={() => setToast("")} />

      <ConciergeWidget />
    </div>
  );
}
