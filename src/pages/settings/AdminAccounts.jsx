import { FiUserPlus } from '../../vendor/react-icons-fi'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import useQuery from '../../hooks/useQuery'
import { fetchAdminAccounts } from '../../lib/api'

async function loadAccounts() {
  const res = await fetchAdminAccounts()
  return res.data || []
}

export default function AdminAccounts() {
  const { data = [], loading, error } = useQuery(loadAccounts)

  const columns = [
    { key: 'name', title: 'Name', render: a => <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{a.full_name ?? '—'}</span> },
    {
      key: 'role', title: 'Role',
      render: () => (
        <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: 'var(--surface-alt)', color: 'var(--accent)' }}>
          Super Admin
        </span>
      ),
    },
    {
      key: 'joined', title: 'Joined',
      render: a => <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.created_at?.split('T')[0] ?? '—'}</span>,
    },
    {
      key: 'status', title: 'Status',
      render: () => (
        <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: 'rgba(62,207,170,0.1)', color: 'var(--success)' }}>
          active
        </span>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Admin Accounts" subtitle="Users with is_admin = true" />

      <div className="panel" style={{ fontSize: 13, color: 'var(--text-muted)', padding: '12px 16px' }}>
        To grant admin access, run: <code style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>UPDATE public.users SET is_admin = TRUE WHERE id = '&lt;user_id&gt;'</code>
      </div>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>Error: {error}</div>}
      {loading ? <div style={{ color: 'var(--text-muted)', padding: 16 }}>Loading...</div> : <DataTable columns={columns} data={data} />}
    </div>
  )
}
