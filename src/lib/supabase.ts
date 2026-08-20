import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || ''
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase URL or Anon Key is missing. Check your environment variables.');
}

// Provide a fallback so the app doesn't crash with 500 error on Vercel before env vars are added
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({
          eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'No DB config' } }) }),
          order: () => Promise.resolve({ data: [], error: { message: 'No DB config' } })
        }),
        insert: () => Promise.resolve({ data: null, error: { message: 'No DB config' } }),
        update: () => ({ eq: () => Promise.resolve({ data: null, error: { message: 'No DB config' } }) }),
        delete: () => ({ eq: () => Promise.resolve({ data: null, error: { message: 'No DB config' } }) })
      })
    } as any
