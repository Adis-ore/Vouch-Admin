import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import UserAvatar from '../../components/shared/UserAvatar'
import ExportButton from '../../components/shared/ExportButton'
import useQuery from '../../hooks/useQuery'
import { fetchUsers } from '../../lib/api'

async function loadUsers() {
  const res = await fetchUsers({ limit: 500 })
  return res.data || []
}

function exportCsv(data) {
  const rows = ['Name,Country,Region,Plan,Journeys,Streak,Reputation,Joined',
    ...data.map(u => `${u.full_name},${u.country ?? ''},${u.region ?? ''},${u.plan ?? ''},${u.journeys_completed ?? 0},${u.current_streak ?? 0},${u.reputation_score ?? 0},${u.created_at?.split('T')[0] ?? ''}`),
  ].join('\n')
  const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.setAttribute('download', 'users.csv')
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
}

export default function AllUsers() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const { data: all = [], loading, error } = useQuery(loadUsers)

  const data = useMemo(() => {
    if (!search) return all
    return all.filter(u => u.full_name?.toLowerCase().includes(search.toLowerCase()))
  }, [all, search])

  const columns = [
    {
      key: 'user', title: 'User',
      render: u => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UserAvatar name={u.full_name} />
          <div>
            <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{u.full_name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.plan ?? 'free'}</div>
          </div>
        </div>
      ),
    },
    { key: 'location', title: 'Location', render: u => [u.region, u.country].filter(Boolean).join(', ') || '—' },
    { key: 'journeys', title: 'Journeys', render: u => u.journeys_completed ?? 0 },
    { key: 'streak',   title: 'Streak',   render: u => `${u.current_streak ?? 0}d` },
    {
      key: 'reputation', title: 'Reputation',
      render: u => {
        const r = u.reputation_score ?? 0
        return <span style={{ fontWeight: 600, color: r >= 80 ? 'var(--success)' : r >= 50 ? 'var(--warning)' : 'var(--danger)' }}>{r}</span>
      },
    },
    { key: 'joined', title: 'Joined', render: u => u.created_at?.split('T')[0] ?? '—' },
    {
      key: 'actions', title: '',
      render: u => <button className="btn-muted" onClick={() => navigate(`/users/${u.id}`)}>View</button>,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        title="All Users"
        subtitle={loading ? 'Loading...' : `${data.length} users`}
        actions={<ExportButton onExport={() => exportCsv(data)} />}
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name..."
          style={{ marginLeft: 'auto', width: 220 }}
        />
      </div>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>Error: {error}</div>}
      <DataTable columns={columns} data={data} />
    </div>
  )
}
