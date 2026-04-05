import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dummy.supabase.co'
const supabaseServiceRoleKey = 'dummy-service-role-key'

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: false,
  },
})
