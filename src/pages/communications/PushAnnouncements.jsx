import { useState } from 'react'
import { FiSend, FiBell } from 'react-icons/fi'
import PageHeader from '../../components/layout/PageHeader'
import { PUSH_HISTORY } from '../../data/dummy'

export default function PushAnnouncements() {
  const [form, setForm] = useState({ title: '', body: '', segment: 'all', scheduled: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ title: '', body: '', segment: 'all', scheduled: '' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Push Announcements" subtitle="Send app-wide or segmented push notifications" />

      {/* Compose form */}
      <div className="panel">
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
          Compose Notification
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
                Title <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(max 50 chars)</span>
              </label>
              <input
                value={form.title}
                onChange={e => setForm(s => ({ ...s, title: e.target.value }))}
                maxLength={50}
                placeholder="e.g. New feature alert"
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>Segment</label>
              <select
                value={form.segment}
                onChange={e => setForm(s => ({ ...s, segment: e.target.value }))}
              >
                <option value="all">All Users</option>
                <option value="active">Active Journey Users</option>
                <option value="no-active">No active journey</option>
                <option value="new">New users (7d)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
              Message body <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(max 150 chars)</span>
            </label>
            <textarea
              value={form.body}
              onChange={e => setForm(s => ({ ...s, body: e.target.value }))}
              maxLength={150}
              placeholder="Keep it short and actionable..."
              required
              style={{ height: 90, resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
                Scheduled send (optional)
              </label>
              <input
                type="datetime-local"
                value={form.scheduled}
                onChange={e => setForm(s => ({ ...s, scheduled: e.target.value }))}
              />
            </div>
            <button type="submit" className="btn-accent" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px' }}>
              <FiSend size={14} />
              {form.scheduled ? 'Schedule' : 'Send now'}
            </button>
          </div>

          {sent && (
            <div style={{
              padding: '10px 14px', borderRadius: 6,
              background: 'rgba(62,207,170,0.1)', border: '1px solid rgba(62,207,170,0.25)',
              fontSize: 13, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <FiBell size={13} />
              Notification sent successfully (demo)
            </div>
          )}
        </form>
      </div>

      {/* History */}
      <div className="panel">
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
          Send History
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {PUSH_HISTORY.map(item => (
            <div key={item.id} style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto',
              alignItems: 'flex-start', gap: 24,
              padding: '12px 0', borderBottom: '1px solid var(--border)',
            }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-primary)' }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.body}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.segment}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{item.sent.toLocaleString()} sent</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{item.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
