import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import ExportButton from '../../components/shared/ExportButton'
import { FORFEITURES } from '../../data/dummy'

const total = FORFEITURES.reduce((sum, f) => sum + f.amount, 0)

export default function ForfeitureLog() {
  const exportCsv = () => {
    const rows = ['User,Journey,Amount,Date,Reason',
      ...FORFEITURES.map(f => `${f.user},${f.journey},${f.amount},${f.date},${f.reason}`),
    ].join('\n')
    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.setAttribute('download', 'forfeitures.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const columns = [
    { key: 'user', title: 'User', dataIndex: 'user' },
    { key: 'journey', title: 'Journey', dataIndex: 'journey' },
    {
      key: 'amount', title: 'Amount',
      render: f => (
        <span style={{ fontWeight: 600, color: 'var(--danger)' }}>₦{f.amount.toLocaleString()}</span>
      ),
    },
    { key: 'date', title: 'Date', dataIndex: 'date' },
    {
      key: 'reason', title: 'Reason',
      render: f => <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{f.reason}</span>,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        title="Forfeiture Log"
        subtitle={`${FORFEITURES.length} forfeitures — ₦${total.toLocaleString()} total`}
        actions={<ExportButton onExport={exportCsv} />}
      />
      <DataTable columns={columns} data={FORFEITURES} />
    </div>
  )
}
