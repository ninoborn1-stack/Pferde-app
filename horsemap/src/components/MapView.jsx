import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MARKER_SVG } from './icons'

const gold = '#C9A84C'
const red = '#8B1A1A'

function createIcon(isEmergency, is24h, isSelected) {
  const bg = isEmergency ? '#E53E3E' : is24h ? '#E67E22' : gold
  const size = isSelected ? 40 : 32
  const ringStyle = isSelected
    ? `box-shadow: 0 0 0 3px white, 0 0 0 5px ${bg}, 0 4px 16px rgba(0,0,0,0.4);`
    : `box-shadow: 0 2px 8px rgba(0,0,0,0.35);`
  const svg = isEmergency ? MARKER_SVG.emergency : is24h ? MARKER_SVG.clock : MARKER_SVG.horse

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
      ${ringStyle}
      cursor: pointer;
    ">${svg}</div>`,
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

// Inline SVG strings for use inside popup HTML
const PIN_SVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
const NOTFALL_SVG = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
const CLOCK_SVG = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E67E22" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
const TRUCK_SVG = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#27AE60" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`

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
              <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minWidth: 195, padding: '2px 0' }}>
                <div style={{ fontSize: 10, color: '#aaa', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>
                  {p.category}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 5, lineHeight: 1.3 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ display: 'inline-flex' }}>${PIN_SVG}</span>
                  ${p.city}
                </div>
                <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexWrap: 'wrap' }}>
                  ${p.is_emergency ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:600;color:#E53E3E;background:rgba(229,62,62,0.1);border:1px solid rgba(229,62,62,0.2);padding:2px 7px;border-radius:5px">${NOTFALL_SVG} Notfall</span>` : ''}
                  ${p.is_24h ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:600;color:#E67E22;background:rgba(230,126,34,0.1);border:1px solid rgba(230,126,34,0.2);padding:2px 7px;border-radius:5px">${CLOCK_SVG} 24/7</span>` : ''}
                  ${p.mobile_service ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:600;color:#27AE60;background:rgba(39,174,96,0.1);border:1px solid rgba(39,174,96,0.2);padding:2px 7px;border-radius:5px">${TRUCK_SVG} Mobil</span>` : ''}
                </div>
                <button
                  onclick="this.dispatchEvent(new CustomEvent('details', {bubbles:true}))"
                  style="width:100%;padding:6px 0;background:${gold};color:#1A1A1A;border:none;border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;font-family:system-ui,sans-serif;letter-spacing:0.2px;"
                >
                  Details anzeigen →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend — glassmorphism */}
      <LegendPanel />
    </div>
  )
}

function LegendPanel() {
  const items = [
    {
      label: 'Notfalldienst',
      color: '#FF7070',
      bg: '#E53E3E',
      svg: MARKER_SVG.emergency,
    },
    {
      label: '24/7 offen',
      color: '#F0A050',
      bg: '#E67E22',
      svg: MARKER_SVG.clock,
    },
    {
      label: 'Regulär',
      color: gold,
      bg: gold,
      svg: MARKER_SVG.horse,
    },
  ]

  return (
    <div style={{
      position: 'absolute',
      bottom: 28,
      left: 14,
      background: 'rgba(12, 12, 12, 0.78)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderRadius: 12,
      padding: '10px 14px',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      zIndex: 1000,
      pointerEvents: 'none',
    }}>
      <div style={{
        fontSize: 9,
        fontWeight: 700,
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        marginBottom: 9,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        Legende
      </div>
      {items.map(({ label, color, bg, svg }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7 }}>
          <div style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: bg,
            border: '2px solid rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          <span style={{
            fontSize: 11,
            color,
            fontWeight: 500,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>{label}</span>
        </div>
      ))}
    </div>
  )
}
