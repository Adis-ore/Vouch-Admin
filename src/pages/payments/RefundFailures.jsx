import { useState } from 'react'
import { FiRefreshCw, FiAlertTriangle, FiCheckCircle } from '../../vendor/react-icons-fi'
import PageHeader from '../../components/layout/PageHeader'
import DataTable from '../../components/shared/DataTable'
import useQuery from '../../hooks/useQuery'
import { fetchRefundFailures, retryRefundFailure } from '../../lib/api'

async function loadFailures() {
  const res = await fetchRefundFailures()
  return res.data || []
}

export default function RefundFailures() {
  const { data = [], loading, error, refetch } = useQuery(loadFailures)
  const [retrying, setRetrying] = useState({})
  const [toasts, setToasts] = useState([])

  const addToast = (msg, ok) => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, ok }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000)
  }

  const retry = async (failureId) => {
    setRetrying(r => ({ ...r, [failureId]: true }))
    try {
      await retryRefundFailure(failureId)
      addToast('Refund retried successfully', true)
      refetch()
    } catch (err) {
      addToast(err.message, false)
    } finally {
      setRetrying(r => ({ ...r, [failureId]: false }))
    }
  }

  const columns = [
    {
      key: 'user', title: 'User',
      render: f => <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{f.user?.full_name ?? '—'}</span>,
    },
    {
      key: 'journey', title: 'Journey',
      render: f => <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{f.journey?.title ?? '—'}</span>,
    },
    {
      key: 'amounts', title: 'Stake / Refund',
      render: f => (
        <span style={{ fontSize: 13 }}>
          ₦{Number(f.stake?.amount || 0).toLocaleString()} &rarr; <span style={{ color: 'var(--success)' }}>₦{Number(f.stake?.refund_amount || 0).toLocaleString()}</span>
          <span style={{ color: 'var(--text-muted)', marginLeft: 4, fontSize: 11 }}>({f.stake?.refund_percent ?? 0}%)</span>
        </span>
      ),
    },
    {
      key: 'error', title: 'Error',
      render: f => (
        <span style={{ fontSize: 12, color: 'var(--danger)', fontFamily: 'monospace' }}>
          {f.error_message}
        </span>
      ),
    },
    { key: 'date', title: 'Attempted', render: f => f.attempted_at?.split('T')[0] ?? '—' },
    {
      key: 'actions', title: '',
      render: f => (
        <button
          className="btn-muted"
          onClick={() => retry(f.id)}
          disabled={retrying[f.id]}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent)' }}
        >
          <FiRefreshCw size={13} style={{ animation: retrying[f.id] ? 'spin 0.8s linear infinite' : 'none' }} />
          {retrying[f.id] ? 'Retrying...' : 'Retry'}
        </button>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ position: 'fixed', top: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 9999 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--surface)', border: `1px solid ${t.ok ? 'var(--success)' : 'var(--danger)'}`,
            borderRadius: 8, padding: '10px 14px', fontSize: 13, boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            color: 'var(--text-primary)',
          }}>
            {t.ok
              ? <FiCheckCircle size={14} color="var(--success)" />
              : <FiAlertTriangle size={14} color="var(--danger)" />}
            {t.msg}
          </div>
        ))}
      </div>

      <PageHeader
        title="Refund Failures"
        subtitle={loading ? 'Loading...' : `${data.length} unresolved failures`}
      />

      {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>Error: {error}</div>}

      {!loading && data.length === 0 ? (
        <div className="panel" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)', fontSize: 14 }}>
          <FiCheckCircle size={18} color="var(--success)" />
          No unresolved refund failures.
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}

      <style>{`@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>
    </div>
  )
}
