import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, AlertOctagon, Clock, Truck } from 'lucide-react'
import { MARKER_SVG } from './icons'

const gold = '#C9A84C'

function createIcon(isEmergency, is24h, isSelected) {
  const bg = isEmergency ? '#E53E3E' : is24h ? '#E67E22' : gold
  const size = isSelected ? 40 : 32
  const ringStyle = isSelected
    ? `box-shadow: 0 0 0 3px white, 0 0 0 5px ${bg}, 0 4px 16px rgba(0,0,0,0.4);`
    : `box-shadow: 0 2px 8px rgba(0,0,0,0.35);`
  const svg = isEmergency ? MARKER_SVG.emergency : is24h ? MARKER_SVG.clock : MARKER_SVG.horse

  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${bg};border:2.5px solid white;display:flex;align-items:center;justify-content:center;${ringStyle}cursor:pointer;">${svg}</div>`,
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

function TrackpadHandler() {
  const map = useMap()
  useEffect(() => {
    const container = map.getContainer()

    const onWheel = (e) => {
      e.preventDefault()
      e.stopPropagation()

      // macOS pinch-to-zoom sends wheel events with ctrlKey=true
      if (e.ctrlKey) {
        const currentZoom = map.getZoom()
        const delta = -e.deltaY * 0.05
        map.setZoom(currentZoom + delta, { animate: true, duration: 0.1 })
        return
      }

      // Horizontal swipe or diagonal → pan
      if (Math.abs(e.deltaX) > 2 || Math.abs(e.deltaY) > 2) {
        map.panBy([e.deltaX * 1.2, e.deltaY * 1.2], { animate: false })
      }
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  }, [map])
  return null
}

function ProviderPopup({ p, onSelect }) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minWidth: 195, padding: '2px 0' }}>
      <div style={{ fontSize: 10, color: '#aaa', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>
        {p.category}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 5, lineHeight: 1.3 }}>
        {p.name}
      </div>
      <div style={{ fontSize: 12, color: '#888', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
        <MapPin size={11} color="#bbb" />
        {p.city}
      </div>
      <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexWrap: 'wrap' }}>
        {p.is_emergency && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10, fontWeight: 600, color: '#E53E3E', background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.2)', padding: '2px 7px', borderRadius: 5 }}>
            <AlertOctagon size={9} /> Notfall
          </span>
        )}
        {p.is_24h && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10, fontWeight: 600, color: '#E67E22', background: 'rgba(230,126,34,0.1)', border: '1px solid rgba(230,126,34,0.2)', padding: '2px 7px', borderRadius: 5 }}>
            <Clock size={9} /> 24/7
          </span>
        )}
        {p.mobile_service && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10, fontWeight: 600, color: '#27AE60', background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.2)', padding: '2px 7px', borderRadius: 5 }}>
            <Truck size={9} /> Mobil
          </span>
        )}
      </div>
      <button
        onClick={() => onSelect(p)}
        style={{
          width: '100%',
          padding: '7px 0',
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
  )
}

export default function MapView({ providers, selected, onSelect }) {
  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <MapContainer
        center={[52.52, 13.405]}
        zoom={9}
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
        zoomControl={true}
        dragging={true}
        touchZoom={true}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        boxZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TrackpadHandler />
        {selected && <FlyTo provider={selected} />}
        {providers.map(p => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={createIcon(p.is_emergency, p.is_24h, selected?.id === p.id)}
            eventHandlers={{ click: () => onSelect(p) }}
          >
            <Popup>
              <ProviderPopup p={p} onSelect={onSelect} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <LegendPanel />
    </div>
  )
}

function LegendPanel() {
  const items = [
    { label: 'Notfalldienst', color: '#FF7070', bg: '#E53E3E', svg: MARKER_SVG.emergency },
    { label: '24/7 offen',    color: '#F0A050', bg: '#E67E22', svg: MARKER_SVG.clock },
    { label: 'Regulär',       color: gold,      bg: gold,      svg: MARKER_SVG.horse },
  ]

  return (
    <div style={{
      position: 'absolute',
      bottom: 28,
      left: 14,
      background: 'rgba(12,12,12,0.78)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderRadius: 12,
      padding: '10px 14px',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      zIndex: 1000,
      pointerEvents: 'none',
    }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 9, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        Legende
      </div>
      {items.map(({ label, color, bg, svg }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7 }}>
          <div
            style={{ width: 24, height: 24, borderRadius: '50%', background: bg, border: '2px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          <span style={{ fontSize: 11, color, fontWeight: 500, fontFamily: 'system-ui, -apple-system, sans-serif' }}>{label}</span>
        </div>
      ))}
    </div>
  )
}
