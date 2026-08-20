import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { getCategoryBySlug } from '../server/categories'

export const Route = createFileRoute('/category/$categoryId')({
  loader: async ({ params }) => await getCategoryBySlug({ data: params.categoryId }),
  component: CategoryView,
})

function CategoryView() {
  const { categoryId } = Route.useParams()
  const category: any = Route.useLoaderData()
  const articles = category?.articles || []
  const leadArticle = articles.length > 0 ? articles[0] : null
  const gridArticles = articles.slice(1, 3)
  const listArticles = articles.slice(3)
  
  const categoryName = category?.name || categoryId.charAt(0).toUpperCase() + categoryId.slice(1)

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      {/* Sub-Navigation for Category */}
      <div className="bg-surface-container-low border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-grid-margin py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="font-headline-md text-headline-md text-primary border-r border-outline-variant pr-6">{categoryName}</h1>
            <nav className="hidden md:flex items-center space-x-6">
              <a className="font-label-bold text-label-bold text-secondary border-b-2 border-secondary pb-1 cursor-pointer">Middle East</a>
              <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary cursor-pointer">Europe</a>
              <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary cursor-pointer">Americas</a>
              <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary cursor-pointer">Asia</a>
              <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary cursor-pointer">Africa</a>
            </nav>
          </div>
          <div className="flex items-center text-on-surface-variant font-label-sm text-label-sm">
            <span className="mr-2">Sort by:</span>
            <select className="bg-transparent border-none focus:ring-0 font-label-bold text-label-bold cursor-pointer outline-none">
              <option>Latest</option>
              <option>Trending</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-grid-margin py-stack-lg">
        <div className="grid grid-cols-12 gap-gutter">
          
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-section-gap">
            
            {/* Lead Story Card */}
            {leadArticle && (
              <section className="relative pt-stack-md before:content-[''] before:absolute before:top-0 before:left-0 before:w-10 before:h-[3px] before:bg-secondary">
                <div className="grid md:grid-cols-2 gap-stack-lg items-center">
                  <div className="order-2 md:order-1 space-y-4">
                    <div className="flex items-center space-x-2 text-secondary font-label-bold uppercase tracking-widest text-xs">
                      <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                      <span>Latest Story</span>
                    </div>
                    <Link to="/article/$articleId" params={{ articleId: leadArticle.slug }} className="hover:opacity-80 block">
                      <h2 className="font-display-lg text-display-lg text-primary leading-tight hover:underline underline-offset-4">{leadArticle.title}</h2>
                    </Link>
                    <p className="font-body-lg text-body-lg text-on-surface-variant line-clamp-3">{leadArticle.excerpt || leadArticle.content?.substring(0, 150) + '...'}</p>
                    <div className="flex items-center space-x-4 pt-4">
                      <Link to="/article/$articleId" params={{ articleId: leadArticle.slug }} className="bg-primary text-on-primary px-8 py-3 font-label-bold uppercase tracking-tighter hover:opacity-90 transition-opacity cursor-pointer">Full Analysis</Link>
                      <span className="text-on-surface-variant font-label-sm uppercase">{Math.max(1, Math.ceil((leadArticle.content?.length || 0)/1000))} Min Read • By {leadArticle.users?.full_name || 'Staff'}</span>
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="aspect-video w-full overflow-hidden border border-outline-variant flex items-center justify-center bg-surface-container-high">
                      {leadArticle.featured_image ? (
                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Hero" src={leadArticle.featured_image} />
                      ) : (
                        <span className="material-symbols-outlined text-outline text-6xl">newspaper</span>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* News Grid Section */}
            <section className="space-y-stack-lg">
              <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                <h3 className="font-headline-md text-headline-md text-primary">Regional Updates</h3>
                <a className="text-secondary font-label-bold hover:underline cursor-pointer">View All</a>
              </div>
              <div className="grid md:grid-cols-2 gap-gutter">
                {gridArticles.map((article: any) => (
                  <Link key={article.id} to="/article/$articleId" params={{ articleId: article.slug }} className="group cursor-pointer space-y-4 border-b border-outline-variant pb-6 block">
                    <div className="aspect-[3/2] w-full overflow-hidden bg-surface-container border border-outline-variant flex items-center justify-center">
                      {article.featured_image ? (
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={article.title} src={article.featured_image} />
                      ) : (
                        <span className="material-symbols-outlined text-outline text-4xl">public</span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <span className="font-label-bold text-label-bold text-secondary uppercase text-xs">{categoryName}</span>
                      <h4 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">{article.title}</h4>
                      <p className="text-on-surface-variant font-body-md line-clamp-2">{article.excerpt || article.content?.substring(0, 100) + '...'}</p>
                      <div className="font-label-sm text-label-sm text-outline pt-2">{new Date(article.created_at).toLocaleDateString()}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* List Style Previews */}
            <section className="space-y-stack-md">
              <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                <h3 className="font-headline-md text-headline-md text-primary">Quick Reads</h3>
              </div>
              <div className="divide-y divide-outline-variant">
                {listArticles.map((article: any) => (
                  <Link key={article.id} to="/article/$articleId" params={{ articleId: article.slug }} className="py-6 flex gap-stack-md group cursor-pointer block">
                    <div className="flex-1 space-y-2">
                      <span className="font-label-bold text-label-bold text-on-surface-variant uppercase text-xs">{categoryName} • News</span>
                      <h4 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">{article.title}</h4>
                      <p className="text-on-surface-variant font-body-md hidden md:block line-clamp-2">{article.excerpt || article.content?.substring(0, 100) + '...'}</p>
                      <div className="font-label-sm text-label-sm text-outline">{new Date(article.created_at).toLocaleDateString()}</div>
                    </div>
                    <div className="w-32 h-20 bg-surface-container border border-outline-variant shrink-0 flex items-center justify-center">
                      {article.featured_image ? (
                        <img className="w-full h-full object-cover" alt={article.title} src={article.featured_image} />
                      ) : (
                        <span className="material-symbols-outlined text-outline">article</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-stack-lg">
            
            {/* Most Read in World */}
            <div className="bg-surface-container-low p-stack-md border border-outline-variant">
              <h3 className="font-label-bold text-label-bold uppercase tracking-widest border-b-2 border-primary pb-2 mb-4">Most Read in {categoryName}</h3>
              <div className="space-y-6">
                {articles.slice(0, 3).map((article: any, index: number) => (
                  <div key={article.id} className="flex items-start gap-4">
                    <span className="font-display-lg text-display-lg text-outline-variant leading-none">0{index + 1}</span>
                    <div className="space-y-1">
                      <Link to="/article/$articleId" params={{ articleId: article.slug }} className="font-label-bold text-label-bold hover:text-secondary leading-tight block cursor-pointer">{article.title}</Link>
                      <span className="font-label-sm text-label-sm text-outline">{categoryName} • {article.views_count || 0} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-primary-container text-on-primary-container p-stack-md space-y-4">
              <h3 className="font-headline-md text-headline-md text-on-primary font-bold">The {categoryName} Brief</h3>
              <p className="font-label-sm text-label-sm">Get the most important global news delivered to your inbox every morning at 6:00 AM.</p>
              <form className="space-y-2" onSubmit={e => e.preventDefault()}>
                <input className="w-full bg-surface-container-lowest text-primary px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-secondary rounded-none" placeholder="email@agency.com" type="email" />
                <button className="w-full bg-secondary text-on-secondary font-label-bold text-label-bold uppercase py-3 hover:opacity-90 transition-opacity cursor-pointer">Subscribe Now</button>
              </form>
            </div>

            {/* Live Ticker Sidebar */}
            <div className="border border-outline-variant p-stack-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-bold text-label-bold uppercase">Live Market Data</h3>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-3 font-label-sm text-label-sm">
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span>S&P 500</span>
                  <span className="text-green-600">+0.42%</span>
                </div>
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span>Nikkei 225</span>
                  <span className="text-red-600">-0.18%</span>
                </div>
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span>Brent Crude</span>
                  <span className="text-on-surface">$82.45</span>
                </div>
                <div className="flex justify-between">
                  <span>Gold (XAU)</span>
                  <span className="text-on-surface">$2,145.20</span>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </main>
    </div>
  )
}
