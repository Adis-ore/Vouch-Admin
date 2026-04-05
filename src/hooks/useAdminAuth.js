import { useEffect, useMemo, useState } from 'react'

export default function useAdminAuth() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin_session')
      if (raw) {
        const session = JSON.parse(raw)
        if (session?.user && session?.admin) {
          setUser(session.user)
          setAdmin(session.admin)
        }
      }
    } catch {
      // invalid session
    }
    setLoading(false)
  }, [])

  return useMemo(() => ({ user, admin, loading }), [user, admin, loading])
}
