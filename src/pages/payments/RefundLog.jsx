import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import ExportButton from '../../components/shared/ExportButton'

const data = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  user: `User ${i + 1}`,
  journey: `Journey ${i + 1}`,
  amount: `₦${(i + 1) * 900}`,
  date: `2026-03-${String((i % 30) + 1).padStart(2, '0')}`,
  reference: `REF-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
}))

const columns = [
  { key: 'user', title: 'User', dataIndex: 'user' },
  { key: 'journey', title: 'Journey', dataIndex: 'journey' },
  { key: 'amount', title: 'Amount', dataIndex: 'amount' },
  { key: 'date', title: 'Date', dataIndex: 'date' },
  { key: 'reference', title: 'Refund ref', dataIndex: 'reference' },
]

export default function RefundLog() {
  const exportCsv = () => {
    const csv = ['User,Journey,Amount,Date,Refund reference', ...data.map(row => `${row.user},${row.journey},${row.amount},${row.date},${row.reference}`)].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'refund-log.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="space-y-4">
      <PageHeader title="Refund Log" subtitle="Track returned stakes" />
      <div className="flex justify-end">
        <ExportButton onExport={exportCsv} />
      </div>
      <DataTable columns={columns} data={data} />
    </section>
  )
}
