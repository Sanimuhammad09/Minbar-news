import { createServerFn } from '@tanstack/react-start'
import { getDb, saveDb } from './localdb'

export const getDocs = createServerFn({ method: 'GET' })
  .handler(async () => {
    const db = await getDb()
    return db.docs
  })

export const createDoc = createServerFn({ method: 'POST' })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const db = await getDb()
    const newDoc = {
      id: Date.now().toString(),
      ...data
    }
    db.docs.push(newDoc)
    await saveDb(db)
    return newDoc
  })

export const deleteDoc = createServerFn({ method: 'POST' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const db = await getDb()
    db.docs = db.docs.filter(d => d.id !== data.id)
    await saveDb(db)
    return { success: true }
  })
