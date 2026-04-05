export default function FilterBar({ children }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
      {children}
    </div>
  )
}
