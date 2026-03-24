import { createContext, useContext, useState, useEffect } from 'react'

const SERVICES_KEY = 'horsemap_services'    // permanent listings
const SLOTS_KEY = 'horsemap_slots'          // temporary availability slots

export const DynamicProvidersContext = createContext(null)

export function DynamicProvidersProvider({ children }) {
  const [services, setServices] = useState(() => load(SERVICES_KEY))
  const [slots, setSlots] = useState(() => loadSlots())

  // Prune expired slots on mount
  useEffect(() => {
    const now = new Date()
    const active = slots.filter(s => new Date(s.activeUntil) > now)
    if (active.length !== slots.length) {
      save(SLOTS_KEY, active)
      setSlots(active)
    }
  }, [])

  const addService = (service) => {
    const newService = { ...service, id: `svc_${Date.now()}`, isLive: true, isDynamic: true }
    const updated = [...services.filter(s => s.ownerId !== service.ownerId), newService]
    save(SERVICES_KEY, updated)
    setServices(updated)
    return newService
  }

  const updateService = (id, updates) => {
    const updated = services.map(s => s.id === id ? { ...s, ...updates } : s)
    save(SERVICES_KEY, updated)
    setServices(updated)
  }

  const removeService = (id) => {
    const updated = services.filter(s => s.id !== id)
    save(SERVICES_KEY, updated)
    setServices(updated)
  }

  const toggleService = (id) => {
    const updated = services.map(s => s.id === id ? { ...s, isLive: !s.isLive } : s)
    save(SERVICES_KEY, updated)
    setServices(updated)
  }

  const addSlot = (slot) => {
    const activeUntil = buildActiveUntil(slot.date, slot.timeTo)
    const newSlot = {
      ...slot,
      id: `slot_${Date.now()}`,
      isDynamic: true,
      isTemporary: true,
      activeUntil,
      is_emergency: false,
      is_24h: false,
      mobile_service: slot.mobile_service || false,
      status: 'open',
    }
    const updated = [...slots, newSlot]
    save(SLOTS_KEY, updated)
    setSlots(updated)
  }

  const removeSlot = (id) => {
    const updated = slots.filter(s => s.id !== id)
    save(SLOTS_KEY, updated)
    setSlots(updated)
  }

  // Returns all active dynamic providers (services + unexpired slots)
  const activeDynamic = [
    ...services.filter(s => s.isLive),
    ...slots.filter(s => new Date(s.activeUntil) > new Date()),
  ]

  return (
    <DynamicProvidersContext.Provider value={{
      services, slots, activeDynamic,
      addService, updateService, removeService, toggleService,
      addSlot, removeSlot,
    }}>
      {children}
    </DynamicProvidersContext.Provider>
  )
}

export function useDynamicProviders() {
  return useContext(DynamicProvidersContext)
}

function load(key) {
  try { return JSON.parse(localStorage.getItem(key)) || [] } catch { return [] }
}

function loadSlots() {
  try {
    const raw = JSON.parse(localStorage.getItem(SLOTS_KEY)) || []
    return raw.filter(s => new Date(s.activeUntil) > new Date())
  } catch { return [] }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function buildActiveUntil(date, timeTo) {
  if (!date || !timeTo) {
    // Default: active for 24h
    const d = new Date()
    d.setHours(d.getHours() + 24)
    return d.toISOString()
  }
  return new Date(`${date}T${timeTo}:00`).toISOString()
}
