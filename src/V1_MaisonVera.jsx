import { useState, useEffect } from 'react'
import { ChevronDown, Instagram, Facebook } from 'lucide-react'

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');`

const GOLD = '#c9a84c'
const CREAM = '#faf7f2'
const WARM_WHITE = '#f5f0e8'
const CHARCOAL = '#2c2c2c'
const LIGHT_GOLD = '#e8d5a0'

const rooms = [
  { id: 1, name: 'Deluxe Room',     category: 'rooms',  size: '42 m²',  price: '€ 680',   img: 'photo-1582719508461-905c673771fd', desc: 'Overlooking the Mediterranean gardens' },
  { id: 2, name: 'Junior Suite',    category: 'suites', size: '65 m²',  price: '€ 1,200', img: 'photo-1631049307264-da0ec9d70304', desc: 'Private terrace with sea views' },
  { id: 3, name: 'Garden Room',     category: 'rooms',  size: '38 m²',  price: '€ 580',   img: 'photo-1564501049412-61c2a3083791', desc: 'Serene garden views, ground floor' },
  { id: 4, name: 'Riviera Suite',   category: 'suites', size: '110 m²', price: '€ 2,400', img: 'photo-1618773928121-c32242e63f39', desc: "Panoramic Côte d'Azur vistas" },
  { id: 5, name: 'Prestige Room',   category: 'rooms',  size: '50 m²',  price: '€ 820',   img: 'photo-1578683010236-d716f9a3f461', desc: 'Upper floor with partial sea view' },
  { id: 6, name: 'Penthouse Suite', category: 'suites', size: '190 m²', price: '€ 4,800', img: 'photo-1590490360182-c33d57733427', desc: 'The pinnacle of Riviera living' },
]

const dining = [
  {
    name: 'Le Jardin', subtitle: 'Garden Restaurant', reverse: false,
    img: 'photo-1414235077428-338989a2e8c0',
    hours: 'Breakfast 7–11 · Lunch 12–15 · Dinner 19–23',
    desc: "Under a canopy of century-old olive trees, Le Jardin serves refined Mediterranean cuisine using produce from our private kitchen garden. Chef Antoine Moreau's menus change with the seasons, celebrating the finest ingredients of the Côte d'Azur.",
  },
  {
    name: 'La Terrasse', subtitle: 'Rooftop Bar & Lounge', reverse: true,
    img: 'photo-1470337458703-46ad1756a187',
    hours: 'Daily 16–02',
    desc: 'High above the azure sea, La Terrasse is the meeting place for golden-hour aperitifs and late-night cocktails. Our sommelier curates an exceptional list of Provence rosés and rare Champagnes.',
  },
]

const stats = [
  { num: '1923', label: 'Founded' },
  { num: '22',   label: 'Rooms & Suites' },
  { num: '3',    label: 'Dining Venues' },
  { num: '100+', label: 'Years of Hospitality' },
]

const footerCols = [
  { title: 'Experience', items: ['Rooms & Suites', 'Dining', 'Wellness & Spa', 'Weddings', 'Meetings'] },
  { title: 'Information', items: ['Getting Here', 'Concierge', 'Sustainability', 'Press', 'Careers'] },
  { title: 'Contact',     items: ['+33 4 93 00 00 00', 'bonjour@maisonvera.com', 'Book Direct', 'Gift Cards'] },
]

export default function V1_MaisonVera() {
  const [scrolled, setScrolled] = useState(false)
  const [filter, setFilter]     = useState('all')
  const [checkIn, setCheckIn]   = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests]     = useState('2 Adults')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const filtered = filter === 'all' ? rooms : rooms.filter(r => r.category === filter)

  return (
    <>
      <style>{FONTS + `
        .mv * { box-sizing: border-box; margin: 0; padding: 0; }
        .mv { font-family: 'Jost', sans-serif; background: ${CREAM}; color: ${CHARCOAL}; }
        .cor { font-family: 'Cormorant Garamond', serif; }
        .rc:hover .ro { opacity: 1; }
        .rc:hover img { transform: scale(1.06); }
        .rc img { transition: transform 0.7s ease; }
      `}</style>

      <div className="mv">
        {/* NAV */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: scrolled ? '14px 48px' : '28px 48px',
          background: scrolled ? 'rgba(250,247,242,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${LIGHT_GOLD}` : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.4s ease',
        }}>
          <div style={{ display: 'flex', gap: '32px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: scrolled ? CHARCOAL : '#fff' }}>
            <a href="#rooms"  style={{ textDecoration: 'none', color: 'inherit' }}>Rooms</a>
            <a href="#dining" style={{ textDecoration: 'none', color: 'inherit' }}>Dining</a>
          </div>
          <div className="cor" style={{ fontSize: '26px', fontWeight: 400, letterSpacing: '0.08em', color: scrolled ? CHARCOAL : '#fff' }}>
            Maison Véra
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: scrolled ? CHARCOAL : '#fff' }}>
            <a href="#about"   style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
            <a href="#booking" style={{ textDecoration: 'none', background: GOLD, color: '#fff', padding: '8px 20px' }}>Book</a>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1800&auto=format&fit=crop&q=85"
            alt="Maison Véra"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 100%)' }} />
          <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center', padding: '0 24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '24px', opacity: 0.8 }}>Côte d'Azur · Est. 1923</p>
            <h1 className="cor" style={{ fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 300, lineHeight: 1.05, marginBottom: '28px' }}>
              Where the Riviera<br />meets its soul
            </h1>
            <p style={{ fontSize: '14px', letterSpacing: '0.06em', fontWeight: 300, opacity: 0.88, maxWidth: '420px', lineHeight: 1.75 }}>
              An intimate maison overlooking the Mediterranean, where time softens and beauty is unhurried.
            </p>
            <a href="#booking" style={{ marginTop: '48px', padding: '14px 40px', background: GOLD, color: '#fff', textDecoration: 'none', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Reserve Your Stay
            </a>
          </div>
          <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', color: '#fff', opacity: 0.55 }}>
            <ChevronDown size={20} />
          </div>
        </section>

        {/* BOOKING BAR */}
        <section id="booking" style={{ background: CHARCOAL }}>
          <div style={{ display: 'flex', alignItems: 'stretch', maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
            {[
              { label: 'Check-in',  type: 'date', value: checkIn,  onChange: setCheckIn },
              { label: 'Check-out', type: 'date', value: checkOut, onChange: setCheckOut },
            ].map(({ label, type, value, onChange }) => (
              <div key={label} style={{ flex: 1, padding: '24px 32px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>{label}</p>
                <input type={type} value={value} onChange={e => onChange(e.target.value)}
                  style={{ background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '14px', width: '100%', fontFamily: 'Jost, sans-serif' }} />
              </div>
            ))}
            <div style={{ flex: 1, padding: '24px 32px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>Guests</p>
              <select value={guests} onChange={e => setGuests(e.target.value)}
                style={{ background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '14px', width: '100%', fontFamily: 'Jost, sans-serif', cursor: 'pointer' }}>
                {['1 Adult', '2 Adults', '2 Adults, 1 Child', '2 Adults, 2 Children', '3 Adults'].map(o => (
                  <option key={o} value={o} style={{ color: CHARCOAL }}>{o}</option>
                ))}
              </select>
            </div>
            <button style={{ padding: '0 48px', background: GOLD, border: 'none', color: '#fff', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}>
              Check Availability
            </button>
          </div>
        </section>

        {/* ROOMS */}
        <section id="rooms" style={{ padding: '100px 48px', background: CREAM }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: '16px' }}>Accommodations</p>
              <h2 className="cor" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, marginBottom: '32px' }}>Rooms & Suites</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                {['all', 'rooms', 'suites'].map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{
                    padding: '8px 24px',
                    border: `1px solid ${filter === f ? GOLD : '#ddd'}`,
                    background: filter === f ? GOLD : 'transparent',
                    color: filter === f ? '#fff' : CHARCOAL,
                    fontSize: '11px', letterSpacing: '0.12em', textTransform: 'capitalize',
                    cursor: 'pointer', fontFamily: 'Jost, sans-serif', transition: 'all 0.25s',
                  }}>
                    {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2px' }}>
              {filtered.map(room => (
                <div key={room.id} className="rc" style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer' }}>
                  <img
                    src={`https://images.unsplash.com/${room.img}?w=800&auto=format&fit=crop&q=80`}
                    alt={room.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="ro" style={{
                    position: 'absolute', inset: 0, background: 'rgba(44,44,44,0.84)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity 0.4s ease', color: '#fff', textAlign: 'center', padding: '32px',
                  }}>
                    <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '12px' }}>{room.size}</p>
                    <h3 className="cor" style={{ fontSize: '28px', fontWeight: 300, marginBottom: '12px' }}>{room.name}</h3>
                    <p style={{ fontSize: '13px', opacity: 0.78, lineHeight: 1.65, marginBottom: '20px' }}>{room.desc}</p>
                    <p style={{ fontSize: '18px', fontWeight: 300, marginBottom: '24px' }}>From {room.price} <span style={{ fontSize: '11px', opacity: 0.55 }}>/ night</span></p>
                    <button style={{ padding: '10px 28px', border: `1px solid ${GOLD}`, background: 'transparent', color: GOLD, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}>
                      View Details
                    </button>
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                    <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 300, fontFamily: 'Cormorant Garamond, serif' }}>{room.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DINING */}
        <section id="dining" style={{ padding: '100px 0', background: WARM_WHITE }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: '16px' }}>Gastronomy</p>
              <h2 className="cor" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300 }}>A Table at Maison Véra</h2>
            </div>
            {dining.map((d, i) => (
              <div key={d.name} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                direction: d.reverse ? 'rtl' : 'ltr',
                marginBottom: i < dining.length - 1 ? '80px' : 0,
              }}>
                <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img src={`https://images.unsplash.com/${d.img}?w=900&auto=format&fit=crop&q=80`} alt={d.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', direction: 'ltr' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px', direction: 'ltr', background: '#fff' }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: '16px' }}>{d.subtitle}</p>
                  <h3 className="cor" style={{ fontSize: '42px', fontWeight: 300, marginBottom: '24px' }}>{d.name}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.85, color: '#555', marginBottom: '28px' }}>{d.desc}</p>
                  <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#999' }}>{d.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT BAND */}
        <section id="about" style={{ background: '#1e1e1e', padding: '100px 48px', color: '#fff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginBottom: '20px' }}>Our Story</p>
              <h2 className="cor" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.3, marginBottom: '28px' }}>
                A century of quiet luxury on the Côte d'Azur
              </h2>
              <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
                Built in 1923 as a private residence for the Véra family, our maison has welcomed artists, diplomats, and discerning travellers who seek beauty over spectacle. Twenty-two rooms, each different. One spirit throughout.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(255,255,255,0.65)' }}>
                We are proud members of Relais & Châteaux and committed to the preservation of this exceptional stretch of coastline.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              {stats.map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', padding: '40px 32px', textAlign: 'center' }}>
                  <p className="cor" style={{ fontSize: '52px', fontWeight: 300, color: GOLD, lineHeight: 1 }}>{s.num}</p>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: '10px' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: '#141414', padding: '80px 48px 40px', color: 'rgba(255,255,255,0.5)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '60px' }}>
              <div>
                <h3 className="cor" style={{ fontSize: '28px', fontWeight: 300, color: '#fff', marginBottom: '16px' }}>Maison Véra</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.8, marginBottom: '24px' }}>12 Boulevard de la Croisette<br />06400 Cannes, France</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[Instagram, Facebook].map((Icon, i) => (
                    <div key={i} style={{ width: '36px', height: '36px', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Icon size={14} color="rgba(255,255,255,0.5)" />
                    </div>
                  ))}
                </div>
              </div>
              {footerCols.map(col => (
                <div key={col.title}>
                  <h4 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '20px' }}>{col.title}</h4>
                  <ul style={{ listStyle: 'none' }}>
                    {col.items.map(item => <li key={item} style={{ marginBottom: '10px', fontSize: '13px' }}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span>© 2024 Maison Véra. All rights reserved.</span>
              <span>Privacy Policy · Terms & Conditions</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
