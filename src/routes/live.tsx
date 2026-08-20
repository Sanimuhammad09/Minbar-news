import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getArticles } from '../server/articles'

export const Route = createFileRoute('/live')({
  loader: async () => await getArticles(),
  component: LiveReportingMap,
})

function LiveReportingMap() {
  const navigate = useNavigate()
  const [panelOpen, setPanelOpen] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null)
  const [signalStrength, setSignalStrength] = useState('98.4')
  const [searchQuery, setSearchQuery] = useState('')
  
  const allArticles: any = Route.useLoaderData()
  
  // Filter by search query, then limit to latest 15 for the feed
  const liveDispatches = allArticles
    .filter((a: any) => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.categories?.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 15)

  // Use top 3 latest articles as hotspots on the map
  const topArticles = allArticles.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength((98 + Math.random()).toFixed(1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] relative overflow-hidden bg-primary text-on-primary">
      
      <div className="flex flex-1 h-[calc(100vh-120px)] relative overflow-hidden">
        
        {/* SideNavBar (Editorial Portal) */}
        <aside className="hidden md:flex flex-col bg-surface-container dark:bg-tertiary-container text-primary dark:text-primary-fixed border-r border-outline-variant dark:border-on-tertiary-fixed-variant w-64 h-full z-30 transition-transform duration-300 shrink-0">
          <div className="p-stack-md border-b border-outline-variant dark:border-on-tertiary-fixed-variant">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-on-primary-container rounded-none flex items-center justify-center">
                <span className="material-symbols-outlined text-white">admin_panel_settings</span>
              </div>
              <div>
                <p className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed leading-none">Editorial</p>
                <p className="font-label-sm text-[10px] uppercase opacity-60 tracking-tighter">Authority Control</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 py-stack-md overflow-y-auto">
            <Link to="/admin/dashboard" className="flex items-center gap-4 px-6 py-4 text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-container-high dark:hover:bg-on-tertiary-fixed-variant transition-transform cursor-pointer">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-bold text-label-bold">Dashboard</span>
            </Link>
            <Link to="/admin/articles" className="flex items-center gap-4 px-6 py-4 text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-container-high dark:hover:bg-on-tertiary-fixed-variant transition-transform cursor-pointer">
              <span className="material-symbols-outlined">description</span>
              <span className="font-label-bold text-label-bold">Editorial Queue</span>
            </Link>
            <Link to="/live" className="flex items-center gap-4 px-6 py-4 bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed rounded-none font-bold transition-transform cursor-pointer">
              <span className="material-symbols-outlined">live_tv</span>
              <span className="font-label-bold text-label-bold">Live Feed</span>
            </Link>
            <Link to="/admin/media" className="flex items-center gap-4 px-6 py-4 text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-container-high dark:hover:bg-on-tertiary-fixed-variant transition-transform cursor-pointer">
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="font-label-bold text-label-bold">Media Archives</span>
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-4 px-6 py-4 text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-container-high dark:hover:bg-on-tertiary-fixed-variant transition-transform cursor-pointer">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-bold text-label-bold">Settings</span>
            </Link>
          </nav>
          
          <div className="p-stack-md mt-auto space-y-2 border-t border-outline-variant dark:border-on-tertiary-fixed-variant">
            <button className="w-full bg-secondary text-white py-3 font-label-bold uppercase flex items-center justify-center gap-2 hover:bg-on-secondary-fixed-variant transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              Breaking Alert
            </button>
            <div className="flex gap-2">
              <button className="flex-1 py-2 font-label-bold text-[11px] uppercase border border-outline-variant dark:border-on-tertiary-fixed-variant flex items-center justify-center gap-1 opacity-70 hover:opacity-100 cursor-pointer">
                <span className="material-symbols-outlined text-[14px]">help</span> Support
              </button>
              <button className="flex-1 py-2 font-label-bold text-[11px] uppercase border border-outline-variant dark:border-on-tertiary-fixed-variant flex items-center justify-center gap-1 opacity-70 hover:opacity-100 cursor-pointer">
                <span className="material-symbols-outlined text-[14px]">logout</span> Exit
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area: Interactive Map Canvas */}
        <main className="flex-1 relative bg-primary overflow-hidden">
          
          {/* Map Background Layer */}
          <div className="absolute inset-0 z-0 bg-[#000516]">
            <div 
              className="w-full h-full opacity-30 grayscale bg-center bg-cover bg-no-repeat" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXio-qV-5xcrdb3wSoj_CaJ1DRSqpWk5pDfGzItQVmQft_Dn1f7788OIQqrEEBpUFi39t2-SFILnyf3sAZvd9kySRKdzmULlFId8kbYRlmuiGIolBMIoOwWu-zfCMNoTu1Ccw9f_evLcGLmt0EJvo9ZTdBeLDDyhcRu7hoLoY-Adw-9uSVxCIbooJ5nwvn2EF1vse8TaivG0rwKyvrykBz2GTrf1SeZfYfaJKUeGVMtq_a8urWUbI')" }}
            ></div>
            
            {/* Interactive Pins Overlay */}
            {topArticles[0] && (
              <div 
                className="absolute top-[30%] left-[25%] group cursor-pointer" 
                onClick={() => setSelectedArticle(topArticles[0])}
              >
                <div className="absolute -inset-2 bg-secondary/30 rounded-full animate-ping opacity-75"></div>
                <div className="w-3 h-3 bg-secondary rounded-full relative z-10 border border-white/20"></div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-tertiary text-white font-label-bold text-[10px] py-1 px-2 whitespace-nowrap z-20 border border-secondary uppercase">HOTSPOT: {topArticles[0].categories?.name}</div>
              </div>
            )}
            
            {topArticles[1] && (
              <div 
                className="absolute top-[45%] left-[52%] group cursor-pointer" 
                onClick={() => setSelectedArticle(topArticles[1])}
              >
                <div className="absolute -inset-2 bg-secondary/30 rounded-full animate-ping opacity-75"></div>
                <div className="w-3 h-3 bg-secondary rounded-full relative z-10 border border-white/20"></div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-tertiary text-white font-label-bold text-[10px] py-1 px-2 whitespace-nowrap z-20 border border-secondary uppercase">HOTSPOT: {topArticles[1].categories?.name}</div>
              </div>
            )}
            
            {topArticles[2] && (
              <div 
                className="absolute top-[58%] left-[78%] group cursor-pointer" 
                onClick={() => setSelectedArticle(topArticles[2])}
              >
                <div className="absolute -inset-2 bg-secondary/30 rounded-full animate-ping opacity-75"></div>
                <div className="w-3 h-3 bg-secondary rounded-full relative z-10 border border-white/20"></div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-tertiary text-white font-label-bold text-[10px] py-1 px-2 whitespace-nowrap z-20 border border-secondary uppercase">HOTSPOT: {topArticles[2].categories?.name}</div>
              </div>
            )}
          </div>

          {/* Map HUD Overlays */}
          <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2">
            <div className="bg-primary-container/80 p-stack-sm border border-on-primary-container flex items-center gap-3 backdrop-blur-md">
              <div className="flex flex-col">
                <span className="font-label-bold text-[10px] text-on-primary-container uppercase">Global Signal Strength</span>
                <span className="font-label-bold text-white">{signalStrength}% NOMINAL</span>
              </div>
              <div className="flex gap-0.5 items-end h-6">
                <div className="w-1 bg-secondary h-[40%]"></div>
                <div className="w-1 bg-secondary h-[60%]"></div>
                <div className="w-1 bg-secondary h-[90%]"></div>
                <div className="w-1 bg-on-primary-container h-[30%]"></div>
              </div>
            </div>
            <div className="bg-primary-container/80 p-stack-sm border border-on-primary-container font-label-bold text-[10px] text-on-primary-container uppercase backdrop-blur-md">
              LAT: 38.8951 N | LONG: 77.0364 W
            </div>
          </div>

          {/* Right Panel: Regional Summaries & Live Dispatch */}
          <div 
            className={`absolute right-0 top-0 h-full w-80 bg-[rgba(0,5,22,0.85)] backdrop-blur-xl z-20 border-l border-on-primary-container transform transition-transform duration-500 flex flex-col ${panelOpen ? 'translate-x-0' : 'translate-x-[calc(100%-40px)]'}`}
          >
            <div className="p-stack-md border-b border-on-primary-container flex justify-between items-center bg-primary shrink-0">
              <h3 className="font-label-bold text-label-bold text-white uppercase tracking-widest">Live Dispatches</h3>
              <span 
                className={`material-symbols-outlined text-on-primary-container text-[20px] cursor-pointer hover:text-white transition-transform ${panelOpen ? '' : 'rotate-180'}`} 
                onClick={() => setPanelOpen(!panelOpen)}
              >
                chevron_right
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              
              {liveDispatches.map((dispatch: any) => (
                <Link key={dispatch.id} to="/article/$articleId" params={{ articleId: dispatch.slug }} className="block p-stack-md border-b border-on-primary-container hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-label-bold text-[10px] text-secondary-container bg-secondary/20 px-1.5 py-0.5 uppercase">{dispatch.categories?.name || 'DISPATCH'}</span>
                    <span className="font-label-sm text-[10px] text-on-primary-container">{new Date(dispatch.published_at || dispatch.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <h4 className="font-headline-md text-[18px] text-white leading-tight mb-2 group-hover:text-secondary-fixed transition-colors">{dispatch.title}</h4>
                  <p className="font-body-md text-[13px] text-on-primary-container line-clamp-2">{dispatch.excerpt || dispatch.content?.substring(0, 100) + '...'}</p>
                </Link>
              ))}
              {liveDispatches.length === 0 && (
                <div className="p-4 text-on-primary-container text-sm">No live dispatches currently.</div>
              )}
            </div>
            
            {/* Action Footer */}
            <div className="p-stack-md bg-primary border-t border-on-primary-container shrink-0">
              <button className="w-full py-3 border border-on-primary-container text-white font-label-bold uppercase text-[12px] hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                Export Intel Report
              </button>
            </div>
          </div>

          {/* Interaction Tooltips / Floating Search Map */}
          <div className="absolute top-6 left-6 z-20">
            <div className="flex items-center bg-primary border border-on-primary-container overflow-hidden shadow-2xl">
              <div className="px-4 py-3 bg-secondary text-white">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="bg-transparent border-none text-white text-sm focus:outline-none focus:ring-0 w-64 placeholder:text-on-primary-container px-3" 
                placeholder="Search Region, Topic, or Hotspot..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Contextual Popup */}
          {selectedArticle && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-primary border border-secondary shadow-2xl z-50 p-stack-lg">
              <div className="flex justify-between items-start mb-stack-md">
                <div>
                  <span className="font-label-bold text-[11px] text-secondary uppercase">Hotspot Detected: {selectedArticle.categories?.name}</span>
                  <h2 className="font-headline-lg text-[22px] leading-tight text-white mt-1">{selectedArticle.title}</h2>
                </div>
                <button className="text-on-primary-container hover:text-white cursor-pointer ml-4 shrink-0" onClick={() => setSelectedArticle(null)}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div className="aspect-video mb-stack-md overflow-hidden bg-primary-container flex justify-center items-center">
                {selectedArticle.featured_image ? (
                  <img className="w-full h-full object-cover opacity-80" alt={selectedArticle.title} src={selectedArticle.featured_image} />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-on-primary-container">public</span>
                )}
              </div>
              
              <p className="font-body-md text-body-md text-on-primary-container mb-stack-lg line-clamp-4">
                {selectedArticle.excerpt || selectedArticle.content?.substring(0, 200) + '...'}
              </p>
              
              <div className="flex gap-stack-md">
                <Link to="/article/$articleId" params={{ articleId: selectedArticle.slug }} className="flex-1 bg-secondary text-white py-3 font-label-bold uppercase text-sm cursor-pointer text-center hover:bg-opacity-90 transition-opacity">Full Dossier</Link>
                <button className="flex-1 border border-on-primary-container text-white py-3 font-label-bold uppercase text-sm cursor-pointer hover:bg-white/10 transition-colors">Listen Live</button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
