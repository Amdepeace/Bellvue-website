import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, ChevronDown, ChevronRight, ArrowRight, Star, Menu, X } from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PHRASES = ['In the mountains.', 'At the table.', 'In our rooms.', 'With us.']

const NAV_LINKS = ['Rooms', 'Dining', 'Wellness', 'Activities', 'About']

const MOSAIC = [
  'photo-1631049307264-da0ec9d70304',
  'photo-1441974231531-c6227db76b6e',
  'photo-1556909114-f6e7ad7d3136',
  'photo-1445019980597-93fa8acb246c',
  'photo-1584132967334-10e028bd69f7',
]

const FEATURES = [
  { tag: 'Mountain Life',  title: 'Winter &\nSummer',    img: 'photo-1551882547-ff40c63fe2f5' },
  { tag: 'Wellness',       title: 'The\nForest Spa',     img: 'photo-1540555700478-4be289fbecef' },
  { tag: 'Gastronomy',     title: 'Alpine\nCuisine',     img: 'photo-1467003909585-2f8a72700288' },
]

const ALT_SECTIONS = [
  {
    tag: 'Nature & Adventure',
    title: 'The mountain\nis your\nplayground.',
    body: [
      'Step outside and breathe. Our valley is threaded with trails that climb through spruce forest, past alpine lakes, and up into high meadows carpeted with wildflowers. In winter, the same paths become cross-country routes that lead you home to a warm Stube.',
      'Our team knows every path. We will help you plan the perfect day, whether that means a gentle morning walk or a full summit ascent.',
    ],
    img: 'photo-1476514525535-07fb3b4ae5f1',
    imgLeft: true,
    bg: '#F0EBE0',
  },
  {
    tag: 'Dining & Tradition',
    title: 'Food grown\nhere,\ncooked here.',
    body: [
      'Every morning begins with bread we bake ourselves, cheeses from the valley, eggs from our hens, and honey from our own bees. Our kitchen works with local farmers and foragers who share our belief that honest food needs very little embellishment.',
      'Lunch and dinner follow the same philosophy — seasonal, generous, and entirely without pretension. Mountain food at its very best.',
    ],
    img: 'photo-1414235077428-338989a2e8c0',
    imgLeft: false,
    bg: '#FDFCF8',
  },
]

const REVIEWS = [
  {
    text: 'The most restorative week of our year. We arrived exhausted and left completely renewed. The food, the silence, the warmth — there is nothing quite like Waldheim.',
    author: 'Sophie & Martin',
    country: 'Vienna, Austria',
  },
  {
    text: 'A family hotel that genuinely feels like a family. Our children talk about it for months. The mountains, the spa, the incredible breakfasts — we return every winter.',
    author: 'James & Lara',
    country: 'London, England',
  },
  {
    text: 'Everything a mountain hotel should be. Genuine, warm, deeply rooted in its place. The food alone is worth the journey from Zürich.',
    author: 'Thomas B.',
    country: 'Zürich, Switzerland',
  },
]

const FOOTER_COLS = [
  { title: 'Rooms',   links: ['Deluxe Rooms', 'Junior Suites', 'Family Suites', 'Penthouse', 'All Rooms'] },
  { title: 'Explore', links: ['Wellness & Spa', 'Alpine Dining', 'Summer Activities', 'Winter Sports', 'Weddings'] },
  { title: 'Plan',    links: ['Getting Here', 'Packages', 'Gift Vouchers', 'Press & Media', 'Sustainability'] },
]

// ─── STYLES ───────────────────────────────────────────────────────────────────

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .jh *, .jh *::before, .jh *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .jh { font-family: 'DM Sans', sans-serif; background: #FDFCF8; color: #1E2B1A; overflow-x: hidden; }
  .jh a { text-decoration: none; color: inherit; }
  .jh button { font-family: inherit; }

  /* ── NAV ── */
  .jh-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.6rem 3rem;
    transition: background 0.5s ease, padding 0.5s ease, border-color 0.5s ease;
    border-bottom: 1px solid transparent;
  }
  .jh-nav.scrolled {
    background: #FDFCF8;
    border-bottom-color: rgba(200,187,168,0.4);
    padding: 1rem 3rem;
  }
  .jh-logo {
    font-family: 'Fraunces', serif; font-weight: 700; font-size: 1.6rem;
    color: #fff; transition: color 0.5s ease; letter-spacing: 0.01em;
    cursor: pointer;
  }
  .jh-nav.scrolled .jh-logo { color: #1E2B1A; }
  .jh-nav-links { display: flex; align-items: center; gap: 2.2rem; }
  .jh-nav-link {
    font-size: 0.8rem; font-weight: 400; text-transform: uppercase;
    letter-spacing: 0.05em; color: rgba(255,255,255,0.8);
    transition: color 0.5s ease; cursor: pointer;
  }
  .jh-nav.scrolled .jh-nav-link { color: #6B7C5A; }
  .jh-nav-link:hover { color: #C4923A !important; }
  .jh-nav-right { display: flex; align-items: center; gap: 1rem; }
  .jh-btn-gold {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: #C4923A; color: #fff; border: none; cursor: pointer;
    font-size: 0.72rem; font-weight: 500; text-transform: uppercase;
    letter-spacing: 0.08em; padding: 0.6rem 1.4rem;
    transition: background 0.3s ease;
  }
  .jh-btn-gold:hover { background: #8B6E4E; }
  .jh-btn-gold-lg {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: #C4923A; color: #fff; border: none; cursor: pointer;
    font-size: 0.8rem; font-weight: 500; text-transform: uppercase;
    letter-spacing: 0.08em; padding: 0.9rem 2.2rem;
    transition: background 0.3s ease;
  }
  .jh-btn-gold-lg:hover { background: #8B6E4E; }
  .jh-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 2px; }

  /* ── MOBILE MENU ── */
  .jh-mobile-menu {
    position: fixed; inset: 0; background: #1E2B1A; z-index: 200;
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 2rem;
  }
  .jh-mobile-close {
    position: absolute; top: 1.5rem; right: 1.5rem;
    background: none; border: none; cursor: pointer;
  }
  .jh-mobile-link {
    font-family: 'Fraunces', serif; font-weight: 300; font-size: 2.2rem;
    color: #fff; cursor: pointer; transition: color 0.3s;
  }
  .jh-mobile-link:hover { color: #C4923A; }

  /* ── HERO ── */
  .jh-hero { position: relative; height: 100vh; overflow: hidden; }
  .jh-hero-img {
    position: absolute; inset: 0;
    transform: scale(1.0); transition: transform 10s ease-out;
  }
  .jh-hero-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .jh-hero-img.zoomed { transform: scale(1.03); }
  .jh-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(30,43,26,0.35) 0%, rgba(30,43,26,0.1) 40%, rgba(30,43,26,0.6) 100%);
  }
  .jh-hero-content {
    position: absolute; bottom: 0; left: 0;
    padding: 0 3rem 3rem; color: #fff;
  }
  .jh-hero-eyebrow {
    display: block; font-size: 0.72rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: #C8BBA8; margin-bottom: 0.75rem;
    font-weight: 400;
  }
  .jh-hero-h1 {
    font-family: 'Fraunces', serif; font-weight: 300;
    font-size: clamp(3.5rem, 7vw, 6.5rem);
    line-height: 1.05; color: #fff; margin-bottom: 0.4rem;
  }
  .jh-hero-phrases { margin-bottom: 2.5rem; }
  .jh-hero-phrase {
    font-family: 'Fraunces', serif; font-style: italic; font-weight: 300;
    font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.2;
    color: rgba(255,255,255,0.4); transition: color 0.6s ease;
  }
  .jh-hero-phrase.active { color: rgba(255,255,255,1); }
  .jh-hero-ctas { display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; }
  .jh-hero-ghost {
    font-size: 0.85rem; font-weight: 300; color: rgba(255,255,255,0.85);
    text-decoration: underline; text-underline-offset: 4px; cursor: pointer;
    background: none; border: none; transition: color 0.3s;
  }
  .jh-hero-ghost:hover { color: #fff; }
  .jh-scroll-hint {
    position: absolute; bottom: 2rem; right: 3rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
    color: rgba(255,255,255,0.4); font-size: 0.58rem;
    letter-spacing: 0.18em; text-transform: uppercase;
  }
  .jh-scroll-hint svg { animation: jh-bounce 2s ease-in-out infinite; }
  @keyframes jh-bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(6px); }
  }

  /* ── MOSAIC ── */
  .jh-mosaic {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    grid-template-rows: 280px 280px;
    gap: 4px;
  }
  .jh-mosaic-item { overflow: hidden; }
  .jh-mosaic-item:first-child { grid-row: 1 / 3; }
  .jh-mosaic-item img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.7s ease;
  }
  .jh-mosaic-item:hover img { transform: scale(1.04); }

  /* ── BOOKING BAR ── */
  .jh-booking {
    background: #fff;
    border-bottom: 1px solid rgba(200,187,168,0.3);
  }
  .jh-booking-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: stretch;
  }
  .jh-booking-field {
    flex: 1; padding: 1.4rem 2rem;
    border-right: 1px solid rgba(200,187,168,0.4);
  }
  .jh-booking-label {
    display: block; font-size: 0.58rem; letter-spacing: 0.18em;
    text-transform: uppercase; color: #6B7C5A; font-weight: 500;
    margin-bottom: 0.45rem;
  }
  .jh-booking-input, .jh-booking-select {
    font-family: 'Fraunces', serif; font-weight: 300; font-size: 1rem;
    color: #1E2B1A; background: transparent; border: none; outline: none;
    border-bottom: 1px solid rgba(200,187,168,0.5);
    width: 100%; padding-bottom: 0.25rem;
  }
  .jh-booking-select { cursor: pointer; appearance: none; }
  .jh-booking-submit {
    background: #1E2B1A; color: #fff; border: none; cursor: pointer;
    font-size: 0.72rem; font-weight: 500; text-transform: uppercase;
    letter-spacing: 0.1em; padding: 0.85rem 2rem; white-space: nowrap;
    transition: background 0.3s;
  }
  .jh-booking-submit:hover { background: #8B6E4E; }

  /* ── INTRO ── */
  .jh-intro {
    max-width: 1200px; margin: 0 auto; padding: 6rem 3rem;
    display: grid; grid-template-columns: 1fr 1.6fr;
    gap: 6rem; align-items: center;
  }
  .jh-eyebrow {
    display: block; font-size: 0.65rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: #C4923A; font-weight: 500;
    margin-bottom: 1.2rem;
  }
  .jh-section-h2 {
    font-family: 'Fraunces', serif; font-weight: 300;
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    color: #1E2B1A; line-height: 1.1; margin-bottom: 1.5rem;
  }
  em { font-style: italic; }
  .jh-arrow-link {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.85rem; font-weight: 400; color: #1E2B1A;
    cursor: pointer; transition: gap 0.3s, color 0.3s;
  }
  .jh-arrow-link:hover { gap: 0.85rem; color: #C4923A; }
  .jh-body { font-size: 0.95rem; line-height: 1.85; color: #6B7C5A; font-weight: 300; margin-bottom: 1.2rem; }
  .jh-stats {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1px; margin-top: 2rem; background: rgba(200,187,168,0.4);
  }
  .jh-stat {
    background: #F0EBE0; padding: 1.5rem;
    border: 1px solid rgba(200,187,168,0.4);
  }
  .jh-stat-num {
    font-family: 'Fraunces', serif; font-weight: 300;
    font-size: 2.8rem; color: #1E2B1A; line-height: 1;
  }
  .jh-stat-num sup { color: #C4923A; font-size: 1.3rem; vertical-align: super; }
  .jh-stat-label {
    display: block; font-size: 0.72rem; text-transform: uppercase;
    letter-spacing: 0.1em; color: #6B7C5A; margin-top: 0.5rem;
  }

  /* ── EXPERIENCES ── */
  .jh-xp { background: #1E2B1A; padding: 5rem 3rem; }
  .jh-xp-inner { max-width: 1200px; margin: 0 auto; }
  .jh-xp-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 3rem;
  }
  .jh-xp-h2 {
    font-family: 'Fraunces', serif; font-weight: 300;
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    color: #fff; line-height: 1.1;
  }
  .jh-ghost-btn {
    background: none; border: 1px solid rgba(255,255,255,0.2); cursor: pointer;
    font-size: 0.8rem; font-weight: 400; text-transform: uppercase;
    letter-spacing: 0.08em; color: rgba(255,255,255,0.6);
    padding: 0.7rem 1.6rem; transition: all 0.3s; white-space: nowrap;
  }
  .jh-ghost-btn:hover { color: #fff; border-color: rgba(255,255,255,0.5); }
  .jh-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .jh-card {
    position: relative; aspect-ratio: 3/4; overflow: hidden; cursor: pointer;
  }
  .jh-card img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.8s ease;
  }
  .jh-card:hover img { transform: scale(1.06); }
  .jh-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(30,43,26,0.85) 0%, rgba(30,43,26,0.1) 60%);
  }
  .jh-card-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; }
  .jh-card-tag {
    display: block; font-size: 0.6rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: #C4923A; font-weight: 500;
    margin-bottom: 0.6rem;
  }
  .jh-card-title {
    font-family: 'Fraunces', serif; font-weight: 300; font-size: 1.7rem;
    color: #fff; line-height: 1.2; white-space: pre-line; margin-bottom: 0.8rem;
  }
  .jh-card-cta {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.78rem; font-weight: 400; color: rgba(255,255,255,0.7);
    opacity: 0; transform: translateY(8px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .jh-card:hover .jh-card-cta { opacity: 1; transform: translateY(0); }

  /* ── ALTERNATING SECTIONS ── */
  .jh-alt { display: grid; grid-template-columns: 1fr 1fr; min-height: 500px; }
  .jh-alt-img { overflow: hidden; }
  .jh-alt-img img { width: 100%; height: 100%; min-height: 500px; object-fit: cover; display: block; }
  .jh-alt-content {
    display: flex; flex-direction: column; justify-content: center;
    padding: 5rem 4rem;
  }
  .jh-alt-h2 {
    font-family: 'Fraunces', serif; font-weight: 300; font-size: 2.6rem;
    color: #1E2B1A; line-height: 1.15; white-space: pre-line; margin-bottom: 1.5rem;
  }
  .jh-alt-body { font-size: 0.92rem; line-height: 1.85; color: #6B7C5A; font-weight: 300; margin-bottom: 1rem; }

  /* ── REVIEWS ── */
  .jh-reviews { background: #F7F4EE; padding: 6rem 3rem; }
  .jh-reviews-inner { max-width: 1100px; margin: 0 auto; }
  .jh-reviews-head { text-align: center; margin-bottom: 3.5rem; }
  .jh-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .jh-review {
    background: #fff; border: 1px solid rgba(200,187,168,0.3); padding: 2rem;
  }
  .jh-stars { display: flex; gap: 3px; margin-bottom: 1rem; }
  .jh-review-quote {
    font-family: 'Fraunces', serif; font-style: italic; font-weight: 300;
    font-size: 1.05rem; line-height: 1.7; color: #1E2B1A; margin-bottom: 1.5rem;
  }
  .jh-review-author {
    font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; color: #6B7C5A;
  }
  .jh-review-country { font-size: 0.68rem; color: #C8BBA8; margin-top: 0.2rem; }

  /* ── CTA BAND ── */
  .jh-cta { background: #3A4E2E; padding: 6rem 3rem; text-align: center; }
  .jh-cta-h2 {
    font-family: 'Fraunces', serif; font-weight: 300;
    font-size: clamp(2.5rem, 5vw, 4.5rem); color: #fff;
    line-height: 1.1; margin-bottom: 1rem;
  }
  .jh-cta-sub {
    font-size: 0.85rem; color: rgba(255,255,255,0.5); font-weight: 300;
    margin-bottom: 2.5rem;
  }
  .jh-cta-btns { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
  .jh-ghost-white {
    background: none; border: 1px solid rgba(255,255,255,0.4); cursor: pointer;
    font-size: 0.8rem; font-weight: 400; text-transform: uppercase;
    letter-spacing: 0.08em; color: #fff; padding: 0.9rem 2.2rem;
    transition: all 0.3s;
  }
  .jh-ghost-white:hover { border-color: #fff; background: rgba(255,255,255,0.06); }

  /* ── FOOTER ── */
  .jh-footer { background: #1E2B1A; padding: 5rem 3rem 2rem; }
  .jh-footer-inner { max-width: 1200px; margin: 0 auto; }
  .jh-footer-grid {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem; padding-bottom: 3rem;
    border-bottom: 1px solid rgba(200,187,168,0.15); margin-bottom: 2rem;
  }
  .jh-footer-logo {
    font-family: 'Fraunces', serif; font-weight: 700; font-size: 1.8rem;
    color: #fff; margin-bottom: 0.8rem;
  }
  .jh-footer-tagline {
    font-size: 0.85rem; line-height: 1.7; color: rgba(255,255,255,0.35);
    font-weight: 300; margin-bottom: 1.5rem;
  }
  .jh-contact-item {
    display: flex; align-items: flex-start; gap: 0.6rem;
    font-size: 0.82rem; color: rgba(255,255,255,0.4); margin-bottom: 0.55rem;
  }
  .jh-contact-item svg { flex-shrink: 0; margin-top: 2px; }
  .jh-footer-col-title {
    font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.18em;
    color: #C8BBA8; font-weight: 500; margin-bottom: 1.2rem; display: block;
  }
  .jh-footer-link {
    display: block; font-size: 0.85rem; color: rgba(255,255,255,0.45);
    font-weight: 300; margin-bottom: 0.65rem; cursor: pointer;
    transition: color 0.3s;
  }
  .jh-footer-link:hover { color: #C4923A; }
  .jh-footer-bottom { display: flex; justify-content: space-between; align-items: center; }
  .jh-footer-copy { font-size: 0.72rem; color: rgba(255,255,255,0.2); }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .jh-nav-links { display: none; }
    .jh-hamburger { display: block; }
    .jh-nav { padding: 1.2rem 1.5rem; }
    .jh-nav.scrolled { padding: 0.9rem 1.5rem; }

    .jh-hero-content { padding: 0 1.5rem 2rem; }
    .jh-scroll-hint { right: 1.5rem; }

    .jh-mosaic {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 180px 180px 180px;
    }
    .jh-mosaic-item:first-child { grid-row: auto; }

    .jh-booking-inner { flex-direction: column; }
    .jh-booking-field { border-right: none; border-bottom: 1px solid rgba(200,187,168,0.4); }
    .jh-booking-submit { padding: 1.1rem 2rem; text-align: center; }

    .jh-intro { grid-template-columns: 1fr; gap: 2.5rem; padding: 4rem 1.5rem; }

    .jh-xp { padding: 4rem 1.5rem; }
    .jh-xp-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
    .jh-cards { grid-template-columns: 1fr; }

    .jh-alt { grid-template-columns: 1fr; }
    .jh-alt-img { order: 1 !important; }
    .jh-alt-content { order: 2 !important; padding: 3rem 1.5rem; }
    .jh-alt-img img { min-height: 280px; }

    .jh-reviews { padding: 4rem 1.5rem; }
    .jh-reviews-grid { grid-template-columns: 1fr; }

    .jh-cta { padding: 4rem 1.5rem; }

    .jh-footer { padding: 3.5rem 1.5rem 2rem; }
    .jh-footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .jh-footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
  }

  @media (max-width: 480px) {
    .jh-footer-grid { grid-template-columns: 1fr; }
    .jh-reviews-grid { grid-template-columns: 1fr; }
  }
`

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const img = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export default function V2_Jagerhof_Style() {
  const [scrolled,     setScrolled]     = useState(false)
  const [activePhrase, setActivePhrase] = useState(0)
  const [zoomed,       setZoomed]       = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [checkIn,      setCheckIn]      = useState('')
  const [checkOut,     setCheckOut]     = useState('')
  const [guests,       setGuests]       = useState('2 Adults')

  useEffect(() => {
    const t = setTimeout(() => setZoomed(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setActivePhrase(i => (i + 1) % PHRASES.length), 1800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <style>{STYLE}</style>
      <div className="jh">

        {/* ── MOBILE MENU ── */}
        {menuOpen && (
          <div className="jh-mobile-menu">
            <button className="jh-mobile-close" onClick={() => setMenuOpen(false)}>
              <X size={28} color="#fff" />
            </button>
            {NAV_LINKS.map(l => (
              <span key={l} className="jh-mobile-link" onClick={() => setMenuOpen(false)}>{l}</span>
            ))}
            <button className="jh-btn-gold-lg" style={{ marginTop: '1rem' }}>
              Book Your Stay <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* ── NAV ── */}
        <nav className={`jh-nav${scrolled ? ' scrolled' : ''}`}>
          <span className="jh-logo">Waldheim</span>
          <div className="jh-nav-links">
            {NAV_LINKS.map(l => (
              <span key={l} className="jh-nav-link">{l}</span>
            ))}
          </div>
          <div className="jh-nav-right">
            <button className="jh-btn-gold">Book Now</button>
            <button className="jh-hamburger" onClick={() => setMenuOpen(true)}>
              <Menu size={22} color={scrolled ? '#1E2B1A' : '#fff'} />
            </button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="jh-hero">
          <div className={`jh-hero-img${zoomed ? ' zoomed' : ''}`}>
            <img src={img('photo-1506905925346-21bda4d32df4', 1800)} alt="Waldheim alpine landscape" />
          </div>
          <div className="jh-hero-overlay" />

          <div className="jh-hero-content">
            <span className="jh-hero-eyebrow">Tyrol, Austria · 1 640 m</span>
            <h1 className="jh-hero-h1">Your home,</h1>
            <div className="jh-hero-phrases">
              {PHRASES.map((p, i) => (
                <div key={p} className={`jh-hero-phrase${i === activePhrase ? ' active' : ''}`}>{p}</div>
              ))}
            </div>
            <div className="jh-hero-ctas">
              <button className="jh-btn-gold-lg">
                Book Your Stay <ArrowRight size={15} />
              </button>
              <button className="jh-hero-ghost">Explore the estate</button>
            </div>
          </div>

          <div className="jh-scroll-hint">
            <span>Discover</span>
            <ChevronDown size={18} />
          </div>
        </section>

        {/* ── MOSAIC ── */}
        <div className="jh-mosaic">
          {MOSAIC.map((id, i) => (
            <div key={i} className="jh-mosaic-item">
              <img src={img(id)} alt="" />
            </div>
          ))}
        </div>

        {/* ── BOOKING BAR ── */}
        <div className="jh-booking">
          <div className="jh-booking-inner">
            <div className="jh-booking-field">
              <label className="jh-booking-label">Arrival</label>
              <input
                type="date" className="jh-booking-input"
                value={checkIn} onChange={e => setCheckIn(e.target.value)}
              />
            </div>
            <div className="jh-booking-field">
              <label className="jh-booking-label">Departure</label>
              <input
                type="date" className="jh-booking-input"
                value={checkOut} onChange={e => setCheckOut(e.target.value)}
              />
            </div>
            <div className="jh-booking-field">
              <label className="jh-booking-label">Guests</label>
              <select
                className="jh-booking-select"
                value={guests} onChange={e => setGuests(e.target.value)}
              >
                {['1 Adult', '2 Adults', '2 Adults, 1 Child', '2 Adults, 2 Children', 'Family (4+)'].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <button className="jh-booking-submit">Check Availability</button>
          </div>
        </div>

        {/* ── INTRO / ABOUT ── */}
        <div className="jh-intro">
          <div>
            <span className="jh-eyebrow">Our Story</span>
            <h2 className="jh-section-h2">
              A place that feels<br />like <em>home</em>.
            </h2>
            <span className="jh-arrow-link">
              Discover our estate <ArrowRight size={15} />
            </span>
          </div>
          <div>
            <p className="jh-body">
              Three generations of the Waldheim family have welcomed guests since 1962. We are not a hotel that happens to be in the mountains — we are a family that has been shaped by them. Our guests return year after year not because of what we offer, but because of how we make them feel.
            </p>
            <p className="jh-body">
              We believe that real hospitality is unhurried. It is a bowl of soup when you return from the mountain. It is knowing your name, your children's names, and that you prefer your coffee with warm milk. Everything we learned from our grandparents, still alive in everything we do.
            </p>
            <div className="jh-stats">
              <div className="jh-stat">
                <div className="jh-stat-num">62<sup>+</sup></div>
                <span className="jh-stat-label">Years of family hospitality</span>
              </div>
              <div className="jh-stat">
                <div className="jh-stat-num">38</div>
                <span className="jh-stat-label">Rooms & suites</span>
              </div>
              <div className="jh-stat">
                <div className="jh-stat-num">3<sup>rd</sup></div>
                <span className="jh-stat-label">Generation at the stove</span>
              </div>
              <div className="jh-stat">
                <div className="jh-stat-num">4<sup>★</sup></div>
                <span className="jh-stat-label">Superior alpine hotel</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── EXPERIENCES ── */}
        <section className="jh-xp">
          <div className="jh-xp-inner">
            <div className="jh-xp-header">
              <h2 className="jh-xp-h2">
                Everything you need,<br /><em>nothing you don't.</em>
              </h2>
              <button className="jh-ghost-btn">See all experiences</button>
            </div>
            <div className="jh-cards">
              {FEATURES.map(f => (
                <div key={f.tag} className="jh-card">
                  <img src={img(f.img)} alt={f.tag} />
                  <div className="jh-card-overlay" />
                  <div className="jh-card-body">
                    <span className="jh-card-tag">{f.tag}</span>
                    <h3 className="jh-card-title">{f.title}</h3>
                    <div className="jh-card-cta">
                      Discover more <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ALTERNATING SECTIONS ── */}
        {ALT_SECTIONS.map((s, i) => (
          <div key={i} className="jh-alt">
            <div className="jh-alt-img" style={{ order: s.imgLeft ? 1 : 2 }}>
              <img src={img(s.img, 1000)} alt={s.tag} />
            </div>
            <div className="jh-alt-content" style={{ background: s.bg, order: s.imgLeft ? 2 : 1 }}>
              <span className="jh-eyebrow">{s.tag}</span>
              <h2 className="jh-alt-h2">{s.title}</h2>
              {s.body.map((p, j) => <p key={j} className="jh-alt-body">{p}</p>)}
              <span className="jh-arrow-link" style={{ marginTop: '0.5rem' }}>
                Learn more <ArrowRight size={15} />
              </span>
            </div>
          </div>
        ))}

        {/* ── REVIEWS ── */}
        <section className="jh-reviews">
          <div className="jh-reviews-inner">
            <div className="jh-reviews-head">
              <span className="jh-eyebrow" style={{ textAlign: 'center' }}>Guest Stories</span>
              <h2 className="jh-section-h2" style={{ textAlign: 'center' }}>
                What our <em>guests</em> say
              </h2>
            </div>
            <div className="jh-reviews-grid">
              {REVIEWS.map(r => (
                <div key={r.author} className="jh-review">
                  <div className="jh-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="#C4923A" color="#C4923A" />
                    ))}
                  </div>
                  <p className="jh-review-quote">"{r.text}"</p>
                  <div className="jh-review-author">{r.author}</div>
                  <div className="jh-review-country">{r.country}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <section className="jh-cta">
          <span className="jh-eyebrow" style={{ color: '#C8BBA8', textAlign: 'center' }}>Begin your journey</span>
          <h2 className="jh-cta-h2">
            The mountain<br />is <em>waiting.</em>
          </h2>
          <p className="jh-cta-sub">Seasons are short. The right moment is now.</p>
          <div className="jh-cta-btns">
            <button className="jh-btn-gold-lg">
              Book Your Stay <ArrowRight size={15} />
            </button>
            <button className="jh-ghost-white">View Rooms</button>
            <button className="jh-ghost-white">Download Brochure</button>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="jh-footer">
          <div className="jh-footer-inner">
            <div className="jh-footer-grid">
              <div>
                <div className="jh-footer-logo">Waldheim</div>
                <p className="jh-footer-tagline">
                  A family hotel in the Tyrolean Alps, open since 1962. Come for the mountains. Stay for the people.
                </p>
                <div className="jh-contact-item"><Phone size={14} /> +43 5354 56789</div>
                <div className="jh-contact-item"><Mail size={14} /> hello@waldheim.at</div>
                <div className="jh-contact-item"><MapPin size={14} /> Waldheim 12, 6292 Fieberbrunn, Tyrol</div>
              </div>
              {FOOTER_COLS.map(col => (
                <div key={col.title}>
                  <span className="jh-footer-col-title">{col.title}</span>
                  {col.links.map(l => (
                    <span key={l} className="jh-footer-link">{l}</span>
                  ))}
                </div>
              ))}
            </div>
            <div className="jh-footer-bottom">
              <span className="jh-footer-copy">© 2024 Waldheim. All rights reserved.</span>
              <span className="jh-footer-copy">Designed with care in Tyrol.</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
