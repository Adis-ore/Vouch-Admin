export const STATS = {
  totalUsers: 4821,
  activeJourneys: 312,
  checkinsToday: 892,
  stakesHeld: 1842000,
  journeysCompleted: 1104,
  journeysAbandoned: 287,
  forfeitureRevenue: 340500,
  avgStreak: 8.3,
  newUsersThisWeek: 143,
  newUsersLastWeek: 118,
  activeJourneysChange: 24,
  checkinsChange: 67,
}

export const SIGNUP_CHART_DATA = [
  { date: 'Jan 1', users: 12 }, { date: 'Jan 2', users: 19 },
  { date: 'Jan 3', users: 8 },  { date: 'Jan 4', users: 24 },
  { date: 'Jan 5', users: 31 }, { date: 'Jan 6', users: 18 },
  { date: 'Jan 7', users: 27 }, { date: 'Jan 8', users: 35 },
  { date: 'Jan 9', users: 22 }, { date: 'Jan 10', users: 41 },
  { date: 'Jan 11', users: 38 }, { date: 'Jan 12', users: 53 },
  { date: 'Jan 13', users: 47 }, { date: 'Jan 14', users: 61 },
]

export const CHECKINS_CHART_DATA = [
  { date: 'Jan 8', checkins: 430 }, { date: 'Jan 9', checkins: 398 },
  { date: 'Jan 10', checkins: 512 }, { date: 'Jan 11', checkins: 487 },
  { date: 'Jan 12', checkins: 603 }, { date: 'Jan 13', checkins: 731 },
  { date: 'Jan 14', checkins: 892 },
]

export const JOURNEY_STATUS_DATA = [
  { name: 'Active', value: 312, color: '#3ECFAA' },
  { name: 'Open', value: 148, color: '#5B9CF6' },
  { name: 'Completed', value: 1104, color: '#E8A838' },
  { name: 'Abandoned', value: 287, color: '#E85D4A' },
]

export const WEEKLY_REVENUE = [
  { week: 'W1 Dec', revenue: 28500 },
  { week: 'W2 Dec', revenue: 41000 },
  { week: 'W3 Dec', revenue: 55000 },
  { week: 'W4 Dec', revenue: 38000 },
  { week: 'W1 Jan', revenue: 67000 },
  { week: 'W2 Jan', revenue: 84500 },
]

// type field used to map to lucide icons in the UI
export const RECENT_ACTIVITY = [
  { id: 1, type: 'user_joined',       text: 'Chukwuemeka Eze joined',                                           time: '2 mins ago' },
  { id: 2, type: 'journey_completed', text: '"Learn Python" journey completed by 4 members',                    time: '14 mins ago' },
  { id: 3, type: 'stake_paid',        text: 'Stake of ₦2,000 confirmed for "Build a SaaS"',                    time: '32 mins ago' },
  { id: 4, type: 'journey_created',   text: 'New journey: "Morning Run 30 Days" — Lagos',                      time: '1 hr ago' },
  { id: 5, type: 'forfeiture',        text: 'Stake forfeited — user abandoned "No Sugar Challenge"',            time: '2 hrs ago' },
  { id: 6, type: 'user_joined',       text: 'Amina Bello joined',                                               time: '3 hrs ago' },
  { id: 7, type: 'checkin_flagged',   text: 'Check-in flagged 3x — "React Native 45 Days"',                    time: '4 hrs ago' },
]

export const USERS = [
  { id: 'u1', name: 'Adis Afolabi',      phone: '+234 801 234 5678', country: 'Nigeria', region: 'Oyo',      journeys: 5,  streak: 21, reputation: 94, stake_status: 'held',      joined: '2024-11-12', status: 'active',    flagged: false },
  { id: 'u2', name: 'Tunde Olatunji',    phone: '+234 802 345 6789', country: 'Nigeria', region: 'Lagos',    journeys: 8,  streak: 14, reputation: 87, stake_status: 'held',      joined: '2024-10-03', status: 'active',    flagged: false },
  { id: 'u3', name: 'Chioma Nwosu',      phone: '+234 803 456 7890', country: 'Nigeria', region: 'Anambra', journeys: 3,  streak: 7,  reputation: 76, stake_status: 'none',      joined: '2024-12-01', status: 'active',    flagged: false },
  { id: 'u4', name: 'Emmanuel Bello',    phone: '+234 804 567 8901', country: 'Nigeria', region: 'Lagos',    journeys: 2,  streak: 0,  reputation: 41, stake_status: 'forfeited', joined: '2024-12-15', status: 'active',    flagged: true  },
  { id: 'u5', name: 'Ngozi Obi',         phone: '+234 805 678 9012', country: 'Nigeria', region: 'Abuja',    journeys: 11, streak: 30, reputation: 98, stake_status: 'returned',  joined: '2024-09-22', status: 'active',    flagged: false },
  { id: 'u6', name: 'Kwame Asante',      phone: '+233 501 234 5678', country: 'Ghana',   region: 'Accra',    journeys: 6,  streak: 9,  reputation: 83, stake_status: 'held',      joined: '2024-11-30', status: 'active',    flagged: false },
  { id: 'u7', name: 'Fake Checker Dan',  phone: '+234 806 789 0123', country: 'Nigeria', region: 'Kano',     journeys: 1,  streak: 0,  reputation: 28, stake_status: 'forfeited', joined: '2025-01-02', status: 'suspended', flagged: true  },
  { id: 'u8', name: 'Seun Adeleke',      phone: '+234 807 890 1234', country: 'Nigeria', region: 'Lagos',    journeys: 4,  streak: 12, reputation: 88, stake_status: 'none',      joined: '2024-10-18', status: 'active',    flagged: false },
]

export const JOURNEYS = [
  { id: 'j1', title: 'Learn Python in 30 Days',        creator: 'Tunde Olatunji',  category: 'Learning', status: 'active',    members: '4/4', stake: 1000, start: '2025-01-01', end: '2025-01-31', featured: false, country: 'Nigeria' },
  { id: 'j2', title: 'Run 5km Every Day for 21 Days',  creator: 'Seun Adeleke',    category: 'Fitness',  status: 'open',      members: '1/3', stake: 500,  start: null,         end: null,         featured: true,  country: 'Nigeria' },
  { id: 'j3', title: 'Read One Book Per Week',         creator: 'Ngozi Obi',       category: 'Habit',    status: 'active',    members: '3/5', stake: 0,    start: '2025-01-07', end: '2025-02-04', featured: false, country: 'Nigeria' },
  { id: 'j4', title: 'Build a SaaS Product in 60 Days',creator: 'Adis Afolabi',    category: 'Career',   status: 'open',      members: '1/2', stake: 2000, start: null,         end: null,         featured: false, country: 'Nigeria' },
  { id: 'j5', title: 'Morning Prayer — 30 Days',       creator: 'Pastor Femi',     category: 'Faith',    status: 'active',    members: '6/10',stake: 0,    start: '2024-12-20', end: '2025-01-19', featured: false, country: 'Nigeria' },
  { id: 'j6', title: 'Learn React Native 45 Days',     creator: 'Kwame Asante',    category: 'Learning', status: 'open',      members: '2/4', stake: 1500, start: null,         end: null,         featured: false, country: 'Ghana'   },
  { id: 'j7', title: 'No Sugar for 30 Days',           creator: 'Chioma Nwosu',    category: 'Habit',    status: 'completed', members: '2/2', stake: 500,  start: '2024-12-01', end: '2024-12-31', featured: false, country: 'Nigeria' },
  { id: 'j8', title: 'ICAN Exam Prep',                 creator: 'Emmanuel Bello',  category: 'Career',   status: 'abandoned', members: '1/2', stake: 1000, start: '2024-12-10', end: '2025-01-10', featured: false, country: 'Nigeria' },
]

export const FLAGGED_CHECKINS = [
  { id: 'fc1', user: 'Emmanuel Bello',   journey: 'Learn Python in 30 Days', date: '2025-01-14', note: 'Did stuff today',                                          proof: null,                        flag_count: 3, status: 'pending',  partner_note: 'No real proof, just 3 words' },
  { id: 'fc2', user: 'Fake Checker Dan', journey: 'Build Healthy Habits',    date: '2025-01-13', note: 'I exercised for an hour today and ate well',               proof: null,                        flag_count: 3, status: 'pending',  partner_note: 'Same note 5 days in a row' },
  { id: 'fc3', user: 'Kola Adeyemi',     journey: 'Morning Run Challenge',   date: '2025-01-12', note: 'Ran 5km in 28 minutes. Best time yet.',                    proof: 'https://placehold.co/400x300', flag_count: 2, status: 'reviewed', partner_note: 'Photo looks staged' },
]

export const DISPUTES = [
  { id: 'd1', reporter: 'Adis Afolabi', type: 'stake_not_returned', journey: 'Learn Python',        description: 'Journey completed 3 days ago but my ₦1,000 has not been returned',                                    status: 'open',         date: '2025-01-14' },
  { id: 'd2', reporter: 'Ngozi Obi',    type: 'partner_inactive',   journey: 'Read One Book Per Week',description: 'My partner has not checked in for 4 days but has not been auto-removed',                             status: 'under_review', date: '2025-01-12' },
  { id: 'd3', reporter: 'Seun Adeleke', type: 'technical_error',    journey: 'Run 5km Challenge',   description: 'I uploaded a photo as proof but it shows as "no proof" on partners screen',                           status: 'resolved',     date: '2025-01-10' },
]

export const ACTIVE_STAKES = [
  { id: 's1', user: 'Adis Afolabi',   journey: 'Learn Python in 30 Days', amount: 1000, paid: '2025-01-01', end_date: '2025-01-31' },
  { id: 's2', user: 'Tunde Olatunji', journey: 'Learn Python in 30 Days', amount: 1000, paid: '2025-01-01', end_date: '2025-01-31' },
  { id: 's3', user: 'Chioma Nwosu',   journey: 'Learn Python in 30 Days', amount: 1000, paid: '2025-01-02', end_date: '2025-01-31' },
  { id: 's4', user: 'Kwame Asante',   journey: 'React Native 45 Days',    amount: 1500, paid: '2024-12-22', end_date: '2025-02-05' },
  { id: 's5', user: 'Seun Adeleke',   journey: 'Run 5km Challenge',       amount: 500,  paid: '2025-01-10', end_date: '2025-01-31' },
]

export const FORFEITURES = [
  { id: 'f1', user: 'Emmanuel Bello', journey: 'ICAN Exam Prep',         amount: 1000, date: '2025-01-08', reason: 'Abandoned by user' },
  { id: 'f2', user: 'Fake Checker Dan',journey: 'Build Healthy Habits',  amount: 500,  date: '2025-01-13', reason: 'Auto-removed: 3 consecutive misses' },
  { id: 'f3', user: 'John Doe',       journey: 'Learn SQL',              amount: 800,  date: '2024-12-28', reason: 'Abandoned by user' },
  { id: 'f4', user: 'Amaka Okafor',   journey: '30 Days No Sugar',       amount: 500,  date: '2024-12-20', reason: 'Auto-removed: 3 consecutive misses' },
]

export const CATEGORIES = [
  { id: 'c1', name: 'Learning', color: '#5B9CF6', active_journeys: 87,  disabled: false },
  { id: 'c2', name: 'Fitness',  color: '#3ECFAA', active_journeys: 64,  disabled: false },
  { id: 'c3', name: 'Habit',    color: '#E8A838', active_journeys: 73,  disabled: false },
  { id: 'c4', name: 'Career',   color: '#9B72CF', active_journeys: 41,  disabled: false },
  { id: 'c5', name: 'Faith',    color: '#F0A500', active_journeys: 29,  disabled: false },
  { id: 'c6', name: 'Finance',  color: '#E85D4A', active_journeys: 18,  disabled: false },
]

export const PUSH_HISTORY = [
  { id: 'p1', title: 'Happy New Year!',         body: 'Start the year strong. Create your first journey of 2025.',              segment: 'All Users', sent: 4821, date: '2025-01-01' },
  { id: 'p2', title: 'New feature: Group journeys', body: 'You can now have up to 20 people in a single journey. Try it!',      segment: 'All Users', sent: 4650, date: '2024-12-20' },
]

export const ADMIN_ACCOUNTS = [
  { id: 'a1', email: 'super@vouch.app',   role: 'super_admin', last_login: '2025-01-14T09:00:00Z', status: 'active' },
  { id: 'a2', email: 'mod@vouch.app',     role: 'moderator',   last_login: '2025-01-13T14:22:00Z', status: 'active' },
  { id: 'a3', email: 'support@vouch.app', role: 'support',     last_login: '2025-01-14T08:00:00Z', status: 'active' },
]

export const PLATFORM_CONFIG = [
  { key: 'max_stake_ngn',            value: '10000', description: 'Maximum stake amount in Naira' },
  { key: 'min_stake_ngn',            value: '100',   description: 'Minimum stake amount in Naira' },
  { key: 'max_journey_days',         value: '90',    description: 'Max journey duration (days)' },
  { key: 'auto_abandon_missed_days', value: '3',     description: 'Consecutive missed days before auto-removal' },
  { key: 'relaxed_mode_max_misses',  value: '1',     description: 'Max missed days/week in relaxed mode' },
]
