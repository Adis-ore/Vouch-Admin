export default function ExportButton({ label = 'Export CSV', onExport }) {
  return (
    <button
      onClick={onExport}
      className="btn-muted"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
    >
      {label}
    </button>
  )
}
