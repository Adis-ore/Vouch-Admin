import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const roleLabel = { super_admin: 'Super Admin', moderator: 'Moderator', support: 'Support' }

export default function TopBar({ user, admin }) {
  const navigate = useNavigate()

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
