import { NavLink } from 'react-router-dom'
import {
  FiGrid, FiUsers, FiFlag, FiMapPin, FiCompass,
  FiAlertTriangle, FiMessageSquare, FiCreditCard, FiTrendingDown, FiRepeat,
  FiTag, FiBell, FiShield, FiSettings, FiBarChart2, FiTrendingUp,
} from '../../vendor/react-icons-fi'

const sections = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard',    path: '/dashboard',    icon: FiGrid },
      { label: 'Analytics',    path: '/analytics',    icon: FiBarChart2 },
    ],
  },
  {
    label: 'Users',
    items: [
      { label: 'All Users',     path: '/users',         icon: FiUsers },
      { label: 'Flagged Users', path: '/users/flagged', icon: FiFlag  },
    ],
  },
  {
    label: 'Journeys',
    items: [
      { label: 'All Journeys',  path: '/journeys',      icon: FiCompass },
      { label: 'Open Journeys', path: '/journeys/open', icon: FiMapPin  },
    ],
  },
  {
    label: 'Moderation',
    items: [
      { label: 'Flagged Check-ins', path: '/moderation/checkins', icon: FiAlertTriangle },
      { label: 'Dispute Queue',     path: '/moderation/disputes', icon: FiMessageSquare },
    ],
  },
  {
    label: 'Payments',
    items: [
      { label: 'Stakes',           path: '/payments/stakes',          icon: FiCreditCard  },
      { label: 'Forfeiture Log',   path: '/payments/forfeitures',     icon: FiTrendingDown },
      { label: 'Refund Log',       path: '/payments/refunds',         icon: FiTrendingUp  },
      { label: 'Refund Failures',  path: '/payments/refund-failures', icon: FiRepeat      },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Categories', path: '/content/categories', icon: FiTag },
    ],
  },
  {
    label: 'Communications',
    items: [
      { label: 'Push Notifications', path: '/communications/push', icon: FiBell },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Admin Accounts',  path: '/settings/accounts', icon: FiShield   },
      { label: 'Platform Config', path: '/settings/config',   icon: FiSettings },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: 240,
      minWidth: 240,
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      height: '100vh',
      position: 'sticky',
      top: 0,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <img src="/favicon.svg" alt="Vouch" width={24} height={24} style={{ flexShrink: 0 }} />
          <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>Vouch</span>
        </div>
        <span style={{
          fontSize: 11, color: 'var(--text-muted)',
          background: 'var(--surface-alt)', border: '1px solid var(--border)',
          borderRadius: 4, padding: '2px 6px',
        }}>
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 8px 24px', flex: 1 }}>
        {sections.map(section => (
          <div key={section.label} style={{ marginBottom: 4 }}>
            <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
              color: 'var(--text-muted)', textTransform: 'uppercase',
              padding: '10px 12px 4px',
            }}>
              {section.label}
            </div>
            {section.items.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 12px',
                  borderRadius: 6,
                  marginBottom: 1,
                  fontSize: 14,
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(232,168,56,0.08)' : 'transparent',
                  borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'all 0.15s',
                  textDecoration: 'none',
                })}
                onMouseEnter={e => {
                  if (!e.currentTarget.classList.contains('active-nav')) {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.background = 'var(--surface-alt)'
                  }
                }}
                onMouseLeave={e => {
                  const isActive = e.currentTarget.getAttribute('aria-current') === 'page'
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <item.icon size={15} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    background: 'var(--danger)', color: '#fff',
                    borderRadius: 99, padding: '1px 6px', minWidth: 18, textAlign: 'center',
                  }}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
