import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import ExportButton from '../../components/shared/ExportButton'
import { ACTIVE_STAKES, STATS } from '../../data/dummy'

const total = ACTIVE_STAKES.reduce((sum, s) => sum + s.amount, 0)

export default function ActiveStakes() {
  const exportCsv = () => {
    const rows = ['User,Journey,Amount,Paid,End Date',
      ...ACTIVE_STAKES.map(s => `${s.user},${s.journey},${s.amount},${s.paid},${s.end_date}`),
    ].join('\n')
    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.setAttribute('download', 'active-stakes.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const columns = [
    { key: 'user', title: 'User', dataIndex: 'user' },
    { key: 'journey', title: 'Journey', dataIndex: 'journey' },
    {
      key: 'amount', title: 'Amount',
      render: s => (
        <span style={{ fontWeight: 600, color: 'var(--accent)' }}>₦{s.amount.toLocaleString()}</span>
      ),
    },
    { key: 'paid', title: 'Paid', dataIndex: 'paid' },
    { key: 'end_date', title: 'Journey End', dataIndex: 'end_date' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        title="Active Stakes"
        subtitle={`${ACTIVE_STAKES.length} stakes — ₦${total.toLocaleString()} in escrow`}
        actions={<ExportButton onExport={exportCsv} />}
      />
      <DataTable columns={columns} data={ACTIVE_STAKES} />
    </div>
  )
}
