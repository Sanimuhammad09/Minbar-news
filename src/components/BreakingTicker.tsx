import { useState, useEffect } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { Link } from '@tanstack/react-router'
import { getArticles } from '../server/articles'

export default function BreakingTicker() {
  const [breakingNews, setBreakingNews] = useState<any[]>([])
  const fetchArticles = useServerFn(getArticles)

  useEffect(() => {
    fetchArticles().then(data => {
      // Filter for published articles and take the latest 5
      const latest = data.filter((a: any) => a.status === 'published').slice(0, 5)
      setBreakingNews(latest)
    }).catch(console.error)
  }, [])

  if (breakingNews.length === 0) {
    return (
      <section className="w-full bg-secondary text-on-secondary py-2 overflow-hidden sticky top-0 z-50">
        <div className="flex items-center">
          <div className="px-4 py-1 bg-primary text-on-primary font-label-bold text-label-bold uppercase z-10 shrink-0">
            Breaking
          </div>
          <div className="font-label-bold text-label-bold uppercase px-6">
            <span className="animate-pulse">Loading live updates...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-secondary text-on-secondary py-2 overflow-hidden sticky top-0 z-50">
      <div className="flex items-center">
        <div className="px-4 py-1 bg-primary text-on-primary font-label-bold text-label-bold uppercase z-10 shrink-0 shadow-lg">
          Breaking
        </div>
        <div className="breaking-ticker-animation font-label-bold text-label-bold uppercase flex gap-x-12 px-6 whitespace-nowrap">
          {breakingNews.map((article: any) => (
            <Link key={article.id} to="/article/$articleId" params={{ articleId: article.slug }} preload="intent" className="hover:opacity-80 transition-opacity">
              {article.title}
            </Link>
          ))}
          {/* Duplicate the list for seamless CSS marquee looping */}
          {breakingNews.map((article: any) => (
            <Link key={`dup-${article.id}`} to="/article/$articleId" params={{ articleId: article.slug }} preload="intent" className="hover:opacity-80 transition-opacity">
              {article.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
