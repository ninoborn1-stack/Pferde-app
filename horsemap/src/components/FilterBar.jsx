import { AlertTriangle } from 'lucide-react'

const gold = '#C9A84C'
const red = '#8B1A1A'

const CATEGORY_ICONS = {
  'Alle': '🗺️',
  'Pferdeklinik': '🏥',
  'Tierarzt': '⚕️',
  'Hufschmied': '🔨',
  'Sattler': '🪡',
  'Reha / Therapie': '💆',
  'Trainer': '🎯',
  'Spezialangebot': '✨',
  'Mobiler Notdienst': '🚑',
  'Notfall-Netzwerk': '🌐',
}

export default function FilterBar({ categories, active, setActive, onlyEmergency, setOnlyEmergency, count }) {
  return (
    <div style={{
      background: '#1A1A1A',
      borderBottom: `2px solid ${gold}`,
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      overflowX: 'auto',
      flexShrink: 0,
    }}>
      {/* Category filters */}
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 10px',
            borderRadius: 20,
            border: `1px solid ${active === cat ? gold : 'rgba(201,168,76,0.25)'}`,
            background: active === cat ? gold : 'transparent',
            color: active === cat ? '#1A1A1A' : 'rgba(255,255,255,0.75)',
            fontSize: 12,
            fontFamily: 'Georgia, serif',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontWeight: active === cat ? 'bold' : 'normal',
            transition: 'all 0.15s',
          }}
        >
          <span style={{ fontSize: 13 }}>{CATEGORY_ICONS[cat] || '•'}</span>
          {cat}
        </button>
      ))}

      <div style={{ flex: 1 }} />

      {/* Emergency toggle */}
      <button
        onClick={() => setOnlyEmergency(!onlyEmergency)}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '4px 12px',
          borderRadius: 20,
          border: `1px solid ${onlyEmergency ? '#C0392B' : 'rgba(192,57,43,0.4)'}`,
          background: onlyEmergency ? '#C0392B' : 'transparent',
          color: onlyEmergency ? 'white' : '#C0392B',
          fontSize: 12,
          fontFamily: 'Georgia, serif',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          fontWeight: onlyEmergency ? 'bold' : 'normal',
          transition: 'all 0.15s',
          flexShrink: 0,
        }}
      >
        <AlertTriangle size={12} />
        Nur Notfall
      </button>

      {/* Count */}
      <span style={{
        color: 'rgba(255,255,255,0.45)',
        fontSize: 11,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        marginLeft: 4,
      }}>
        {count} Anbieter
      </span>
    </div>
  )
}
