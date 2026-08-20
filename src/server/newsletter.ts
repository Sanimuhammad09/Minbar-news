import { createServerFn } from '@tanstack/react-start'
import { supabase } from './supabase'

export const subscribeNewsletter = createServerFn({ method: 'POST' })
  .validator((email: string) => email)
  .handler(async ({ data: email }) => {
    if (!email) {
      throw new Error("Email is required")
    }

    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }])
      
    if (error) {
      if (error.code === '23505') {
        throw new Error("You are already subscribed!")
      }
      throw new Error("Failed to subscribe: " + error.message)
    }

    return { success: true }
  })
