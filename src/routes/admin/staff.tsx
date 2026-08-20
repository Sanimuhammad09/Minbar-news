import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getStaffDashboardData } from '../../server/users'

export const Route = createFileRoute('/admin/staff')({
  loader: async () => await getStaffDashboardData(),
  component: StaffManagement,
})

function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const { staff: dbStaff, activeCount, assignmentCount, avgScore, hotTopics } = Route.useLoaderData()

  const staff = dbStaff.map((user: any) => ({
    name: user.full_name || user.email || 'Unknown User',
    role: user.role || 'Contributor',
    status: 'Active',
    statusColor: 'bg-green-500',
    statusBg: 'bg-green-100 text-green-800',
    time: '4.2h',
    rating: 4,
    image: user.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnnqurX_44GglgqQOcYzmBLdM-H7NHsEVdvjIETcctKFBgLt896UIUlWgmS6p0M5hm8ylxPpW3Ww4GyTyRKG5IPJAozGU7aiVwdj-Zy-Vjw_IKwwcMkkoxTGlkN8DsUJ5z6NvCZdCgoMDaLGgHTslb2XqAOZB_0plQ1TLavaGxOKJaNo_Eq34s6wjowpjX4Ah4rop_2-Sv-Waxdd_zVF0MUpOobGiDXHj2FT5UUJSk9_BKJEZO_WQ',
  }))

  const filteredStaff = staff.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      {/* Top Header Action Bar */}
      <header className="bg-surface px-grid-margin py-6 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between sticky top-0 z-10 gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary">Staff Management</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Real-time status and performance tracking for the global newsroom.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded focus:border-primary focus:ring-0 font-label-bold text-label-bold transition-all w-full sm:w-64 outline-none" 
              placeholder="Search staff..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="w-full sm:w-auto px-4 py-2 border-2 border-primary text-primary font-label-bold text-label-bold rounded hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filters
          </button>
        </div>
      </header>

      <div className="p-grid-margin space-y-stack-lg max-w-7xl mx-auto w-full">
        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="bg-surface-container-lowest p-stack-md border border-outline-variant rounded-lg">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Staff</p>
            <h3 className="font-headline-md text-headline-md text-primary mt-1">{staff.length}</h3>
            <div className="mt-2 text-xs text-green-600 font-medium">Synced from Database</div>
          </div>
          <div className="bg-surface-container-lowest p-stack-md border border-outline-variant rounded-lg">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Currently Active</p>
            <h3 className="font-headline-md text-headline-md text-primary mt-1">{activeCount}</h3>
            <div className="mt-2 flex items-center">
              <span className={`w-2 h-2 rounded-full ${activeCount > 0 ? 'bg-green-500' : 'bg-outline'} mr-1.5 inline-block`}></span>
              <span className="text-xs text-on-surface-variant">In Office/Remote</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-stack-md border border-outline-variant rounded-lg">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">On Assignment</p>
            <h3 className="font-headline-md text-headline-md text-primary mt-1">{assignmentCount}</h3>
            <div className="mt-2 flex items-center">
              <span className={`w-2 h-2 rounded-full ${assignmentCount > 0 ? 'bg-amber-500' : 'bg-outline'} mr-1.5 inline-block`}></span>
              <span className="text-xs text-on-surface-variant">Field Reporting</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-stack-md border border-outline-variant rounded-lg">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Avg Content Score</p>
            <h3 className="font-headline-md text-headline-md text-primary mt-1">{avgScore.toFixed(1)}</h3>
            <div className="mt-2 w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: `${(avgScore / 10) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Staff Table Container */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[800px]">
            <thead className="bg-surface-container border-b border-outline-variant">
              <tr>
                <th className="py-4 px-6 font-label-bold text-label-bold text-on-surface uppercase">Name & Role</th>
                <th className="py-4 px-6 font-label-bold text-label-bold text-on-surface uppercase">Status</th>
                <th className="py-4 px-6 font-label-bold text-label-bold text-on-surface uppercase text-center">Avg. Turnaround</th>
                <th className="py-4 px-6 font-label-bold text-label-bold text-on-surface uppercase text-center">Performance</th>
                <th className="py-4 px-6 font-label-bold text-label-bold text-on-surface uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filteredStaff.map((person, index) => (
                <tr key={index} className="hover:bg-surface-container-low transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img className="w-10 h-10 rounded bg-surface-container-high object-cover" alt={person.name} src={person.image} />
                      <div>
                        <div className="font-label-bold text-label-bold text-primary">{person.name}</div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant">{person.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${person.statusBg}`}>
                      <span className={`w-2 h-2 rounded-full ${person.statusColor} mr-1.5 inline-block`}></span> {person.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center font-label-bold text-label-bold text-on-surface">{person.time}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`material-symbols-outlined text-lg ${star <= person.rating ? 'text-amber-500' : 'text-outline-variant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button 
                      className={`p-2 rounded transition-all ${person.status === 'Out' ? 'text-primary opacity-50 cursor-not-allowed' : 'text-primary hover:bg-primary hover:text-on-primary cursor-pointer'}`}
                      disabled={person.status === 'Out'}
                      title="Quick Message"
                    >
                      <span className="material-symbols-outlined">chat</span>
                    </button>
                    <button className="p-2 text-secondary border border-secondary hover:bg-secondary hover:text-on-secondary rounded transition-all cursor-pointer" title="Assign Story">
                      <span className="material-symbols-outlined">assignment_add</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="px-6 py-4 bg-surface-container border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Showing {filteredStaff.length > 0 ? 1 : 0} to {filteredStaff.length} of {staff.length} entries</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded hover:bg-surface-container-high transition-all cursor-pointer opacity-50" disabled>
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded bg-primary text-on-primary font-label-bold text-label-bold cursor-pointer">1</button>
              <button className="p-1 rounded hover:bg-surface-container-high transition-all cursor-pointer opacity-50" disabled>
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Assignment Trends / Performance Board (Bento Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Column 1: Priority Queue */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-label-bold text-label-bold text-primary">Unassigned Hot Topics</h4>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            </div>
            <div className="space-y-stack-sm flex-grow">
              {hotTopics.length > 0 ? (
                hotTopics.map((topic: any, index: number) => (
                  <div key={index} className={`p-3 border-l-4 ${index === 0 ? 'border-secondary' : 'border-primary'} bg-surface-container-low rounded`}>
                    <p className={`text-xs font-bold ${index === 0 ? 'text-secondary' : 'text-primary'} uppercase mb-1`}>{topic.categories?.name || 'Uncategorized'}</p>
                    <p className="font-label-bold text-label-bold text-on-surface mb-2 truncate">{topic.title}</p>
                    <button className="text-xs font-bold text-primary hover:underline cursor-pointer">Draft Brief →</button>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-surface-container-low rounded text-center text-on-surface-variant text-sm py-8">
                  No pending drafts available.
                </div>
              )}
            </div>
          </div>
          
          {/* Column 2: Activity Map (Placeholder) */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h4 className="font-label-bold text-label-bold text-primary">Global Reporting Heatmap</h4>
              <span className="material-symbols-outlined text-outline">map</span>
            </div>
            <div className="h-32 bg-surface-container-high rounded flex items-center justify-center relative group">
              <img className="w-full h-full object-cover opacity-50 grayscale transition-all duration-500" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF46L1-Y3EmuWa21k5mrRQBA22HUrlcuJ1jiWebWC2qBvumZY9-RF_QZV-S-nmMSEUwI7jxIAFQ4W5CrFrXJF0QCqR3zDNxQLXX1QUBU3yRmLwp9f70hwhi0ljq6eIA86NU2RVsPpJfW2pWxe4YgY90nblp6bVCzLiA159g-bg_9U_muQTP7n3jv0JQrWaI7ezSwTqoRkTvECGqPIJI6W4-S4VZ9HwEjdv47ZHi0N8CazTHuD5NSM" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-label-bold text-label-bold text-primary">0 Active Regions</p>
                <p className="text-[10px] text-on-surface-variant">No reporters in field</p>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="flex-1 text-center opacity-50">
                <p className="text-[10px] text-on-surface-variant uppercase">Europe</p>
                <p className="font-label-bold text-label-bold">0</p>
              </div>
              <div className="flex-1 text-center border-x border-outline-variant opacity-50">
                <p className="text-[10px] text-on-surface-variant uppercase">Asia</p>
                <p className="font-label-bold text-label-bold">0</p>
              </div>
              <div className="flex-1 text-center opacity-50">
                <p className="text-[10px] text-on-surface-variant uppercase">NA</p>
                <p className="font-label-bold text-label-bold">0</p>
              </div>
            </div>
          </div>
          
          {/* Column 3: Quick Desk Actions */}
          <div className="bg-primary text-on-primary border border-primary rounded-lg p-stack-md flex flex-col justify-between">
            <div>
              <h4 className="font-label-bold text-label-bold mb-4">Editorial Desk Quick-Sync</h4>
              <p className="font-body-md text-body-md text-[#7686ab] leading-snug">Sync all active field reports with the main editorial calendar for the next 24h cycle.</p>
            </div>
            <div className="space-y-2 mt-4">
              <button className="w-full py-2 bg-secondary text-on-secondary rounded font-label-bold text-label-bold hover:brightness-110 transition-all cursor-pointer">Broadcast Emergency Alert</button>
              <button className="w-full py-2 border border-on-primary text-on-primary rounded font-label-bold text-label-bold hover:bg-on-primary hover:text-primary transition-all cursor-pointer">Export Staff Audit</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Area (Admin specific) */}
      <footer className="mt-auto py-stack-md border-t-4 border-secondary bg-primary flex flex-col items-center justify-center space-y-stack-md w-full px-grid-margin">
        <div className="font-headline-md text-headline-md font-bold text-on-primary tracking-tighter">MINBAR NEWS</div>
        <div className="flex flex-wrap justify-center gap-x-gutter gap-y-2">
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors cursor-pointer">Admin Dashboard</a>
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors cursor-pointer">Staff Compliance</a>
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors cursor-pointer">Privacy Protocols</a>
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors cursor-pointer">CMS Manual</a>
        </div>
        <div className="font-body-md text-body-md text-on-primary opacity-80">© {new Date().getFullYear()} Minbar News. Truth. Perspective. Impact.</div>
      </footer>
    </>
  )
}
