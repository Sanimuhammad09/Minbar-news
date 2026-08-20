import { createServerFn } from '@tanstack/react-start'
import { supabase } from '../lib/supabase'

export const getCategories = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw new Error(error.message)
    return data || []
  })

export const getCategoryBySlug = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { data, error } = await supabase
      .from('categories')
      .select('*, articles(*, users(full_name, avatar_url))')
      .eq('slug', slug)
      .single()
      
    if (error) throw new Error(error.message)
    return data
  })
