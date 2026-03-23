import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

const gold = '#C9A84C'
const red = '#8B1A1A'

function createIcon(isEmergency, is24h, isSelected) {
  const bg = isEmergency ? '#C0392B' : is24h ? '#E67E22' : gold
  const size = isSelected ? 38 : 30
  const border = isSelected ? '3px solid white' : '2px solid rgba(255,255,255,0.8)'

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="13" fill="${bg}" stroke="white" stroke-width="2"/>
      <text x="15" y="20" text-anchor="middle" font-size="14" fill="white">
        ${isEmergency ? '🚨' : is24h ? '⏰' : '📍'}
      </text>
    </svg>
  `

  return L.divIcon({
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${bg};
      border: ${border};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${isSelected ? 16 : 13}px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      cursor: pointer;
      transition: transform 0.2s;
      transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
    ">${isEmergency ? '🚨' : is24h ? '⏰' : '🐴'}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

function FlyTo({ provider }) {
  const map = useMap()
  useEffect(() => {
    if (provider) {
      map.flyTo([provider.lat, provider.lng], 13, { duration: 1 })
    }
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
              <div style={{ fontFamily: 'Georgia, serif', minWidth: 180 }}>
                <strong style={{ color: red, fontSize: 14 }}>{p.name}</strong>
                <br />
                <span style={{ color: '#666', fontSize: 12 }}>{p.category}</span>
                <br />
                <span style={{ fontSize: 12 }}>{p.city}</span>
                {p.is_emergency && (
                  <div style={{ marginTop: 4, color: '#C0392B', fontSize: 11, fontWeight: 'bold' }}>
                    🚨 Notfalldienst
                  </div>
                )}
                {p.is_24h && (
                  <div style={{ color: '#E67E22', fontSize: 11, fontWeight: 'bold' }}>
                    ⏰ 24/7
                  </div>
                )}
                <button
                  onClick={() => onSelect(p)}
                  style={{
                    marginTop: 6,
                    padding: '3px 10px',
                    background: gold,
                    color: '#1A1A1A',
                    border: 'none',
                    borderRadius: 4,
                    fontSize: 11,
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  Details →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: 12,
        background: 'rgba(26,26,26,0.9)',
        borderRadius: 8,
        padding: '8px 12px',
        border: `1px solid ${gold}`,
        fontSize: 11,
        color: 'white',
        zIndex: 1000,
        pointerEvents: 'none',
      }}>
        <div style={{ marginBottom: 3 }}>🚨 Notfalldienst</div>
        <div style={{ marginBottom: 3 }}>⏰ 24/7 offen</div>
        <div>🐴 Regulärer Anbieter</div>
      </div>
    </div>
  )
}
