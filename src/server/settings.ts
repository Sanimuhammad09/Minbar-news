import { createServerFn } from '@tanstack/react-start'
import { getDb, saveDb } from './localdb'

export const getSettings = createServerFn({ method: 'GET' })
  .handler(async () => {
    const db = await getDb()
    return db.settings
  })

export const updateSettings = createServerFn({ method: 'POST' })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const db = await getDb()
    db.settings = { ...db.settings, ...data }
    await saveDb(db)
    return db.settings
  })
