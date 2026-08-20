import { createAPIFileRoute } from '@tanstack/react-start/api'
import { supabase } from '../../lib/supabase'

export const APIRoute = createAPIFileRoute('/api/articles')({
  GET: async ({ request }) => {
    const { data, error } = await supabase.from('articles').select('*')
    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }
    return Response.json(data)
  },
  POST: async ({ request }) => {
    try {
      const body = await request.json()
      const { data, error } = await supabase.from('articles').insert([body]).select()
      
      if (error) {
        return Response.json({ error: error.message }, { status: 500 })
      }
      return Response.json(data, { status: 201 })
    } catch (e) {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 })
    }
  }
})
