import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import MapView from './components/MapView'
import ListView from './components/ListView'
import DetailPanel from './components/DetailPanel'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import { useAuth } from './hooks/useAuth.jsx'
import { useDynamicProviders } from './hooks/useDynamicProviders.jsx'
import staticProviders from './data/providers.json'
import './index.css'

const CATEGORIES = ['Alle', 'Pferdeklinik', 'Tierarzt', 'Hufschmied', 'Sattler', 'Reha / Therapie', 'Trainer', 'Spezialangebot', 'Mobiler Notdienst', 'Notfall-Netzwerk']

function MapApp() {
  const { user } = useAuth()
  const { activeDynamic } = useDynamicProviders()
  const [activeCategory, setActiveCategory] = useState('Alle')
  const [onlyEmergency, setOnlyEmergency] = useState(false)
  const [view, setView] = useState('map')
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')

  // Merge static + dynamic providers
  const allProviders = [...staticProviders, ...activeDynamic]

  const filtered = allProviders.filter(p => {
    const matchCat = activeCategory === 'Alle' || p.category === activeCategory
    const matchEmergency = !onlyEmergency || p.is_emergency
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.city || '').toLowerCase().includes(search.toLowerCase())
    return matchCat && matchEmergency && matchSearch
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#FAFAF8' }}>
      <Header view={view} setView={setView} search={search} setSearch={setSearch} user={user} />
      <FilterBar
        categories={CATEGORIES}
        active={activeCategory}
        setActive={setActiveCategory}
        onlyEmergency={onlyEmergency}
        setOnlyEmergency={setOnlyEmergency}
        count={filtered.length}
      />
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex' }}>
        {view === 'map' ? (
          <MapView providers={filtered} selected={selected} onSelect={setSelected} />
        ) : (
          <ListView providers={filtered} selected={selected} onSelect={setSelected} />
        )}
        {selected && (
          <DetailPanel provider={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/Pferde-app">
      <Routes>
        <Route path="/" element={<MapApp />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profil" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}
