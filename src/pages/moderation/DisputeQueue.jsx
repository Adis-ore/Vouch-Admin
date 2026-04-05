import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import { DISPUTES } from '../../data/dummy'

const statusColor = {
  open:         { bg: 'rgba(232,93,74,0.12)',  text: 'var(--danger)' },
  under_review: { bg: 'rgba(240,165,0,0.12)',  text: 'var(--warning)' },
  resolved:     { bg: 'rgba(62,207,170,0.12)', text: 'var(--success)' },
}

const typeLabel = {
  stake_not_returned: 'Stake not returned',
  partner_inactive:   'Partner inactive',
  technical_error:    'Technical error',
}

export default function DisputeQueue() {
  const [data, setData] = useState(DISPUTES)

  const updateStatus = (id, status) => {
    setData(prev => prev.map(d => d.id === id ? { ...d, status } : d))
  }

  const columns = [
    {
      key: 'reporter', title: 'Reporter',
      render: row => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.reporter}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.journey}</div>
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
          {row.description.length > 60 ? row.description.slice(0, 60) + '...' : row.description}
        </span>
      ),
    },
    { key: 'date', title: 'Reported', dataIndex: 'date' },
    {
      key: 'status', title: 'Status',
      render: row => {
        const s = statusColor[row.status] ?? { bg: 'var(--surface-alt)', text: 'var(--text-muted)' }
        return (
          <span style={{
            fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: 4,
            background: s.bg, color: s.text,
          }}>
            {row.status.replace('_', ' ')}
          </span>
        )
      },
    },
    {
      key: 'actions', title: '',
      render: row => (
        <select
          value={row.status}
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

  const open = data.filter(d => d.status === 'open').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader title="Dispute Queue" subtitle={`${open} open dispute${open !== 1 ? 's' : ''}`} />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
