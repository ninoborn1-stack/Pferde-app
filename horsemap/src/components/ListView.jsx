import {
  Phone, Globe, MapPin, AlertOctagon, Clock, Truck,
  Hospital, Stethoscope, Hammer, Scissors, Activity,
  Target, Sparkles, Map,
} from 'lucide-react'
import { HorseshoeIcon } from './icons'

const gold = '#C9A84C'
const red = '#8B1A1A'

const CATEGORY_STYLES = {
  'Pferdeklinik':     { bg: 'rgba(139,26,26,0.1)',   color: '#E07070', border: 'rgba(139,26,26,0.2)',   Icon: Hospital },
  'Tierarzt':         { bg: 'rgba(46,107,158,0.1)',  color: '#6BAED6', border: 'rgba(46,107,158,0.2)',  Icon: Stethoscope },
  'Hufschmied':       { bg: 'rgba(107,66,38,0.1)',   color: '#C08050', border: 'rgba(107,66,38,0.2)',   Icon: Hammer },
  'Sattler':          { bg: 'rgba(123,94,167,0.1)',  color: '#A080CC', border: 'rgba(123,94,167,0.2)',  Icon: Scissors },
  'Reha / Therapie':  { bg: 'rgba(46,139,87,0.1)',   color: '#5EAD7A', border: 'rgba(46,139,87,0.2)',   Icon: Activity },
  'Trainer':          { bg: 'rgba(201,168,76,0.1)',  color: '#C9A84C', border: 'rgba(201,168,76,0.2)',  Icon: Target },
  'Spezialangebot':   { bg: 'rgba(74,107,139,0.1)',  color: '#7AADD6', border: 'rgba(74,107,139,0.2)',  Icon: Sparkles },
  'Mobiler Notdienst':{ bg: 'rgba(192,57,43,0.1)',   color: '#FF7070', border: 'rgba(192,57,43,0.2)',   Icon: Truck },
  'Notfall-Netzwerk': { bg: 'rgba(192,57,43,0.1)',   color: '#FF7070', border: 'rgba(192,57,43,0.2)',   Icon: Globe },
}

export default function ListView({ providers, selected, onSelect }) {
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '16px 20px',
      background: '#F4F1EB',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 14,
      }}>
        {providers.map(p => {
          const isSelected = selected?.id === p.id
          const cat = CATEGORY_STYLES[p.category] || { bg: 'rgba(100,100,100,0.1)', color: '#999', border: 'rgba(100,100,100,0.2)', Icon: Map }
          const CatIcon = cat.Icon

          return (
            <div
              key={p.id}
              onClick={() => onSelect(p)}
              style={{
                background: 'white',
                borderRadius: 14,
                border: isSelected ? `1.5px solid ${gold}` : '1.5px solid rgba(0,0,0,0.06)',
                padding: '16px 18px',
                cursor: 'pointer',
                boxShadow: isSelected
                  ? `0 0 0 3px rgba(201,168,76,0.15), 0 8px 24px rgba(0,0,0,0.1)`
                  : '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.18s, border-color 0.18s, transform 0.12s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                if (!isSelected) e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = isSelected
                  ? '0 0 0 3px rgba(201,168,76,0.15), 0 8px 24px rgba(0,0,0,0.1)'
                  : '0 2px 8px rgba(0,0,0,0.06)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Left accent bar */}
              <div style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: 3,
                background: p.is_emergency ? '#E53E3E' : p.is_24h ? '#E67E22' : cat.color,
                borderRadius: '14px 0 0 14px',
              }} />

              {/* Category + badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{
                  background: cat.bg,
                  color: cat.color,
                  border: `1px solid ${cat.border}`,
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 6,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: 0.3,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <CatIcon size={10} />
                  {p.category}
                </span>
                {p.isTemporary && <Badge color="#A855F7" bg="rgba(168,85,247,0.1)" border="rgba(168,85,247,0.25)" Icon={Clock} label="● Live-Termin" />}
                {p.isDynamic && !p.isTemporary && <Badge color="#22c55e" bg="rgba(34,197,94,0.1)" border="rgba(34,197,94,0.25)" Icon={null} label="● Neu eingetragen" />}
                {p.is_emergency && <Badge color="#FF5555" bg="rgba(255,85,85,0.1)" border="rgba(255,85,85,0.2)" Icon={AlertOctagon} label="Notfall" />}
                {p.is_24h && <Badge color="#E67E22" bg="rgba(230,126,34,0.1)" border="rgba(230,126,34,0.2)" Icon={Clock} label="24/7" />}
                {p.mobile_service && <Badge color="#27AE60" bg="rgba(39,174,96,0.1)" border="rgba(39,174,96,0.2)" Icon={Truck} label="Mobil" />}
              </div>

              {/* Name */}
              <h3 style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 15,
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: 5,
                lineHeight: 1.3,
                letterSpacing: -0.2,
              }}>
                {p.name}
              </h3>

              {/* Location */}
              <p style={{
                fontSize: 12,
                color: '#888',
                marginBottom: 8,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <MapPin size={11} color="#bbb" />
                {p.city}{p.region && p.region !== p.city ? ` · ${p.region}` : ''}
              </p>

              {/* Specialization */}
              {p.specialization && (
                <p style={{
                  fontSize: 11.5,
                  color: '#999',
                  marginBottom: 12,
                  lineHeight: 1.5,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}>
                  {p.specialization.length > 65 ? p.specialization.slice(0, 65) + '…' : p.specialization}
                </p>
              )}

              {/* Divider */}
              <div style={{ height: 1, background: '#F0EDE6', margin: '0 0 10px' }} />

              {/* Contact buttons */}
              <div style={{ display: 'flex', gap: 6 }}>
                {p.phone && (
                  <a
                    href={`tel:${p.phone}`}
                    onClick={e => e.stopPropagation()}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontSize: 11, fontWeight: 600,
                      color: red,
                      textDecoration: 'none',
                      background: 'rgba(139,26,26,0.06)',
                      border: '1px solid rgba(139,26,26,0.15)',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}
                  >
                    <Phone size={10} /> Anrufen
                  </a>
                )}
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontSize: 11, fontWeight: 600,
                      color: '#666',
                      textDecoration: 'none',
                      background: 'rgba(0,0,0,0.03)',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}
                  >
                    <Globe size={10} /> Website
                  </a>
                )}
                <div style={{ flex: 1 }} />
                <span style={{ fontSize: 11, color: '#ccc', alignSelf: 'center', fontFamily: 'system-ui' }}>
                  Details →
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {providers.length === 0 && (
        <div style={{
          textAlign: 'center',
          marginTop: 80,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <HorseshoeIcon size={52} color="#D4C9A8" />
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#999' }}>Keine Anbieter gefunden</p>
          <p style={{ fontSize: 13, color: '#bbb', marginTop: 6 }}>Filter anpassen oder Suche zurücksetzen</p>
        </div>
      )}
    </div>
  )
}

function Badge({ color, bg, border, Icon, label }) {
  return (
    <span style={{
      background: bg,
      color,
      border: `1px solid ${border}`,
      fontSize: 10,
      fontWeight: 600,
      padding: '2px 7px',
      borderRadius: 6,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      letterSpacing: 0.3,
      display: 'flex', alignItems: 'center', gap: 3,
    }}>
      {Icon && <Icon size={9} />}
      {label}
    </span>
  )
}
