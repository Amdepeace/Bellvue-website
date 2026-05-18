import { useState } from 'react'
import V1 from './V1_MaisonVera'
import V2 from './V2_Jagerhof_Style'

const switcher = {
  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 9999,
  background: 'rgba(0,0,0,0.75)',
  backdropFilter: 'blur(8px)',
  borderRadius: '0 0 14px 14px',
  display: 'flex',
  gap: '4px',
  padding: '8px 14px',
}

const btn = (active) => ({
  padding: '6px 20px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  background: active ? '#c9a84c' : 'transparent',
  color: active ? '#000' : '#ccc',
  fontWeight: active ? '600' : '400',
  fontSize: '13px',
  letterSpacing: '0.03em',
  transition: 'all 0.2s',
})

export default function App() {
  const [active, setActive] = useState('v1')

  return (
    <div>
      <div style={switcher}>
        <button style={btn(active === 'v1')} onClick={() => setActive('v1')}>
          V1 — Maison Véra
        </button>
        <button style={btn(active === 'v2')} onClick={() => setActive('v2')}>
          V2 — Waldheim
        </button>
      </div>
      {active === 'v1' ? <V1 /> : <V2 />}
    </div>
  )
}
