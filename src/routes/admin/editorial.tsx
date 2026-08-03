import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/editorial')({
  component: EditorialDashboard,
})

function EditorialDashboard() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      {/* Breaking News Ticker (Branding/Status) */}
      <div className="w-full bg-secondary text-on-secondary py-2 overflow-hidden relative">
        <div className="animate-[ticker_30s_linear_infinite] whitespace-nowrap flex items-center">
          <span className="mx-8 font-label-bold uppercase tracking-widest text-[10px]">Breaking: Global markets respond to election results</span>
          <span className="mx-8 font-label-bold uppercase tracking-widest text-[10px]">Alert: Middle East peace summit scheduled for Monday</span>
          <span className="mx-8 font-label-bold uppercase tracking-widest text-[10px]">Politics: Analysis of the new policy framework now live</span>
          <span className="mx-8 font-label-bold uppercase tracking-widest text-[10px]">World: Humanitarian aid arrives in disaster zones</span>
          <span className="mx-8 font-label-bold uppercase tracking-widest text-[10px]">Breaking: Global markets respond to election results</span>
          <span className="mx-8 font-label-bold uppercase tracking-widest text-[10px]">Alert: Middle East peace summit scheduled for Monday</span>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="max-w-7xl mx-auto px-grid-margin py-stack-lg space-y-stack-lg w-full">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Editorial Overview</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Welcome back, Admin. Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.</p>
          </div>
          <div className="flex items-center gap-stack-sm">
            <div className={`relative transition-all ${isFocused ? 'scale-105' : ''}`}>
              <input 
                className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                placeholder="Search articles..." 
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant">search</span>
            </div>
            <div className="h-10 w-10 bg-surface-container-highest rounded-full flex items-center justify-center border border-outline-variant">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
          </div>
        </header>

        {/* Key Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
          <div className="bg-surface-container-lowest p-6 rounded-lg flex flex-col border-t-4 border-primary shadow-[0_4px_12px_rgba(12,30,61,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-bold text-label-bold text-on-surface-variant uppercase">Articles Published Today</span>
              <span className="material-symbols-outlined text-primary text-[24px]">check_circle</span>
            </div>
            <span className="font-display-lg text-display-lg text-primary">12</span>
            <div className="mt-2 flex items-center text-green-600 gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-label-sm text-label-sm">+4 vs yesterday</span>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-lg flex flex-col border-t-4 border-secondary shadow-[0_4px_12px_rgba(12,30,61,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-bold text-label-bold text-on-surface-variant uppercase">Active Drafts</span>
              <span className="material-symbols-outlined text-secondary text-[24px]">pending_actions</span>
            </div>
            <span className="font-display-lg text-display-lg text-primary">08</span>
            <div className="mt-2 font-label-sm text-label-sm text-on-surface-variant">4 under priority review</div>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-lg flex flex-col border-t-4 border-primary shadow-[0_4px_12px_rgba(12,30,61,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-bold text-label-bold text-on-surface-variant uppercase">Site Traffic</span>
              <span className="material-symbols-outlined text-primary text-[24px]">monitoring</span>
            </div>
            <span className="font-display-lg text-display-lg text-primary">48.2k</span>
            <div className="mt-2 flex items-center text-on-surface-variant gap-1">
              <span className="font-label-sm text-label-sm">Concurrent users: 1.2k</span>
            </div>
          </div>
        </section>

        {/* Main Dashboard Layout (Asymmetric 8/4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Recent Stories Table (8 Columns) */}
          <section className="lg:col-span-8 space-y-stack-md">
            <div className="flex items-center justify-between border-b-2 border-primary pb-2">
              <h3 className="font-headline-md text-headline-md text-primary">Recent Stories</h3>
              <a className="font-label-bold text-label-bold text-secondary uppercase hover:underline cursor-pointer">View All</a>
            </div>
            
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Headline</th>
                      <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Author</th>
                      <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Status</th>
                      <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-headline-md text-[16px] text-primary leading-snug">The Geopolitical Shift in the Global Energy Sector</div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">World • Updated 2h ago</div>
                      </td>
                      <td className="px-6 py-4 font-body-md text-body-md whitespace-nowrap">Sarah Jenkins</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">Published</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="p-1 hover:bg-surface-container-highest rounded transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-primary">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-headline-md text-[16px] text-primary leading-snug">Impact Analysis: The New Trade Agreement</div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Economy • Updated 4h ago</div>
                      </td>
                      <td className="px-6 py-4 font-body-md text-body-md whitespace-nowrap">Marcus Thorne</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">Under Review</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="p-1 hover:bg-surface-container-highest rounded transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-primary">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-headline-md text-[16px] text-primary leading-snug">Rethinking Urban Infrastructure for 2050</div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Analysis • Draft saved 10m ago</div>
                      </td>
                      <td className="px-6 py-4 font-body-md text-body-md whitespace-nowrap">Elena Rodriguez</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">Draft</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="p-1 hover:bg-surface-container-highest rounded transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-primary">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-headline-md text-[16px] text-primary leading-snug">Cultural Perspectives: The Rise of Virtual Museums</div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Opinion • Published 6h ago</div>
                      </td>
                      <td className="px-6 py-4 font-body-md text-body-md whitespace-nowrap">Julian Voss</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">Published</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="p-1 hover:bg-surface-container-highest rounded transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-primary">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 space-y-stack-lg">
            
            {/* Editorial Performance Card */}
            <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant">
              <h4 className="font-label-bold text-label-bold text-primary uppercase mb-4">Desk Performance</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between font-label-sm text-label-sm mb-1">
                    <span>Goal: 20 Articles/Day</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-surface-container-lowest rounded border border-outline-variant">
                    <div className="font-headline-md text-headline-md text-primary">94%</div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">Fact Check Score</div>
                  </div>
                  <div className="text-center p-3 bg-surface-container-lowest rounded border border-outline-variant">
                    <div className="font-headline-md text-headline-md text-secondary">1.2m</div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">Total Monthly Views</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Activity */}
            <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant">
              <h4 className="font-label-bold text-label-bold text-primary uppercase mb-4">Recent Activity</h4>
              <div className="space-y-6">
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 bg-primary rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">SJ</span>
                  </div>
                  <div>
                    <p className="font-body-md text-body-md text-on-surface"><span className="font-bold">Sarah J.</span> published "The Geopolitical Shift..."</p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">2 minutes ago</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 bg-secondary rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">MT</span>
                  </div>
                  <div>
                    <p className="font-body-md text-body-md text-on-surface"><span className="font-bold">Marcus T.</span> submitted a new draft for review</p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">45 minutes ago</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 bg-surface-container-highest rounded-full flex-shrink-0 flex items-center justify-center border border-outline-variant">
                    <span className="text-primary text-[10px] font-bold">ER</span>
                  </div>
                  <div>
                    <p className="font-body-md text-body-md text-on-surface"><span className="font-bold">Elena R.</span> updated "Rethinking Urban..."</p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">1 hour ago</span>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Visual Asset Placeholder */}
            <div className="rounded-lg overflow-hidden border border-outline-variant relative group">
              <img className="w-full h-48 object-cover grayscale transition-all group-hover:grayscale-0" alt="Workspace" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA60hVhlVa54LzKCNDL2vzr8uBsASLQZngOqAHl7lU0L2efmGTN87J_jVFbrShl-i8zY_Oq9tHYj76eqxZ3iXVoaNW1CLVSH37h8ERje4F80npOdD27yj8OPgX5hFDspJ7ZRPO4YfxNIlQ3DaY3GCfz4V1gG2KhxzCsMQnBInd95ERQHKNx1BYUyeXTStxeWr_12_Rc48rHOoTUXV3UnC0WN-7PxLRta_OJPFyAwstLWRh3rd_RLI4" />
              <div className="absolute inset-0 bg-primary/20 flex items-end p-4">
                <span className="bg-white/90 text-primary px-3 py-1 font-label-bold text-label-bold uppercase">Editorial Guidelines Update</span>
              </div>
            </div>
            
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-section-gap py-stack-lg bg-primary border-t-4 border-secondary flex flex-col items-center justify-center space-y-stack-md px-grid-margin">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Minbar News Logo" className="h-8 w-auto object-contain rounded" />
          <h2 className="font-headline-md text-headline-md font-bold text-on-primary uppercase tracking-widest">
            MINBAR NEWS
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors cursor-pointer">Editorial Guidelines</a>
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors cursor-pointer">Privacy Policy</a>
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors cursor-pointer">Terms of Service</a>
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors cursor-pointer">Archive</a>
        </div>
        <p className="font-body-md text-body-md text-on-primary opacity-60">© {new Date().getFullYear()} Minbar News. Truth. Perspective. Impact.</p>
      </footer>
    </>
  )
}
