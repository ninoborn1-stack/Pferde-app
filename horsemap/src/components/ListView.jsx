import { Phone, Globe, AlertTriangle, Clock, Car } from 'lucide-react'

const gold = '#C9A84C'
const red = '#8B1A1A'

const CATEGORY_COLORS = {
  'Pferdeklinik': '#8B1A1A',
  'Tierarzt': '#2E6B9E',
  'Hufschmied': '#6B4226',
  'Sattler': '#7B5EA7',
  'Reha / Therapie': '#2E8B57',
  'Trainer': '#B8860B',
  'Spezialangebot': '#4A6B8B',
  'Mobiler Notdienst': '#C0392B',
  'Notfall-Netzwerk': '#C0392B',
}

export default function ListView({ providers, selected, onSelect }) {
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '12px 16px',
      background: '#FAFAF8',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 12,
      }}>
        {providers.map(p => (
          <div
            key={p.id}
            onClick={() => onSelect(p)}
            style={{
              background: 'white',
              borderRadius: 10,
              border: `2px solid ${selected?.id === p.id ? gold : '#E8E4DC'}`,
              padding: 14,
              cursor: 'pointer',
              boxShadow: selected?.id === p.id
                ? `0 4px 16px rgba(201,168,76,0.3)`
                : '0 2px 6px rgba(0,0,0,0.06)',
              transition: 'all 0.15s',
            }}
          >
            {/* Category badge + Emergency badges */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{
                background: CATEGORY_COLORS[p.category] || '#666',
                color: 'white',
                fontSize: 10,
                padding: '2px 7px',
                borderRadius: 20,
                fontFamily: 'Georgia, serif',
              }}>
                {p.category}
              </span>
              {p.is_emergency && (
                <span style={{
                  background: '#C0392B',
                  color: 'white',
                  fontSize: 10,
                  padding: '2px 7px',
                  borderRadius: 20,
                }}>
                  🚨 Notfall
                </span>
              )}
              {p.is_24h && (
                <span style={{
                  background: '#E67E22',
                  color: 'white',
                  fontSize: 10,
                  padding: '2px 7px',
                  borderRadius: 20,
                }}>
                  24/7
                </span>
              )}
              {p.mobile_service && (
                <span style={{
                  background: '#27AE60',
                  color: 'white',
                  fontSize: 10,
                  padding: '2px 7px',
                  borderRadius: 20,
                }}>
                  Mobil
                </span>
              )}
            </div>

            {/* Name */}
            <h3 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 14,
              fontWeight: 'bold',
              color: red,
              marginBottom: 4,
              lineHeight: 1.3,
            }}>
              {p.name}
            </h3>

            {/* City + Address */}
            <p style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>
              📍 {p.city}{p.address !== p.city ? ` · ${p.address}` : ''}
            </p>

            {/* Specialization */}
            {p.specialization && (
              <p style={{ fontSize: 11, color: '#888', marginBottom: 8, fontStyle: 'italic' }}>
                {p.specialization.length > 60 ? p.specialization.slice(0, 60) + '…' : p.specialization}
              </p>
            )}

            {/* Contact row */}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {p.phone && (
                <a
                  href={`tel:${p.phone}`}
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 11, color: red,
                    textDecoration: 'none',
                    border: `1px solid ${red}`,
                    borderRadius: 4,
                    padding: '2px 7px',
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
                    display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 11, color: '#555',
                    textDecoration: 'none',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    padding: '2px 7px',
                  }}
                >
                  <Globe size={10} /> Website
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {providers.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: 60, color: '#999' }}>
          <p style={{ fontSize: 32 }}>🐴</p>
          <p style={{ fontFamily: 'Georgia, serif', marginTop: 12 }}>Keine Anbieter gefunden.</p>
        </div>
      )}
    </div>
  )
}
