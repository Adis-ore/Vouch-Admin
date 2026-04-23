import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import useQuery from '../../hooks/useQuery'
import { fetchJourneys } from '../../lib/api'

async function loadOpen() {
  const res = await fetchJourneys({ status: 'open', limit: 200 })
  return res.data || []
}

const CATEGORIES = ['Learning', 'Fitness', 'Habit', 'Career', 'Faith', 'Finance']

export default function OpenJourneys() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const { data: all = [], loading, error } = useQuery(loadOpen)

  const data = useMemo(() => {
    let list = all
    if (category !== 'all') list = list.filter(j => j.category === category)
    if (search) list = list.filter(j => j.title?.toLowerCase().includes(search.toLowerCase()))
    return list
  }, [all, category, search])

  const columns = [
    {
      key: 'title', title: 'Journey',
      render: j => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{j.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{j.country ?? 'Global'}</div>
        </div>
      ),
    },
    { key: 'creator', title: 'Creator', render: j => j.creator?.full_name ?? '—' },
    { key: 'category', title: 'Category', render: j => j.category ?? '—' },
    { key: 'members', title: 'Members', render: j => `${j.current_participants ?? 0}/${j.max_participants ?? '?'}` },
    { key: 'stake', title: 'Stake', render: j => j.stake_amount > 0 ? `₦${Number(j.stake_amount).toLocaleString()}` : 'Free' },
    {
      key: 'actions', title: '',
      render: j => <button className="btn-muted" onClick={() => navigate(`/journeys/${j.id}`)}>View</button>,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader title="Open Journeys" subtitle={loading ? 'Loading...' : `${data.length} awaiting a partner`} />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ minWidth: 160 }}>
          <option value="all">All categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title..." style={{ marginLeft: 'auto', width: 200 }} />
      </div>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>Error: {error}</div>}
      <DataTable columns={columns} data={data} />
    </div>
  )
}
