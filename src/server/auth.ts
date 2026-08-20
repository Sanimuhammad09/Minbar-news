import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie, deleteCookie } from '@tanstack/start/server'
import { supabase } from '../lib/supabase'

export const getAuthSession = createServerFn({ method: 'GET' })
  .handler(async () => {
    const sessionEmail = getCookie('user_session')
    if (!sessionEmail) return null
    
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', sessionEmail)
      .single()
      
    return user || null
  })

export const login = createServerFn({ method: 'POST' })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', data.email)
      .single()
      
    if (error || !user) {
      throw new Error('User not found')
    }
    
    setCookie('user_session', user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    
    return { ok: true, user }
  })

export const logout = createServerFn({ method: 'POST' })
  .handler(async () => {
    deleteCookie('user_session', { path: '/' })
    return { ok: true }
  })

export const signup = createServerFn({ method: 'POST' })
  .validator((data: { email: string; fullName?: string }) => data)
  .handler(async ({ data }) => {
    // Basic implementation: check if user exists, if not, create one
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', data.email)
      .single()
      
    if (existingUser) {
      throw new Error('An account with this email already exists.')
    }
    
    // Create new user (using email prefix as default name if none provided)
    const fullName = data.fullName || data.email.split('@')[0]
    
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{
        email: data.email,
        full_name: fullName,
        role: 'reader'
      }])
      .select('*')
      .single()
      
    if (error || !newUser) {
      throw new Error(error?.message || 'Failed to create account')
    }
    
    // Auto-login the newly created user
    setCookie('user_session', newUser.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    
    return { ok: true, user: newUser }
  })
