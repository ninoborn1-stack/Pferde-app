import { useState } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import MapView from './components/MapView'
import ListView from './components/ListView'
import DetailPanel from './components/DetailPanel'
import providers from './data/providers.json'
import './index.css'

const CATEGORIES = ['Alle', 'Pferdeklinik', 'Tierarzt', 'Hufschmied', 'Sattler', 'Reha / Therapie', 'Trainer', 'Spezialangebot', 'Mobiler Notdienst', 'Notfall-Netzwerk']

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Alle')
  const [onlyEmergency, setOnlyEmergency] = useState(false)
  const [view, setView] = useState('map')
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = providers.filter(p => {
    const matchCat = activeCategory === 'Alle' || p.category === activeCategory
    const matchEmergency = !onlyEmergency || p.is_emergency
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchEmergency && matchSearch
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#FAFAF8' }}>
      <Header view={view} setView={setView} search={search} setSearch={setSearch} />
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
