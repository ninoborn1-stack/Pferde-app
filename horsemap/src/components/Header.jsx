import { Map, List, Search } from 'lucide-react'

const gold = '#C9A84C'
const red = '#8B1A1A'

export default function Header({ view, setView, search, setSearch }) {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #6B0E0E 0%, #8B1A1A 50%, #7A1010 100%)',
      color: '#FAFAF8',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      height: 60,
      boxShadow: '0 1px 0 rgba(201,168,76,0.3), 0 4px 20px rgba(0,0,0,0.4)',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 4 }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: 'rgba(201,168,76,0.15)',
          border: '1px solid rgba(201,168,76,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
        }}>🐴</div>
        <div>
          <div style={{
            fontSize: 17,
            fontWeight: 700,
            color: gold,
            letterSpacing: 0.5,
            lineHeight: 1,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>HorseMap</div>
          <div style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: 0.5,
            lineHeight: 1,
            marginTop: 2,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>Berlin · Brandenburg</div>
        </div>
      </div>

      {/* Search */}
      <div style={{
        flex: 1,
        maxWidth: 340,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: '0 12px',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(8px)',
        transition: 'border-color 0.2s',
      }}>
        <Search size={13} color="rgba(255,255,255,0.4)" style={{ flexShrink: 0 }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Suche nach Name oder Stadt…"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontSize: 13,
            padding: '8px 10px',
            width: '100%',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 0,
            }}
          >×</button>
        )}
      </div>

      <div style={{ flex: 1 }} />

      {/* View toggle — segmented control */}
      <div style={{
        display: 'flex',
        background: 'rgba(0,0,0,0.25)',
        borderRadius: 10,
        padding: 3,
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {[{ key: 'map', icon: <Map size={13} />, label: 'Karte' }, { key: 'list', icon: <List size={13} />, label: 'Liste' }].map(({ key, icon, label }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 14px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: 0.2,
              background: view === key ? gold : 'transparent',
              color: view === key ? '#1A1A1A' : 'rgba(255,255,255,0.55)',
              transition: 'all 0.18s',
              boxShadow: view === key ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {icon} {label}
          </button>
        ))}
      </div>
    </header>
  )
}
