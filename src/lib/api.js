const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api/v1'

function getToken() {
  try {
    const raw = localStorage.getItem('admin_session')
    return raw ? JSON.parse(raw).token : null
  } catch { return null }
}

async function request(path, { method = 'GET', body } = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json()
  if (!res.ok) {
    const err = new Error(data?.error?.message || `Request failed (${res.status})`)
    err.status = res.status
    err.code = data?.error?.code
    throw err
  }
  return data
}

// Auth
export async function adminLogin(email, password) {
  return request('/admin/login', { method: 'POST', body: { email, password } })
}

// Dashboard
export async function fetchStats() {
  return request('/admin/stats')
}

export async function fetchCharts() {
  return request('/admin/stats/charts')
}

export async function fetchActivity(limit = 10) {
  return request(`/admin/activity?limit=${limit}`)
}

// Users
export async function fetchUsers({ limit = 50, offset = 0, search = '' } = {}) {
  const p = new URLSearchParams({ limit, offset })
  if (search) p.set('search', search)
  return request(`/admin/users?${p}`)
}

export async function fetchUser(id) {
  return request(`/admin/users/${id}`)
}

export async function banUser(id) {
  return request(`/admin/users/${id}/ban`, { method: 'POST' })
}

export async function unbanUser(id) {
  return request(`/admin/users/${id}/unban`, { method: 'POST' })
}

export async function resolveCheckin(id, action) {
  return request(`/admin/flagged-checkins/${id}`, { method: 'PATCH', body: { action } })
}

export async function updateDisputeStatus(id, status) {
  return request(`/admin/disputes/${id}`, { method: 'PATCH', body: { status } })
}

export async function fetchCategories() {
  return request('/admin/categories')
}

export async function fetchConfig() {
  return request('/admin/config')
}

export async function saveConfig(config) {
  return request('/admin/config', { method: 'PUT', body: { config } })
}

export async function fetchAdminAccounts() {
  return request('/admin/accounts')
}

// Journeys
export async function fetchJourneys({ limit = 50, offset = 0, status = '' } = {}) {
  const p = new URLSearchParams({ limit, offset })
  if (status) p.set('status', status)
  return request(`/admin/journeys?${p}`)
}

export async function fetchJourney(id) {
  return request(`/admin/journeys/${id}`)
}

// Payments
export async function fetchStakes({ status = 'held', limit = 50, offset = 0 } = {}) {
  return request(`/admin/stakes?status=${status}&limit=${limit}&offset=${offset}`)
}

export async function fetchForfeitures({ limit = 50, offset = 0 } = {}) {
  return request(`/admin/forfeitures?limit=${limit}&offset=${offset}`)
}

export async function fetchRefunds({ limit = 50, offset = 0 } = {}) {
  return request(`/admin/refunds?limit=${limit}&offset=${offset}`)
}

export async function fetchRefundFailures() {
  return request('/admin/refund-failures')
}

export async function retryRefund(stakeId) {
  return request(`/admin/refunds/${stakeId}/retry`, { method: 'POST' })
}

export async function retryRefundFailure(failureId) {
  return request(`/admin/refund-failures/${failureId}/retry`, { method: 'POST' })
}

// Moderation
export async function fetchFlaggedUsers({ limit = 100 } = {}) {
  return request(`/admin/flagged-users?limit=${limit}`)
}

export async function fetchFlaggedCheckins({ limit = 50, offset = 0 } = {}) {
  return request(`/admin/flagged-checkins?limit=${limit}&offset=${offset}`)
}

export async function fetchDisputes({ limit = 50, offset = 0 } = {}) {
  return request(`/admin/disputes?limit=${limit}&offset=${offset}`)
}

// Broadcast
export async function sendBroadcast({ title, body, type = 'announcement' }) {
  return request('/admin/broadcast', { method: 'POST', body: { title, body, type } })
}
