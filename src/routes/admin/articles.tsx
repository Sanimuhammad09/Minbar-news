import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { getArticleLibraryData, syncAlJazeeraNews } from '../../server/articles'

export const Route = createFileRoute('/admin/articles')({
  component: ArticleLibrary,
  loader: async () => await getArticleLibraryData()
})

function ArticleLibrary() {
  const router = useRouter()
  const { articles, publishedCount, draftCount, totalViews } = Route.useLoaderData()
  const [isFocused, setIsFocused] = useState(false)
  const [filterActive, setFilterActive] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const syncFn = useServerFn(syncAlJazeeraNews)

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      const res = await syncFn()
      alert(`Successfully imported ${res.count} articles from Al Jazeera!`)
      router.invalidate() // Refresh loader data
    } catch (e: any) {
      alert(e.message || 'Failed to sync')
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <>
      {/* HEADER / TOOLBAR */}
      <header className="h-20 bg-surface border-b border-outline-variant flex items-center justify-between px-grid-margin shrink-0">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">Article Library</h2>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Archived and active editorial content</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-[#f2a900] text-black px-4 py-2 hover:bg-[#d99700] transition-all font-label-bold text-label-bold uppercase cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">sync</span>
            {isSyncing ? 'Syncing...' : 'Fetch Al Jazeera News'}
          </button>
          
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">search</span>
            <input 
              className={`pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-0 ${isFocused ? 'w-80' : 'w-64'} font-label-sm transition-all outline-none`}
              placeholder="Search archive..." 
              type="text"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
          
          <button 
            className={`flex items-center gap-2 border border-outline-variant px-4 py-2 hover:bg-surface-container-low transition-all font-label-bold text-label-bold uppercase cursor-pointer ${filterActive ? 'bg-primary text-on-primary hover:bg-primary/90' : ''}`}
            onClick={() => setFilterActive(!filterActive)}
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filters
          </button>
          
          <button className="flex items-center justify-center w-10 h-10 bg-surface-container-low hover:bg-surface-container-high transition-all cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      {/* DASHBOARD SUMMARY (Bento Grid Style) */}
      <section className="p-grid-margin grid grid-cols-4 gap-4 shrink-0">
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md flex flex-col justify-between h-32">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Published</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-4xl text-primary">{publishedCount}</span>
            <span className="text-secondary font-label-bold text-label-sm">Active</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md flex flex-col justify-between h-32">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Drafts Pending</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-4xl text-primary">{draftCount}</span>
            <span className="text-on-surface-variant font-label-bold text-label-sm">High Priority</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md flex flex-col justify-between h-32">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Engagement</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-4xl text-primary">{totalViews >= 1000000 ? (totalViews / 1000000).toFixed(1) + 'm' : totalViews >= 1000 ? (totalViews / 1000).toFixed(1) + 'k' : totalViews}</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">trending_up</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md flex flex-col justify-between h-32">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Editorial Integrity</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-4xl text-primary">100%</span>
            <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
          </div>
        </div>
      </section>

      {/* LIBRARY LIST VIEW */}
      <section className="flex-grow px-grid-margin pb-grid-margin overflow-hidden flex flex-col">
        <div className="bg-surface-container-lowest border border-outline-variant flex flex-col h-full shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-outline-variant bg-surface-container-low font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest">
            <div className="col-span-5 flex items-center gap-2">
              Article Detail
              <span className="material-symbols-outlined text-[16px] cursor-pointer">arrow_drop_down</span>
            </div>
            <div className="col-span-2">Author</div>
            <div className="col-span-2 text-right">Metrics</div>
            <div className="col-span-2 text-right">Last Edited</div>
            <div className="col-span-1"></div>
          </div>

          {/* Scrollable List */}
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {articles.map((article: any) => (
              <div key={article.id} className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-outline-variant hover:bg-surface-container-low/80 transition-colors items-center">
                <div className="col-span-5 flex gap-4">
                  <div className="w-24 h-16 shrink-0 bg-surface-container-high overflow-hidden flex items-center justify-center">
                    {article.featured_image ? (
                      <img className="w-full h-full object-cover" alt={article.title} src={article.featured_image} />
                    ) : (
                      <span className="material-symbols-outlined text-outline">image</span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-label-sm text-[11px] text-secondary font-bold uppercase mb-1">{article.categories?.name || 'Uncategorized'}</span>
                    <h3 className="font-headline-md text-[18px] leading-tight text-primary hover:underline cursor-pointer">{article.title}</h3>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-surface-container-high text-[10px] font-label-bold uppercase text-on-surface-variant">{article.status}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-[10px] font-bold">
                    {article.users?.full_name?.substring(0, 2).toUpperCase() || '?'}
                  </div>
                  <span className="font-body-md text-body-md text-on-surface">{article.users?.full_name || 'Unassigned'}</span>
                </div>
                <div className="col-span-2 text-right space-y-1">
                  <div className="flex items-center justify-end gap-1 font-label-bold text-label-bold text-primary">
                    <span className="material-symbols-outlined text-[14px]">visibility</span> {article.views_count || 0}
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="font-label-bold text-label-bold text-primary">{new Date(article.created_at).toLocaleDateString()}</div>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button className="p-2 hover:bg-surface-container-high transition-all rounded-full cursor-pointer">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            ))}
            
            {articles.length === 0 && (
              <div className="p-8 text-center text-on-surface-variant">
                <p>No articles found. Try creating one!</p>
              </div>
            )}
          </div>

          {/* Footer / Pagination */}
          <div className="h-14 px-6 bg-surface-container-low flex items-center justify-between border-t border-outline-variant shrink-0">
            <div className="font-label-sm text-label-sm text-on-surface-variant">
              Showing <span className="font-bold text-primary">{articles.length > 0 ? 1 : 0} - {articles.length}</span> of {articles.length} articles
            </div>
            
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high disabled:opacity-30 cursor-pointer" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-label-bold text-label-sm cursor-pointer">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high font-label-bold text-label-sm cursor-pointer">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high font-label-bold text-label-sm cursor-pointer">3</button>
              <span className="px-2">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high font-label-bold text-label-sm cursor-pointer">114</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high cursor-pointer">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING QUICK ACTIONS */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-on-secondary rounded-none shadow-lg flex items-center justify-center hover:scale-105 transition-transform active:scale-95 group cursor-pointer z-50">
        <span className="material-symbols-outlined text-[32px]">history</span>
        <span className="absolute right-full mr-4 bg-primary text-on-primary text-[10px] font-label-bold uppercase px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Recent Activity</span>
      </button>
    </>
  )
}
