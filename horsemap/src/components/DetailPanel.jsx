import { X, Phone, Globe, Mail, Clock, MapPin, AlertTriangle, Truck } from 'lucide-react'

const gold = '#C9A84C'
const red = '#8B1A1A'

export default function DetailPanel({ provider: p, onClose }) {
  const whatsappNumber = p.phone ? p.phone.replace(/\s+/g, '').replace(/^\+/, '') : null

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%',
      maxWidth: 360,
      height: '100%',
      background: 'white',
      boxShadow: '-4px 0 24px rgba(0,0,0,0.2)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      borderLeft: `3px solid ${gold}`,
    }}>
      {/* Header */}
      <div style={{
        background: red,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: gold, marginBottom: 3, fontFamily: 'Georgia, serif' }}>
            {p.category}
            {p.subcategory && p.subcategory !== p.category && ` · ${p.subcategory}`}
          </div>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            lineHeight: 1.3,
          }}>
            {p.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: 6,
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            flexShrink: 0,
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Status badges */}
      <div style={{
        padding: '10px 16px',
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        background: '#F5F0E8',
        borderBottom: `1px solid #E8E4DC`,
      }}>
        {p.is_emergency && (
          <span style={{
            background: '#C0392B', color: 'white',
            fontSize: 11, padding: '3px 10px', borderRadius: 20,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <AlertTriangle size={10} /> Notfalldienst
          </span>
        )}
        {p.is_24h && (
          <span style={{
            background: '#E67E22', color: 'white',
            fontSize: 11, padding: '3px 10px', borderRadius: 20,
          }}>
            ⏰ 24/7
          </span>
        )}
        {p.mobile_service && (
          <span style={{
            background: '#27AE60', color: 'white',
            fontSize: 11, padding: '3px 10px', borderRadius: 20,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Truck size={10} /> Mobiler Service
          </span>
        )}
        {!p.is_emergency && !p.is_24h && (
          <span style={{
            background: '#555', color: 'white',
            fontSize: 11, padding: '3px 10px', borderRadius: 20,
          }}>
            Nur Termin
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>

        {/* Location */}
        <Section title="Standort">
          <Row icon={<MapPin size={13} color={gold} />}>
            <span style={{ fontSize: 13 }}>{p.address}</span>
          </Row>
          <Row icon={<span style={{ fontSize: 11, color: gold }}>📍</span>}>
            <span style={{ fontSize: 13 }}>{p.city} · {p.region}</span>
          </Row>
        </Section>

        {/* Hours */}
        {p.opening_hours && (
          <Section title="Öffnungszeiten">
            <Row icon={<Clock size={13} color={gold} />}>
              <span style={{ fontSize: 13 }}>{p.opening_hours}</span>
            </Row>
            {p.emergency_note && (
              <div style={{
                marginTop: 6,
                padding: '6px 10px',
                background: '#FFF3CD',
                borderRadius: 6,
                borderLeft: '3px solid #E67E22',
                fontSize: 12,
                color: '#7B4000',
              }}>
                ⚠️ {p.emergency_note}
              </div>
            )}
          </Section>
        )}

        {/* Specialization */}
        {p.specialization && (
          <Section title="Spezialisierung">
            <p style={{ fontSize: 13, color: '#444', lineHeight: 1.5 }}>{p.specialization}</p>
          </Section>
        )}

        {/* Notes */}
        {p.notes && (
          <Section title="Hinweis">
            <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5, fontStyle: 'italic' }}>{p.notes}</p>
          </Section>
        )}

        {/* Contact buttons */}
        <Section title="Kontakt">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {p.phone && (
              <ContactBtn
                href={`tel:${p.phone}`}
                icon={<Phone size={14} />}
                label={p.phone}
                bg={red}
                color="white"
              />
            )}
            {p.emergency_phone && p.emergency_phone !== p.phone && (
              <ContactBtn
                href={`tel:${p.emergency_phone}`}
                icon={<AlertTriangle size={14} />}
                label={`Notfall: ${p.emergency_phone}`}
                bg="#C0392B"
                color="white"
              />
            )}
            {p.phone && (
              <ContactBtn
                href={`https://wa.me/${p.phone.replace(/\D/g, '')}`}
                icon={<span style={{ fontSize: 14 }}>💬</span>}
                label="WhatsApp"
                bg="#25D366"
                color="white"
                external
              />
            )}
            {p.website && (
              <ContactBtn
                href={p.website}
                icon={<Globe size={14} />}
                label="Website öffnen"
                bg={gold}
                color="#1A1A1A"
                external
              />
            )}
            {p.email && (
              <ContactBtn
                href={`mailto:${p.email}`}
                icon={<Mail size={14} />}
                label={p.email}
                bg="#E8E4DC"
                color="#333"
              />
            )}
          </div>

          {!p.phone && !p.website && !p.email && (
            <p style={{ fontSize: 12, color: '#999', fontStyle: 'italic' }}>
              Keine Kontaktdaten verfügbar.
            </p>
          )}
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h4 style={{
        fontFamily: 'Georgia, serif',
        fontSize: 11,
        fontWeight: 'bold',
        color: '#C9A84C',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
        borderBottom: '1px solid #E8E4DC',
        paddingBottom: 4,
      }}>
        {title}
      </h4>
      {children}
    </div>
  )
}

function Row({ icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
      <span style={{ flexShrink: 0, marginTop: 1 }}>{icon}</span>
      {children}
    </div>
  )
}

function ContactBtn({ href, icon, label, bg, color, external }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '9px 14px',
        background: bg,
        color: color,
        borderRadius: 8,
        textDecoration: 'none',
        fontSize: 13,
        fontFamily: 'Georgia, serif',
        fontWeight: 'bold',
        boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
        transition: 'opacity 0.15s',
      }}
    >
      {icon}
      {label}
    </a>
  )
}
