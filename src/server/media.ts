import { createServerFn } from '@tanstack/react-start'
import { supabase } from '../lib/supabase'

export const getMediaAssets = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) {
      console.error("Error fetching media:", error)
      throw new Error(error.message)
    }
    
    return data || []
  })

export const addMediaAsset = createServerFn({ method: 'POST' })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const { data: newAsset, error } = await supabase
      .from('media')
      .insert([{
        name: data.name,
        url: data.url,
        type: data.type,
        size: data.size
      }])
      .select()
      .single()
      
    if (error) {
      console.error("Error adding media:", error)
      throw new Error(error.message)
    }
    
    return newAsset
  })

export const deleteMediaAsset = createServerFn({ method: 'POST' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', data.id)
      
    if (error) {
      console.error("Error deleting media:", error)
      throw new Error(error.message)
    }
    
    return { success: true }
  })
