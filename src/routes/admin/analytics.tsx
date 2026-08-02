import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/admin/analytics')({
  component: AnalyticsDashboard,
})

function AnalyticsDashboard() {
  const [logs, setLogs] = useState([
    { id: 1, time: '14:22:01', html: <><span className="font-bold text-on-primary-fixed">User #8291</span> just started reading <span className="italic">"Global Trade Shifts"</span> from <span className="font-bold">Tokyo, JP</span>.</>, border: 'border-secondary' },
    { id: 2, time: '14:21:55', html: <><span className="font-bold text-on-primary-fixed">Social Referral</span> detected via X/Twitter for <span className="italic">"Energy Evolution"</span>. (142 hits)</>, border: 'border-primary-fixed-dim' },
    { id: 3, time: '14:21:42', html: <><span className="font-bold text-on-primary-fixed">Search Hit</span> from Google (Organic) for keyword: <span className="font-bold">"Minbar News Analysis"</span>.</>, border: 'border-secondary' },
    { id: 4, time: '14:21:30', html: <><span className="font-bold text-on-primary-fixed">Subscription Update:</span> New Premium Account registered by <span className="font-bold">user_77@edu.uk</span>.</>, border: 'border-primary-fixed-dim' },
    { id: 5, time: '14:21:15', html: <><span className="font-bold text-on-primary-fixed">Breaking Alert</span> read by 5,000+ users in the last 60 seconds.</>, border: 'border-secondary' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-GB', { hour12: false })
      
      const newLogsData = [
          { type: 'reading', text: 'New reader session from London, UK' },
          { type: 'social', text: 'Article share detected on LinkedIn' },
          { type: 'search', text: 'Top keyword: "Climate Policy Reform"' }
      ]
      
      const randomLog = newLogsData[Math.floor(Math.random() * newLogsData.length)]
      
      setLogs(prev => [
        {
          id: Date.now(),
          time: timeString,
          html: <>{randomLog.text}</>,
          border: Math.random() > 0.5 ? 'border-secondary' : 'border-primary-fixed-dim'
        },
        ...prev.slice(0, 9)
      ])
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Header / Top Bar */}
      <header className="bg-surface sticky top-0 z-40 px-grid-margin py-4 border-b border-outline-variant flex items-center justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">Performance Analytics</h2>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Real-time engagement and distribution metrics</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all w-64" 
              placeholder="Search analytics..." 
              type="text"
            />
          </div>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-10 h-10 rounded-full border border-outline-variant overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              alt="Profile" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7-domQfNZYalpA3cM_mjK1aCcTcDe-OhpPb2UY766Y-eSPbuZiFIRTtQ75X_f0gnP17fb6jdpWTxCEFdJhERcaCqq2phXOtjjy0-NrAun5M9MTd05EfYS3vl9SaN-wen0FvLldAGzb-Z3luDfqTRfSokD7cLlz3xljdY8QacpSmxXDQ-cNcdQmc0kCQksoTNXBqCAov1P77BnbdrCG8uNhYTk2oBqfaS7vgHbCjEdWF1lWNW9zy0"
            />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-grid-margin space-y-stack-lg max-w-7xl mx-auto w-full">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="bg-surface-container-lowest p-stack-md border border-outline-variant rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-on-surface-variant font-label-bold text-label-bold uppercase">Active Readers</span>
              <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
            </div>
            <div className="text-3xl font-bold text-primary">12,842</div>
            <div className="flex items-center mt-2 text-secondary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="ml-1">+14% vs last hour</span>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-stack-md border border-outline-variant rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-on-surface-variant font-label-bold text-label-bold uppercase">Avg. Read Time</span>
              <span className="material-symbols-outlined text-outline">timer</span>
            </div>
            <div className="text-3xl font-bold text-primary">4m 22s</div>
            <div className="flex items-center mt-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-sm">remove</span>
              <span className="ml-1">Stable (0.2% change)</span>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-stack-md border border-outline-variant rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-on-surface-variant font-label-bold text-label-bold uppercase">Page Views (24h)</span>
              <span className="material-symbols-outlined text-outline">visibility</span>
            </div>
            <div className="text-3xl font-bold text-primary">1.2M</div>
            <div className="flex items-center mt-2 text-primary-fixed-dim text-xs font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="ml-1">+5.4% vs yesterday</span>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-stack-md border border-outline-variant rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-on-surface-variant font-label-bold text-label-bold uppercase">Conversion Rate</span>
              <span className="material-symbols-outlined text-outline">ads_click</span>
            </div>
            <div className="text-3xl font-bold text-primary">3.18%</div>
            <div className="flex items-center mt-2 text-secondary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">trending_down</span>
              <span className="ml-1">-0.4% vs last period</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Traffic Pulse Chart Area */}
          <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface">
              <h3 className="font-label-bold text-label-bold text-primary uppercase">Reader Velocity (24h)</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-bold bg-primary text-on-primary rounded cursor-pointer">LIVE</button>
                <button className="px-3 py-1 text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors rounded cursor-pointer">History</button>
              </div>
            </div>
            <div className="flex-1 min-h-[350px] relative p-6">
              {/* Simulated Chart Area */}
              <div className="absolute inset-0 flex items-end justify-between px-10 pb-10 opacity-80">
                <div className="w-8 bg-primary-container h-[40%] rounded-t-sm"></div>
                <div className="w-8 bg-primary-container h-[55%] rounded-t-sm"></div>
                <div className="w-8 bg-primary-container h-[35%] rounded-t-sm"></div>
                <div className="w-8 bg-primary-container h-[70%] rounded-t-sm"></div>
                <div className="w-8 bg-primary-container h-[85%] rounded-t-sm"></div>
                <div className="w-8 bg-secondary h-[95%] rounded-t-sm relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-2 py-1 rounded text-[10px] font-bold">Peak</div>
                </div>
                <div className="w-8 bg-primary-container h-[80%] rounded-t-sm"></div>
                <div className="w-8 bg-primary-container h-[60%] rounded-t-sm"></div>
                <div className="w-8 bg-primary-container h-[45%] rounded-t-sm"></div>
                <div className="w-8 bg-primary-container h-[50%] rounded-t-sm"></div>
                <div className="w-8 bg-primary-container h-[65%] rounded-t-sm"></div>
                <div className="w-8 bg-primary-container h-[40%] rounded-t-sm"></div>
              </div>
              
              {/* Grid Lines */}
              <div className="absolute inset-x-6 inset-y-10 border-l border-b border-outline-variant flex flex-col justify-between pointer-events-none">
                <div className="w-full border-t border-dashed border-outline-variant opacity-30"></div>
                <div className="w-full border-t border-dashed border-outline-variant opacity-30"></div>
                <div className="w-full border-t border-dashed border-outline-variant opacity-30"></div>
                <div className="w-full border-t border-dashed border-outline-variant opacity-30"></div>
              </div>
              
              <div className="absolute left-0 top-1/2 -rotate-90 text-[10px] uppercase font-bold text-outline">Pageviews / Min</div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase font-bold text-outline">Time of Day (UTC)</div>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-lg flex flex-col">
            <div className="p-stack-md border-b border-outline-variant bg-surface">
              <h3 className="font-label-bold text-label-bold text-primary uppercase">Top Regions</h3>
            </div>
            <div className="p-stack-md flex-1">
              <div className="h-40 bg-surface-container-high rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <div 
                  className="absolute inset-0 grayscale opacity-20 bg-cover bg-center" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgsP0urGmqjAZlWkD_wSySMQoksCUNmH7S_H2o2B5JnqM6EZEk--Hoa2MttgubC8C_c1GW7RiARQofc6ABDsiYjO3CE2ITxvF9E_th0-MV-FWECD0uOq6zXmI-nVbJ5PXHwYAs0DVlkmL5HNR8sDU3Mw8np5qT-mB8hHYZplNi83FXYJ_SPvzs_hnVdYVapQhgzmBv5lqZhwaZVlPVLZpLGOhQ1lVbuP8POzXEhVTLsWnh-Pq9PKE')" }}
                ></div>
                <span className="material-symbols-outlined text-4xl text-primary opacity-50">public</span>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="text-sm font-medium">United States</span>
                  </div>
                  <span className="text-sm font-bold">42%</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary opacity-70"></span>
                    <span className="text-sm font-medium">United Kingdom</span>
                  </div>
                  <span className="text-sm font-bold">18%</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary opacity-50"></span>
                    <span className="text-sm font-medium">Germany</span>
                  </div>
                  <span className="text-sm font-bold">12%</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary opacity-30"></span>
                    <span className="text-sm font-medium">Canada</span>
                  </div>
                  <span className="text-sm font-bold">9%</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary opacity-10"></span>
                    <span className="text-sm font-medium">Others</span>
                  </div>
                  <span className="text-sm font-bold">19%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Grid: Top Performing & Real-time Live Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Top Articles Table */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-lg">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface">
              <h3 className="font-label-bold text-label-bold text-primary uppercase">Top Performing Content</h3>
              <button className="text-xs text-primary font-bold flex items-center hover:underline cursor-pointer">
                Full Report <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low text-[10px] uppercase font-bold text-on-surface-variant">
                  <tr>
                    <th className="px-4 py-3">Article Title</th>
                    <th className="px-4 py-3">Views</th>
                    <th className="px-4 py-3">Retention</th>
                    <th className="px-4 py-3">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-surface-container-high shrink-0 rounded overflow-hidden">
                          <img className="w-full h-full object-cover" alt="Cityscape" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0aRQXmgLi6vztnxkVu3XJom4JwoKF-lCLP8Jl7g0GSsL8Up8WHN4bXIdrID6N8dNX5NmscADGZJCCy0rbPM9Ul7_qCB097S65tNemCrvY4GXURah4bkklM41g8okY0WUXdYqoTqyImETAoNKfxPWvA3ji-Y-gan7iaMh7zRO_oZWEYriO4LFfx9Kyw3U-zwFpU-qeIo156ehUFMdhxNyp8gUbI4hEI3-U7k_tYGTz1YuTHS5AqRM" />
                        </div>
                        <p className="text-sm font-medium line-clamp-1">Economic Shifts: The Decadal Outlook on Global Trade...</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-sm">45.2K</td>
                    <td className="px-4 py-4">
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[88%]"></div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-primary font-bold text-sm">+12%</td>
                  </tr>
                  
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-surface-container-high shrink-0 rounded overflow-hidden">
                          <img className="w-full h-full object-cover" alt="Wind turbine" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbbkbW5dh51QQaUfxToCK8-tYpVIgeiJS62XwpWgI1ckYlTjvyaGUvS0ZTnL1-tz73BHQRe69g0tAxVPhQhcUp2NU5Vv3O262tYB8POTVMSZAZ7IR-_6QVSsI7ABrjGBNldPc1DVWld4rctvvGuw0Qnif5Tbiv4HfoG-uddVzJwd8HWNwzwksi8Hoe6iXB2mkr9G158WRXdVgYs_yeCa6AqksdyJiovKhg8na62441acqj_2-N7w4" />
                        </div>
                        <p className="text-sm font-medium line-clamp-1">Energy Crisis or Evolution? New Policy Analysis...</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-sm">31.8K</td>
                    <td className="px-4 py-4">
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[65%]"></div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-primary font-bold text-sm">+8%</td>
                  </tr>
                  
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-surface-container-high shrink-0 rounded overflow-hidden">
                          <img className="w-full h-full object-cover" alt="Airport" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGQBJ2dxT4Rd55OOMy4B8sDpsJVhSWRMtkKoHJr3Gx9ce3aaGDG5Tg43B76aSa-yNF6TSqJoiQlIN1q7l9Ddm_vtxKtS72SsG0tny2ipsVrX9Kb3hbxZoZ5p1MQ8W_dHF1tbO2_xZ6Bs8VPsy28_dIg7JUWScE847o-ryOaHwtKtuSNiIMVESge3xCB9WPXzI9Lw2Q7QBZTgKWxGrHF61SRidlHKa9lCrsuY8gfRIl8KvU61ZzJ8o" />
                        </div>
                        <p className="text-sm font-medium line-clamp-1">Travel Restrictions: What You Need to Know for Q4</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-sm">28.1K</td>
                    <td className="px-4 py-4">
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[72%]"></div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-secondary font-bold text-sm">-2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Real-time Pulse Sidebar */}
          <div className="lg:col-span-5 bg-primary-container text-on-primary-container border border-primary-container rounded-lg flex flex-col">
            <div className="p-stack-md border-b border-primary flex justify-between items-center">
              <h3 className="font-label-bold text-label-bold text-on-primary-fixed uppercase">Real-Time Traffic Pulse</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-xs font-bold">Live Activity</span>
              </div>
            </div>
            
            <div className="flex-1 p-stack-md overflow-y-auto max-h-[350px] custom-scrollbar">
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className={`flex gap-3 items-start border-l-2 ${log.border} pl-3 py-1 transition-all duration-500`}>
                    <div className="text-[10px] font-bold text-on-primary-container opacity-60">{log.time}</div>
                    <p className="text-xs">{log.html}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-3 bg-tertiary-container mt-auto">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">Server Latency</span>
                <span className="text-[10px] font-bold text-secondary">22ms</span>
              </div>
              <div className="w-full bg-primary h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-secondary h-full w-[15%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-auto bg-primary py-stack-lg border-t-4 border-secondary text-on-primary">
        <div className="max-w-7xl mx-auto px-grid-margin flex flex-col items-center gap-stack-md">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Minbar News Logo" className="h-8 w-auto object-contain rounded" />
            <h2 className="font-headline-md text-headline-md font-bold text-on-primary uppercase tracking-widest">
              MINBAR NEWS
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-surface-variant hover:text-on-primary transition-colors font-label-sm text-label-sm" href="#">About Us</a>
            <a className="text-surface-variant hover:text-on-primary transition-colors font-label-sm text-label-sm" href="#">Editorial Guidelines</a>
            <a className="text-surface-variant hover:text-on-primary transition-colors font-label-sm text-label-sm" href="#">Privacy Policy</a>
            <a className="text-surface-variant hover:text-on-primary transition-colors font-label-sm text-label-sm" href="#">Terms of Service</a>
            <a className="text-surface-variant hover:text-on-primary transition-colors font-label-sm text-label-sm" href="#">Contact</a>
            <a className="text-surface-variant hover:text-on-primary transition-colors font-label-sm text-label-sm" href="#">Archive</a>
          </div>
          
          <p className="font-body-md text-body-md opacity-60 text-center">© {new Date().getFullYear()} Minbar News. Truth. Perspective. Impact.</p>
        </div>
      </footer>
    </>
  )
}
