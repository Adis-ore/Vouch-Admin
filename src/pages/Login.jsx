import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogIn, FiEye, FiEyeOff } from '../vendor/react-icons-fi'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    setTimeout(() => {
      if (email === 'adisoreoluwa@gmail.com' && password === 'Oreoluwa20!') {
        localStorage.setItem('admin_session', JSON.stringify({
          token: btoa(email + ':admin'),
          user: { email, full_name: 'Admin' },
        }))
        navigate('/dashboard')
      } else {
        setError('Incorrect email or password.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '24px 16px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 32,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28, gap: 10 }}>
          <img src="/favicon.svg" alt="Vouch" width={52} height={52} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)' }}>Vouch</span>
            <span style={{
              fontSize: 11, padding: '2px 7px', borderRadius: 4,
              background: 'rgba(232,168,56,0.12)', color: 'var(--accent)',
              border: '1px solid rgba(232,168,56,0.2)', fontWeight: 600,
            }}>Admin</span>
          </div>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px' }}>Sign in</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 0, marginBottom: 24 }}>
          Access the Vouch admin dashboard
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@vouch.app"
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', padding: 4, display: 'flex', alignItems: 'center',
                }}
              >
                {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <p style={{ fontSize: 13, color: 'var(--danger)', margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-accent"
            style={{ justifyContent: 'center', padding: '10px 14px', fontSize: 14, marginTop: 4, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 14, height: 14, border: '2px solid rgba(0,0,0,0.2)',
                  borderTopColor: '#0D1117', borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite', display: 'inline-block',
                }} />
                Signing in...
              </>
            ) : (
              <>
                <FiLogIn size={15} />
                Sign in
              </>
            )}
          </button>
        </form>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
