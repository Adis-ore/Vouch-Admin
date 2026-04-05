import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import useAdminAuth from './hooks/useAdminAuth'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AllUsers from './pages/users/AllUsers'
import FlaggedUsers from './pages/users/FlaggedUsers'
import UserProfile from './pages/users/UserProfile'
import AllJourneys from './pages/journeys/AllJourneys'
import JourneyDetail from './pages/journeys/JourneyDetail'
import OpenJourneys from './pages/journeys/OpenJourneys'
import FlaggedCheckins from './pages/moderation/FlaggedCheckins'
import DisputeQueue from './pages/moderation/DisputeQueue'
import ActiveStakes from './pages/payments/ActiveStakes'
import ForfeitureLog from './pages/payments/ForfeitureLog'
import Categories from './pages/content/Categories'
import PushAnnouncements from './pages/communications/PushAnnouncements'
import AdminAccounts from './pages/settings/AdminAccounts'
import PlatformConfig from './pages/settings/PlatformConfig'
import Analytics from './pages/Analytics'
import './index.css'

function RequireAuth({ children }) {
  const { user, admin, loading } = useAdminAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        Loading...
      </div>
    )
  }

  if (!user || !admin) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function AdminLayout() {
  const { user, admin } = useAdminAuth()

  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar user={user} admin={admin} />
        <main style={{ flex: 1, overflowY: 'auto', padding: 32, background: 'var(--bg)' }}>
          <Routes>
            <Route path="" element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="users/flagged" element={<FlaggedUsers />} />
            <Route path="users/:id" element={<UserProfile />} />
            <Route path="journeys" element={<AllJourneys />} />
            <Route path="journeys/open" element={<OpenJourneys />} />
            <Route path="journeys/:id" element={<JourneyDetail />} />
            <Route path="moderation/checkins" element={<FlaggedCheckins />} />
            <Route path="moderation/disputes" element={<DisputeQueue />} />
            <Route path="payments/stakes" element={<ActiveStakes />} />
            <Route path="payments/forfeitures" element={<ForfeitureLog />} />
            <Route path="content/categories" element={<Categories />} />
            <Route path="communications/push" element={<PushAnnouncements />} />
            <Route path="settings/accounts" element={<AdminAccounts />} />
            <Route path="settings/config" element={<PlatformConfig />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    document.title = 'Vouch Admin'
  }, [])

  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          } />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
