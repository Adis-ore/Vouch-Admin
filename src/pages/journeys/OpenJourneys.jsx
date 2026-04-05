import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import { JOURNEYS, CATEGORIES } from '../../data/dummy'

const openJourneys = JOURNEYS.filter(j => j.status === 'open')

export default function OpenJourneys() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  const data = useMemo(() => {
    let list = openJourneys
    if (category !== 'all') list = list.filter(j => j.category === category)
    if (search) list = list.filter(j => j.title.toLowerCase().includes(search.toLowerCase()))
    return list
  }, [category, search])

  const columns = [
    {
      key: 'title', title: 'Journey',
      render: j => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{j.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{j.country}</div>
        </div>
      ),
    },
    { key: 'creator', title: 'Creator', dataIndex: 'creator' },
    { key: 'category', title: 'Category', dataIndex: 'category' },
    { key: 'members', title: 'Members', dataIndex: 'members' },
    {
      key: 'stake', title: 'Stake',
      render: j => j.stake > 0 ? `₦${j.stake.toLocaleString()}` : 'Free',
    },
    {
      key: 'featured', title: 'Featured',
      render: j => (
        <span style={{ fontSize: 12, color: j.featured ? 'var(--accent)' : 'var(--text-muted)' }}>
          {j.featured ? 'Yes' : 'No'}
        </span>
      ),
    },
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
      <PageHeader title="Open Journeys" subtitle="Awaiting a partner — match or promote" />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ minWidth: 160 }}>
          <option value="all">All categories</option>
          {CATEGORIES.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
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
