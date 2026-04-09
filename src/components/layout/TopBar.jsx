import { useState, useEffect } from 'react'
import { FiLogOut, FiSun, FiMoon } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const roleLabel = { super_admin: 'Super Admin', moderator: 'Moderator', support: 'Support' }

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('vouch-admin-theme')
    if (stored) return stored
  } catch (e) {}
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function TopBar({ user, admin }) {
  const navigate = useNavigate()
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('vouch-admin-theme', theme) } catch (e) {}
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const logout = () => {
    localStorage.removeItem('admin_session')
    navigate('/login')
  }

  return (
    <header style={{
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 24px',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      gap: 12,
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
        {user?.email ?? 'admin@vouch.app'}
      </span>
      <span style={{
        fontSize: 12, padding: '3px 8px', borderRadius: 4,
        background: 'rgba(232,168,56,0.12)', color: 'var(--accent)',
        border: '1px solid rgba(232,168,56,0.2)',
        fontWeight: 600,
      }}>
        {roleLabel[admin?.role] ?? 'Admin'}
      </span>
      <button
        onClick={toggleTheme}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 32, height: 32, borderRadius: 6,
          background: 'var(--surface-alt)', border: '1px solid var(--border)',
          color: 'var(--text-secondary)', cursor: 'pointer',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
      </button>
      <button
        onClick={logout}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 13, padding: '6px 12px', borderRadius: 6,
          background: 'var(--surface-alt)', border: '1px solid var(--border)',
          color: 'var(--text-secondary)', cursor: 'pointer',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <FiLogOut size={14} />
        Sign out
      </button>
    </header>
  )
}
