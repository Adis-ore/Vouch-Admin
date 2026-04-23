import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import useQuery from '../../hooks/useQuery'
import { fetchDisputes, updateDisputeStatus } from '../../lib/api'

const statusColor = {
  open:         { bg: 'rgba(232,93,74,0.12)',  text: 'var(--danger)' },
  under_review: { bg: 'rgba(240,165,0,0.12)',  text: 'var(--warning)' },
  resolved:     { bg: 'rgba(62,207,170,0.12)', text: 'var(--success)' },
}

const typeLabel = {
  stake_not_returned: 'Stake not returned',
  partner_inactive:   'Partner inactive',
  technical_error:    'Technical error',
  other:              'Other',
}

async function loadDisputes() {
  const res = await fetchDisputes({ limit: 100 })
  return res.data || []
}

export default function DisputeQueue() {
  const { data = [], loading, error, refetch } = useQuery(loadDisputes)
  const [updating, setUpdating] = useState({})

  const updateStatus = async (id, status) => {
    setUpdating(u => ({ ...u, [id]: true }))
    try {
      await updateDisputeStatus(id, status)
      refetch()
    } finally {
      setUpdating(u => { const n = { ...u }; delete n[id]; return n })
    }
  }

  const columns = [
    {
      key: 'reporter', title: 'Reporter',
      render: row => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.reporter?.full_name ?? '—'}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.journey?.title ?? '—'}</div>
        </div>
      ),
    },
    {
      key: 'type', title: 'Type',
      render: row => <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{typeLabel[row.type] ?? row.type}</span>,
    },
    {
      key: 'description', title: 'Description',
      render: row => (
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {(row.description?.length ?? 0) > 60 ? row.description.slice(0, 60) + '...' : (row.description ?? '—')}
        </span>
      ),
    },
    { key: 'date', title: 'Reported', render: row => row.created_at?.split('T')[0] ?? '—' },
    {
      key: 'status', title: 'Status',
      render: row => {
        const s = statusColor[row.status] ?? { bg: 'var(--surface-alt)', text: 'var(--text-muted)' }
        return (
          <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: 4, background: s.bg, color: s.text }}>
            {(row.status ?? 'open').replace('_', ' ')}
          </span>
        )
      },
    },
    {
      key: 'actions', title: '',
      render: row => (
        <select
          value={row.status ?? 'open'}
          disabled={updating[row.id]}
          onChange={e => updateStatus(row.id, e.target.value)}
          style={{ fontSize: 12, minWidth: 130 }}
        >
          <option value="open">Open</option>
          <option value="under_review">Under review</option>
          <option value="resolved">Resolved</option>
        </select>
      ),
    },
  ]

  const rows = data || []
  const open = rows.filter(d => d.status === 'open').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader title="Dispute Queue" subtitle={loading ? 'Loading...' : `${open} open dispute${open !== 1 ? 's' : ''}`} />
      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>Error: {error}</div>}
      <DataTable columns={columns} data={rows} />
    </div>
  )
}
