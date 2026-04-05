import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiFlag, FiShieldOff, FiMapPin, FiPhone, FiCalendar, FiZap, FiStar } from 'react-icons/fi'
import PageHeader from '../../components/layout/PageHeader'
import StatusBadge from '../../components/shared/StatusBadge'
import { USERS, JOURNEYS } from '../../data/dummy'

export default function UserProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = USERS.find(u => u.id === id) ?? USERS[0]

  const userJourneys = JOURNEYS.filter(
    j => j.creator === user.name
  )

  const reputationColor = user.reputation >= 80 ? 'var(--success)'
    : user.reputation >= 50 ? 'var(--warning)'
    : 'var(--danger)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader
        title={user.name}
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
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--surface-alt)',
                border: '2px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700, color: 'var(--accent)',
              }}>
                {user.name.split(' ').map(p => p[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>{user.name}</div>
                <StatusBadge status={user.status} />
              </div>
            </div>

            {/* Info rows */}
            {[
              { icon: <FiPhone size={14} />, label: 'Phone', value: user.phone },
              { icon: <FiMapPin size={14} />, label: 'Location', value: `${user.region}, ${user.country}` },
              { icon: <FiCalendar size={14} />, label: 'Joined', value: user.joined },
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

          {/* Stats card */}
          <div className="panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Journeys', value: user.journeys, icon: <FiZap size={14} color="var(--accent)" /> },
              { label: 'Streak', value: `${user.streak}d`, icon: <FiZap size={14} color="var(--warning)" /> },
              { label: 'Reputation', value: user.reputation, icon: <FiStar size={14} color={reputationColor} /> },
              { label: 'Stake', value: user.stake_status, icon: null },
            ].map(s => (
              <div key={s.label} style={{
                background: 'var(--surface-alt)',
                borderRadius: 8, padding: '12px 14px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  {s.icon}
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {s.label}
                  </span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Flagged state */}
          {user.flagged && (
            <div style={{
              background: 'rgba(232,93,74,0.08)',
              border: '1px solid rgba(232,93,74,0.25)',
              borderRadius: 8, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <FiFlag size={14} color="var(--danger)" />
              <span style={{ fontSize: 13, color: 'var(--danger)', fontWeight: 500 }}>This user is flagged</span>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              className="btn-muted"
              style={{ justifyContent: 'center', gap: 8 }}
            >
              <FiFlag size={13} />
              {user.flagged ? 'Remove flag' : 'Flag user'}
            </button>
            <button
              className="btn-muted"
              style={{ justifyContent: 'center', gap: 8, color: 'var(--danger)', borderColor: 'rgba(232,93,74,0.3)' }}
            >
              <FiShieldOff size={13} />
              Suspend account
            </button>
          </div>
        </div>

        {/* Right: journeys */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="panel">
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
              Journeys created by {user.name.split(' ')[0]}
            </div>

            {userJourneys.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>No journeys found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {userJourneys.map(j => (
                  <div key={j.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto auto auto',
                    alignItems: 'center',
                    gap: 16,
                    padding: '12px 0',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <div>
                      <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{j.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{j.category} · {j.members} members</div>
                    </div>
                    <StatusBadge status={j.status} />
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {j.stake > 0 ? `₦${j.stake.toLocaleString()}` : 'Free'}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {j.start ?? 'Not started'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reputation bar */}
          <div className="panel">
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>
              Reputation Score
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, height: 8, background: 'var(--surface-alt)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${user.reputation}%`,
                  background: reputationColor,
                  borderRadius: 99,
                  transition: 'width 0.4s',
                }} />
              </div>
              <span style={{ fontSize: 18, fontWeight: 700, color: reputationColor, minWidth: 36 }}>
                {user.reputation}
              </span>
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 24 }}>
              {[
                { range: '0–49', label: 'At risk', color: 'var(--danger)' },
                { range: '50–79', label: 'Fair', color: 'var(--warning)' },
                { range: '80–100', label: 'Trusted', color: 'var(--success)' },
              ].map(tier => (
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
