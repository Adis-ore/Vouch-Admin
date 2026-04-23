import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import ExportButton from '../../components/shared/ExportButton'
import useQuery from '../../hooks/useQuery'
import { fetchRefunds } from '../../lib/api'

async function loadRefunds() {
  const res = await fetchRefunds({ limit: 200 })
  return res.data || []
}

function exportCsv(data) {
  const rows = ['User,Journey,Original,Refunded,%,Date,Refund Ref',
    ...data.map(r => `${r.user?.full_name ?? ''},${r.journey?.title ?? ''},${r.amount},${r.refund_amount ?? r.amount},${r.refund_percent ?? 100},${r.returned_at?.split('T')[0] ?? ''},${r.paystack_refund_id ?? ''}`),
  ].join('\n')
  const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.setAttribute('download', 'refunds.csv')
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
}

export default function RefundLog() {
  const { data, loading, error } = useQuery(loadRefunds)
  const rows = data || []
  const total = rows.reduce((s, r) => s + Number(r.refund_amount ?? r.amount ?? 0), 0)

  const columns = [
    { key: 'user',    title: 'User',     render: r => <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{r.user?.full_name ?? '—'}</span> },
    { key: 'journey', title: 'Journey',  render: r => <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{r.journey?.title ?? '—'}</span> },
    { key: 'amount',  title: 'Original', render: r => `₦${Number(r.amount || 0).toLocaleString()}` },
    {
      key: 'refunded', title: 'Refunded',
      render: r => <span style={{ fontWeight: 600, color: 'var(--success)' }}>₦{Number(r.refund_amount ?? r.amount ?? 0).toLocaleString()}</span>,
    },
    {
      key: 'pct', title: 'Tier',
      render: r => {
        const pct = r.refund_percent ?? 100
        return <span style={{ fontSize: 12, color: pct >= 90 ? 'var(--success)' : pct >= 75 ? 'var(--warning)' : 'var(--danger)' }}>{pct}%</span>
      },
    },
    { key: 'date', title: 'Date', render: r => r.returned_at?.split('T')[0] ?? '—' },
    { key: 'ref',  title: 'Refund Ref', render: r => <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{r.paystack_refund_id ?? '—'}</span> },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        title="Refund Log"
        subtitle={loading ? 'Loading...' : `${rows.length} refunds — ₦${total.toLocaleString()} returned`}
        actions={<ExportButton onExport={() => exportCsv(data)} />}
      />
      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>Error: {error}</div>}
      <DataTable columns={columns} data={rows} />
    </div>
  )
}
