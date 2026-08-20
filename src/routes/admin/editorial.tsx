import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getEditorialDashboardData } from '../../server/articles'

export const Route = createFileRoute('/admin/editorial')({
  loader: async () => await getEditorialDashboardData(),
  component: EditorialDashboard,
})

function EditorialDashboard() {
  const [isFocused, setIsFocused] = useState(false)
  const stats: any = Route.useLoaderData()
  const { drafts, recentActivity, publishedToday, totalViews } = stats

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
      <div className="w-full px-6 md:px-8 lg:px-12 py-stack-lg space-y-stack-lg">
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
            <span className="font-display-lg text-display-lg text-primary">{publishedToday}</span>
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
            <span className="font-display-lg text-display-lg text-primary">{drafts.length}</span>
            <div className="mt-2 font-label-sm text-label-sm text-on-surface-variant">Synced from database</div>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-lg flex flex-col border-t-4 border-primary shadow-[0_4px_12px_rgba(12,30,61,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-bold text-label-bold text-on-surface-variant uppercase">Site Traffic</span>
              <span className="material-symbols-outlined text-primary text-[24px]">monitoring</span>
            </div>
            <span className="font-display-lg text-display-lg text-primary">{totalViews >= 1000 ? (totalViews / 1000).toFixed(1) + 'k' : totalViews}</span>
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
                    {drafts.slice(0, 5).map((article: any) => (
                      <tr key={article.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-headline-md text-[16px] text-primary leading-snug">{article.title}</div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">{article.categories?.name || 'World'} • Updated {new Date(article.updated_at).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 font-body-md text-body-md whitespace-nowrap">{article.users?.full_name || 'Staff'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide ${article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {article.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="p-1 hover:bg-surface-container-highest rounded transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-primary">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    ))}
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
                    <div className="font-headline-md text-headline-md text-secondary">{totalViews >= 1000000 ? (totalViews / 1000000).toFixed(1) + 'm' : totalViews >= 1000 ? (totalViews / 1000).toFixed(1) + 'k' : totalViews}</div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">Total Views</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Activity */}
            <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant">
              <h4 className="font-label-bold text-label-bold text-primary uppercase mb-4">Recent Activity</h4>
              <div className="space-y-6">
                
                {recentActivity.length > 0 ? recentActivity.map((activity: any, idx: number) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center ${idx === 0 ? 'bg-primary text-white' : idx === 1 ? 'bg-secondary text-white' : 'bg-surface-container-highest border border-outline-variant text-primary'}`}>
                      <span className="text-[10px] font-bold">
                        {activity.users?.full_name?.substring(0, 2).toUpperCase() || 'ST'}
                      </span>
                    </div>
                    <div>
                      <p className="font-body-md text-body-md text-on-surface">
                        <span className="font-bold">{activity.users?.full_name || 'Staff'}</span> {activity.status === 'published' ? 'published' : 'updated'} "{activity.title.substring(0, 20)}..."
                      </p>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{new Date(activity.updated_at).toLocaleString()}</span>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-on-surface-variant">No recent activity.</p>
                )}
                
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

      {/* Admin Footer */}
      <footer className="w-full mt-auto py-6 border-t border-outline-variant bg-surface-container-lowest flex justify-center">
        <p className="font-label-sm text-label-sm text-on-surface-variant">© {new Date().getFullYear()} Minbar News Editorial System. Secure Portal.</p>
      </footer>
    </>
  )
}
