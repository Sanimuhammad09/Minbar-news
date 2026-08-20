import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { getArticlesByCategory } from '../server/articles'

export const Route = createFileRoute('/video')({
  loader: async () => await getArticlesByCategory({ data: 'video' }),
  component: VideoHub,
})

function VideoHub() {
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    { author: 'Ahmad Khalil', text: 'The implications for the energy sector are massive.', color: 'text-secondary' },
    { author: 'Sarah Jenkins', text: 'Does anyone have the full text of the trade agreement yet?', color: 'text-on-primary-fixed-variant' },
    { author: 'Moderator', text: 'Welcome to the Minbar News Live Portal. Please keep discussions professional.', color: 'text-secondary', italic: true },
    { author: 'Dr. Marcus Vane', text: 'Watching closely from Singapore. The carbon tax credits are the real story here.', color: 'text-primary' }
  ])

  const articles: any = Route.useLoaderData()
  const videos = articles.slice(0, 4)

  const handleSend = () => {
    if (chatInput.trim() !== '') {
      setMessages([...messages, { author: 'You', text: chatInput, color: 'text-primary' }])
      setChatInput('')
    }
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen">
      <main className="max-w-7xl mx-auto px-grid-margin py-stack-lg">
        
        {/* Main Featured Video Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-section-gap">
          <div className="lg:col-span-8 flex flex-col gap-stack-md">
            
            {/* Video Player Container */}
            <div className="relative aspect-video bg-black group overflow-hidden border border-outline-variant">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlUKDb6_Ay27XZr4Zl5xXYqP-h2sXPTTvB8t6gCTKoMfh8fKjFOOsWB9Jvzdvumsrp3FLHN9LFsNh50ZqehVs_dQvpEERmSabkixnH0J68KaI8J1cS_EF9TIk6nCeJs45jR7za6-OS2BSMRvnMOklHQu9x5fq7ASv3RfjIPdo17damIlqoMUGEn5aMBhdZpaZSeURgQ6OsWQp-nnfSoHvcUEL5UO41yPi3_aC1j-DEiChvRMgvaJ4')" }}
              ></div>
              
              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-stack-lg">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-stack-md">
                    <span className="material-symbols-outlined cursor-pointer material-symbols-filled">play_arrow</span>
                    <span className="material-symbols-outlined cursor-pointer">volume_up</span>
                    <span className="font-label-sm text-label-sm">LIVE | 12,403 viewers</span>
                  </div>
                  <span className="material-symbols-outlined cursor-pointer">fullscreen</span>
                </div>
                <div className="w-full bg-white/20 h-1 mt-4">
                  <div className="bg-secondary w-full h-full"></div>
                </div>
              </div>
              
              {/* Live Badge */}
              <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span className="font-label-bold text-label-sm uppercase tracking-widest">Live Now</span>
              </div>
            </div>
            
            {/* Video Info */}
            <div className="py-stack-md">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Global Summit: Decisive Agreements on Climate and Trade Security</h2>
              <div className="flex items-center gap-stack-lg text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">calendar_today</span> Oct 24, 2024</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">visibility</span> 1.2M views</span>
                <span className="flex items-center gap-1 text-secondary font-bold uppercase tracking-tighter">Minbar Exclusive Broadcast</span>
              </div>
              <p className="mt-4 font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Join our lead correspondents live from the International Summit Hall as global leaders sign the historic treaty. We provide deep analysis on the economic ramifications and what this means for the global trade landscape over the next decade.
              </p>
            </div>
          </div>
          
          {/* Live Chat Overlay / Sidebar */}
          <aside className="lg:col-span-4 h-[500px] lg:h-auto flex flex-col border border-outline-variant bg-surface-container-low">
            <div className="p-4 border-b border-outline-variant flex items-center justify-between">
              <h3 className="font-label-bold text-label-bold uppercase">Live Chat</h3>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">more_vert</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
              {/* Chat Messages */}
              {messages.map((msg, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className={`font-label-bold text-label-sm ${msg.color}`}>{msg.author}</span>
                  <p className={`font-body-md text-body-md text-on-surface-variant leading-tight bg-white p-3 rounded-lg border border-slate-100 ${msg.italic ? 'italic !text-secondary' : ''}`}>
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-outline-variant bg-surface">
              <div className="relative">
                <input 
                  className="w-full bg-surface-container font-body-md text-body-md border border-outline-variant px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                  placeholder="Join the discussion..." 
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer hover:opacity-80"
                  onClick={handleSend}
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </aside>
        </section>

        {/* Latest Broadcasts Grid */}
        <section className="mb-section-gap">
          <div className="flex items-center justify-between mb-stack-lg border-b-4 border-secondary pb-2">
            <h3 className="font-headline-md text-headline-md text-primary">Latest Broadcasts</h3>
            <a className="font-label-bold text-label-sm text-secondary uppercase hover:underline cursor-pointer">View All Archive</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            
            {videos.length === 0 ? (
              <p className="text-on-surface-variant font-body-md text-body-md py-8">No recent broadcasts available.</p>
            ) : (
              videos.map((video: any, i: number) => (
                <Link to={`/article/${video.slug}`} key={video.id} className="group cursor-pointer block">
                  <div className="relative aspect-video mb-3 overflow-hidden border border-outline-variant">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                      style={{ backgroundImage: `url('${video.featured_image || 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800'}')` }}
                    ></div>
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1 font-label-bold">12:{i}5</span>
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[48px] material-symbols-filled">play_circle</span>
                    </div>
                  </div>
                  <div className="border-t-2 border-slate-200 pt-2">
                    <span className="font-label-bold text-label-sm text-secondary uppercase">Video</span>
                    <h4 className="font-label-bold text-body-lg text-primary mt-1 line-clamp-2">{video.title}</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">{new Date(video.published_at || video.created_at).toLocaleDateString()} • {video.views_count} views</p>
                  </div>
                </Link>
              ))
            )}
            
          </div>
        </section>

        {/* Category Playlists / Bento Grid Layout */}
        <section>
          <div className="flex items-center justify-between mb-stack-lg border-b-4 border-primary pb-2">
            <h3 className="font-headline-md text-headline-md text-primary uppercase tracking-tight">Curated Channels</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            
            {/* Large Featured Category */}
            <div className="md:col-span-2 relative group overflow-hidden h-80 border border-outline-variant">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbebRcGBbjtviJpgS_HKHThUrNu-ggpgW9wOfK_D3u0s9jCwHxQVo02XOiqKhuYq1yn08rsnuwtaQXZ3b0pbKM6a9dMZDvncJdZCg9LkE0Vn-ye4QoU1Ot8K_U_mdnXP19D6GfVMTyrBgZ9XjswGUlXx-FKA_ydTRDS8m926FO7F57IhGYjRMztRDd3oKbubeLmX8zjFRk0j8NJkElVMVNruqN2dxYqpta_Nd5Tew0KGUXItNVAvU')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent flex flex-col justify-center p-stack-lg">
                <span className="font-label-bold text-label-sm text-secondary-fixed-dim uppercase tracking-[0.2em] mb-2">Signature Series</span>
                <h3 className="font-display-lg text-display-lg text-white max-w-sm mb-4">Minbar Documentaries</h3>
                <p className="text-white/80 font-body-md text-body-md max-w-sm mb-6">Deep-dive investigative journalism exploring the stories that shape our world.</p>
                <button className="w-fit bg-white text-primary px-6 py-2 font-label-bold text-label-bold uppercase flex items-center gap-2 hover:bg-secondary hover:text-white transition-colors cursor-pointer">
                  Explore Channel <span className="material-symbols-outlined">trending_flat</span>
                </button>
              </div>
            </div>
            
            {/* Column of smaller categories */}
            <div className="flex flex-col gap-gutter">
              <div className="flex-1 bg-tertiary-container text-white p-stack-lg border border-outline-variant group hover:bg-secondary transition-colors cursor-pointer relative overflow-hidden">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-secondary group-hover:text-white mb-2">bolt</span>
                  <h4 className="font-headline-md text-headline-md">Short Clips</h4>
                  <p className="text-white/60 group-hover:text-white/90 font-label-sm text-label-sm mt-1">Key highlights in under 3 minutes.</p>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] opacity-10 rotate-12">movie</span>
              </div>
              <div className="flex-1 bg-surface-container-high p-stack-lg border border-outline-variant group hover:border-primary transition-all cursor-pointer relative">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-primary mb-2">podcasts</span>
                  <h4 className="font-headline-md text-headline-md text-primary">Live Briefings</h4>
                  <p className="text-on-surface-variant font-label-sm text-label-sm mt-1">Daily updates from our global bureaus.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
