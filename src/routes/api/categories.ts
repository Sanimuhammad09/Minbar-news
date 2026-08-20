import { createAPIFileRoute } from '@tanstack/react-start/api'
import { supabase } from '../../lib/supabase'

export const APIRoute = createAPIFileRoute('/api/categories')({
  GET: async ({ request }) => {
    const { data, error } = await supabase.from('categories').select('*')
    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }
    return Response.json(data)
  },
  POST: async ({ request }) => {
    try {
      const body = await request.json()
      const { data, error } = await supabase.from('categories').insert([body]).select()
      
      if (error) {
        return Response.json({ error: error.message }, { status: 500 })
      }
      return Response.json(data, { status: 201 })
    } catch (e) {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 })
    }
  }
})
