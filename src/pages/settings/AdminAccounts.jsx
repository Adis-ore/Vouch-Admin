import { useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import { ADMIN_ACCOUNTS } from '../../data/dummy'

const roleLabel = { super_admin: 'Super Admin', moderator: 'Moderator', support: 'Support' }
const roleColor = { super_admin: 'var(--accent)', moderator: 'var(--info)', support: 'var(--text-secondary)' }

export default function AdminAccounts() {
  const [accounts, setAccounts] = useState(ADMIN_ACCOUNTS)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('support')

  const addAdmin = (e) => {
    e.preventDefault()
    if (!email) return
    setAccounts(prev => [...prev, {
      id: `a${Date.now()}`,
      email,
      role,
      last_login: null,
      status: 'active',
    }])
    setEmail('')
    setRole('support')
  }

  const deactivate = (id) => {
    setAccounts(prev => prev.filter(a => a.id !== id))
  }

  const columns = [
    { key: 'email', title: 'Email', dataIndex: 'email' },
    {
      key: 'role', title: 'Role',
      render: a => (
        <span style={{
          fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
          background: 'var(--surface-alt)', color: roleColor[a.role] ?? 'var(--text-secondary)',
        }}>
          {roleLabel[a.role] ?? a.role}
        </span>
      ),
    },
    {
      key: 'last_login', title: 'Last Login',
      render: a => a.last_login
        ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(a.last_login).toLocaleDateString()}</span>
        : <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Never</span>,
    },
    {
      key: 'status', title: 'Status',
      render: a => (
        <span style={{
          fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
          background: 'rgba(62,207,170,0.1)', color: 'var(--success)',
        }}>
          {a.status}
        </span>
      ),
    },
    {
      key: 'actions', title: '',
      render: a => (
        <button
          className="btn-muted"
          style={{ color: 'var(--danger)' }}
          onClick={() => deactivate(a.id)}
        >
          Deactivate
        </button>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Admin Accounts" subtitle="Super admin access required to manage accounts" />

      <div className="panel">
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
          Add Admin Account
        </div>
        <form onSubmit={addAdmin} style={{ display: 'grid', gridTemplateColumns: '1fr 180px auto', gap: 12, alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@vouch.app"
              required
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>Role</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="super_admin">Super Admin</option>
              <option value="moderator">Moderator</option>
              <option value="support">Support</option>
            </select>
          </div>
          <button type="submit" className="btn-accent" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FiUserPlus size={14} />
            Add admin
          </button>
        </form>
      </div>

      <DataTable columns={columns} data={accounts} />
    </div>
  )
}
