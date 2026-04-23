import { useState, useEffect, useCallback } from 'react'
import { FiLogOut, FiSun, FiMoon } from '../../vendor/react-icons-fi'
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

  const [confirmOpen, setConfirmOpen] = useState(false)

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
        onClick={() => setConfirmOpen(true)}
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

      {confirmOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setConfirmOpen(false)}>
          <div style={{
            background: 'var(--surface)', borderRadius: 12,
            border: '1px solid var(--border)',
            padding: '28px 28px 24px',
            width: 340, display: 'flex', flexDirection: 'column', gap: 16,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--text-primary)' }}>Sign out?</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Are you sure you want to sign out of the admin panel?
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setConfirmOpen(false)}
                style={{
                  fontSize: 13, padding: '7px 16px', borderRadius: 6,
                  background: 'var(--surface-alt)', border: '1px solid var(--border)',
                  color: 'var(--text-secondary)', cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={logout}
                style={{
                  fontSize: 13, padding: '7px 16px', borderRadius: 6,
                  background: 'var(--danger)', border: 'none',
                  color: '#fff', cursor: 'pointer', fontWeight: 600,
                }}
              >
                Yes, sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
