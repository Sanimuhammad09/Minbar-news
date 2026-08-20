import { createServerFn } from '@tanstack/react-start'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { getUser } from './auth'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_PATH = path.join(__dirname, 'interactions.json')

async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (e) {
    return { comments: [], saves: [] }
  }
}

async function writeDB(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

export const getArticleInteractions = createServerFn({ method: 'GET' })
  .validator((articleId: string) => articleId)
  .handler(async ({ data: articleId }) => {
    const db = await readDB()
    const comments = db.comments.filter((c: any) => c.articleId === articleId)
    // Return comments and total save count for this article
    const savesCount = db.saves.filter((s: any) => s.articleId === articleId).length
    return { comments, savesCount }
  })

export const checkUserSaved = createServerFn({ method: 'GET' })
  .validator((articleId: string) => articleId)
  .handler(async ({ data: articleId }) => {
    const user = await getUser()
    if (!user) return false
    const db = await readDB()
    return db.saves.some((s: any) => s.articleId === articleId && s.userId === user.id)
  })

export const toggleSaveArticle = createServerFn({ method: 'POST' })
  .validator((articleId: string) => articleId)
  .handler(async ({ data: articleId }) => {
    const user = await getUser()
    if (!user) throw new Error("Must be logged in to save articles")
    
    const db = await readDB()
    const existingIndex = db.saves.findIndex((s: any) => s.articleId === articleId && s.userId === user.id)
    
    let isSaved = false
    if (existingIndex >= 0) {
      db.saves.splice(existingIndex, 1)
      isSaved = false
    } else {
      db.saves.push({ articleId, userId: user.id, timestamp: Date.now() })
      isSaved = true
    }
    
    await writeDB(db)
    return { isSaved }
  })

export const addComment = createServerFn({ method: 'POST' })
  .validator((data: { articleId: string, content: string }) => data)
  .handler(async ({ data }) => {
    const user = await getUser()
    if (!user) throw new Error("Must be logged in to comment")
      
    const db = await readDB()
    const newComment = {
      id: Math.random().toString(36).substring(2, 9),
      articleId: data.articleId,
      userId: user.id,
      userName: user.email.split('@')[0], // Use email handle as name
      content: data.content,
      timestamp: Date.now()
    }
    
    db.comments.push(newComment)
    await writeDB(db)
    
    return newComment
  })
