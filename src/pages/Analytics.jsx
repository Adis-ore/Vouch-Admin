import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/shared/StatCard'
import { STATS, SIGNUP_CHART_DATA, CHECKINS_CHART_DATA, JOURNEY_STATUS_DATA, WEEKLY_REVENUE, CATEGORIES } from '../data/dummy'
import { FiTrendingUp, FiUsers, FiRepeat, FiActivity, FiClock, FiUserMinus, FiUserCheck, FiLock } from 'react-icons/fi'

// Extended data for analytics-specific charts
const retentionData = [
  { week: 'W1', retained: 100 },
  { week: 'W2', retained: 82 },
  { week: 'W3', retained: 71 },
  { week: 'W4', retained: 64 },
  { week: 'W6', retained: 58 },
  { week: 'W8', retained: 53 },
  { week: 'W12', retained: 47 },
]

const geoData = [
  { country: 'Lagos', users: 1820 },
  { country: 'Abuja', users: 680 },
  { country: 'Oyo', users: 530 },
  { country: 'Kano', users: 320 },
  { country: 'Anambra', users: 290 },
  { country: 'Ghana', users: 410 },
  { country: 'Other', users: 771 },
]

const engagementData = [
  { date: 'Jan 8', dau: 310, wau: 1840 },
  { date: 'Jan 9', dau: 295, wau: 1810 },
  { date: 'Jan 10', dau: 380, wau: 1890 },
  { date: 'Jan 11', dau: 420, wau: 1950 },
  { date: 'Jan 12', dau: 510, wau: 2100 },
  { date: 'Jan 13', dau: 630, wau: 2280 },
  { date: 'Jan 14', dau: 720, wau: 2410 },
]

const completionRateData = [
  { category: 'Learning', rate: 68 },
  { category: 'Fitness',  rate: 54 },
  { category: 'Habit',    rate: 71 },
  { category: 'Career',   rate: 59 },
  { category: 'Faith',    rate: 82 },
  { category: 'Finance',  rate: 47 },
]

const funnelData = [
  { name: 'Signed Up',        value: 4821, fill: '#E8A838' },
  { name: 'Joined a Journey', value: 3640, fill: '#3ECFAA' },
  { name: 'First Check-in',   value: 2890, fill: '#6366f1' },
  { name: 'Week 2 Active',    value: 1980, fill: '#47bfff' },
  { name: 'Completed',        value: 1104, fill: '#a78bfa' },
]

const streakDistData = [
  { range: '1–3d',   users: 820 },
  { range: '4–7d',   users: 1140 },
  { range: '8–14d',  users: 930 },
  { range: '15–21d', users: 610 },
  { range: '22–30d', users: 390 },
  { range: '31d+',   users: 210 },
]

const churnData = [
  { month: 'Aug', rate: 14.2 },
  { month: 'Sep', rate: 13.8 },
  { month: 'Oct', rate: 12.1 },
  { month: 'Nov', rate: 11.4 },
  { month: 'Dec', rate: 10.9 },
  { month: 'Jan', rate: 9.7 },
]

const groupSizeData = [
  { week: 'W1', avg: 2.1 },
  { week: 'W2', avg: 2.3 },
  { week: 'W3', avg: 2.6 },
  { week: 'W4', avg: 2.8 },
  { week: 'W5', avg: 3.1 },
  { week: 'W6', avg: 3.0 },
  { week: 'W7', avg: 3.4 },
  { week: 'W8', avg: 3.6 },
]

const stakesByCategoryData = [
  { name: 'Learning',  value: 520000, color: '#6366f1' },
  { name: 'Fitness',   value: 390000, color: '#3ECFAA' },
  { name: 'Habit',     value: 310000, color: '#E8A838' },
  { name: 'Career',    value: 280000, color: '#47bfff' },
  { name: 'Faith',     value: 190000, color: '#a78bfa' },
  { name: 'Finance',   value: 152000, color: '#f87171' },
]

const chartStyle = {
  background: 'var(--surface-alt)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  fontSize: 12,
  color: 'var(--text-primary)',
}

export default function Analytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeader title="Analytics" subtitle="Deep-dive into platform trends and performance" />

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard label="30-day New Users" value={`+${STATS.newUsersThisWeek * 4}`} delta={21} subtext="vs prior 30d" icon={FiUsers} />
        <StatCard label="Avg Completion Rate" value="64%" delta={4} subtext="across all categories" icon={FiTrendingUp} />
        <StatCard label="DAU / MAU Ratio" value="18.5%" delta={2} subtext="engagement health" icon={FiActivity} />
        <StatCard label="Stake Renewal Rate" value="71%" delta={8} subtext="users re-staking" icon={FiRepeat} />
      </div>

      {/* Signups + Retention */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            User Acquisition — last 14 days
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={SIGNUP_CHART_DATA}>
              <defs>
                <linearGradient id="acqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartStyle} />
              <Area type="monotone" dataKey="users" stroke="var(--accent)" fill="url(#acqGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            User Retention Curve
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={retentionData}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} unit="%" domain={[0, 100]} />
              <Tooltip contentStyle={chartStyle} formatter={v => [`${v}%`, 'Retained']} />
              <Line type="monotone" dataKey="retained" stroke="var(--info)" strokeWidth={2} dot={{ r: 3, fill: 'var(--info)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DAU/WAU + Revenue */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Daily vs Weekly Active Users
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={engagementData}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: 'var(--text-secondary)' }} />
              <Line type="monotone" dataKey="dau" name="DAU" stroke="var(--success)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="wau" name="WAU" stroke="var(--info)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Weekly Revenue Trend
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WEEKLY_REVENUE}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `₦${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={chartStyle} formatter={v => [`₦${v.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="var(--accent)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geography + Completion rates */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Geographic Distribution
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={geoData} layout="vertical">
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis dataKey="country" type="category" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} tickLine={false} axisLine={false} width={60} />
              <Tooltip contentStyle={chartStyle} />
              <Bar dataKey="users" fill="var(--info)" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Journey Completion Rate by Category
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={completionRateData}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="category" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} unit="%" domain={[0, 100]} />
              <Tooltip contentStyle={chartStyle} formatter={v => [`${v}%`, 'Completion']} />
              <Bar dataKey="rate" radius={[3, 3, 0, 0]}>
                {completionRateData.map((entry, i) => (
                  <Cell key={i} fill={CATEGORIES[i]?.color ?? 'var(--accent)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Check-ins + Journey status */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Daily Check-in Volume
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={CHECKINS_CHART_DATA}>
              <defs>
                <linearGradient id="checkinGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--success)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartStyle} />
              <Area type="monotone" dataKey="checkins" stroke="var(--success)" fill="url(#checkinGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Journey Status Distribution
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={JOURNEY_STATUS_DATA} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {JOURNEY_STATUS_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: 'var(--text-secondary)' }} />
              <Tooltip contentStyle={chartStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Growth & Behaviour
        </div>
      </div>

      {/* Growth KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard label="Avg Session Duration" value="6m 42s" delta={12} subtext="per active user" icon={FiClock} />
        <StatCard label="30-day Churn Rate" value="9.7%" delta={-11} subtext="vs 10.9% prior month" icon={FiUserMinus} />
        <StatCard label="Avg Group Size" value="3.6" delta={7} subtext="members per journey" icon={FiUserCheck} />
        <StatCard label="Total Stakes Locked" value={`₦${(STATS.stakesHeld / 1000000).toFixed(2)}M`} delta={18} subtext="across active journeys" icon={FiLock} />
      </div>

      {/* Onboarding Funnel + Streak Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Onboarding Funnel
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {funnelData.map((step, i) => {
              const pct = Math.round((step.value / funnelData[0].value) * 100)
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{step.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {step.value.toLocaleString()} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({pct}%)</span>
                    </span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'var(--border)' }}>
                    <div style={{ height: '100%', width: `${pct}%`, borderRadius: 3, background: step.fill, transition: 'width 0.4s' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Active Streak Distribution
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={streakDistData}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="range" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartStyle} formatter={v => [v, 'Users']} />
              <Bar dataKey="users" fill="var(--accent)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Churn trend + Stakes by category */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Monthly Churn Rate Trend
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={churnData}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} unit="%" domain={[0, 20]} />
              <Tooltip contentStyle={chartStyle} formatter={v => [`${v}%`, 'Churn']} />
              <Line type="monotone" dataKey="rate" stroke="#f87171" strokeWidth={2} dot={{ r: 3, fill: '#f87171' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
            Stakes Locked by Category
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={stakesByCategoryData} dataKey="value" innerRadius={45} outerRadius={72} paddingAngle={3}>
                  {stakesByCategoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartStyle} formatter={v => [`₦${(v / 1000).toFixed(0)}k`, 'Staked']} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {stakesByCategoryData.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)', flex: 1 }}>{d.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>₦{(d.value / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Group size trend */}
      <div className="panel">
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>
          Average Group Size Over Time
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={groupSizeData}>
            <defs>
              <linearGradient id="groupGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} domain={[0, 5]} />
            <Tooltip contentStyle={chartStyle} formatter={v => [v, 'Avg Members']} />
            <Area type="monotone" dataKey="avg" stroke="#6366f1" fill="url(#groupGrad)" strokeWidth={2} dot={{ r: 3, fill: '#6366f1' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
