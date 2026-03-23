import { Map, List, Search } from 'lucide-react'

const gold = '#C9A84C'
const red = '#8B1A1A'
const white = '#FAFAF8'

export default function Header({ view, setView, search, setSearch }) {
  return (
    <header style={{
      background: red,
      color: white,
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 56,
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      flexShrink: 0,
    }}>
      {/* Logo + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
        <span style={{ fontSize: 22 }}>🐴</span>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 'bold', color: gold, letterSpacing: 1 }}>
          HorseMap
        </span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginLeft: 4, display: 'none' }}>
          Berlin · Brandenburg
        </span>
      </div>

      {/* Search */}
      <div style={{
        flex: 1,
        maxWidth: 320,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.12)',
        borderRadius: 8,
        padding: '0 10px',
        border: `1px solid rgba(201,168,76,0.4)`,
      }}>
        <Search size={14} color={gold} style={{ flexShrink: 0 }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Name oder Stadt suchen..."
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: white,
            fontSize: 13,
            padding: '6px 8px',
            width: '100%',
          }}
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* View toggle */}
      <div style={{ display: 'flex', gap: 4 }}>
        <button
          onClick={() => setView('map')}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '5px 12px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: 'Georgia, serif',
            background: view === 'map' ? gold : 'transparent',
            color: view === 'map' ? red : 'rgba(255,255,255,0.7)',
            fontWeight: view === 'map' ? 'bold' : 'normal',
            transition: 'all 0.2s',
          }}
        >
          <Map size={14} /> Karte
        </button>
        <button
          onClick={() => setView('list')}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '5px 12px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: 'Georgia, serif',
            background: view === 'list' ? gold : 'transparent',
            color: view === 'list' ? red : 'rgba(255,255,255,0.7)',
            fontWeight: view === 'list' ? 'bold' : 'normal',
            transition: 'all 0.2s',
          }}
        >
          <List size={14} /> Liste
        </button>
      </div>
    </header>
  )
}
