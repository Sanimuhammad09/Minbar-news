import { createServerFn } from '@tanstack/react-start'
import { supabase } from '../lib/supabase'

export const getUsers = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data || []
  })

export const getStaffDashboardData = createServerFn({ method: 'GET' })
  .handler(async () => {
    const [
      { data: staff },
      { data: drafts }
    ] = await Promise.all([
      supabase.from('users').select('*').order('created_at', { ascending: false }),
      supabase.from('articles')
        .select('title, categories(name)')
        .eq('status', 'draft')
        .order('created_at', { ascending: false })
        .limit(2)
    ])
    
    if (!staff) {
      throw new Error('Failed to load staff data')
    }

    return {
      staff,
      activeCount: staff.length, // Assume all fetched staff are active for now
      assignmentCount: 0, // No assignments table yet
      avgScore: 0.0,
      hotTopics: drafts || []
    }
  })
