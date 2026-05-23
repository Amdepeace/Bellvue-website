import { CTA, Kicker } from "../components/primitives";

export function ComingSoon({ title, onNavigate }) {
  return (
    <div className="page-enter page-enter-active min-h-[80vh] flex items-center">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20 py-32">
        <Kicker className="mb-6">{title}</Kicker>
        <h1 className="font-serif text-5xl md:text-7xl text-navy leading-[1.0] tracking-[-0.02em] max-w-3xl">
          This page is being prepared.
        </h1>
        <p className="mt-7 max-w-xl text-charcoal/75 leading-relaxed">
          Our team is finishing the {title.toLowerCase()} section. In the meantime,
          return to the homepage or reach our concierge.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <CTA variant="solid" onClick={() => onNavigate("home")}>
            Back to home
          </CTA>
        </div>
      </div>
    </div>
  );
}
