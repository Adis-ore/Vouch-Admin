import { useMemo, useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import ExportButton from '../../components/shared/ExportButton'
import StatusBadge from '../../components/shared/StatusBadge'
import useQuery from '../../hooks/useQuery'
import { fetchStakes } from '../../lib/api'

async function loadStakes() {
  const res = await fetchStakes({ status: 'all', limit: 200 })
  return res.data || []
}

function exportCsv(data) {
  const rows = ['User,Journey,Amount,Status,Paid,End Date',
    ...data.map(s => `${s.user?.full_name ?? ''},${s.journey?.title ?? ''},${s.amount},${s.status},${s.created_at?.split('T')[0] ?? ''},${s.journey?.end_date ?? ''}`),
  ].join('\n')
  const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.setAttribute('download', 'stakes.csv')
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
}

export default function ActiveStakes() {
  const [statusFilter, setStatusFilter] = useState('held')
  const { data: all, loading, error } = useQuery(loadStakes)

  const data = useMemo(() => {
    if (!all) return []
    return statusFilter === 'all' ? all : all.filter(s => s.status === statusFilter)
  }, [all, statusFilter])

  const total = data.reduce((s, r) => s + Number(r.amount || 0), 0)

  const columns = [
    {
      key: 'user', title: 'User',
      render: s => <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{s.user?.full_name ?? '—'}</span>,
    },
    {
      key: 'journey', title: 'Journey',
      render: s => <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{s.journey?.title ?? '—'}</span>,
    },
    {
      key: 'amount', title: 'Amount',
      render: s => <span style={{ fontWeight: 600, color: 'var(--accent)' }}>₦{Number(s.amount || 0).toLocaleString()}</span>,
    },
    { key: 'status', title: 'Status', render: s => <StatusBadge status={s.status} /> },
    { key: 'paid', title: 'Paid', render: s => s.created_at?.split('T')[0] ?? '—' },
    { key: 'end', title: 'Journey End', render: s => s.journey?.end_date ?? '—' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        title="Stakes"
        subtitle={loading ? 'Loading...' : `${data.length} stakes — ₦${total.toLocaleString()}`}
        actions={<ExportButton onExport={() => exportCsv(data)} />}
      />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['held', 'returned', 'forfeited', 'refund_failed', 'all'].map(f => (
          <button
            key={f}
            className="btn-muted"
            onClick={() => setStatusFilter(f)}
            style={statusFilter === f ? { color: 'var(--accent)', borderColor: 'rgba(232,168,56,0.4)' } : {}}
          >
            {f === 'all' ? 'All' : f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>Error: {error}</div>}
      <DataTable columns={columns} data={data} />
    </div>
  )
}
