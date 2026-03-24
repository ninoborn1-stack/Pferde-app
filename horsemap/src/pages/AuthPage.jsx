import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { HorseshoeIcon } from '../components/icons'

const gold = '#C9A84C'
const red = '#8B1A1A'
const darkRed = '#6B0E0E'

const REGIONS = [
  'Berlin', 'Brandenburg', 'Sachsen', 'Sachsen-Anhalt',
  'Mecklenburg-Vorpommern', 'Thüringen', 'Bayern', 'Sonstiges'
]

export default function AuthPage() {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    type: 'Pferdebesitzer', region: 'Berlin'
  })

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (mode === 'login') {
      const res = login(form.email, form.password)
      if (res.ok) navigate('/profil')
      else setError(res.error)
    } else {
      if (!form.name || !form.email) {
        setError('Bitte alle Pflichtfelder ausfüllen.')
        return
      }
      register(form)
      navigate('/profil')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1a0a0a 0%, #2d1010 40%, #1a1a0a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Back to map */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: 20, left: 20,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8, color: 'rgba(255,255,255,0.6)',
          padding: '6px 14px', fontSize: 13, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
        }}
      >
        ← Zur Karte
      </button>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 16,
          background: 'rgba(201,168,76,0.12)',
          border: `1px solid rgba(201,168,76,0.3)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <HorseshoeIcon size={28} color={gold} />
        </div>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, color: gold, letterSpacing: 0.5 }}>HorseMap</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: 0.8, marginTop: 2 }}>
            BERLIN · BRANDENBURG
          </div>
        </div>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      }}>
        {/* Tab toggle */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              style={{
                flex: 1, padding: '16px 0',
                background: mode === m ? 'rgba(201,168,76,0.08)' : 'transparent',
                border: 'none', cursor: 'pointer',
                color: mode === m ? gold : 'rgba(255,255,255,0.35)',
                fontSize: 14, fontWeight: mode === m ? 700 : 400,
                letterSpacing: 0.3,
                borderBottom: mode === m ? `2px solid ${gold}` : '2px solid transparent',
                transition: 'all 0.2s',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              {m === 'login' ? 'Anmelden' : 'Registrieren'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '28px 28px 24px' }}>
          {mode === 'register' && (
            <>
              <Field label="Name" value={form.name} onChange={v => set('name', v)} placeholder="Dein vollständiger Name" />

              {/* Type selector */}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Ich bin</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Pferdebesitzer', 'Dienstleister'].map(t => (
                    <button
                      key={t} type="button"
                      onClick={() => set('type', t)}
                      style={{
                        flex: 1, padding: '10px 0',
                        borderRadius: 10,
                        border: form.type === t
                          ? `1.5px solid ${gold}`
                          : '1.5px solid rgba(255,255,255,0.1)',
                        background: form.type === t
                          ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
                        color: form.type === t ? gold : 'rgba(255,255,255,0.5)',
                        fontSize: 13, fontWeight: form.type === t ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                      }}
                    >
                      {t === 'Pferdebesitzer' ? '🐴 Pferdebesitzer' : '🔧 Dienstleister'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region */}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Region</label>
                <select
                  value={form.region}
                  onChange={e => set('region', e.target.value)}
                  style={inputStyle}
                >
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </>
          )}

          <Field label="E-Mail" type="email" value={form.email} onChange={v => set('email', v)} placeholder="deine@email.de" />
          <Field label="Passwort" type="password" value={form.password} onChange={v => set('password', v)} placeholder="••••••••" />

          {error && (
            <div style={{
              background: 'rgba(139,26,26,0.25)',
              border: '1px solid rgba(139,26,26,0.4)',
              borderRadius: 8, padding: '10px 14px',
              color: '#ff9999', fontSize: 13, marginBottom: 16,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '13px 0',
              borderRadius: 12,
              border: 'none',
              background: `linear-gradient(135deg, ${gold} 0%, #b8922e 100%)`,
              color: '#1a0a0a',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 0.3,
              marginTop: 4,
              boxShadow: '0 4px 20px rgba(201,168,76,0.25)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {mode === 'login' ? 'Anmelden' : 'Konto erstellen'}
          </button>

          {mode === 'register' && (
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
              Dies ist eine Demo. Keine echten Daten erforderlich.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.45)',
  letterSpacing: 0.5,
  marginBottom: 7,
  textTransform: 'uppercase',
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: 'white',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  boxSizing: 'border-box',
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        autoComplete={type === 'password' ? 'current-password' : 'on'}
      />
    </div>
  )
}
