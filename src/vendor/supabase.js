const createClient = (url, key) => ({
  auth: {
    signInWithPassword: async () => ({ error: null }),
    signOut: async () => {},
    getSession: async () => ({ data: { session: { user: { id: 'admin-1', email: 'admin@together.com' } } } }),
    onAuthStateChange: (callback) => ({ subscription: { unsubscribe: () => {} } }),
  },
  from: (table) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: { id: 'admin-1', email: 'admin@together.com', role: 'super_admin' }, error: null }),
      }),
    }),
  }),
})

export { createClient }