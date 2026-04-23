import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import UserAvatar from '../../components/shared/UserAvatar'
import useQuery from '../../hooks/useQuery'
import { fetchFlaggedUsers } from '../../lib/api'

async function loadFlaggedUsers() {
  const res = await fetchFlaggedUsers({ limit: 100 })
  return res.data || []
}

export default function FlaggedUsers() {
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(loadFlaggedUsers)
  const rows = data || []

  const columns = [
    {
      key: 'user', title: 'User',
      render: u => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UserAvatar name={u.full_name} />
          <div>
            <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{u.full_name ?? '—'}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.total_flags_received ?? 0} flags received</div>
          </div>
        </div>
      ),
    },
    {
      key: 'location', title: 'Location',
      render: u => u.region || u.country ? `${u.region ?? ''}${u.region && u.country ? ', ' : ''}${u.country ?? ''}` : '—',
    },
    { key: 'journeys', title: 'Journeys', render: u => u.journeys_completed ?? 0 },
    { key: 'streak', title: 'Streak', render: u => `${u.current_streak ?? 0}d` },
    {
      key: 'reputation', title: 'Reputation',
      render: u => <span style={{ fontWeight: 600, color: 'var(--danger)' }}>{u.reputation_score ?? 0}</span>,
    },
    {
      key: 'stake', title: 'Stake',
      render: u => (
        <span style={{ fontSize: 12, color: u.stake_status === 'forfeited' ? 'var(--danger)' : 'var(--text-secondary)' }}>
          {u.stake_status ?? '—'}
        </span>
      ),
    },
    {
      key: 'account', title: 'Account',
      render: u => (
        <span style={{
          fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
          background: u.is_banned ? 'rgba(232,93,74,0.12)' : 'rgba(240,165,0,0.12)',
          color: u.is_banned ? 'var(--danger)' : 'var(--warning)',
        }}>
          {u.is_banned ? 'banned' : 'active'}
        </span>
      ),
    },
    {
      key: 'actions', title: '',
      render: u => (
        <button className="btn-muted" onClick={() => navigate(`/users/${u.id}`)}>Review</button>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        title="Flagged Users"
        subtitle={loading ? 'Loading...' : `${rows.length} user${rows.length !== 1 ? 's' : ''} flagged for review`}
      />
      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>Error: {error}</div>}
      <DataTable columns={columns} data={rows} />
    </div>
  )
}
