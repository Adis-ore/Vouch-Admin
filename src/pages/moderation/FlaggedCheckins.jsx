import { useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import StatusBadge from '../../components/shared/StatusBadge'
import { FLAGGED_CHECKINS } from '../../data/dummy'

export default function FlaggedCheckins() {
  const [data, setData] = useState(FLAGGED_CHECKINS)

  const resolve = (id, action) => {
    setData(prev => prev.map(item =>
      item.id === id ? { ...item, status: action } : item
    ))
  }

  const columns = [
    {
      key: 'user', title: 'User',
      render: row => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.user}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.journey}</div>
        </div>
      ),
    },
    { key: 'date', title: 'Date', dataIndex: 'date' },
    {
      key: 'note', title: 'Check-in Note',
      render: row => (
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {row.note.length > 45 ? row.note.slice(0, 45) + '...' : row.note}
        </span>
      ),
    },
    {
      key: 'proof', title: 'Proof',
      render: row => row.proof
        ? <a href={row.proof} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--info)', fontSize: 12 }}>
            View <FiExternalLink size={11} />
          </a>
        : <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>None</span>,
    },
    {
      key: 'flags', title: 'Flags',
      render: row => (
        <span style={{ fontWeight: 700, color: row.flag_count >= 3 ? 'var(--danger)' : 'var(--warning)' }}>
          {row.flag_count}x
        </span>
      ),
    },
    {
      key: 'partner_note', title: 'Partner Note',
      render: row => (
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>
          {row.partner_note}
        </span>
      ),
    },
    { key: 'status', title: 'Status', render: row => <StatusBadge status={row.status} /> },
    {
      key: 'actions', title: '',
      render: row => row.status === 'pending'
        ? (
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              className="btn-muted"
              style={{ color: 'var(--success)', borderColor: 'rgba(62,207,170,0.3)' }}
              onClick={() => resolve(row.id, 'reviewed')}
            >
              Approve
            </button>
            <button
              className="btn-muted"
              style={{ color: 'var(--danger)', borderColor: 'rgba(232,93,74,0.3)' }}
              onClick={() => resolve(row.id, 'actioned')}
            >
              Reject
            </button>
          </div>
        ) : (
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Done</span>
        ),
    },
  ]

  const pending = data.filter(d => d.status === 'pending').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        title="Flagged Check-ins"
        subtitle={`${pending} pending review`}
      />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
