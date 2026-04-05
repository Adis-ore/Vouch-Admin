const STATUS_STYLES = {
  active:    { bg: 'rgba(62,207,170,0.15)',  color: 'var(--success)' },
  open:      { bg: 'rgba(248,197,50,0.15)',  color: 'var(--warning)' },
  abandoned: { bg: 'rgba(239,68,68,0.15)',   color: 'var(--danger)'  },
  completed: { bg: 'rgba(62,207,170,0.15)',  color: 'var(--success)' },
  pending:   { bg: 'rgba(248,197,50,0.15)',  color: 'var(--warning)' },
  flagged:   { bg: 'rgba(239,68,68,0.15)',   color: 'var(--danger)'  },
  resolved:  { bg: 'rgba(62,207,170,0.15)',  color: 'var(--success)' },
  closed:    { bg: 'rgba(100,116,139,0.15)', color: 'var(--text-muted)' },
}

export default function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] ?? { bg: 'var(--surface-alt)', color: 'var(--text-muted)' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: s.bg, color: s.color,
      borderRadius: 5, padding: '2px 8px',
      fontSize: 11, fontWeight: 600,
      textTransform: 'capitalize',
    }}>
      {status}
    </span>
  )
}
