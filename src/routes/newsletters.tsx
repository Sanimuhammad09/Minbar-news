import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { getArticlesByCategory } from '../server/articles'

export const Route = createFileRoute('/newsletters')({
  loader: async () => await getArticlesByCategory({ data: 'newsletters' }),
  component: NewsletterArchive,
})

function NewsletterArchive() {
  const [activeTab, setActiveTab] = useState('All Archives')
  const articles: any = Route.useLoaderData()

  const tabs = [
    'All Archives',
    'Daily Brief',
    'Weekly Digest',
    'Breaking Alerts',
    'Tech Dispatch'
  ]

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <main className="max-w-7xl mx-auto px-grid-margin py-stack-lg">
        
        {/* Hero Section: Subscription Value Prop */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center mb-section-gap">
          <div className="md:col-span-7 flex flex-col gap-stack-md">
            <div className="flex items-center gap-2 text-secondary font-label-bold uppercase tracking-widest">
              <span className="w-8 h-[2px] bg-secondary"></span>
              Global Intelligence
            </div>
            <h1 className="font-display-lg text-display-lg md:text-[64px] md:leading-[72px] tracking-tight">
              Truth. Perspective. Impact.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Join 250,000+ global citizens who start their day with Minbar's rigorous analysis. No noise, just the stories that shape our world.
            </p>
            <form className="mt-stack-md flex flex-col sm:flex-row gap-0 max-w-lg" onSubmit={e => e.preventDefault()}>
              <input 
                className="flex-grow border border-outline px-4 py-4 bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-body-md rounded-none" 
                placeholder="Enter your email address" 
                type="email" 
              />
              <button className="bg-primary text-on-primary px-8 py-4 font-label-bold text-label-bold hover:bg-opacity-90 transition-all uppercase cursor-pointer" type="submit">Join Now</button>
            </form>
            <p className="font-label-sm text-label-sm text-outline">Free daily brief. Unsubscribe anytime.</p>
          </div>
          <div className="md:col-span-5 relative aspect-[4/5] overflow-hidden">
            <img className="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-700" alt="Hero" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjDjqIe1SdnfNg0KHxQvW9au5NRuSnO2iae4gkypcK0B_9njKY_5YKit0XxgcWWME31G51v_wh0YBEpw_0SwWqWoAy908NcWbV2k1Xsyi-o0pdR2LVeX906LMjy2751XuJX_VQG87jPJzirmN2dGARB3cu-IDreCEYe_i_F-jJUSBrZm5bVJmDvM3b_KUDVbPkxAbNquKvWhjy9LKaMwodH1IcC59pQJtAne1kOxPtjId5elfjVJQ" />
            <div className="absolute inset-0 border-[16px] border-surface pointer-events-none"></div>
          </div>
        </section>

        {/* Newsletter Category Navigation */}
        <section className="mb-stack-lg border-b border-outline-variant">
          <div className="flex flex-wrap gap-stack-lg overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {tabs.map((tab) => (
              <button 
                key={tab}
                className={`pb-stack-sm font-label-bold text-label-bold whitespace-nowrap transition-all uppercase cursor-pointer ${
                  activeTab === tab 
                    ? 'border-b-2 border-secondary text-secondary' 
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Archive Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-section-gap">
          {articles.length === 0 ? (
            <div className="col-span-full py-12 text-center text-on-surface-variant">
              No newsletters found in the archive.
            </div>
          ) : (
            articles.map((article: any) => (
              <article key={article.id} className="flex flex-col gap-stack-md group cursor-pointer">
                <div className="h-[1px] bg-gradient-to-r from-secondary to-transparent w-full mb-1"></div>
                <div className="flex justify-between items-center font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  <span>{article.categories?.name || 'Newsletter'}</span>
                  <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                </div>
                {article.featured_image && (
                  <div className="overflow-hidden aspect-video relative">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={article.title} src={article.featured_image} />
                  </div>
                )}
                <h2 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">{article.title}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                  {article.excerpt}
                </p>
                <Link to={`/article/${article.slug}`} className="font-label-bold text-label-bold text-secondary flex items-center gap-2 group/link cursor-pointer mt-auto">
                  Read Full Brief
                  <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </article>
            ))
          )}
        </section>

        {/* Pagination */}
        <div className="mt-section-gap flex items-center justify-center gap-4">
          <button className="p-3 border border-outline hover:bg-surface-container transition-all cursor-pointer">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="font-label-bold text-label-bold text-primary px-4">Page 1 of 42</span>
          <button className="p-3 border border-outline hover:bg-surface-container transition-all cursor-pointer">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>

      {/* Mid-Page CTA Section */}
      <section className="bg-primary py-section-gap w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="max-w-7xl mx-auto px-grid-margin grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">
          <div>
            <h2 className="font-display-lg text-display-lg text-on-primary mb-stack-md">Never miss a perspective.</h2>
            <p className="font-body-lg text-body-lg text-on-primary-container">
              Get our premium Weekly Digest sent straight to your inbox every Sunday morning. Expert curation of the week's most critical developments.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-0">
              <input className="flex-grow border-none px-4 py-4 bg-surface text-primary focus:outline-none focus:ring-0 rounded-none" placeholder="Email Address" type="email" />
              <button className="bg-secondary text-on-primary px-8 py-4 font-label-bold text-label-bold hover:bg-opacity-90 transition-all uppercase cursor-pointer">Get Digest</button>
            </div>
            <div className="flex items-center gap-4 text-on-primary-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-label-sm text-label-sm">No Spam</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span className="font-label-sm text-label-sm">Data Secured</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
