import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiUsers, FiCalendar, FiCreditCard, FiMapPin } from '../../vendor/react-icons-fi'
import PageHeader from '../../components/layout/PageHeader'
import StatusBadge from '../../components/shared/StatusBadge'
import { JOURNEYS, USERS } from '../../data/dummy'

const milestones = [
  { label: 'Day 7',  status: 'completed' },
  { label: 'Day 14', status: 'completed' },
  { label: 'Day 21', status: 'active' },
  { label: 'Day 28', status: 'open' },
]

export default function JourneyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const journey = JOURNEYS.find(j => j.id === id) ?? JOURNEYS[0]
  const creator = USERS.find(u => u.name === journey.creator) ?? USERS[0]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader
        title={journey.title}
        subtitle={`Journey ${journey.id}`}
        actions={
          <button className="btn-muted" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FiArrowLeft size={14} /> Back
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        {/* Main details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="panel">
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
              Journey Overview
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { icon: <FiUsers size={14} />, label: 'Members', value: journey.members },
                { icon: <FiCreditCard size={14} />, label: 'Stake', value: journey.stake > 0 ? `₦${journey.stake.toLocaleString()}` : 'Free' },
                { icon: <FiCalendar size={14} />, label: 'Start', value: journey.start ?? 'Not started' },
                { icon: <FiCalendar size={14} />, label: 'End', value: journey.end ?? '—' },
                { icon: <FiMapPin size={14} />, label: 'Country', value: journey.country },
                { icon: null, label: 'Category', value: journey.category },
              ].map(row => (
                <div key={row.label} style={{
                  background: 'var(--surface-alt)', borderRadius: 8, padding: '12px 14px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{row.icon}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {row.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{row.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Status:</span>
              <StatusBadge status={journey.status} />
              {journey.featured && (
                <span style={{
                  fontSize: 11, padding: '2px 7px', borderRadius: 4,
                  background: 'rgba(232,168,56,0.12)', color: 'var(--accent)',
                  border: '1px solid rgba(232,168,56,0.2)', fontWeight: 600,
                }}>Featured</span>
              )}
            </div>
          </div>

          {/* Milestones */}
          <div className="panel">
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>
              Milestones
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {milestones.map((m, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: 6, background: 'var(--surface-alt)',
                }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{m.label}</span>
                  <StatusBadge status={m.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: creator + actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="panel">
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>
              Creator
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--surface-alt)', border: '2px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, color: 'var(--accent)', fontSize: 14,
              }}>
                {creator.name.split(' ').map(p => p[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{creator.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{creator.region}, {creator.country}</div>
              </div>
            </div>
            {[
              { label: 'Reputation', value: creator.reputation },
              { label: 'Streak', value: `${creator.streak}d` },
              { label: 'Journeys', value: creator.journeys },
            ].map(s => (
              <div key={s.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '7px 0', borderBottom: '1px solid var(--border)',
                fontSize: 13,
              }}>
                <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>
              Admin Actions
            </div>
            {['Force complete', 'Force abandon', 'Extend duration', 'Send message'].map(label => (
              <button key={label} className="btn-muted" style={{ justifyContent: 'center' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
