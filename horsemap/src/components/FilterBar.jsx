import {
  AlertTriangle, Map, Hospital, Stethoscope,
  Hammer, Scissors, Activity, Target,
  Sparkles, Truck, Globe,
} from 'lucide-react'

const gold = '#C9A84C'

const CATEGORY_ICONS = {
  'Alle':             <Map size={12} />,
  'Pferdeklinik':     <Hospital size={12} />,
  'Tierarzt':         <Stethoscope size={12} />,
  'Hufschmied':       <Hammer size={12} />,
  'Sattler':          <Scissors size={12} />,
  'Reha / Therapie':  <Activity size={12} />,
  'Trainer':          <Target size={12} />,
  'Spezialangebot':   <Sparkles size={12} />,
  'Mobiler Notdienst':<Truck size={12} />,
  'Notfall-Netzwerk': <Globe size={12} />,
}

export default function FilterBar({ categories, active, setActive, onlyEmergency, setOnlyEmergency, count }) {
  return (
    <div style={{
      background: '#111111',
      borderBottom: '1px solid rgba(201,168,76,0.2)',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      overflowX: 'auto',
      flexShrink: 0,
      height: 48,
      scrollbarWidth: 'none',
    }}>
      <style>{`.filterbar::-webkit-scrollbar { display: none; }`}</style>

      {categories.map(cat => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 12px',
              borderRadius: 8,
              border: isActive ? `1px solid ${gold}` : '1px solid rgba(255,255,255,0.06)',
              background: isActive ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
              color: isActive ? gold : 'rgba(255,255,255,0.5)',
              fontSize: 12,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
              letterSpacing: 0.2,
            }}
          >
            {CATEGORY_ICONS[cat]}
            {cat}
          </button>
        )
      })}

      <div style={{ flex: 1, minWidth: 16 }} />

      {/* Emergency toggle */}
      <button
        onClick={() => setOnlyEmergency(!onlyEmergency)}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 12px',
          borderRadius: 8,
          border: onlyEmergency ? '1px solid #E53E3E' : '1px solid rgba(229,62,62,0.25)',
          background: onlyEmergency ? 'rgba(229,62,62,0.18)' : 'rgba(229,62,62,0.05)',
          color: onlyEmergency ? '#FF6B6B' : 'rgba(255,107,107,0.5)',
          fontSize: 12,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: onlyEmergency ? 600 : 400,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'all 0.15s',
          flexShrink: 0,
          letterSpacing: 0.2,
        }}
      >
        <AlertTriangle size={11} />
        Nur Notfall
      </button>

      {/* Count badge */}
      <div style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: '3px 10px',
        fontSize: 11,
        color: 'rgba(255,255,255,0.3)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        flexShrink: 0,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {count}
      </div>
    </div>
  )
}
