import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { useDynamicProviders } from '../hooks/useDynamicProviders.jsx'
import { HorseshoeIcon } from '../components/icons'

const gold = '#C9A84C'
const red = '#8B1A1A'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout, updateUser } = useAuth()
  const { services, slots, addService, updateService, removeService, toggleService, addSlot, removeSlot } = useDynamicProviders()
  const myService = services.find(s => s.ownerId === user?.id)
  const mySlots = slots.filter(s => s.ownerId === user?.id)

  const [activeTab, setActiveTab] = useState('uebersicht')
  const [editBio, setEditBio] = useState(false)
  const [bioInput, setBioInput] = useState(user?.bio || '')
  const [showAddHorse, setShowAddHorse] = useState(false)
  const [horseForm, setHorseForm] = useState({ name: '', breed: '', age: '', color: '' })

  // Service form state
  const CATEGORIES = ['Hufschmied', 'Tierarzt', 'Sattler', 'Reha / Therapie', 'Trainer', 'Spezialangebot', 'Mobiler Notdienst']
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [serviceForm, setServiceForm] = useState({
    name: myService?.name || '',
    category: myService?.category || 'Hufschmied',
    address: myService?.address || '',
    city: myService?.city || '',
    lat: myService?.lat || '',
    lng: myService?.lng || '',
    phone: myService?.phone || '',
    website: myService?.website || '',
    specialization: myService?.specialization || '',
    notes: myService?.notes || '',
  })
  const setSvc = (f, v) => setServiceForm(s => ({ ...s, [f]: v }))

  // Slot form state
  const [showSlotForm, setShowSlotForm] = useState(false)
  const today = new Date().toISOString().split('T')[0]
  const [slotForm, setSlotForm] = useState({ date: today, timeFrom: '09:00', timeTo: '17:00', note: '', mobile_service: false })
  const setSlotF = (f, v) => setSlotForm(s => ({ ...s, [f]: v }))

  const saveService = () => {
    const data = {
      ...serviceForm,
      lat: parseFloat(serviceForm.lat) || 52.52,
      lng: parseFloat(serviceForm.lng) || 13.4,
      ownerId: user.id,
      ownerName: user.name,
    }
    if (myService) updateService(myService.id, data)
    else addService(data)
    setShowServiceForm(false)
  }

  const saveSlot = () => {
    if (!myService && !serviceForm.name) return
    addSlot({
      ...slotForm,
      ownerId: user.id,
      name: myService?.name || user.name,
      category: myService?.category || 'Dienstleister',
      address: myService?.address || '',
      city: myService?.city || user.region,
      lat: myService?.lat || 52.52,
      lng: myService?.lng || 13.4,
      phone: myService?.phone || '',
      specialization: myService?.specialization || '',
      opening_hours: `${slotForm.timeFrom}–${slotForm.timeTo}`,
    })
    setSlotForm({ date: today, timeFrom: '09:00', timeTo: '17:00', note: '', mobile_service: false })
    setShowSlotForm(false)
  }

  if (!user) {
    navigate('/auth')
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const saveBio = () => {
    updateUser({ bio: bioInput })
    setEditBio(false)
  }

  const addHorse = () => {
    if (!horseForm.name) return
    const newHorse = { id: Date.now(), ...horseForm }
    updateUser({ horses: [...(user.horses || []), newHorse] })
    setHorseForm({ name: '', breed: '', age: '', color: '' })
    setShowAddHorse(false)
  }

  const removeHorse = (id) => {
    updateUser({ horses: user.horses.filter(h => h.id !== id) })
  }

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const tabs = [
    { id: 'uebersicht', label: 'Übersicht' },
    ...(user.type === 'Dienstleister' ? [{ id: 'mein-dienst', label: myService ? '🟢 Mein Dienst' : '➕ Mein Dienst' }] : []),
    { id: 'pferde', label: `Meine Pferde${user.horses?.length ? ` (${user.horses.length})` : ''}` },
    { id: 'community', label: 'Community' },
    { id: 'einstellungen', label: 'Einstellungen' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'white',
    }}>
      {/* Top bar */}
      <div style={{
        background: 'linear-gradient(135deg, #6B0E0E 0%, #8B1A1A 50%, #7A1010 100%)',
        padding: '0 24px',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        boxShadow: '0 1px 0 rgba(201,168,76,0.3), 0 4px 20px rgba(0,0,0,0.4)',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8, color: 'rgba(255,255,255,0.7)',
            padding: '5px 14px', fontSize: 13, cursor: 'pointer',
          }}
        >
          ← Karte
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <HorseshoeIcon size={18} color={gold} />
          <span style={{ color: gold, fontWeight: 700, fontSize: 16 }}>HorseMap</span>
        </div>

        <div style={{ flex: 1 }} />

        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(139,26,26,0.3)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 8, color: 'rgba(255,255,255,0.6)',
            padding: '5px 14px', fontSize: 13, cursor: 'pointer',
          }}
        >
          Abmelden
        </button>
      </div>

      {/* Profile header */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(139,26,26,0.2) 0%, transparent 100%)',
        padding: '36px 24px 0',
        maxWidth: 860,
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginBottom: 28 }}>
          {/* Avatar */}
          <div style={{
            width: 80, height: 80, borderRadius: 24,
            background: `linear-gradient(135deg, ${red} 0%, #b8922e 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 800, color: 'white',
            border: `3px solid ${gold}`,
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            flexShrink: 0,
          }}>
            {initials}
          </div>

          <div style={{ flex: 1, paddingBottom: 4 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'white', lineHeight: 1 }}>
              {user.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
              <Badge color={user.type === 'Dienstleister' ? gold : '#4a9e6e'} text={user.type} />
              <Badge color="rgba(255,255,255,0.2)" text={user.region} small />
              <Badge color="rgba(255,255,255,0.1)" text={`Mitglied seit ${new Date(user.joinedAt).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}`} small />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 0,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          overflowX: 'auto',
        }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '12px 20px',
                background: 'transparent', border: 'none',
                color: activeTab === t.id ? gold : 'rgba(255,255,255,0.4)',
                fontSize: 14,
                fontWeight: activeTab === t.id ? 600 : 400,
                borderBottom: activeTab === t.id ? `2px solid ${gold}` : '2px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 24px', minHeight: '100vh', background: '#000000' }}>

        {/* ÜBERSICHT */}
        {activeTab === 'uebersicht' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {/* Bio Card */}
            <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={sectionTitle}>Über mich</span>
                <button onClick={() => { setEditBio(true); setBioInput(user.bio || '') }} style={ghostBtn}>Bearbeiten</button>
              </div>
              {editBio ? (
                <div>
                  <textarea
                    value={bioInput}
                    onChange={e => setBioInput(e.target.value)}
                    placeholder="Erzähl etwas über dich und deine Pferde…"
                    rows={3}
                    style={{
                      width: '100%', padding: '10px 12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(201,168,76,0.3)',
                      borderRadius: 10, color: 'white', fontSize: 14,
                      resize: 'none', outline: 'none',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      boxSizing: 'border-box',
                    }}
                  />
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button onClick={saveBio} style={primaryBtnSmall}>Speichern</button>
                    <button onClick={() => setEditBio(false)} style={ghostBtn}>Abbrechen</button>
                  </div>
                </div>
              ) : (
                <p style={{ color: user.bio ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {user.bio || 'Noch keine Bio hinzugefügt.'}
                </p>
              )}
            </div>

            {/* Stats */}
            {[
              { label: 'Pferde', value: user.horses?.length || 0, icon: '🐴' },
              { label: 'Favoriten', value: user.favorites?.length || 0, icon: '⭐' },
              { label: 'Bewertungen', value: 0, icon: '✍️' },
            ].map(s => (
              <div key={s.label} style={{ ...cardStyle, textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: gold }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}

            {/* Quick links */}
            <div style={cardStyle}>
              <div style={{ ...sectionTitle, marginBottom: 14 }}>Schnellzugriff</div>
              {[
                { label: '🗺️ Zur Karte', action: () => navigate('/') },
                { label: '🐴 Pferd hinzufügen', action: () => { setActiveTab('pferde'); setShowAddHorse(true) } },
                { label: '🔧 Dienstleister finden', action: () => navigate('/') },
              ].map(l => (
                <button key={l.label} onClick={l.action} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '10px 12px', marginBottom: 6,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 8, color: 'rgba(255,255,255,0.7)',
                  fontSize: 13, cursor: 'pointer',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  transition: 'all 0.15s',
                }}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PFERDE */}
        {activeTab === 'pferde' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Meine Pferde</h2>
              <button onClick={() => setShowAddHorse(true)} style={primaryBtnSmall}>
                + Pferd hinzufügen
              </button>
            </div>

            {showAddHorse && (
              <div style={{ ...cardStyle, marginBottom: 20, border: `1px solid rgba(201,168,76,0.3)` }}>
                <div style={{ ...sectionTitle, marginBottom: 16 }}>Neues Pferd</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { field: 'name', label: 'Name *', placeholder: 'Pferdename' },
                    { field: 'breed', label: 'Rasse', placeholder: 'z. B. Hannoveraner' },
                    { field: 'age', label: 'Alter', placeholder: 'z. B. 7' },
                    { field: 'color', label: 'Farbe', placeholder: 'z. B. Fuchs' },
                  ].map(f => (
                    <div key={f.field}>
                      <label style={{ ...labelStyle }}>{f.label}</label>
                      <input
                        value={horseForm[f.field]}
                        onChange={e => setHorseForm(h => ({ ...h, [f.field]: e.target.value }))}
                        placeholder={f.placeholder}
                        style={formInput}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <button onClick={addHorse} style={primaryBtnSmall}>Hinzufügen</button>
                  <button onClick={() => setShowAddHorse(false)} style={ghostBtn}>Abbrechen</button>
                </div>
              </div>
            )}

            {(!user.horses || user.horses.length === 0) && !showAddHorse ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(255,255,255,0.25)' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🐴</div>
                <div style={{ fontSize: 16 }}>Noch keine Pferde eingetragen.</div>
                <button onClick={() => setShowAddHorse(true)} style={{ ...primaryBtnSmall, marginTop: 16 }}>
                  Erstes Pferd hinzufügen
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
                {user.horses?.map(h => (
                  <div key={h.id} style={{ ...cardStyle, position: 'relative' }}>
                    <button
                      onClick={() => removeHorse(h.id)}
                      style={{
                        position: 'absolute', top: 12, right: 12,
                        background: 'rgba(139,26,26,0.3)', border: 'none',
                        borderRadius: 6, color: 'rgba(255,100,100,0.7)',
                        width: 24, height: 24, cursor: 'pointer', fontSize: 14,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >×</button>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🐴</div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 4 }}>{h.name}</div>
                    {h.breed && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{h.breed}</div>}
                    <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                      {h.age && <Badge color="rgba(255,255,255,0.1)" text={`${h.age} Jahre`} small />}
                      {h.color && <Badge color="rgba(255,255,255,0.1)" text={h.color} small />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* COMMUNITY */}
        {activeTab === 'community' && (
          <div>
            <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700 }}>Community</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {[
                {
                  icon: '💬', title: 'Forum', desc: 'Diskutiere mit anderen Pferdebesitzern über Haltung, Gesundheit und Training.',
                  badge: 'Bald verfügbar'
                },
                {
                  icon: '⭐', title: 'Bewertungen', desc: 'Bewerte Dienstleister und hilf anderen, die besten Anbieter zu finden.',
                  badge: 'Bald verfügbar'
                },
                {
                  icon: '📅', title: 'Termine & Events', desc: 'Turniermeldungen, Stallausritte und lokale Events in deiner Region.',
                  badge: 'Bald verfügbar'
                },
                {
                  icon: '🔔', title: 'Benachrichtigungen', desc: 'Erhalte Alerts wenn neue Dienstleister in deiner Region verfügbar sind.',
                  badge: 'Bald verfügbar'
                },
                {
                  icon: '📋', title: 'Gesundheitspass', desc: 'Digitaler Pass mit Impfungen, Behandlungen und Hufschmied-Terminen.',
                  badge: 'Phase 3'
                },
                {
                  icon: '🤝', title: 'Empfehlungen', desc: 'Teile und erhalte persönliche Empfehlungen von der Community.',
                  badge: 'Phase 4'
                },
              ].map(item => (
                <div key={item.title} style={{ ...cardStyle, opacity: 0.8 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</span>
                    <Badge color="rgba(201,168,76,0.2)" textColor={gold} text={item.badge} small />
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MEIN DIENST */}
        {activeTab === 'mein-dienst' && (
          <div>
            {/* Service Listing */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Mein Dienst auf der Karte</h2>
              {!showServiceForm && (
                <button onClick={() => setShowServiceForm(true)} style={primaryBtnSmall}>
                  {myService ? 'Bearbeiten' : '+ Dienst eintragen'}
                </button>
              )}
            </div>

            {/* Service form */}
            {showServiceForm && (
              <div style={{ ...cardStyle, marginBottom: 20, border: '1px solid rgba(201,168,76,0.3)' }}>
                <div style={{ ...sectionTitle, marginBottom: 18 }}>Dienstleister-Eintrag</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle}>Anzeigename *</label>
                    <input value={serviceForm.name} onChange={e => setSvc('name', e.target.value)} placeholder="z. B. Max Müller – Hufschmied" style={formInput} />
                  </div>
                  <div>
                    <label style={labelStyle}>Kategorie</label>
                    <select value={serviceForm.category} onChange={e => setSvc('category', e.target.value)} style={formInput}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Stadt</label>
                    <input value={serviceForm.city} onChange={e => setSvc('city', e.target.value)} placeholder="Berlin" style={formInput} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle}>Adresse</label>
                    <input value={serviceForm.address} onChange={e => setSvc('address', e.target.value)} placeholder="Musterstraße 1, 10115 Berlin" style={formInput} />
                  </div>
                  <div>
                    <label style={labelStyle}>Breitengrad (lat)</label>
                    <input value={serviceForm.lat} onChange={e => setSvc('lat', e.target.value)} placeholder="52.5200" style={formInput} />
                  </div>
                  <div>
                    <label style={labelStyle}>Längengrad (lng)</label>
                    <input value={serviceForm.lng} onChange={e => setSvc('lng', e.target.value)} placeholder="13.4050" style={formInput} />
                  </div>
                  <div>
                    <label style={labelStyle}>Telefon</label>
                    <input value={serviceForm.phone} onChange={e => setSvc('phone', e.target.value)} placeholder="+49 30 ..." style={formInput} />
                  </div>
                  <div>
                    <label style={labelStyle}>Website</label>
                    <input value={serviceForm.website} onChange={e => setSvc('website', e.target.value)} placeholder="https://..." style={formInput} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle}>Spezialisierung</label>
                    <input value={serviceForm.specialization} onChange={e => setSvc('specialization', e.target.value)} placeholder="z. B. Hufbeschlag, Hufkorrektur" style={formInput} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle}>Hinweise</label>
                    <textarea value={serviceForm.notes} onChange={e => setSvc('notes', e.target.value)} placeholder="Kurze Beschreibung..." rows={2} style={{ ...formInput, resize: 'none' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <button onClick={saveService} style={primaryBtnSmall}>Auf Karte veröffentlichen</button>
                  <button onClick={() => setShowServiceForm(false)} style={ghostBtn}>Abbrechen</button>
                  {myService && <button onClick={() => { removeService(myService.id); setShowServiceForm(false) }} style={{ ...ghostBtn, color: '#ff9999', borderColor: 'rgba(255,100,100,0.2)' }}>Eintrag löschen</button>}
                </div>
              </div>
            )}

            {/* Current listing */}
            {myService && !showServiceForm && (
              <div style={{ ...cardStyle, border: myService.isLive ? '1px solid rgba(74,158,110,0.4)' : '1px solid rgba(255,255,255,0.07)', marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 16, fontWeight: 700 }}>{myService.name}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                        background: myService.isLive ? 'rgba(74,158,110,0.2)' : 'rgba(255,255,255,0.08)',
                        color: myService.isLive ? '#6fcf97' : 'rgba(255,255,255,0.4)',
                      }}>
                        {myService.isLive ? '● Live auf Karte' : '○ Versteckt'}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>{myService.category} · {myService.city}</div>
                    {myService.specialization && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{myService.specialization}</div>}
                  </div>
                  <button onClick={() => toggleService(myService.id)} style={{
                    ...ghostBtn,
                    color: myService.isLive ? '#ff9999' : '#6fcf97',
                    borderColor: myService.isLive ? 'rgba(255,100,100,0.2)' : 'rgba(111,207,151,0.2)',
                    fontSize: 12,
                  }}>
                    {myService.isLive ? 'Ausblenden' : 'Aktivieren'}
                  </button>
                </div>
              </div>
            )}

            {/* Temporary slots */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Temporäre Verfügbarkeit</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                  Zeige für einen bestimmten Zeitraum an, wann und wo du verfügbar bist.
                </div>
              </div>
              {!showSlotForm && myService && (
                <button onClick={() => setShowSlotForm(true)} style={primaryBtnSmall}>+ Termin einstellen</button>
              )}
              {!myService && !showServiceForm && (
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Erst Dienst eintragen</span>
              )}
            </div>

            {showSlotForm && (
              <div style={{ ...cardStyle, marginBottom: 20, border: '1px solid rgba(201,168,76,0.25)' }}>
                <div style={{ ...sectionTitle, marginBottom: 16 }}>Neuer Verfügbarkeits-Termin</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Datum</label>
                    <input type="date" value={slotForm.date} onChange={e => setSlotF('date', e.target.value)} style={formInput} min={today} />
                  </div>
                  <div>
                    <label style={labelStyle}>Von</label>
                    <input type="time" value={slotForm.timeFrom} onChange={e => setSlotF('timeFrom', e.target.value)} style={formInput} />
                  </div>
                  <div>
                    <label style={labelStyle}>Bis</label>
                    <input type="time" value={slotForm.timeTo} onChange={e => setSlotF('timeTo', e.target.value)} style={formInput} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle}>Notiz (optional)</label>
                    <input value={slotForm.note} onChange={e => setSlotF('note', e.target.value)} placeholder="z. B. Nur Hufpflege, kein Beschlag" style={formInput} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 22 }}>
                    <input type="checkbox" id="mobile" checked={slotForm.mobile_service} onChange={e => setSlotF('mobile_service', e.target.checked)} style={{ accentColor: '#C9A84C', width: 15, height: 15 }} />
                    <label htmlFor="mobile" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>Mobiler Einsatz</label>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <button onClick={saveSlot} style={primaryBtnSmall}>Termin veröffentlichen</button>
                  <button onClick={() => setShowSlotForm(false)} style={ghostBtn}>Abbrechen</button>
                </div>
              </div>
            )}

            {/* Active slots list */}
            {mySlots.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {mySlots.map(slot => {
                  const expires = new Date(slot.activeUntil)
                  const isToday = expires.toDateString() === new Date().toDateString()
                  return (
                    <div key={slot.id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: 'rgba(201,168,76,0.15)', color: gold }}>
                            ● Live
                          </span>
                          <span style={{ fontSize: 14, fontWeight: 600 }}>
                            {slot.date} · {slot.opening_hours}
                          </span>
                        </div>
                        {slot.note && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{slot.note}</div>}
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
                          Läuft ab: {expires.toLocaleString('de-DE')}
                        </div>
                      </div>
                      <button onClick={() => removeSlot(slot.id)} style={{ ...ghostBtn, color: '#ff9999', borderColor: 'rgba(255,100,100,0.2)' }}>
                        Entfernen
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>
                Noch keine aktiven Termine.
              </div>
            )}
          </div>
        )}

        {/* EINSTELLUNGEN */}
        {activeTab === 'einstellungen' && (
          <div style={{ maxWidth: 500 }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700 }}>Einstellungen</h2>
            <div style={cardStyle}>
              <div style={{ ...sectionTitle, marginBottom: 16 }}>Profil</div>
              {[
                { label: 'Name', value: user.name },
                { label: 'E-Mail', value: user.email },
                { label: 'Typ', value: user.type },
                { label: 'Region', value: user.region },
              ].map(f => (
                <div key={f.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{f.label}</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{f.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%', padding: '12px',
                  borderRadius: 12,
                  border: '1px solid rgba(139,26,26,0.4)',
                  background: 'rgba(139,26,26,0.15)',
                  color: '#ff9999', fontSize: 14,
                  cursor: 'pointer',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                Abmelden
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Shared styles
const cardStyle = {
  background: '#1a1010',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 16,
  padding: '20px',
}

const sectionTitle = {
  fontSize: 13,
  fontWeight: 700,
  color: 'rgba(255,255,255,0.5)',
  textTransform: 'uppercase',
  letterSpacing: 0.8,
}

const ghostBtn = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8,
  color: 'rgba(255,255,255,0.5)',
  padding: '6px 14px',
  fontSize: 12,
  cursor: 'pointer',
  fontFamily: 'system-ui, -apple-system, sans-serif',
}

const primaryBtnSmall = {
  background: `linear-gradient(135deg, #C9A84C 0%, #b8922e 100%)`,
  border: 'none',
  borderRadius: 8,
  color: '#1a0a0a',
  padding: '7px 16px',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'system-ui, -apple-system, sans-serif',
}

const labelStyle = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.35)',
  letterSpacing: 0.5,
  marginBottom: 6,
  textTransform: 'uppercase',
}

const formInput = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: 'white',
  fontSize: 13,
  outline: 'none',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  boxSizing: 'border-box',
}

function Badge({ color, textColor, text, small }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: small ? '2px 8px' : '4px 12px',
      borderRadius: 20,
      background: color,
      color: textColor || 'rgba(255,255,255,0.8)',
      fontSize: small ? 11 : 12,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}>
      {text}
    </span>
  )
}
