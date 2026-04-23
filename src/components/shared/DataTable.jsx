export default function DataTable({ columns, data = [] }) {
  const rows = data || []
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 10 }}>
      <table style={{ width: '100%', minWidth: 700, fontSize: 13, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--surface-alt)' }}>
            {columns.map(col => (
              <th key={col.key} style={{
                padding: '10px 14px', textAlign: 'left',
                color: 'var(--text-muted)', fontWeight: 600,
                fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em',
                borderBottom: '1px solid var(--border)',
              }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{
                padding: '24px 14px', textAlign: 'center', color: 'var(--text-muted)',
              }}>
                No records found
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index} style={{ borderTop: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-alt)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '10px 14px', verticalAlign: 'top', color: 'var(--text-secondary)' }}>
                    {col.render ? col.render(row) : row[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
