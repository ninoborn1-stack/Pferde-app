import {
  X, Phone, Globe, Mail, Clock, MapPin,
  AlertTriangle, Truck, AlertOctagon, MessageCircle,
} from 'lucide-react'
import { HorseshoeIcon, WhatsAppIcon } from './icons'

const gold = '#C9A84C'
const red = '#8B1A1A'

export default function DetailPanel({ provider: p, onClose }) {
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
        background: 'linear-gradient(135deg, #6B0E0E 0%, #8B1A1A 100%)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
      }}>
        <div style={{
          width: 36, height: 36,
          borderRadius: 9,
          background: 'rgba(201,168,76,0.15)',
          border: '1px solid rgba(201,168,76,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
        }}>
          <HorseshoeIcon size={18} color={gold} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 10,
            color: gold,
            marginBottom: 3,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}>
            {p.category}
            {p.subcategory && p.subcategory !== p.category && ` · ${p.subcategory}`}
          </div>
          <h2 style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 16,
            fontWeight: 700,
            color: 'white',
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: -0.2,
          }}>
            {p.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 7,
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.7)',
            flexShrink: 0,
            transition: 'background 0.15s',
          }}
        >
          <X size={15} />
        </button>
      </div>

      {/* Status badges */}
      <div style={{
        padding: '10px 16px',
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        background: '#F7F4EE',
        borderBottom: '1px solid #EDE9E0',
      }}>
        {p.is_emergency && (
          <Badge Icon={AlertOctagon} label="Notfalldienst" color="#E53E3E" bg="rgba(229,62,62,0.1)" border="rgba(229,62,62,0.2)" />
        )}
        {p.is_24h && (
          <Badge Icon={Clock} label="24/7" color="#E67E22" bg="rgba(230,126,34,0.1)" border="rgba(230,126,34,0.2)" />
        )}
        {p.mobile_service && (
          <Badge Icon={Truck} label="Mobiler Service" color="#27AE60" bg="rgba(39,174,96,0.1)" border="rgba(39,174,96,0.2)" />
        )}
        {!p.is_emergency && !p.is_24h && (
          <Badge label="Nur Termin" color="#888" bg="rgba(0,0,0,0.05)" border="rgba(0,0,0,0.1)" />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>

        <Section title="Standort">
          <Row icon={<MapPin size={13} color={gold} />}>
            <span style={{ fontSize: 13, fontFamily: 'system-ui, -apple-system, sans-serif' }}>{p.address}</span>
          </Row>
          <Row icon={<MapPin size={13} color="transparent" />}>
            <span style={{ fontSize: 12, color: '#888', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{p.city} · {p.region}</span>
          </Row>
        </Section>

        {p.opening_hours && (
          <Section title="Öffnungszeiten">
            <Row icon={<Clock size={13} color={gold} />}>
              <span style={{ fontSize: 13, fontFamily: 'system-ui, -apple-system, sans-serif' }}>{p.opening_hours}</span>
            </Row>
            {p.emergency_note && (
              <div style={{
                marginTop: 8,
                padding: '8px 10px',
                background: '#FFFBF0',
                borderRadius: 7,
                borderLeft: '3px solid #E67E22',
                fontSize: 12,
                color: '#7B4000',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                lineHeight: 1.5,
                display: 'flex',
                gap: 7,
                alignItems: 'flex-start',
              }}>
                <AlertTriangle size={13} color="#E67E22" style={{ flexShrink: 0, marginTop: 1 }} />
                {p.emergency_note}
              </div>
            )}
          </Section>
        )}

        {p.specialization && (
          <Section title="Spezialisierung">
            <p style={{ fontSize: 13, color: '#444', lineHeight: 1.6, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {p.specialization}
            </p>
          </Section>
        )}

        {p.notes && (
          <Section title="Hinweis">
            <p style={{ fontSize: 12, color: '#777', lineHeight: 1.6, fontFamily: 'system-ui, -apple-system, sans-serif', fontStyle: 'italic' }}>
              {p.notes}
            </p>
          </Section>
        )}

        <Section title="Kontakt">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {p.phone && (
              <ContactBtn href={`tel:${p.phone}`} icon={<Phone size={14} />} label={p.phone} bg={red} color="white" />
            )}
            {p.emergency_phone && p.emergency_phone !== p.phone && (
              <ContactBtn href={`tel:${p.emergency_phone}`} icon={<AlertOctagon size={14} />} label={`Notfall: ${p.emergency_phone}`} bg="#E53E3E" color="white" />
            )}
            {p.phone && (
              <ContactBtn
                href={`https://wa.me/${p.phone.replace(/\D/g, '')}`}
                icon={<WhatsAppIcon size={14} color="white" />}
                label="WhatsApp"
                bg="#25D366"
                color="white"
                external
              />
            )}
            {p.website && (
              <ContactBtn href={p.website} icon={<Globe size={14} />} label="Website öffnen" bg={gold} color="#1A1A1A" external />
            )}
            {p.email && (
              <ContactBtn href={`mailto:${p.email}`} icon={<Mail size={14} />} label={p.email} bg="#F0ECE4" color="#444" />
            )}
          </div>
          {!p.phone && !p.website && !p.email && (
            <p style={{ fontSize: 12, color: '#aaa', fontStyle: 'italic', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Keine Kontaktdaten verfügbar.
            </p>
          )}
        </Section>
      </div>
    </div>
  )
}

function Badge({ Icon, label, color, bg, border }) {
  return (
    <span style={{
      display: 'flex', alignItems: 'center', gap: 4,
      background: bg,
      color,
      border: `1px solid ${border}`,
      fontSize: 11,
      fontWeight: 600,
      padding: '3px 9px',
      borderRadius: 7,
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {Icon && <Icon size={10} />}
      {label}
    </span>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h4 style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 10,
        fontWeight: 700,
        color: gold,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 8,
        borderBottom: '1px solid #EDE9E0',
        paddingBottom: 5,
      }}>
        {title}
      </h4>
      {children}
    </div>
  )
}

function Row({ icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 5 }}>
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
        display: 'flex', alignItems: 'center', gap: 9,
        padding: '9px 14px',
        background: bg,
        color,
        borderRadius: 9,
        textDecoration: 'none',
        fontSize: 13,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: 600,
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        transition: 'opacity 0.15s',
        letterSpacing: 0.1,
      }}
    >
      {icon}
      {label}
    </a>
  )
}
