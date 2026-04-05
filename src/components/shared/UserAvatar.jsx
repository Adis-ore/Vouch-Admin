const COLORS = ['#5B9CF6', '#3ECFAA', '#E8A838', '#E85D4A', '#a78bfa', '#f472b6']

export default function UserAvatar({ name, size = 32 }) {
  const initials = name
    ? name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()
    : '?'
  const color = COLORS[(name?.charCodeAt(0) ?? 0) % COLORS.length]

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color + '22', border: `1.5px solid ${color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700, color,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}
