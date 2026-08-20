import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { getAuthSession } from '../server/auth'

export const Route = createFileRoute('/profile')({
  beforeLoad: async () => {
    const session = await getAuthSession()
    if (!session) {
      throw redirect({ to: '/login' })
    }
    return { session }
  },
  component: UserProfile,
})

function UserProfile() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { session: user } = Route.useRouteContext()



  return (
    <div className="bg-background text-on-background min-h-screen">
      <main className="max-w-7xl mx-auto px-grid-margin py-stack-lg min-h-screen">
        
        {/* Profile Header Section */}
        <section className="mb-section-gap flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-md">
          <div className="flex items-center gap-stack-md">
            <div className="w-24 h-24 bg-primary-container rounded-none relative overflow-hidden flex items-center justify-center">
              <img className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500" alt="Profile" src={user.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuA1nXn1MEXAhffrjGfaGtM4Wsme6ms2Tgr1h9TlbZnjyB-PT4qASY_VPsHUu3wmriDkjnaY_WKQYL037eF6PVshwl-jJLrS3r1S84AD8N2uH26gEZ15jgxYibguj3TDHB2Po3OrmM72IG1-jic2GOoRn6aFPZ6RIelIm-gSE0W6ncYGLgIKVoQD1ePdL27CVMiyJF911TfvD3SFtbZCpnDaMBauyxs1pxD0eIMLTBsy5xaGo4ruEW4"} />
            </div>
            <div>
              <h1 className="font-headline-lg text-headline-lg text-primary font-serif">Welcome back, {user.full_name}</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Role: {user.role} • <span className="text-secondary font-bold">Premium Subscriber</span></p>
            </div>
          </div>
          <div className="flex gap-stack-sm">
            <button className="border border-primary px-6 py-2 font-label-bold text-label-bold uppercase flex items-center gap-2 hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">edit</span> Edit Profile
            </button>
            <button className="bg-surface-container-high px-6 py-2 font-label-bold text-label-bold uppercase flex items-center gap-2 hover:bg-on-surface-variant hover:text-white transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">settings</span> Account
            </button>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          {/* Account Overview / Subscription */}
          <div 
            className={`md:col-span-4 border border-outline-variant bg-white p-stack-md flex flex-col justify-between transition-all duration-200 ${hoveredCard === 'sub' ? 'shadow-lg' : ''}`}
            onMouseEnter={() => setHoveredCard('sub')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="border-t-2 border-primary pt-2 mb-4">
                <span className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">Subscription</span>
              </div>
              <h3 className="font-headline-md text-headline-md font-serif mb-2">The Authority Access</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">Your annual plan expires in 242 days. Automatic renewal is active.</p>
            </div>
            <div className="bg-surface-container-low p-4 space-y-2 border border-outline-variant">
              <div className="flex justify-between font-label-sm text-label-sm">
                <span>Last Billing:</span>
                <span className="font-bold text-primary">Feb 12, 2024</span>
              </div>
              <div className="flex justify-between font-label-sm text-label-sm">
                <span>Amount:</span>
                <span className="font-bold text-primary">$189.00 USD</span>
              </div>
              <button className="w-full mt-4 text-secondary font-label-bold text-label-bold hover:underline text-left cursor-pointer">Manage Billing Methods</button>
            </div>
          </div>

          {/* Reading List */}
          <div 
            className={`md:col-span-8 border border-outline-variant bg-white p-stack-md transition-all duration-200 ${hoveredCard === 'read' ? 'shadow-lg' : ''}`}
            onMouseEnter={() => setHoveredCard('read')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="border-t-2 border-primary pt-2 mb-4 flex justify-between items-center">
              <span className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">My Reading List</span>
              <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline cursor-pointer">View All (24)</a>
            </div>
            <div className="space-y-4">
              {/* Article 1 */}
              <div className="flex gap-4 group cursor-pointer pb-4 border-b border-surface-variant">
                <div className="w-32 h-20 overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Read 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCQR6sLQYN7mvM3EHcFMt65M2Hm2lvXLsSwtyAbfMCGA3wrZo_sdP5g6ugjXh2j3xyXRHbt9HXB_v4Pa9hO7ZuI_8yK9rgH70c2UAK0IpwsQwBsuzSelJNmpWFy_YWM30oDl3q09wtjotZWv7YinpFcPmCXDb_HTqGkLNFYlchxkGUn4NDz1eEvauDOC0R9rC9Ww2-B-5vwtC0NgPNnxC4i__S_70dLqgnNNr2CA-NcpjWeS0BMII" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-label-bold text-label-bold font-serif group-hover:text-secondary transition-colors">The Geopolitics of Renewables: Why the Arctic is the New Frontier</h4>
                  <p className="font-label-sm text-[12px] text-on-surface-variant uppercase tracking-tighter mt-1">Saved 2 hours ago • Economy</p>
                </div>
              </div>
              
              {/* Article 2 */}
              <div className="flex gap-4 group cursor-pointer pb-4 border-b border-surface-variant">
                <div className="w-32 h-20 overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Read 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbJuAnrXeHT-K_WalYllCFLaBSaXhjvrgbbzfgc2O6f0FZ7nHaXE5rDnPnCzS3T60tBOr6N7gbQ6RIPEq4eK3fVG4dOSwWivBsQuUSfhdm5FOodsFOqIsnkh_BwAmLgjNRK8kyGNykzWdRh1j94Bi5L3TM2jReSd0210JkP-ZWga3__MUUh9GwJM12v0miygMrTW2G7g_Klq4BrzkFpLh3h3ObakAqjd0VL69MPqNlZWUmCO9kqnQ" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-label-bold text-label-bold font-serif group-hover:text-secondary transition-colors">Semi-conductor Sovereignty: Navigating the Global Tech Shortage</h4>
                  <p className="font-label-sm text-[12px] text-on-surface-variant uppercase tracking-tighter mt-1">Saved Yesterday • Tech</p>
                </div>
              </div>
              
              {/* Article 3 */}
              <div className="flex gap-4 group cursor-pointer">
                <div className="w-32 h-20 overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Read 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3If5OqH-gFHObF_LHl_kcxcoSg9baxY0vyCl0fIYnX1DMoL51Pk0O-wVD6gT-f5zHdITdnCA5Bj9iEW1RLoXzy5bjdq7WTOMQ6fXfcvRF1XYbVkKJHtg7eP1YuIpBp-YmKqN4urFrYXPBKSTughMKCMvHndgEcKLZoQwjrSf8hID9tBoR_98KVlljroCZvxHDSPvwHhlb1iHIW57L3Q9UAnSQDFvU7ArMn7usem6qNcLnUzBVvQg" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-label-bold text-label-bold font-serif group-hover:text-secondary transition-colors">Policy Shift: The Implications of the New Trans-Atlantic Treaty</h4>
                  <p className="font-label-sm text-[12px] text-on-surface-variant uppercase tracking-tighter mt-1">Saved 3 days ago • Politics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Following Topics */}
          <div 
            className={`md:col-span-6 border border-outline-variant bg-white p-stack-md transition-all duration-200 ${hoveredCard === 'follow' ? 'shadow-lg' : ''}`}
            onMouseEnter={() => setHoveredCard('follow')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="border-t-2 border-primary pt-2 mb-6 flex justify-between items-center">
              <span className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">Following Topics</span>
              <button className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80">add_circle</button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="border border-primary px-3 py-1 font-label-sm text-label-sm uppercase flex items-center gap-2 bg-primary text-white">
                Cybersecurity <button className="material-symbols-outlined text-[14px] cursor-pointer hover:opacity-80">close</button>
              </span>
              <span className="border border-outline-variant px-3 py-1 font-label-sm text-label-sm uppercase flex items-center gap-2 hover:bg-surface-container-high transition-colors cursor-pointer">
                Monetary Policy <button className="material-symbols-outlined text-[14px]">close</button>
              </span>
              <span className="border border-outline-variant px-3 py-1 font-label-sm text-label-sm uppercase flex items-center gap-2 hover:bg-surface-container-high transition-colors cursor-pointer">
                Quantum Computing <button className="material-symbols-outlined text-[14px]">close</button>
              </span>
              <span className="border border-primary px-3 py-1 font-label-sm text-label-sm uppercase flex items-center gap-2 bg-primary text-white">
                AI Ethics <button className="material-symbols-outlined text-[14px] cursor-pointer hover:opacity-80">close</button>
              </span>
              <span className="border border-outline-variant px-3 py-1 font-label-sm text-label-sm uppercase flex items-center gap-2 hover:bg-surface-container-high transition-colors cursor-pointer">
                Space Exploration <button className="material-symbols-outlined text-[14px]">close</button>
              </span>
              <span className="border border-outline-variant px-3 py-1 font-label-sm text-label-sm uppercase flex items-center gap-2 hover:bg-surface-container-high transition-colors cursor-pointer">
                Green Energy <button className="material-symbols-outlined text-[14px]">close</button>
              </span>
            </div>
          </div>

          {/* Comment History */}
          <div 
            className={`md:col-span-6 border border-outline-variant bg-white p-stack-md transition-all duration-200 ${hoveredCard === 'comment' ? 'shadow-lg' : ''}`}
            onMouseEnter={() => setHoveredCard('comment')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="border-t-2 border-primary pt-2 mb-4">
              <span className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">Comment History</span>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-low p-3 border-l-4 border-primary">
                <p className="font-label-sm text-label-sm text-on-surface-variant italic mb-2">"The analysis misses the critical impact of local currency devaluation in emerging markets..."</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-primary">On Article: The Fall of the Dollar?</span>
                  <span className="text-[10px] text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[12px] material-symbols-filled">thumb_up</span> 42 Likes</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-3 border-l-4 border-outline-variant">
                <p className="font-label-sm text-label-sm text-on-surface-variant italic mb-2">"Impressive deep dive into the logistics of the new polar route. We need more of this."</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-primary">On Article: Arctic Trade Routes</span>
                  <span className="text-[10px] text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[12px] material-symbols-filled">thumb_up</span> 18 Likes</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 border-t border-surface-variant pt-2 text-center font-label-bold text-label-bold text-primary hover:text-secondary transition-colors uppercase tracking-widest cursor-pointer">View All Comments</button>
          </div>

          {/* Newsletter Management (Wide) */}
          <div 
            className={`md:col-span-12 border border-outline-variant bg-primary-container p-stack-md text-white overflow-hidden relative transition-all duration-200 ${hoveredCard === 'news' ? 'shadow-lg scale-[1.01]' : ''}`}
            onMouseEnter={() => setHoveredCard('news')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-stack-md">
              <div className="max-w-2xl">
                <h3 className="font-headline-md text-headline-md font-serif mb-2">Refine Your Morning Intelligence</h3>
                <p className="font-body-md text-body-md text-on-primary-container">Get curated briefs directly from our Bureau Chiefs. Currently receiving: <span className="font-bold text-white">Daily Intelligence Brief, Global Tech Review.</span></p>
              </div>
              <button className="bg-secondary text-white px-8 py-3 font-label-bold text-label-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3 cursor-pointer">
                Edit Newsletter Preferences <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            {/* Subtle Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
