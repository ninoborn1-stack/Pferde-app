import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'horsemap_user'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = (email, password) => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const u = JSON.parse(stored)
      if (u.email === email) {
        setUser(u)
        return { ok: true }
      }
    }
    return { ok: false, error: 'E-Mail oder Passwort falsch.' }
  }

  const register = (data) => {
    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      type: data.type,
      region: data.region,
      avatar: null,
      joinedAt: new Date().toISOString(),
      horses: [],
      favorites: [],
      bio: '',
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    setUser(newUser)
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
