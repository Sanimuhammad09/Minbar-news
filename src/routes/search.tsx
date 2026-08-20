import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { searchArticles } from '../server/articles'
import { z } from 'zod'

export const Route = createFileRoute('/search')({
  validateSearch: z.object({
    q: z.string().optional().catch(''),
  }),
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps: { q } }) => await searchArticles({ data: q || '' }),
  component: SearchResults,
})

function SearchResults() {
  const { q } = Route.useSearch()
  const results: any = Route.useLoaderData()
  const navigate = useNavigate({ from: '/search' })
  const [searchQuery, setSearchQuery] = useState(q || '')
  const [isFocused, setIsFocused] = useState(false)

  // Sync local state when URL changes
  useEffect(() => {
    setSearchQuery(q || '')
  }, [q])

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    navigate({ search: { q: searchQuery } })
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <main className="flex-grow max-w-7xl mx-auto w-full px-grid-margin py-stack-lg flex flex-col md:flex-row gap-gutter">
        
        {/* Search Results Area (8 Columns) */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col space-y-stack-lg">
          
          {/* Search Stats & Filter Chips */}
          <div className="flex flex-col space-y-stack-md border-b border-outline-variant pb-stack-md">
            
            {/* Search Input for Mobile/Inline */}
            <form onSubmit={handleSearchSubmit} className={`flex items-center bg-surface-container border px-3 py-2 rounded-sm w-full mb-4 transition-colors ${isFocused ? 'border-secondary' : 'border-outline-variant'}`}>
              <span className="material-symbols-outlined text-on-surface-variant text-sm mr-2 cursor-pointer" onClick={handleSearchSubmit}>search</span>
              <input 
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full p-0" 
                placeholder="Search articles..." 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </form>

            <div className="flex items-baseline justify-between">
              <h1 className="font-headline-md text-headline-md text-primary">
                {q ? (
                  <>Search Results for <span className="italic">"{q}"</span></>
                ) : (
                  <>Search All Articles</>
                )}
              </h1>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{results.length} results found</span>
            </div>
            
            <div className="flex flex-wrap gap-stack-sm items-center">
              <span className="font-label-bold text-label-bold text-primary mr-2">Filters:</span>
              <button className="px-4 py-1 border border-outline-variant bg-surface rounded-full font-label-bold text-label-bold hover:bg-surface-container transition-all flex items-center cursor-pointer">
                All Time <span className="material-symbols-outlined text-xs ml-1">expand_more</span>
              </button>
              <button className="px-4 py-1 border border-secondary text-secondary bg-surface rounded-full font-label-bold text-label-bold flex items-center cursor-pointer">
                Economy <span className="material-symbols-outlined text-xs ml-1">close</span>
              </button>
              <button className="px-4 py-1 border border-outline-variant bg-surface rounded-full font-label-bold text-label-bold hover:bg-surface-container transition-all flex items-center cursor-pointer">
                Author <span className="material-symbols-outlined text-xs ml-1">expand_more</span>
              </button>
              <button className="px-4 py-1 border border-outline-variant bg-surface rounded-full font-label-bold text-label-bold hover:bg-surface-container transition-all flex items-center cursor-pointer">
                Sort by: Newest <span className="material-symbols-outlined text-xs ml-1">swap_vert</span>
              </button>
              <button className="text-secondary font-label-bold text-label-bold hover:underline ml-auto cursor-pointer">Clear All</button>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-stack-lg">
            
            {results.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-body-md text-on-surface-variant">No results found. Try a different keyword.</p>
              </div>
            ) : (
              results.map((article: any) => (
                <Link to={`/article/${article.slug}`} key={article.id} className="flex flex-col sm:flex-row gap-stack-md border-b border-outline-variant pb-stack-lg group cursor-pointer block">
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-label-bold text-label-bold text-secondary uppercase tracking-widest border-b border-secondary">
                        {article.categories?.name || 'General'}
                      </span>
                      <span className="text-on-surface-variant text-xs">•</span>
                      <time className="font-label-sm text-label-sm text-on-surface-variant">
                        {new Date(article.published_at || article.created_at).toLocaleDateString()}
                      </time>
                    </div>
                    <h2 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors font-serif leading-tight">
                      {article.title}
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                      {article.excerpt || 'No excerpt available.'}
                    </p>
                    <div className="flex items-center space-x-4 pt-2">
                      <span className="font-label-bold text-label-bold text-primary">By {article.users?.full_name || 'Staff'}</span>
                      <span className="flex items-center text-on-surface-variant text-xs">
                        <span className="material-symbols-outlined text-sm mr-1">visibility</span> {article.views_count} views
                      </span>
                    </div>
                  </div>
                  {article.featured_image && (
                    <div className="hidden sm:block flex-shrink-0 w-48 h-32 bg-surface-container overflow-hidden rounded-sm">
                      <img className="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-transform duration-500" alt={article.title} src={article.featured_image} />
                    </div>
                  )}
                </Link>
              ))
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center py-stack-lg space-x-4">
              <button className="p-2 border border-outline-variant rounded-sm hover:bg-surface-container-low disabled:opacity-30 cursor-pointer" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex space-x-1">
                <button className="w-10 h-10 flex items-center justify-center font-label-bold bg-primary text-on-primary rounded-sm cursor-pointer">1</button>
                <button className="w-10 h-10 flex items-center justify-center font-label-bold hover:bg-surface-container rounded-sm transition-all cursor-pointer">2</button>
                <button className="w-10 h-10 flex items-center justify-center font-label-bold hover:bg-surface-container rounded-sm transition-all cursor-pointer">3</button>
                <span className="flex items-center px-2">...</span>
                <button className="w-10 h-10 flex items-center justify-center font-label-bold hover:bg-surface-container rounded-sm transition-all cursor-pointer">42</button>
              </div>
              <button className="p-2 border border-outline-variant rounded-sm hover:bg-surface-container-low cursor-pointer">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            
          </div>
        </div>

        {/* Sidebar Area (4 Columns) */}
        <aside className="w-full md:w-1/3 lg:w-1/4 flex flex-col space-y-stack-lg">
          
          {/* Trending Keywords Widget */}
          <section className="bg-surface-container-low p-stack-md border-t-2 border-primary">
            <h3 className="font-label-bold text-label-bold uppercase text-primary mb-stack-md flex items-center">
              <span className="material-symbols-outlined text-sm mr-2">trending_up</span>
              Trending Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              <a className="px-3 py-1 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all rounded-sm text-xs font-label-bold">Crypto Volatility</a>
              <a className="px-3 py-1 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all rounded-sm text-xs font-label-bold">Green Hydrogen</a>
              <a className="px-3 py-1 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all rounded-sm text-xs font-label-bold">Space Station</a>
              <a className="px-3 py-1 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all rounded-sm text-xs font-label-bold">Election 2024</a>
              <a className="px-3 py-1 bg-primary text-on-primary rounded-sm text-xs font-label-bold">Global Recession</a>
              <a className="px-3 py-1 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all rounded-sm text-xs font-label-bold">AI Ethics</a>
              <a className="px-3 py-1 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all rounded-sm text-xs font-label-bold">Urban Farming</a>
            </div>
          </section>
          
          {/* Newsletter Signup */}
          <section className="bg-primary-container text-on-primary-container p-stack-md rounded-sm">
            <h3 className="font-headline-md text-headline-md mb-2 text-primary-fixed">The Daily Brief</h3>
            <p className="font-label-sm text-label-sm mb-4 text-on-primary-container opacity-80">
              Get the most critical global updates delivered straight to your inbox every morning.
            </p>
            <div className="space-y-2">
              <input className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary rounded-sm px-4 py-2 text-sm" placeholder="email@address.com" type="email" />
              <button className="w-full bg-secondary text-on-secondary font-label-bold text-label-bold py-2 rounded-sm hover:bg-secondary-container transition-all cursor-pointer">Subscribe</button>
            </div>
          </section>

          {/* Related Topics Sidebar */}
          <section className="space-y-stack-md">
            <h3 className="font-label-bold text-label-bold uppercase text-primary flex items-center">
              <span className="material-symbols-outlined text-sm mr-2">hub</span>
              Related Topics
            </h3>
            <ul className="space-y-2">
              <li className="border-b border-outline-variant pb-2 group">
                <a className="flex items-center justify-between hover:text-secondary transition-colors cursor-pointer">
                  <span className="font-body-md text-body-md">Federal Reserve Policies</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </li>
              <li className="border-b border-outline-variant pb-2 group">
                <a className="flex items-center justify-between hover:text-secondary transition-colors cursor-pointer">
                  <span className="font-body-md text-body-md">Inflation Forecasts</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </li>
              <li className="border-b border-outline-variant pb-2 group">
                <a className="flex items-center justify-between hover:text-secondary transition-colors cursor-pointer">
                  <span className="font-body-md text-body-md">Emerging Market Bonds</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </li>
              <li className="border-b border-outline-variant pb-2 group">
                <a className="flex items-center justify-between hover:text-secondary transition-colors cursor-pointer">
                  <span className="font-body-md text-body-md">Gold as a Safe Haven</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </li>
            </ul>
          </section>

          {/* Live Ticker Style Widget */}
          <div className="relative h-64 w-full bg-surface-container rounded-sm overflow-hidden">
            <div className="absolute inset-0 p-stack-md flex flex-col justify-end bg-gradient-to-t from-primary/80 to-transparent">
              <span className="inline-block bg-secondary text-on-secondary text-[10px] px-2 py-0.5 font-label-bold rounded-sm mb-2 w-fit">LIVE DATA</span>
              <h4 className="text-white font-headline-md text-headline-md leading-tight mb-1">Market Volatility Index</h4>
              <p className="text-white/70 text-xs font-label-sm">Real-time indicators showing increased risk in tech and manufacturing sectors.</p>
            </div>
          </div>
          
        </aside>
      </main>
    </div>
  )
}
