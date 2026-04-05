export default function StatCard({ label, value, delta, subtext, icon: Icon }) {
  const isPositive = delta > 0
  const isNegative = delta < 0
  const deltaColor = isPositive ? 'var(--success)' : isNegative ? 'var(--danger)' : 'var(--text-muted)'
  const deltaPrefix = isPositive ? '+' : ''

  return (
    <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
        {Icon && (
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'var(--surface-alt)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={14} color="var(--text-secondary)" />
          </div>
        )}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
      {(delta !== undefined || subtext) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          {delta !== undefined && (
            <span style={{ color: deltaColor, fontWeight: 600 }}>
              {deltaPrefix}{delta}%
            </span>
          )}
          {subtext && <span style={{ color: 'var(--text-muted)' }}>{subtext}</span>}
        </div>
      )}
    </div>
  )
}
