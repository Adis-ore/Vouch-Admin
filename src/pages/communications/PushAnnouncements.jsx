import { useState, useEffect } from 'react'
import { FiSend, FiBell } from '../../vendor/react-icons-fi'
import PageHeader from '../../components/layout/PageHeader'
import { sendBroadcast, fetchActivity } from '../../lib/api'

export default function PushAnnouncements() {
  const [form, setForm] = useState({ title: '', body: '' })
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetchActivity(50)
      .then(res => setHistory((res.data || []).filter(n => n.type === 'announcement')))
      .catch(() => {})
  }, [result])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    setResult(null)
    try {
      const res = await sendBroadcast({ title: form.title, body: form.body, type: 'announcement' })
      setResult(res)
      setForm({ title: '', body: '' })
    } catch (err) {
      setError(err.message || 'Failed to send')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Push Announcements" subtitle="Send a notification to all users" />

      <div className="panel">
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
          Compose Notification
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
              Title <span style={{ fontWeight: 400 }}>(max 50 chars)</span>
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
            <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
              Message body <span style={{ fontWeight: 400 }}>(max 150 chars)</span>
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

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="btn-accent"
              disabled={sending}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px' }}
            >
              <FiSend size={14} />
              {sending ? 'Sending...' : 'Send to all users'}
            </button>
          </div>

          {result && (
            <div style={{
              padding: '10px 14px', borderRadius: 6,
              background: 'rgba(62,207,170,0.1)', border: '1px solid rgba(62,207,170,0.25)',
              fontSize: 13, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <FiBell size={13} />
              Sent to {result.sent} users &mdash; {result.pushed} push notifications delivered
            </div>
          )}

          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: 6,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
              fontSize: 13, color: 'var(--danger)',
            }}>
              {error}
            </div>
          )}
        </form>
      </div>

      <div className="panel">
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
          Send History
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {history.length === 0 && (
            <div style={{ color: 'var(--text-muted)', fontSize: 13, padding: '8px 0' }}>No announcements sent yet.</div>
          )}
          {history.map(item => (
            <div key={item.id} style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              alignItems: 'flex-start', gap: 24,
              padding: '12px 0', borderBottom: '1px solid var(--border)',
            }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-primary)' }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.body}</div>
                {item.data?.sent != null && (
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                    {item.data.sent} users &middot; {item.data.pushed} push delivered
                  </div>
                )}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {new Date(item.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
