import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import UserAvatar from '../../components/shared/UserAvatar'
import { USERS } from '../../data/dummy'

const flagged = USERS.filter(u => u.flagged)

export default function FlaggedUsers() {
  const navigate = useNavigate()

  const columns = [
    {
      key: 'user', title: 'User',
      render: u => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UserAvatar name={u.name} />
          <div>
            <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{u.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.phone}</div>
          </div>
        </div>
      ),
    },
    { key: 'country', title: 'Location', render: u => `${u.region}, ${u.country}` },
    { key: 'journeys', title: 'Journeys', dataIndex: 'journeys' },
    { key: 'streak', title: 'Streak', render: u => `${u.streak}d` },
    {
      key: 'reputation', title: 'Reputation',
      render: u => (
        <span style={{ fontWeight: 600, color: 'var(--danger)' }}>{u.reputation}</span>
      ),
    },
    {
      key: 'stake', title: 'Stake',
      render: u => (
        <span style={{ fontSize: 12, color: u.stake_status === 'forfeited' ? 'var(--danger)' : 'var(--text-secondary)' }}>
          {u.stake_status}
        </span>
      ),
    },
    { key: 'status', title: 'Account', render: u => (
      <span style={{
        fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
        background: u.status === 'suspended' ? 'rgba(232,93,74,0.12)' : 'rgba(240,165,0,0.12)',
        color: u.status === 'suspended' ? 'var(--danger)' : 'var(--warning)',
      }}>
        {u.status}
      </span>
    )},
    {
      key: 'actions', title: '',
      render: u => (
        <button className="btn-muted" onClick={() => navigate(`/users/${u.id}`)}>
          Review
        </button>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        title="Flagged Users"
        subtitle={`${flagged.length} users flagged for review`}
      />
      <DataTable columns={columns} data={flagged} />
    </div>
  )
}
