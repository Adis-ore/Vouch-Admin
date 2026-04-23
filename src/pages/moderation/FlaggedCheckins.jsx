import { useState } from 'react'
import { FiExternalLink } from '../../vendor/react-icons-fi'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import StatusBadge from '../../components/shared/StatusBadge'
import useQuery from '../../hooks/useQuery'
import { fetchFlaggedCheckins, resolveCheckin } from '../../lib/api'

async function loadFlagged() {
  const res = await fetchFlaggedCheckins({ limit: 100 })
  return res.data || []
}

export default function FlaggedCheckins() {
  const { data = [], loading, error, refetch } = useQuery(loadFlagged)
  const [acting, setActing] = useState({})

  const resolve = async (id, action) => {
    setActing(a => ({ ...a, [id]: action }))
    try {
      await resolveCheckin(id, action)
      refetch()
    } finally {
      setActing(a => { const n = { ...a }; delete n[id]; return n })
    }
  }

  const columns = [
    {
      key: 'user', title: 'User',
      render: row => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.user?.full_name ?? '—'}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.journey?.title ?? '—'}</div>
        </div>
      ),
    },
    { key: 'date', title: 'Date', render: row => row.checkin_date ?? '—' },
    {
      key: 'note', title: 'Check-in Note',
      render: row => (
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {row.note ? (row.note.length > 45 ? row.note.slice(0, 45) + '...' : row.note) : '—'}
        </span>
      ),
    },
    {
      key: 'proof', title: 'Proof',
      render: row => row.proof_url
        ? <a href={row.proof_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--info)', fontSize: 12 }}>View <FiExternalLink size={11} /></a>
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
      key: 'status', title: 'Status',
      render: row => <StatusBadge status={row.status ?? 'pending'} />,
    },
    {
      key: 'actions', title: '',
      render: row => {
        if (row.status === 'approved' || row.status === 'rejected') {
          return <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Done</span>
        }
        return (
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              className="btn-muted"
              disabled={!!acting[row.id]}
              style={{ color: 'var(--success)', borderColor: 'rgba(62,207,170,0.3)' }}
              onClick={() => resolve(row.id, 'approve')}
            >
              {acting[row.id] === 'approve' ? '...' : 'Approve'}
            </button>
            <button
              className="btn-muted"
              disabled={!!acting[row.id]}
              style={{ color: 'var(--danger)', borderColor: 'rgba(232,93,74,0.3)' }}
              onClick={() => resolve(row.id, 'reject')}
            >
              {acting[row.id] === 'reject' ? '...' : 'Reject'}
            </button>
          </div>
        )
      },
    },
  ]

  const rows = data || []
  const pending = rows.filter(d => d.status !== 'approved' && d.status !== 'rejected').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader title="Flagged Check-ins" subtitle={loading ? 'Loading...' : `${pending} pending review`} />
      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>Error: {error}</div>}
      <DataTable columns={columns} data={rows} />
    </div>
  )
}
