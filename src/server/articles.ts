import { createServerFn } from '@tanstack/react-start'
import Parser from 'rss-parser'
import * as cheerio from 'cheerio'
import { supabase } from '../lib/supabase'

export const getArticles = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(name, slug), users(full_name, avatar_url)')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error("Error fetching articles:", error)
      throw new Error(error.message)
    }
    
    return data || []
  })

export const getTrendingArticles = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(name, slug)')
      .eq('status', 'published')
      .order('views_count', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(3)
      
    if (error) {
      console.error("Error fetching trending articles:", error)
      return []
    }
    
    return data || []
  })

export const getArticleLibraryData = createServerFn({ method: 'GET' })
  .handler(async () => {
    const [
      { data: articles },
      { count: publishedCount },
      { count: draftCount },
      { data: viewsData }
    ] = await Promise.all([
      supabase.from('articles')
        .select('*, categories(name, slug), users(full_name, avatar_url)')
        .order('created_at', { ascending: false }),
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
      supabase.from('articles').select('views_count')
    ])

    const totalViews = viewsData?.reduce((acc, curr) => acc + (curr.views_count || 0), 0) || 0;

    return {
      articles: articles || [],
      publishedCount: publishedCount || 0,
      draftCount: draftCount || 0,
      totalViews,
    }
  })

export const getArticleBySlug = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(name, slug), users(full_name, avatar_url)')
      .eq('slug', slug)
      .single()
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data
  })

export const createArticle = createServerFn({ method: 'POST' })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const { data: result, error } = await supabase
      .from('articles')
      .insert([data])
      .select()
    
    if (error) {
      throw new Error(error.message)
    }
    
    return result?.[0]
  })

export const getDashboardStats = createServerFn({ method: 'GET' })
  .handler(async () => {
    const [{ count: articlesCount }, { count: usersCount }, { data: viewsData }, { data: topArticles }] = await Promise.all([
      supabase.from('articles').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('articles').select('views_count'),
      supabase.from('articles')
        .select('*, categories(name, slug), users(full_name, avatar_url)')
        .eq('status', 'published')
        .order('views_count', { ascending: false })
        .limit(5)
    ])
    
    const totalViews = viewsData?.reduce((acc, curr) => acc + (curr.views_count || 0), 0) || 0;
    
    // If there are no views or no tracking table, return real empty data
    const regions: any[] = [];
    
    // If there are no views, velocity is flat. Otherwise, it would query a timeseries DB.
    const velocityData = totalViews === 0 ? Array(12).fill(0).map(() => ({ height: '0%', isPeak: false })) : [
      { height: '40%', isPeak: false },
      { height: '55%', isPeak: false },
      { height: '35%', isPeak: false },
      { height: '70%', isPeak: false },
      { height: '85%', isPeak: false },
      { height: '95%', isPeak: true },
      { height: '80%', isPeak: false },
      { height: '60%', isPeak: false },
      { height: '45%', isPeak: false },
      { height: '50%', isPeak: false },
      { height: '65%', isPeak: false },
      { height: '40%', isPeak: false }
    ];

    return {
      totalArticles: articlesCount || 0,
      totalUsers: usersCount || 0,
      totalViews,
      topArticles: topArticles || [],
      regions,
      velocityData
    }
  })

export const getEditorialDashboardData = createServerFn({ method: 'GET' })
  .handler(async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const [
      { data: drafts },
      { data: recentActivity },
      { count: publishedToday },
      { data: viewsData }
    ] = await Promise.all([
      supabase.from('articles')
        .select('*, categories(name, slug), users(full_name, avatar_url)')
        .eq('status', 'draft')
        .order('created_at', { ascending: false }),
      supabase.from('articles')
        .select('*, categories(name, slug), users(full_name, avatar_url)')
        .order('updated_at', { ascending: false })
        .limit(3),
      supabase.from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published')
        .gte('published_at', today.toISOString()),
      supabase.from('articles').select('views_count')
    ])
    
    const totalViews = viewsData?.reduce((acc, curr) => acc + (curr.views_count || 0), 0) || 0;
    
    return {
      drafts: drafts || [],
      recentActivity: recentActivity || [],
      publishedToday: publishedToday || 0,
      totalViews
    }
  })

export const getArticlesByCategory = createServerFn({ method: 'GET' })
  .validator((categorySlug: string) => categorySlug)
  .handler(async ({ data: categorySlug }) => {
    const { data: category } = await supabase.from('categories').select('id').eq('slug', categorySlug).single()
    if (!category) return []

    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(name, slug), users(full_name, avatar_url)')
      .eq('category_id', category.id)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      
    if (error) throw new Error(error.message)
    return data || []
  })

export const searchArticles = createServerFn({ method: 'GET' })
  .validator((query: string) => query)
  .handler(async ({ data: query }) => {
    if (!query) return []
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(name, slug), users(full_name, avatar_url)')
      .ilike('title', `%${query}%`)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      
    if (error) throw new Error(error.message)
    return data || []
  })

export const getCategories = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })
      
    if (error) {
      console.error("Error fetching categories:", error)
      return []
    }
    
    return data || []
  })

export const syncAlJazeeraNews = createServerFn({ method: 'POST' })
  .handler(async () => {
    try {
      const parser = new Parser()
      const feed = await parser.parseURL('https://www.aljazeera.com/xml/rss/all.xml')
      
      // Fetch all available categories so we can distribute articles across them
      const { data: categories } = await supabase
        .from('categories')
        .select('id, slug, name')
        
      const availableCategories = categories || []
      
      // Preferred categories to dominate the homepage
      const homepageSlugs = ['world', 'politics', 'economy', 'opinion', 'news']
      const targetCategories = availableCategories.filter(c => homepageSlugs.includes(c.slug))
      
      if (targetCategories.length === 0) {
        throw new Error('No valid categories found in the database')
      }

      // Take the top 10 articles from the feed and fetch their HTML for images and full content
      const newArticles = await Promise.all(feed.items.slice(0, 10).map(async (item) => {
        let featured_image = null
        let full_content = item.contentSnippet || ''
        
        // Fetch the actual article page to get the high-res og:image and full article body
        try {
          if (item.link) {
            const res = await fetch(item.link)
            const html = await res.text()
            
            // 1. Extract image
            const match = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i)
            if (match && match[1]) {
              featured_image = match[1]
            }
            
            // 2. Extract full article content using cheerio
            const $ = cheerio.load(html)
            const paragraphs = $('main p, .wysiwyg--all-content p, article p').map((i, el) => {
              const text = $(el).text().trim()
              // Ignore empty paragraphs or short UI text
              if (text.length > 20 && !text.includes('Sign up for our newsletters')) {
                return `<p>${text}</p>`
              }
              return null
            }).get().filter(Boolean)
            
            if (paragraphs.length > 0) {
              // Get unique paragraphs to avoid duplication if multiple selectors matched the same elements
              full_content = Array.from(new Set(paragraphs)).join('')
            }
          }
        } catch (e) {
          console.error("Failed to fetch content for:", item.link)
        }
        
        // Try enclosure fallback
        if (!featured_image && item.enclosure && item.enclosure.url) {
          featured_image = item.enclosure.url
        } 
        
        // Absolute fallback for missing images
        if (!featured_image) {
           featured_image = 'https://www.aljazeera.com/wp-content/uploads/2023/06/AJ-English-1685601275.jpg' 
        }
        
        // Intelligently assign a category based on RSS tags, or randomly distribute
        let assignedCategoryId = targetCategories[0].id
        
        if (item.categories && item.categories.length > 0) {
          const match = targetCategories.find(c => 
            item.categories.some((rssCat: string) => rssCat.toLowerCase().includes(c.slug))
          )
          if (match) {
            assignedCategoryId = match.id
          } else {
            // Randomly distribute to dominate the homepage
            assignedCategoryId = targetCategories[Math.floor(Math.random() * targetCategories.length)].id
          }
        } else {
           // Randomly distribute to dominate the homepage
           assignedCategoryId = targetCategories[Math.floor(Math.random() * targetCategories.length)].id
        }
        
        return {
          title: item.title || 'Untitled',
          slug: item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4) || `article-${Date.now()}`,
          content: full_content,
          excerpt: item.contentSnippet || '',
          status: 'published',
          published_at: item.isoDate || new Date().toISOString(),
          category_id: assignedCategoryId,
          featured_image
        }
      }))
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('articles')
        .insert(newArticles)
        .select()
        
      if (error) throw error
      
      return { ok: true, count: data.length }
    } catch (error: any) {
      console.error('RSS Sync error:', error)
      throw new Error(error.message || 'Failed to sync Al Jazeera news')
    }
  })
