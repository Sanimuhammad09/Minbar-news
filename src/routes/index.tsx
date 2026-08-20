import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { getArticles } from '../server/articles'
import { subscribeNewsletter } from '../server/newsletter'

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getArticles()
})

function Home() {
  const articles = Route.useLoaderData()
  const heroArticle = articles.length > 0 ? articles[0] : null;
  const worldArticles = articles.filter((a: any) => a.categories?.slug === 'world').slice(0, 2);
  const politicsArticles = articles.filter((a: any) => a.categories?.slug === 'politics').slice(0, 2);
  const economyArticles = articles.filter((a: any) => a.categories?.slug === 'economy').slice(0, 2);
  const opinionArticles = articles.filter((a: any) => a.categories?.slug === 'opinion').slice(0, 3);
  const latestArticles = articles.slice(0, 4);
  
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null)
  
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [subMsg, setSubMsg] = useState('')
  const subscribeFn = useServerFn(subscribeNewsletter)

  const handleSubscribe = async () => {
    if (!email) return;
    setSubStatus('loading')
    try {
      await subscribeFn({ data: email })
      setSubStatus('success')
      setSubMsg('Thank you for subscribing!')
      setEmail('')
    } catch (e: any) {
      setSubStatus('error')
      setSubMsg(e.message)
    }
  }

  return (
    <div className="bg-white text-black font-sans overflow-x-hidden min-h-screen flex flex-col">
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full flex flex-col lg:flex-row gap-6">
        
        {/* LEFT SIDEBAR (Trending & Socials) */}
        <aside className="hidden lg:flex flex-col gap-6 sticky top-24 h-fit w-48 shrink-0">
          <div>
            <h3 className="font-label-bold text-label-bold uppercase text-primary border-b border-outline-variant pb-2 mb-4">Trending</h3>
            <ul className="space-y-4">
              <li><Link to="/search" search={{ q: 'Global' }} className="font-label-sm text-label-sm text-on-surface hover:text-secondary transition-colors cursor-pointer block">#Global</Link></li>
              <li><Link to="/search" search={{ q: 'Politics' }} className="font-label-sm text-label-sm text-on-surface hover:text-secondary transition-colors cursor-pointer block">#Politics</Link></li>
              <li><Link to="/search" search={{ q: 'Economy' }} className="font-label-sm text-label-sm text-on-surface hover:text-secondary transition-colors cursor-pointer block">#Economy</Link></li>
              <li><Link to="/search" search={{ q: 'Analysis' }} className="font-label-sm text-label-sm text-on-surface hover:text-secondary transition-colors cursor-pointer block">#Analysis</Link></li>
              <li><Link to="/search" search={{ q: 'Tech' }} className="font-label-sm text-label-sm text-on-surface hover:text-secondary transition-colors cursor-pointer block">#Tech</Link></li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="font-label-bold text-label-bold uppercase text-primary border-b border-outline-variant pb-2 mb-4">Follow Minbar</h3>
            <div className="grid grid-cols-2 gap-4">
               <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                 <span className="material-symbols-outlined text-[20px]">public</span>
                 <span className="text-[10px] font-label-bold uppercase">Web</span>
               </button>
               <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                 <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                 <span className="text-[10px] font-label-bold uppercase">Mail</span>
               </button>
               <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                 <span className="material-symbols-outlined text-[20px]">play_circle</span>
                 <span className="text-[10px] font-label-bold uppercase">Video</span>
               </button>
               <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                 <span className="material-symbols-outlined text-[20px]">rss_feed</span>
                 <span className="text-[10px] font-label-bold uppercase">RSS</span>
               </button>
            </div>
          </div>
          
          <div className="mt-8 bg-surface-container-lowest border border-outline-variant p-4">
             <span className="material-symbols-outlined text-secondary text-3xl mb-2">workspace_premium</span>
             <h4 className="font-label-bold text-label-bold uppercase text-primary mb-1">Minbar Pro</h4>
             <p className="text-[10px] text-on-surface-variant mb-3">Ad-free reading, exclusive newsletters, and events.</p>
             <button className="w-full bg-surface text-primary border border-outline hover:bg-surface-container transition-colors py-1 text-[10px] font-label-bold uppercase cursor-pointer">Upgrade</button>
          </div>
        </aside>

        {/* CENTER & RIGHT CONTENT - AL JAZEERA STYLE */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* HERO SECTION */}
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8 border-b border-gray-200 pb-8">
            {/* Top Story */}
            <div className="xl:col-span-8">
              {heroArticle ? (
                <Link to="/article/$articleId" params={{ articleId: heroArticle.slug }} className="group block">
                  <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden mb-4 relative">
                    {heroArticle.featured_image && (
                      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Hero" src={heroArticle.featured_image} />
                    )}
                    <div className="absolute top-0 left-0 bg-[#e3000f] text-white text-xs font-bold uppercase px-3 py-1">Top News</div>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight group-hover:text-[#e3000f] transition-colors font-serif">
                    {heroArticle.title}
                  </h2>
                  <p className="text-gray-700 text-lg mb-3">
                    {heroArticle.excerpt || heroArticle.content?.substring(0, 150) + '...'}
                  </p>
                </Link>
              ) : (
                <div className="text-center p-12 bg-gray-50 border border-gray-200">No top story available.</div>
              )}
            </div>
          
            {/* Side More News Stack */}
            <div className="xl:col-span-4 flex flex-col gap-0 border-l border-gray-200 pl-0 xl:pl-6">
              <h3 className="font-bold uppercase border-b-4 border-black inline-block pb-1 mb-4 w-fit">More News</h3>
              <div className="flex flex-col">
                {latestArticles.map((article: any, index: number) => (
                  <Link key={article.id} to="/article/$articleId" params={{ articleId: article.slug }} className={`group cursor-pointer block py-4 ${index > 0 ? 'border-t border-gray-200' : 'pt-0'}`}>
                    <h4 className="text-xl font-bold leading-tight group-hover:text-[#e3000f] transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 uppercase mt-2 font-bold tracking-wider">{article.categories?.name || 'News'} • {new Date(article.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* MAIN GRID SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: News Grid */}
          <div className="lg:col-span-8 space-y-12">
            {/* World News Section */}
            <section>
              <div className="flex items-center justify-between mb-4 border-b-4 border-black pb-1">
                <h2 className="text-2xl font-bold uppercase tracking-tighter">In Depth</h2>
                <Link to="/category/$categoryId" params={{ categoryId: 'world' }} className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80">arrow_forward</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {worldArticles.map((article: any, index: number) => (
                  <Link 
                    key={article.id}
                    to="/article/$articleId" params={{ articleId: article.slug }}
                    className="group cursor-pointer block border border-gray-100 hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="aspect-video bg-gray-100 overflow-hidden flex items-center justify-center relative">
                      {article.featured_image ? (
                        <img className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={article.title} src={article.featured_image} />
                      ) : (
                        <span className="material-symbols-outlined text-gray-300 text-4xl">public</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-[#e3000f] font-serif">{article.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt || article.content?.substring(0, 100) + '...'}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Politics & Economy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
              {/* Politics Column */}
              <section>
                <div className="flex items-center justify-between mb-stack-md border-b border-outline-variant pb-2">
                  <h2 className="font-label-bold text-label-bold uppercase text-primary">Politics</h2>
                </div>
                <div className="space-y-6">
                  {politicsArticles.map((article: any, index: number) => (
                    <Link 
                      key={article.id}
                      to="/article/$articleId" params={{ articleId: article.slug }}
                      className="flex gap-4 group cursor-pointer"
                      onMouseEnter={() => setHoveredArticle(`pol${index}`)}
                      onMouseLeave={() => setHoveredArticle(null)}
                      style={{ transform: hoveredArticle === `pol${index}` ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease-out' }}
                    >
                      <div className="w-24 h-24 shrink-0 bg-surface-container-high overflow-hidden flex items-center justify-center">
                        {article.featured_image ? (
                          <img className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={article.title} src={article.featured_image} />
                        ) : (
                          <span className="material-symbols-outlined text-outline">account_balance</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-headline-md text-[18px] leading-tight font-serif mb-1 group-hover:text-secondary">{article.title}</h4>
                        <p className="text-label-sm font-label-sm text-on-surface-variant">{new Date(article.created_at).toLocaleDateString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Economy Column */}
              <section>
                <div className="flex items-center justify-between mb-stack-md border-b border-outline-variant pb-2">
                  <h2 className="font-label-bold text-label-bold uppercase text-primary">Economy</h2>
                </div>
                <div className="space-y-6">
                  {economyArticles.map((article: any, index: number) => (
                    <Link 
                      key={article.id}
                      to="/article/$articleId" params={{ articleId: article.slug }}
                      className="flex gap-4 group cursor-pointer"
                      onMouseEnter={() => setHoveredArticle(`eco${index}`)}
                      onMouseLeave={() => setHoveredArticle(null)}
                      style={{ transform: hoveredArticle === `eco${index}` ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease-out' }}
                    >
                      <div className="w-24 h-24 shrink-0 bg-surface-container-high overflow-hidden flex items-center justify-center">
                        {article.featured_image ? (
                          <img className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={article.title} src={article.featured_image} />
                        ) : (
                          <span className="material-symbols-outlined text-outline">trending_up</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-headline-md text-[18px] leading-tight font-serif mb-1 group-hover:text-secondary">{article.title}</h4>
                        <p className="text-label-sm font-label-sm text-on-surface-variant">{new Date(article.created_at).toLocaleDateString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
          
          {/* Right Column: Opinion Sidebar */}
          <aside className="lg:col-span-4 flex flex-col">
            <div className="bg-gray-50 p-6 border-l border-gray-200 h-full flex flex-col">
              <Link to="/opinion" className="block w-full border-b-4 border-black pb-1 mb-6">
                <h2 className="text-2xl font-bold uppercase tracking-tighter hover:text-[#e3000f] transition-colors">Opinion</h2>
              </Link>
              
              <div className="space-y-6">
                {opinionArticles.map((article: any, index: number) => (
                  <Link 
                    key={article.id}
                    to="/article/$articleId" params={{ articleId: article.slug }}
                    className={`group cursor-pointer block ${index > 0 ? 'pt-6 border-t border-gray-200' : ''}`}
                  >
                    <h3 className="text-xl font-bold font-serif mb-3 group-hover:text-[#e3000f] transition-colors leading-snug">"{article.title}"</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center font-bold text-xs text-white">
                        {article.users?.full_name?.substring(0, 2).toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{article.users?.full_name || 'Staff Writer'}</p>
                        <p className="text-xs text-[#e3000f] uppercase font-bold tracking-wider">Contributor</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Newsletter Box (Al Jazeera Inspired) */}
              <div className="mt-auto pt-10">
                <div className="bg-white border-4 border-black p-6 shadow-xl">
                  <h4 className="text-2xl font-black font-sans uppercase mb-2">Sign up for our newsletters</h4>
                  <p className="text-sm text-gray-700 mb-6 font-semibold">The latest news, from around the globe, right to your inbox.</p>
                  
                  {subStatus === 'success' ? (
                    <div className="bg-green-50 text-green-800 p-4 font-bold border border-green-200">
                      {subMsg}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <input 
                        className="w-full bg-gray-50 border-2 border-gray-200 text-black p-3 font-bold text-sm focus:border-black focus:outline-none transition-colors" 
                        placeholder="Email Address" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={subStatus === 'loading'}
                      />
                      {subStatus === 'error' && <p className="text-[#e3000f] text-xs font-bold">{subMsg}</p>}
                      <button 
                        onClick={handleSubscribe}
                        disabled={subStatus === 'loading'}
                        className="w-full bg-[#e3000f] text-white py-3 font-bold text-sm uppercase hover:bg-black transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {subStatus === 'loading' ? 'Signing up...' : 'Subscribe'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
        </div>
      </main>
    </div>
  )
}
