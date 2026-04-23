import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import StatusBadge from '../../components/shared/StatusBadge'
import useQuery from '../../hooks/useQuery'
import { fetchJourneys } from '../../lib/api'

async function loadJourneys() {
  const res = await fetchJourneys({ limit: 500 })
  return res.data || []
}

export default function AllJourneys() {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const { data: all = [], loading, error } = useQuery(loadJourneys)

  const data = useMemo(() => {
    let list = all
    if (statusFilter !== 'all') list = list.filter(j => j.status === statusFilter)
    if (search) list = list.filter(j => j.title?.toLowerCase().includes(search.toLowerCase()))
    return list
  }, [all, statusFilter, search])

  const columns = [
    {
      key: 'title', title: 'Journey',
      render: j => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{j.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{j.category} · {j.country ?? 'Global'}</div>
        </div>
      ),
    },
    {
      key: 'creator', title: 'Creator',
      render: j => j.creator?.full_name ?? '—',
    },
    {
      key: 'members', title: 'Members',
      render: j => `${j.current_participants ?? 0}/${j.max_participants ?? '?'}`,
    },
    {
      key: 'stake', title: 'Stake',
      render: j => j.stake_amount > 0 ? `₦${Number(j.stake_amount).toLocaleString()}` : 'Free',
    },
    { key: 'status', title: 'Status', render: j => <StatusBadge status={j.status} /> },
    { key: 'start',  title: 'Start', render: j => j.start_date ?? '—' },
    {
      key: 'actions', title: '',
      render: j => <button className="btn-muted" onClick={() => navigate(`/journeys/${j.id}`)}>View</button>,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader title="All Journeys" subtitle={loading ? 'Loading...' : `${data.length} journeys`} />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ minWidth: 140 }}>
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
          style={{ marginLeft: 'auto', width: 220 }}
        />
      </div>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>Error: {error}</div>}
      <DataTable columns={columns} data={data} />
    </div>
  )
}
