import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend, CartesianGrid,
} from 'recharts'
import { FiUsers, FiCompass, FiCheckSquare, FiCreditCard, FiUserPlus, FiTrendingDown, FiClock, FiAward } from 'react-icons/fi'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/shared/StatCard'
import {
  STATS, SIGNUP_CHART_DATA, CHECKINS_CHART_DATA,
  JOURNEY_STATUS_DATA, WEEKLY_REVENUE, RECENT_ACTIVITY,
} from '../data/dummy'

const activityIcon = {
  user_joined:       <FiUserPlus size={14} color="var(--info)" />,
  journey_completed: <FiAward size={14} color="var(--success)" />,
  stake_paid:        <FiCreditCard size={14} color="var(--accent)" />,
  journey_created:   <FiCompass size={14} color="var(--text-secondary)" />,
  forfeiture:        <FiTrendingDown size={14} color="var(--danger)" />,
  checkin_flagged:   <FiClock size={14} color="var(--warning)" />,
}

const chartTooltipStyle = {
  background: 'var(--surface-alt)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  fontSize: 12,
  color: 'var(--text-primary)',
}

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Dashboard" subtitle="Platform health at a glance" />

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        <StatCard label="Total Users" value={STATS.totalUsers.toLocaleString()} delta={21} subtext="vs last week" icon={FiUsers} />
        <StatCard label="Active Journeys" value={STATS.activeJourneys.toLocaleString()} delta={8} subtext="vs last week" icon={FiCompass} />
        <StatCard label="Check-ins Today" value={STATS.checkinsToday.toLocaleString()} delta={7} subtext="vs yesterday" icon={FiCheckSquare} />
        <StatCard label="Stakes Held" value={`₦${(STATS.stakesHeld / 1000).toFixed(0)}k`} delta={6} subtext="in escrow" icon={FiCreditCard} />
        <StatCard label="Journeys Completed" value={STATS.journeysCompleted.toLocaleString()} delta={3} subtext="all time" icon={FiAward} />
        <StatCard label="Forfeiture Revenue" value={`₦${(STATS.forfeitureRevenue / 1000).toFixed(0)}k`} delta={-2} subtext="this month" icon={FiTrendingDown} />
        <StatCard label="Avg Streak" value={`${STATS.avgStreak} days`} delta={5} subtext="platform-wide" icon={FiClock} />
        <StatCard label="New This Week" value={STATS.newUsersThisWeek.toLocaleString()} delta={21} subtext={`vs ${STATS.newUsersLastWeek} last week`} icon={FiUserPlus} />
      </div>

      {/* Charts row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            New User Signups — last 14 days
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={SIGNUP_CHART_DATA}>
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
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Check-ins — last 7 days
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CHECKINS_CHART_DATA}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="checkins" fill="var(--success)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Journey Status Breakdown
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={JOURNEY_STATUS_DATA} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {JOURNEY_STATUS_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
              <Tooltip contentStyle={chartTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Weekly Forfeiture Revenue
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WEEKLY_REVENUE}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `₦${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={chartTooltipStyle} formatter={v => [`₦${v.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="var(--accent)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activity */}
      <div className="panel">
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
          Recent Activity
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {RECENT_ACTIVITY.map(item => (
            <div key={item.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 6,
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'var(--surface-alt)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {activityIcon[item.type] ?? <FiClock size={14} color="var(--text-muted)" />}
              </div>
              <span style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}>{item.text}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
