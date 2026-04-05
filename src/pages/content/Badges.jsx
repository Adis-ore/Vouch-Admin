import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'

const badges = [
  { id: 1, name: 'First Journey', trigger: 'Complete first journey', count: 540 },
  { id: 2, name: '7-Day Streak', trigger: '7 consecutive check-ins', count: 320 },
  { id: 3, name: 'Consistency', trigger: '30-day streak', count: 120 },
]

export default function Badges() {
  const columns = [
    { key: 'name', title: 'Badge', dataIndex: 'name' },
    { key: 'trigger', title: 'Trigger', dataIndex: 'trigger' },
    { key: 'count', title: 'Awarded count', dataIndex: 'count' },
    { key: 'actions', title: 'Actions', render: () => <button className="btn-muted">Award</button> },
  ]

  return (
    <section className="space-y-4">
      <PageHeader title="Badge Manager" subtitle="Track and manage badge awards" />
      <DataTable columns={columns} data={badges} />
    </section>
  )
}
