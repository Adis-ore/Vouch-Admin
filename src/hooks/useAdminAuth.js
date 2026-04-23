import { useEffect, useMemo, useState } from 'react'

export default function useAdminAuth() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin_session')
      if (raw) {
        const session = JSON.parse(raw)
        if (session?.token && session?.user) {
          setToken(session.token)
          setUser(session.user)
        }
      }
    } catch {
      // invalid session
    }
    setLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem('admin_session')
    setUser(null)
    setToken(null)
  }

  return useMemo(() => ({ user, admin: user, token, loading, logout }), [user, token, loading])
}
