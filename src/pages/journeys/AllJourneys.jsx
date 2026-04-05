import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import StatusBadge from '../../components/shared/StatusBadge'
import { JOURNEYS } from '../../data/dummy'

export default function AllJourneys() {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const data = useMemo(() => {
    let list = JOURNEYS
    if (statusFilter !== 'all') list = list.filter(j => j.status === statusFilter)
    if (search) list = list.filter(j => j.title.toLowerCase().includes(search.toLowerCase()))
    return list
  }, [statusFilter, search])

  const columns = [
    {
      key: 'title', title: 'Journey',
      render: j => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{j.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{j.category} · {j.country}</div>
        </div>
      ),
    },
    { key: 'creator', title: 'Creator', dataIndex: 'creator' },
    { key: 'members', title: 'Members', dataIndex: 'members' },
    {
      key: 'stake', title: 'Stake',
      render: j => j.stake > 0 ? `₦${j.stake.toLocaleString()}` : 'Free',
    },
    { key: 'status', title: 'Status', render: j => <StatusBadge status={j.status} /> },
    { key: 'start', title: 'Start', render: j => j.start ?? '—' },
    {
      key: 'actions', title: '',
      render: j => (
        <button className="btn-muted" onClick={() => navigate(`/journeys/${j.id}`)}>
          View
        </button>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader title="All Journeys" subtitle={`${JOURNEYS.length} journeys total`} />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ minWidth: 140 }}
        >
          <option value="all">All statuses</option>
          <option value="open">Open</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="abandoned">Abandoned</option>
        </select>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title..."
          style={{ marginLeft: 'auto', width: 200 }}
        />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}
