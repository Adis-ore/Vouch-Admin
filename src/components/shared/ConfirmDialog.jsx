export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.6)', padding: '0 16px',
    }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: 24, width: '100%', maxWidth: 400,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>{title}</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
          <button onClick={onCancel} className="btn-muted">Cancel</button>
          <button onClick={onConfirm} style={{
            padding: '6px 14px', borderRadius: 6, fontSize: 13,
            fontWeight: 600, background: 'var(--danger)', border: 'none',
            color: '#fff', cursor: 'pointer',
          }}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
