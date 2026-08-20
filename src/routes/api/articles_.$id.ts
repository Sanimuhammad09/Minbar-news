import { createAPIFileRoute } from '@tanstack/react-start/api'
import { supabase } from '../../lib/supabase'

export const APIRoute = createAPIFileRoute('/api/articles/$id')({
  GET: async ({ request, params }) => {
    const { id } = params
    const { data, error } = await supabase.from('articles').select('*').eq('id', id).single()
    if (error) {
      return Response.json({ error: error.message }, { status: 404 })
    }
    return Response.json(data)
  },
  PUT: async ({ request, params }) => {
    const { id } = params
    try {
      const body = await request.json()
      const { data, error } = await supabase.from('articles').update(body).eq('id', id).select()
      
      if (error) {
        return Response.json({ error: error.message }, { status: 500 })
      }
      return Response.json(data)
    } catch (e) {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 })
    }
  },
  DELETE: async ({ request, params }) => {
    const { id } = params
    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }
    return new Response(null, { status: 204 })
  }
})
