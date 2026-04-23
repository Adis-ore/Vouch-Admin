import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import ExportButton from '../../components/shared/ExportButton'
import useQuery from '../../hooks/useQuery'
import { fetchForfeitures } from '../../lib/api'

async function loadForfeitures() {
  const res = await fetchForfeitures({ limit: 200 })
  return res.data || []
}

function exportCsv(data) {
  const rows = ['User,Journey,Amount,Date',
    ...data.map(f => `${f.user?.full_name ?? ''},${f.journey?.title ?? ''},${f.amount},${f.forfeited_at?.split('T')[0] ?? ''}`),
  ].join('\n')
  const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.setAttribute('download', 'forfeitures.csv')
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
}

export default function ForfeitureLog() {
  const { data, loading, error } = useQuery(loadForfeitures)
  const rows = data || []
  const total = rows.reduce((s, f) => s + Number(f.amount || 0), 0)

  const columns = [
    { key: 'user',    title: 'User',    render: f => <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{f.user?.full_name ?? '—'}</span> },
    { key: 'journey', title: 'Journey', render: f => <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{f.journey?.title ?? '—'}</span> },
    { key: 'amount',  title: 'Amount',  render: f => <span style={{ fontWeight: 600, color: 'var(--danger)' }}>₦{Number(f.amount || 0).toLocaleString()}</span> },
    { key: 'date',    title: 'Date',    render: f => f.forfeited_at?.split('T')[0] ?? '—' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        title="Forfeiture Log"
        subtitle={loading ? 'Loading...' : `${rows.length} forfeitures — ₦${total.toLocaleString()} total`}
        actions={<ExportButton onExport={() => exportCsv(data)} />}
      />
      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>Error: {error}</div>}
      <DataTable columns={columns} data={rows} />
    </div>
  )
}
