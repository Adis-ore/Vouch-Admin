import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiFlag, FiShieldOff, FiMapPin, FiCalendar, FiZap, FiStar } from '../../vendor/react-icons-fi'
import PageHeader from '../../components/layout/PageHeader'
import StatusBadge from '../../components/shared/StatusBadge'
import useQuery from '../../hooks/useQuery'
import { fetchUser, banUser, unbanUser } from '../../lib/api'

export default function UserProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [acting, setActing] = useState(false)

  const { data: user, loading, error, refetch } = useQuery(() => fetchUser(id).then(r => r.data), [id])

  const handleBan = async () => {
    setActing(true)
    try {
      if (user.is_banned) await unbanUser(id)
      else await banUser(id)
      refetch()
    } finally { setActing(false) }
  }

  if (loading) return <div style={{ color: 'var(--text-muted)', padding: 32 }}>Loading...</div>
  if (error) return <div style={{ color: 'var(--danger)', padding: 32 }}>Error: {error}</div>
  if (!user) return null

  const reputationColor = (user.reputation_score ?? 0) >= 80 ? 'var(--success)'
    : (user.reputation_score ?? 0) >= 50 ? 'var(--warning)'
    : 'var(--danger)'

  const initials = (user.full_name || '?').split(' ').map(p => p[0]).slice(0, 2).join('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader
        title={user.full_name || 'Unknown'}
        subtitle={`User profile — ${user.id}`}
        actions={
          <button className="btn-muted" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FiArrowLeft size={14} /> Back
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>
        {/* Left: profile card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--surface-alt)', border: '2px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700, color: 'var(--accent)',
                overflow: 'hidden', flexShrink: 0,
              }}>
                {user.avatar_url
                  ? <img src={user.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : initials}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>{user.full_name}</div>
                <StatusBadge status={user.is_banned ? 'banned' : 'active'} />
              </div>
            </div>

            {[
              { icon: <FiMapPin size={14} />, label: 'Location', value: [user.region, user.country].filter(Boolean).join(', ') || '—' },
              { icon: <FiCalendar size={14} />, label: 'Joined', value: user.created_at?.split('T')[0] ?? '—' },
            ].map(row => (
              <div key={row.label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 0', borderBottom: '1px solid var(--border)',
              }}>
                <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{row.icon}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 60, flexShrink: 0 }}>{row.label}</span>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div className="panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Journeys', value: user.journeys_completed ?? 0, icon: <FiZap size={14} color="var(--accent)" /> },
              { label: 'Streak', value: `${user.current_streak ?? 0}d`, icon: <FiZap size={14} color="var(--warning)" /> },
              { label: 'Reputation', value: user.reputation_score ?? 0, icon: <FiStar size={14} color={reputationColor} /> },
              { label: 'Stake', value: user.latestStake?.status ?? 'none', icon: null },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface-alt)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  {s.icon}
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              className="btn-muted"
              disabled={acting}
              onClick={handleBan}
              style={{ justifyContent: 'center', gap: 8, color: user.is_banned ? 'var(--success)' : 'var(--danger)', borderColor: user.is_banned ? 'rgba(62,207,170,0.3)' : 'rgba(232,93,74,0.3)' }}
            >
              <FiShieldOff size={13} />
              {user.is_banned ? 'Unban account' : 'Ban account'}
            </button>
          </div>
        </div>

        {/* Right: journeys + reputation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="panel">
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
              Journeys created by {user.full_name?.split(' ')[0]}
            </div>
            {(user.journeys || []).length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>No journeys found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {user.journeys.map(j => (
                  <div key={j.id} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto auto auto',
                    alignItems: 'center', gap: 16,
                    padding: '12px 0', borderBottom: '1px solid var(--border)',
                  }}>
                    <div>
                      <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{j.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{j.category} · {j.current_participants ?? 0} members</div>
                    </div>
                    <StatusBadge status={j.status} />
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {j.stake_amount > 0 ? `₦${Number(j.stake_amount).toLocaleString()}` : 'Free'}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {j.start_date ?? 'Not started'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel">
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>Reputation Score</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, height: 8, background: 'var(--surface-alt)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${user.reputation_score ?? 0}%`, background: reputationColor, borderRadius: 99, transition: 'width 0.4s' }} />
              </div>
              <span style={{ fontSize: 18, fontWeight: 700, color: reputationColor, minWidth: 36 }}>{user.reputation_score ?? 0}</span>
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 24 }}>
              {[{ range: '0–49', label: 'At risk', color: 'var(--danger)' }, { range: '50–79', label: 'Fair', color: 'var(--warning)' }, { range: '80–100', label: 'Trusted', color: 'var(--success)' }].map(tier => (
                <div key={tier.range} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: tier.color }} />
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{tier.range} — {tier.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
