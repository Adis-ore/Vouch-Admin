import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import { CATEGORIES } from '../../data/dummy'

export default function Categories() {
  const [data, setData] = useState(CATEGORIES)
  const [filter, setFilter] = useState('all')

  const toggle = (id) => {
    setData(prev => prev.map(c => c.id === id ? { ...c, disabled: !c.disabled } : c))
  }

  const visible = filter === 'disabled'
    ? data.filter(c => c.disabled)
    : filter === 'active'
    ? data.filter(c => !c.disabled)
    : data

  const columns = [
    {
      key: 'color', title: 'Color',
      render: c => (
        <div style={{ width: 20, height: 20, borderRadius: 4, background: c.color }} />
      ),
    },
    {
      key: 'name', title: 'Name',
      render: c => (
        <span style={{ fontWeight: 500, color: c.disabled ? 'var(--text-muted)' : 'var(--text-primary)' }}>
          {c.name}
        </span>
      ),
    },
    {
      key: 'active_journeys', title: 'Active Journeys',
      render: c => (
        <span style={{ color: 'var(--text-secondary)' }}>{c.active_journeys}</span>
      ),
    },
    {
      key: 'status', title: 'Status',
      render: c => (
        <span style={{
          fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
          background: c.disabled ? 'rgba(232,93,74,0.1)' : 'rgba(62,207,170,0.1)',
          color: c.disabled ? 'var(--danger)' : 'var(--success)',
        }}>
          {c.disabled ? 'Disabled' : 'Active'}
        </span>
      ),
    },
    {
      key: 'actions', title: '',
      render: c => (
        <button
          className="btn-muted"
          onClick={() => toggle(c.id)}
          style={c.disabled ? { color: 'var(--success)' } : { color: 'var(--danger)' }}
        >
          {c.disabled ? 'Enable' : 'Disable'}
        </button>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader title="Journey Categories" subtitle="Manage and disable categories" />

      <div style={{ display: 'flex', gap: 8 }}>
        {['all', 'active', 'disabled'].map(f => (
          <button
            key={f}
            className="btn-muted"
            onClick={() => setFilter(f)}
            style={filter === f ? { color: 'var(--accent)', borderColor: 'rgba(232,168,56,0.4)' } : {}}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={visible} />
    </div>
  )
}
