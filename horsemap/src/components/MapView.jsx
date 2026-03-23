import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

const gold = '#C9A84C'
const red = '#8B1A1A'

function createIcon(isEmergency, is24h, isSelected) {
  const bg = isEmergency ? '#E53E3E' : is24h ? '#E67E22' : gold
  const size = isSelected ? 40 : 32
  const ring = isSelected ? `box-shadow: 0 0 0 3px white, 0 0 0 5px ${bg}, 0 4px 16px rgba(0,0,0,0.4);` : `box-shadow: 0 2px 8px rgba(0,0,0,0.35);`
  const emoji = isEmergency ? '🚨' : is24h ? '⏰' : '🐴'

  return L.divIcon({
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${bg};
      border: 2.5px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${isSelected ? 17 : 14}px;
      ${ring}
      cursor: pointer;
      transition: all 0.2s;
    ">${emoji}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })
}

function FlyTo({ provider }) {
  const map = useMap()
  useEffect(() => {
    if (provider) map.flyTo([provider.lat, provider.lng], 13, { duration: 0.9 })
  }, [provider, map])
  return null
}

export default function MapView({ providers, selected, onSelect }) {
  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <MapContainer
        center={[52.52, 13.405]}
        zoom={9}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selected && <FlyTo provider={selected} />}
        {providers.map(p => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={createIcon(p.is_emergency, p.is_24h, selected?.id === p.id)}
            eventHandlers={{ click: () => onSelect(p) }}
          >
            <Popup>
              <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minWidth: 190, padding: '2px 0' }}>
                <div style={{ fontSize: 10, color: '#999', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>
                  {p.category}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 4, lineHeight: 1.3 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  📍 {p.city}
                </div>
                <div style={{ display: 'flex', gap: 5, marginBottom: 8, flexWrap: 'wrap' }}>
                  {p.is_emergency && <PopupBadge label="Notfall" color="#E53E3E" />}
                  {p.is_24h && <PopupBadge label="24/7" color="#E67E22" />}
                  {p.mobile_service && <PopupBadge label="Mobil" color="#27AE60" />}
                </div>
                <button
                  onClick={() => onSelect(p)}
                  style={{
                    width: '100%',
                    padding: '6px 0',
                    background: gold,
                    color: '#1A1A1A',
                    border: 'none',
                    borderRadius: 7,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: 0.2,
                  }}
                >
                  Details anzeigen →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend — glassmorphism */}
      <div style={{
        position: 'absolute',
        bottom: 28,
        left: 14,
        background: 'rgba(15, 15, 15, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 12,
        padding: '10px 14px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: 1000,
        pointerEvents: 'none',
      }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          Legende
        </div>
        {[
          { emoji: '🚨', label: 'Notfalldienst', color: '#FF7070' },
          { emoji: '⏰', label: '24/7 offen', color: '#F0A050' },
          { emoji: '🐴', label: 'Regulärer Anbieter', color: gold },
        ].map(({ emoji, label, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <span style={{ fontSize: 13 }}>{emoji}</span>
            <span style={{ fontSize: 11, color, fontWeight: 500 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PopupBadge({ label, color }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 600,
      color, background: `${color}18`,
      border: `1px solid ${color}40`,
      padding: '2px 7px', borderRadius: 5,
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>{label}</span>
  )
}
