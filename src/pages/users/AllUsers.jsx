import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import StatusBadge from '../../components/shared/StatusBadge'
import UserAvatar from '../../components/shared/UserAvatar'
import ExportButton from '../../components/shared/ExportButton'
import { USERS } from '../../data/dummy'

export default function AllUsers() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const data = useMemo(() => {
    let list = USERS
    if (filter === 'flagged')  list = list.filter(u => u.flagged)
    if (filter === 'suspended') list = list.filter(u => u.status === 'suspended')
    if (search) list = list.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
    return list
  }, [search, filter])

  const exportCsv = () => {
    const rows = ['Name,Phone,Country,Journeys,Streak,Reputation,Status',
      ...data.map(u => `${u.name},${u.phone},${u.country},${u.journeys},${u.streak},${u.reputation},${u.status}`),
    ].join('\n')
    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.setAttribute('download', 'users.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const columns = [
    {
      key: 'user', title: 'User',
      render: u => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UserAvatar name={u.name} />
          <div>
            <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{u.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.phone}</div>
          </div>
        </div>
      ),
    },
    { key: 'country', title: 'Location', render: u => `${u.region}, ${u.country}` },
    { key: 'journeys', title: 'Journeys', dataIndex: 'journeys' },
    { key: 'streak', title: 'Streak', render: u => `${u.streak}d` },
    {
      key: 'reputation', title: 'Reputation',
      render: u => (
        <span style={{ fontWeight: 600, color: u.reputation >= 80 ? 'var(--success)' : u.reputation >= 50 ? 'var(--warning)' : 'var(--danger)' }}>
          {u.reputation}
        </span>
      ),
    },
    { key: 'status', title: 'Status', render: u => <StatusBadge status={u.status} /> },
    { key: 'joined', title: 'Joined', dataIndex: 'joined' },
    {
      key: 'actions', title: '',
      render: u => (
        <button className="btn-muted" onClick={() => navigate(`/users/${u.id}`)}>
          View
        </button>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        title="All Users"
        subtitle={`${USERS.length} total users`}
        actions={<ExportButton onExport={exportCsv} />}
      />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {['all', 'flagged', 'suspended'].map(f => (
          <button
            key={f}
            className="btn-muted"
            onClick={() => setFilter(f)}
            style={filter === f ? { color: 'var(--accent)', borderColor: 'rgba(232,168,56,0.4)' } : {}}
          >
            {f === 'all' ? 'All users' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name..."
          style={{ marginLeft: 'auto', width: 200 }}
        />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}
