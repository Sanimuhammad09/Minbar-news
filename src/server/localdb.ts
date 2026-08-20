import fs from 'fs/promises'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'src/server/db.json')

export interface LocalDb {
  settings: any;
  media: any[];
  docs: any[];
}

const defaultDb: LocalDb = {
  settings: {
    brandName: 'Minbar News',
    logoUrl: '',
    faviconUrl: '',
    socialImageUrl: '',
    primaryFont: 'Source Serif 4',
    disclaimer: '© 2024 Minbar News Agency. All rights reserved.',
    seoTitle: '| Minbar News Agency',
    seoDescription: 'Leading global news agency providing real-time analysis, breaking reports, and investigative journalism for decision-makers.',
    googleNewsIndexing: true,
    navigation: [
      { id: '1', label: 'News', url: '/category/news' },
      { id: '2', label: 'Middle East', url: '/category/middle-east' },
      { id: '3', label: 'Africa', url: '/category/africa' },
      { id: '4', label: 'Asia', url: '/category/asia' },
      { id: '5', label: 'US & Canada', url: '/category/us-canada' },
      { id: '6', label: 'Latin America', url: '/category/latin-america' },
      { id: '7', label: 'Europe', url: '/category/europe' },
      { id: '8', label: 'Asia Pacific', url: '/category/asia-pacific' }
    ],
    integrations: [
      { id: 'ga4', name: 'Google Analytics 4', iconType: 'text', icon: 'G', status: 'Connected', key: 'G-1234567' },
      { id: 'reuters', name: 'Reuters Wire API', iconType: 'icon', icon: 'rss_feed', status: 'Active Service', key: 'REUTERS-API-KEY' }
    ]
  },
  media: [
    { id: '1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1nXn1MEXAhffrjGfaGtM4Wsme6ms2Tgr1h9TlbZnjyB-PT4qASY_VPsHUu3wmriDkjnaY_WKQYL037eF6PVshwl-jJLrS3r1S84AD8N2uH26gEZ15jgxYibguj3TDHB2Po3OrmM72IG1-jic2GOoRn6aFPZ6RIelIm-gSE0W6ncYGLgIKVoQD1ePdL27CVMiyJF911TfvD3SFtbZCpnDaMBauyxs1pxD0eIMLTBsy5xaGo4ruEW4', name: 'ceo-profile.jpg', type: 'image/jpeg', size: '245 KB', date: '2024-03-01T10:00:00Z' },
    { id: '2', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCQR6sLQYN7mvM3EHcFMt65M2Hm2lvXLsSwtyAbfMCGA3wrZo_sdP5g6ugjXh2j3xyXRHbt9HXB_v4Pa9hO7ZuI_8yK9rgH70c2UAK0IpwsQwBsuzSelJNmpWFy_YWM30oDl3q09wtjotZWv7YinpFcPmCXDb_HTqGkLNFYlchxkGUn4NDz1eEvauDOC0R9rC9Ww2-B-5vwtC0NgPNnxC4i__S_70dLqgnNNr2CA-NcpjWeS0BMII', name: 'article-header.jpg', type: 'image/jpeg', size: '412 KB', date: '2024-03-05T14:30:00Z' }
  ],
  docs: [
    { id: '1', title: 'Editorial Guidelines', content: 'Always verify sources twice before publishing. No exceptions.', category: 'Editorial' },
    { id: '2', title: 'Content formatting', content: 'Use H2 for main section headers, H3 for sub-sections. Keep paragraphs under 5 sentences.', category: 'Style Guide' }
  ]
}

export async function getDb(): Promise<LocalDb> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(DB_PATH, JSON.stringify(defaultDb, null, 2))
      return defaultDb
    }
    throw error
  }
}

export async function saveDb(data: LocalDb): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}
