import { createContext, useContext, useMemo, useState } from 'react'
import { api } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('dummyjson_user')
    return raw ? JSON.parse(raw) : null
  })

  async function login(credentials) {
    const session = await api.login(credentials)
    localStorage.setItem('dummyjson_token', session.accessToken || session.token)
    localStorage.setItem('dummyjson_user', JSON.stringify(session))
    setUser(session)
    return session
  }

  function logout() {
    localStorage.removeItem('dummyjson_token')
    localStorage.removeItem('dummyjson_user')
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth doit être utilisé dans AuthProvider')
  }
  return ctx
}
