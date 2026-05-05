// frontend/src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi, getToken, clearToken } from '../services/api'

const AppContext = createContext(null)

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

const DEFAULT_USER = {
  name: 'Alex Johnson',
  grade: '11th Grade',
  avatar: null,
  streak: 14,
  points: 2840,
  dailyProgress: 72,
  subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
  targetExam: 'SAT',
  examDate: '2025-08-15',
}

export function AppProvider({ children }) {
  const [darkMode,   setDarkMode]   = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user,       setUser]       = useState(DEFAULT_USER)
  const [loading,    setLoading]    = useState(true)
  const [apiError,   setApiError]   = useState(null)

  useEffect(() => {
    const token = getToken()
    if (token) {
      authApi.getMe()
        .then(data => { setUser(u => ({ ...u, ...data })); setIsLoggedIn(true) })
        .catch(() => clearToken())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const toggleDark = () => {
    setDarkMode(d => !d)
    document.documentElement.classList.toggle('dark')
  }

  const login = (userData) => {
    setUser(u => ({ ...u, ...userData }))
    setIsLoggedIn(true)
    setApiError(null)
  }

  const logout = () => {
    authApi.logout()
    setIsLoggedIn(false)
    setUser(DEFAULT_USER)
  }

  const refreshUser = async () => {
    try {
      const data = await authApi.getMe()
      setUser(u => ({ ...u, ...data }))
    } catch (e) {
      console.warn('Could not refresh user:', e.message)
    }
  }

  return (
    <AppContext.Provider value={{
      darkMode, toggleDark,
      isLoggedIn, login, logout,
      user, setUser, refreshUser,
      loading, apiError, setApiError,
    }}>
      {children}
    </AppContext.Provider>
  )
}
