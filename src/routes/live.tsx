import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/live')({
  component: LiveReportingMap,
})

function LiveReportingMap() {
  const [panelOpen, setPanelOpen] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<{name: string, img: string} | null>(null)
  const [signalStrength, setSignalStrength] = useState('98.4')

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
            <a className="flex items-center gap-4 px-6 py-4 text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-container-high dark:hover:bg-on-tertiary-fixed-variant transition-transform cursor-pointer">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-bold text-label-bold">Dashboard</span>
            </a>
            <a className="flex items-center gap-4 px-6 py-4 text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-container-high dark:hover:bg-on-tertiary-fixed-variant transition-transform cursor-pointer">
              <span className="material-symbols-outlined">description</span>
              <span className="font-label-bold text-label-bold">Editorial Queue</span>
            </a>
            <a className="flex items-center gap-4 px-6 py-4 bg-primary dark:bg-primary-fixed text-on-primary dark:text-on-primary-fixed rounded-none font-bold transition-transform cursor-pointer">
              <span className="material-symbols-outlined">live_tv</span>
              <span className="font-label-bold text-label-bold">Live Feed</span>
            </a>
            <a className="flex items-center gap-4 px-6 py-4 text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-container-high dark:hover:bg-on-tertiary-fixed-variant transition-transform cursor-pointer">
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="font-label-bold text-label-bold">Archives</span>
            </a>
            <a className="flex items-center gap-4 px-6 py-4 text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-container-high dark:hover:bg-on-tertiary-fixed-variant transition-transform cursor-pointer">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-bold text-label-bold">Settings</span>
            </a>
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
            <div 
              className="absolute top-[30%] left-[25%] group cursor-pointer" 
              onClick={() => setSelectedRegion({name: 'Washington D.C.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ3V28ar3TL6Ddl5m6deLFd06FqRHPtUzka15cLIxILYWxNLIt98glrNRqzZKuRV2Y2x3X7opyy_ROYw6gyDZt9NdqdeweBmIf7NIyVY6d1a2j_w9RZvdjrujuF0DxA8YpHxzoJ0yJT_p7ltA3QU9S6QdMBXlrNPxqz-ed1qEgn8mnE7LXSCo_5jmucNMt7P8DCn6tkW6V_YwWRYSigjf9DLSsWKSqUcxUSd4gVtyhVfKxipPuUhY'})}
            >
              <div className="absolute -inset-2 bg-secondary/30 rounded-full animate-ping opacity-75"></div>
              <div className="w-3 h-3 bg-secondary rounded-full relative z-10 border border-white/20"></div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-tertiary text-white font-label-bold text-[10px] py-1 px-2 whitespace-nowrap z-20 border border-secondary">NA-DC-01: HIGH PRIORITY</div>
            </div>
            
            <div 
              className="absolute top-[45%] left-[52%] group cursor-pointer" 
              onClick={() => setSelectedRegion({name: 'Brussels', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ3V28ar3TL6Ddl5m6deLFd06FqRHPtUzka15cLIxILYWxNLIt98glrNRqzZKuRV2Y2x3X7opyy_ROYw6gyDZt9NdqdeweBmIf7NIyVY6d1a2j_w9RZvdjrujuF0DxA8YpHxzoJ0yJT_p7ltA3QU9S6QdMBXlrNPxqz-ed1qEgn8mnE7LXSCo_5jmucNMt7P8DCn6tkW6V_YwWRYSigjf9DLSsWKSqUcxUSd4gVtyhVfKxipPuUhY'})}
            >
              <div className="absolute -inset-2 bg-secondary/30 rounded-full animate-ping opacity-75"></div>
              <div className="w-3 h-3 bg-secondary rounded-full relative z-10 border border-white/20"></div>
            </div>
            
            <div 
              className="absolute top-[58%] left-[78%] group cursor-pointer" 
              onClick={() => setSelectedRegion({name: 'Tokyo', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ3V28ar3TL6Ddl5m6deLFd06FqRHPtUzka15cLIxILYWxNLIt98glrNRqzZKuRV2Y2x3X7opyy_ROYw6gyDZt9NdqdeweBmIf7NIyVY6d1a2j_w9RZvdjrujuF0DxA8YpHxzoJ0yJT_p7ltA3QU9S6QdMBXlrNPxqz-ed1qEgn8mnE7LXSCo_5jmucNMt7P8DCn6tkW6V_YwWRYSigjf9DLSsWKSqUcxUSd4gVtyhVfKxipPuUhY'})}
            >
              <div className="absolute -inset-2 bg-secondary/30 rounded-full animate-ping opacity-75"></div>
              <div className="w-3 h-3 bg-secondary rounded-full relative z-10 border border-white/20"></div>
            </div>
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
              
              {/* Regional Summary Card 1 */}
              <div className="p-stack-md border-b border-on-primary-container hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-label-bold text-[10px] text-secondary-container bg-secondary/20 px-1.5 py-0.5">NORTH AMERICA</span>
                  <span className="font-label-sm text-[10px] text-on-primary-container">02m ago</span>
                </div>
                <h4 className="font-headline-md text-[18px] text-white leading-tight mb-2 group-hover:text-secondary-fixed transition-colors">Economic Policy Pivot: White House to Address Trade Deficit</h4>
                <p className="font-body-md text-[13px] text-on-primary-container line-clamp-2">The administration is expected to announce a series of measures targeting industrial subsidies...</p>
              </div>
              
              {/* Regional Summary Card 2 */}
              <div className="p-stack-md border-b border-on-primary-container hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-label-bold text-[10px] text-primary-fixed bg-on-primary-fixed-variant px-1.5 py-0.5">EUROPE</span>
                  <span className="font-label-sm text-[10px] text-on-primary-container">14m ago</span>
                </div>
                <h4 className="font-headline-md text-[18px] text-white leading-tight mb-2 group-hover:text-secondary-fixed transition-colors">Energy Transition: EU Approves Renewables Expansion Bill</h4>
                <p className="font-body-md text-[13px] text-on-primary-container line-clamp-2">New directives mandate a 25% increase in offshore wind capacity across the North Sea by 2030...</p>
              </div>
              
              {/* Live Dispatch Feed Section */}
              <div className="p-stack-md bg-secondary/5">
                <h5 className="font-label-bold text-[10px] text-on-primary-container uppercase tracking-widest mb-stack-md">Live Wire Feed</h5>
                <ul className="space-y-4">
                  <li className="flex gap-3 border-l-2 border-on-primary-container pl-3 py-1">
                    <div className="flex-1">
                      <p className="font-body-md text-[12px] text-white font-medium">[ALERT] Tokyo Stock Exchange shows unexpected midday surge.</p>
                      <span className="font-label-sm text-[10px] text-on-primary-container">11:04 UTC</span>
                    </div>
                  </li>
                  <li className="flex gap-3 border-l-2 border-secondary pl-3 py-1">
                    <div className="flex-1">
                      <p className="font-body-md text-[12px] text-white font-medium">Reporting: Border tensions rising in South Caucasus regional zone.</p>
                      <span className="font-label-sm text-[10px] text-on-primary-container">10:52 UTC</span>
                    </div>
                  </li>
                  <li className="flex gap-3 border-l-2 border-on-primary-container pl-3 py-1">
                    <div className="flex-1">
                      <p className="font-body-md text-[12px] text-white font-medium">Analysis: The impact of new AI regulation on venture capital in SE Asia.</p>
                      <span className="font-label-sm text-[10px] text-on-primary-container">10:45 UTC</span>
                    </div>
                  </li>
                </ul>
              </div>
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
              />
            </div>
          </div>

          {/* Contextual Popup */}
          {selectedRegion && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-primary border border-secondary shadow-2xl z-50 p-stack-lg">
              <div className="flex justify-between items-start mb-stack-md">
                <div>
                  <span className="font-label-bold text-[11px] text-secondary uppercase">Hotspot Detected</span>
                  <h2 className="font-headline-lg text-headline-lg text-white">{selectedRegion.name}</h2>
                </div>
                <button className="text-on-primary-container hover:text-white cursor-pointer" onClick={() => setSelectedRegion(null)}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="aspect-video mb-stack-md overflow-hidden bg-primary-container">
                <img className="w-full h-full object-cover opacity-80" alt={selectedRegion.name} src={selectedRegion.img} />
              </div>
              <p className="font-body-md text-body-md text-on-primary-container mb-stack-lg">Multiple reports originating from this sector regarding significant legislative shifts and infrastructure developments. Local correspondents are currently on the ground.</p>
              <div className="flex gap-stack-md">
                <button className="flex-1 bg-secondary text-white py-3 font-label-bold uppercase text-sm cursor-pointer">Full Dossier</button>
                <button className="flex-1 border border-on-primary-container text-white py-3 font-label-bold uppercase text-sm cursor-pointer">Listen Live</button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
