import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend, CartesianGrid,
} from 'recharts'
import { FiUsers, FiCompass, FiCheckSquare, FiCreditCard, FiUserPlus, FiTrendingDown, FiClock, FiAward } from '../vendor/react-icons-fi'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/shared/StatCard'
import useQuery from '../hooks/useQuery'
import { fetchStats, fetchCharts, fetchActivity } from '../lib/api'

const chartTooltipStyle = {
  background: 'var(--surface-alt)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  fontSize: 12,
  color: 'var(--text-primary)',
}

const ACTIVITY_ICONS = {
  user_joined:       { icon: FiUserPlus,    color: 'var(--info)' },
  journey_completed: { icon: FiAward,       color: 'var(--success)' },
  stake_paid:        { icon: FiCreditCard,  color: 'var(--accent)' },
  journey_created:   { icon: FiCompass,     color: 'var(--text-secondary)' },
  forfeiture:        { icon: FiTrendingDown,color: 'var(--danger)' },
  refund_failed:     { icon: FiCreditCard,  color: 'var(--danger)' },
  checkin_flagged:   { icon: FiClock,       color: 'var(--warning)' },
}

async function fetchDashboardData() {
  const [statsRes, chartsRes, activityRes] = await Promise.all([
    fetchStats(),
    fetchCharts(),
    fetchActivity(10),
  ])
  return {
    stats: statsRes.data,
    signupChart: chartsRes.data.signupChart,
    checkinChart: chartsRes.data.checkinChart,
    journeyStatusChart: chartsRes.data.journeyStatusChart,
    activity: activityRes.data || [],
  }
}

function fmt(n) { return Number(n || 0).toLocaleString() }

export default function Dashboard() {
  const { data, loading, error } = useQuery(fetchDashboardData)

  if (loading) return <div style={{ color: 'var(--text-muted)', padding: 32 }}>Loading...</div>
  if (error)   return <div style={{ color: 'var(--danger)', padding: 32 }}>Error: {error}</div>

  const { stats, signupChart, checkinChart, journeyStatusChart, activity } = data

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Dashboard" subtitle="Platform health at a glance" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        <StatCard label="Total Users"          value={fmt(stats.totalUsers)}          delta={stats.newUsersThisWeek - stats.newUsersLastWeek} subtext="vs last week"  icon={FiUsers} />
        <StatCard label="Active Journeys"       value={fmt(stats.activeJourneys)}       delta={null}  subtext="currently active"  icon={FiCompass} />
        <StatCard label="Check-ins Today"       value={fmt(stats.checkinsToday)}        delta={null}  subtext="today"             icon={FiCheckSquare} />
        <StatCard label="Stakes Held"           value={`₦${fmt(stats.stakesHeld)}`}     delta={null}  subtext="in escrow"         icon={FiCreditCard} />
        <StatCard label="Journeys Completed"    value={fmt(stats.journeysCompleted)}    delta={null}  subtext="all time"          icon={FiAward} />
        <StatCard label="Forfeiture Revenue"    value={`₦${fmt(stats.forfeitureRevenue)}`} delta={null} subtext="all time"        icon={FiTrendingDown} />
        <StatCard label="New This Week"         value={fmt(stats.newUsersThisWeek)}     delta={stats.newUsersThisWeek - stats.newUsersLastWeek} subtext={`vs ${fmt(stats.newUsersLastWeek)} last week`} icon={FiUserPlus} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>New User Signups — last 14 days</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={signupChart}>
              <defs>
                <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--info)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--info)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area type="monotone" dataKey="users" stroke="var(--info)" fill="url(#signupGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>Check-ins — last 7 days</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={checkinChart}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="checkins" fill="var(--success)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>Journey Status Breakdown</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={journeyStatusChart} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {journeyStatusChart.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
              <Tooltip contentStyle={chartTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {activity.length === 0 && (
              <div style={{ color: 'var(--text-muted)', fontSize: 13, padding: '8px 0' }}>No activity yet.</div>
            )}
            {activity.map(item => {
              const cfg = ACTIVITY_ICONS[item.type] || { icon: FiClock, color: 'var(--text-muted)' }
              const Icon = cfg.icon
              return (
                <div key={item.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 6,
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: 'var(--surface-alt)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={14} color={cfg.color} />
                  </div>
                  <span style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}>{item.body || item.title}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
