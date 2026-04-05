import { useState } from 'react'
import { FiSave } from 'react-icons/fi'
import PageHeader from '../../components/layout/PageHeader'
import { PLATFORM_CONFIG } from '../../data/dummy'

export default function PlatformConfig() {
  const [config, setConfig] = useState(PLATFORM_CONFIG)
  const [saved, setSaved] = useState(false)

  const update = (key, value) => {
    setConfig(prev => prev.map(c => c.key === key ? { ...c, value } : c))
  }

  const save = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Platform Config" subtitle="Global parameters for journey and payment behaviour" />

      <form onSubmit={save}>
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {config.map((item, i) => (
            <div
              key={item.key}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 180px',
                alignItems: 'center', gap: 24,
                padding: '16px 0',
                borderBottom: i < config.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div>
                <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-primary)' }}>{item.description}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontFamily: 'monospace' }}>{item.key}</div>
              </div>
              <input
                type="text"
                value={item.value}
                onChange={e => update(item.key, e.target.value)}
                style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <button type="submit" className="btn-accent" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FiSave size={14} />
            Save changes
          </button>
          {saved && (
            <span style={{ fontSize: 13, color: 'var(--success)' }}>
              Config saved (demo)
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
