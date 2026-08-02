import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/media')({
  component: MediaLibrary,
})

function MediaLibrary() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      {/* Dashboard Header & Search/Filters */}
      <div className="flex-1 overflow-y-auto bg-background p-grid-margin relative">
        <header className="flex flex-col gap-stack-md mb-stack-lg">
          <div className="flex justify-between items-end border-b border-primary pb-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary">Asset Manager</h2>
              <p className="font-body-md text-on-surface-variant">Global Editorial Media Library & Licensing Repository</p>
            </div>
            <div className="flex gap-stack-sm">
              <span className="bg-surface-container-high text-primary px-3 py-1 font-label-bold text-label-bold">Total: 12,408</span>
              <span className="bg-secondary text-on-primary px-3 py-1 font-label-bold text-label-bold">Urgent Licensing: 4</span>
            </div>
          </div>
          
          {/* Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-stack-md items-center bg-white p-4 border border-outline-variant">
            <div className={`col-span-1 md:col-span-2 relative transition-all ${isFocused ? 'scale-105' : ''}`}>
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                className="w-full pl-10 border-outline-variant focus:border-primary focus:ring-0 rounded-none text-sm outline-none" 
                placeholder="Search by tags, filename, or article ID..." 
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
            <div>
              <select className="w-full border-outline-variant focus:border-primary focus:ring-0 rounded-none text-sm outline-none">
                <option>All File Types</option>
                <option>Images (.jpg, .png)</option>
                <option>Video (.mp4, .mov)</option>
                <option>Graphics (.svg, .ai)</option>
              </select>
            </div>
            <div>
              <select className="w-full border-outline-variant focus:border-primary focus:ring-0 rounded-none text-sm outline-none">
                <option>Upload Date</option>
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>This Month</option>
              </select>
            </div>
            <div>
              <select className="w-full border-outline-variant focus:border-primary focus:ring-0 rounded-none text-sm outline-none">
                <option>Licensing Status</option>
                <option>Public Domain</option>
                <option>Editorial Use Only</option>
                <option>Exclusive</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button className="bg-surface-container-highest p-2 border border-outline-variant hover:bg-primary hover:text-on-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined">grid_view</span>
              </button>
              <button className="p-2 border border-l-0 border-outline-variant hover:bg-primary hover:text-on-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined">list</span>
              </button>
            </div>
          </div>
        </header>

        {/* Bento Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
          
          {/* Asset Card 1: Featured Image */}
          <div 
            className="group bg-white border border-outline-variant flex flex-col transition-all hover:shadow-md cursor-pointer"
            onClick={() => setPanelOpen(true)}
          >
            <div className="relative aspect-video overflow-hidden bg-surface-container-low border-b border-outline-variant">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Summit" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUN3ol58U71hiFMm8ubtBU_X5hmXqVsI_DIZUEXliyHn9Vw_RCsQhAUXTt9oZ4R5KF7r5qSyZrm8zmP3YMmlfwSBRaFfQ0ub0WReWugZNDpnQW_twRd0grFH8Vl4K_yP06J2jc-wFBwkkAgl_rK4svMLnNFKgY2q9BjZ1nLCiY1hVWjS_CXU-eal-vCt29Waka2WT5TpNfRS7ovN-zHVtORY04sNFw7ngpCdU561vEZDBDe_PW8NA" />
              <div className="absolute top-2 left-2 bg-primary text-on-primary px-2 py-0.5 text-[10px] font-label-bold uppercase">Exclusive</div>
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button className="bg-white/90 p-1.5 hover:bg-secondary hover:text-white transition-colors cursor-pointer"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                <button className="bg-white/90 p-1.5 hover:bg-secondary hover:text-white transition-colors cursor-pointer"><span className="material-symbols-outlined text-[18px]">download</span></button>
              </div>
            </div>
            <div className="p-stack-md flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-label-bold text-label-bold text-primary truncate">G7_Summit_Final_2024.jpg</h3>
                <span className="font-label-sm text-[10px] text-on-surface-variant">4.2 MB</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-stack-md">
                <div className="text-[11px]">
                  <p className="text-outline uppercase font-label-sm">Resolution</p>
                  <p className="font-bold">4500 x 3000 px</p>
                </div>
                <div className="text-[11px]">
                  <p className="text-outline uppercase font-label-sm">Usage</p>
                  <p className="font-bold">3 Articles</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-[10px] bg-surface-container px-2 py-0.5 border border-outline-variant">#politics</span>
                <span className="text-[10px] bg-surface-container px-2 py-0.5 border border-outline-variant">#summit</span>
              </div>
            </div>
          </div>

          {/* Asset Card 2: Video */}
          <div 
            className="group bg-white border border-outline-variant flex flex-col transition-all hover:shadow-md cursor-pointer"
            onClick={() => setPanelOpen(true)}
          >
            <div className="relative aspect-video overflow-hidden bg-surface-container-low border-b border-outline-variant flex items-center justify-center">
              <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Solar Farm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDppgLg9h6i1rm3KEfTWh5wxJkSa6qG6g_aeuN8P0W1MC21XPjsV4RorMyQsoObziDOpnhhrM9V6HtqHlr20ZOHaf34UWbp0-TB5Rkk3cWKSeWz-JryhbS2M2OqmBtr7xNMj_zjxG2FxEU-F_kWF6F_N1Msy3E7WvFuNXzOLcX9izmz8dj7hd0rHv21z05d09Yx8oJm9unPvt1LujLCaaJL9AwLGgJWUDPBHzt65pjpj0MnKDrQFfU" />
              <span className="material-symbols-outlined text-white text-[48px] absolute pointer-events-none group-hover:scale-110 transition-transform">play_circle</span>
              <div className="absolute top-2 left-2 bg-[#374768] text-on-primary px-2 py-0.5 text-[10px] font-label-bold uppercase">Video</div>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-0.5 text-[10px] font-label-bold">02:45</div>
            </div>
            <div className="p-stack-md flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-label-bold text-label-bold text-primary truncate">Clean_Energy_B-Roll.mp4</h3>
                <span className="font-label-sm text-[10px] text-on-surface-variant">128 MB</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-stack-md">
                <div className="text-[11px]">
                  <p className="text-outline uppercase font-label-sm">Format</p>
                  <p className="font-bold">4K UHD / 60fps</p>
                </div>
                <div className="text-[11px]">
                  <p className="text-outline uppercase font-label-sm">License</p>
                  <p className="font-bold text-secondary">Editorial</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-[10px] bg-surface-container px-2 py-0.5 border border-outline-variant">#climate</span>
                <span className="text-[10px] bg-surface-container px-2 py-0.5 border border-outline-variant">#energy</span>
              </div>
            </div>
          </div>

          {/* Asset Card 3: Graphic/Infographic */}
          <div 
            className="group bg-white border border-outline-variant flex flex-col transition-all hover:shadow-md cursor-pointer"
            onClick={() => setPanelOpen(true)}
          >
            <div className="relative aspect-video overflow-hidden bg-surface-container-high border-b border-outline-variant p-4">
              <div className="w-full h-full border border-dashed border-outline-variant flex flex-col items-center justify-center bg-white">
                <span className="material-symbols-outlined text-outline mb-2">bar_chart</span>
                <p className="text-[10px] text-outline font-label-bold">INFOGRAPHIC_SVG</p>
              </div>
              <div className="absolute top-2 left-2 bg-on-primary-fixed-variant text-on-primary px-2 py-0.5 text-[10px] font-label-bold uppercase">Vector</div>
            </div>
            <div className="p-stack-md flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-label-bold text-label-bold text-primary truncate">Economy_Stats_Q3_V2.svg</h3>
                <span className="font-label-sm text-[10px] text-on-surface-variant">450 KB</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-stack-md">
                <div className="text-[11px]">
                  <p className="text-outline uppercase font-label-sm">Type</p>
                  <p className="font-bold">Scalable Vector</p>
                </div>
                <div className="text-[11px]">
                  <p className="text-outline uppercase font-label-sm">Designer</p>
                  <p className="font-bold">Editorial Team</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-[10px] bg-surface-container px-2 py-0.5 border border-outline-variant">#economy</span>
                <span className="text-[10px] bg-surface-container px-2 py-0.5 border border-outline-variant">#data</span>
              </div>
            </div>
          </div>

          {/* Asset Card 4: Archive Photo */}
          <div 
            className="group bg-white border border-outline-variant flex flex-col transition-all hover:shadow-md cursor-pointer"
            onClick={() => setPanelOpen(true)}
          >
            <div className="relative aspect-video overflow-hidden bg-surface-container-low border-b border-outline-variant">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Office" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyIu-IbWLxEB2agWIui1mkyTqMtMnHmFCJT6vREAoRE6xWbq7GEejZDhLT4Jlv_dhPGyz3NYDhuyxpz5rmYjydgq4qlHkeXBoCQuRjMSwfOo3YhKvRgAiBBm3BK8zXzKmAqpJHPLfKUvFUDo5ASZFEGHPT4eH0MJ4_pgEavWhUXcMBTOv0c3sFHQRD15JeluMkhpjEgXkY_K-CjwwBYFTWFASqXN0OiZ93Sfj1uzox1enYYJwHSos" />
              <div className="absolute top-2 left-2 bg-[#7c879c] text-on-primary px-2 py-0.5 text-[10px] font-label-bold uppercase">Public Domain</div>
            </div>
            <div className="p-stack-md flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-label-bold text-label-bold text-primary truncate">Tokyo_Remote_Work.jpg</h3>
                <span className="font-label-sm text-[10px] text-on-surface-variant">1.8 MB</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-stack-md">
                <div className="text-[11px]">
                  <p className="text-outline uppercase font-label-sm">Uploaded</p>
                  <p className="font-bold">Oct 12, 2023</p>
                </div>
                <div className="text-[11px]">
                  <p className="text-outline uppercase font-label-sm">Alt Text</p>
                  <p className="font-bold text-[#7c879c]">Completed</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-[10px] bg-surface-container px-2 py-0.5 border border-outline-variant">#tokyo</span>
                <span className="text-[10px] bg-surface-container px-2 py-0.5 border border-outline-variant">#society</span>
              </div>
            </div>
          </div>
          
          {/* Drop Zone for New Assets */}
          <div className="border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-grid-margin bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer group h-full min-h-[250px]">
            <span className="material-symbols-outlined text-[48px] text-outline mb-stack-sm group-hover:text-primary group-hover:scale-110 transition-all">add_photo_alternate</span>
            <p className="font-label-bold text-label-bold text-outline group-hover:text-primary">Drag & Drop to Upload</p>
            <p className="font-label-sm text-label-sm text-[#7c879c] mt-2">Maximum file size: 500MB</p>
          </div>

        </div>
      </div>

      {/* Side Asset Details Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-full md:w-[400px] bg-white border-l border-outline-variant shadow-2xl z-50 transition-transform duration-300 ${panelOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-stack-md flex justify-between items-center border-b border-outline-variant">
          <h3 className="font-headline-md text-primary">Asset Details</h3>
          <button className="p-1 hover:bg-surface-container-low cursor-pointer rounded" onClick={() => setPanelOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-stack-md space-y-stack-lg overflow-y-auto h-[calc(100%-140px)] pb-stack-lg">
          <div className="aspect-video bg-surface-container-low border border-outline-variant overflow-hidden">
            <img className="w-full h-full object-contain" alt="Asset Preview" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhIwzqdodpCASH9bVMYlXYgVVSGQ3Q2bHRZUYUE-F7a59YhWkpv8zjJPumCmJqnecYl0J3CLVrz_N3sStBIx0JMRVBS8mDhCLhRXasVimy6Uk-EEKujwQMRZQt1JI8nY_RSkitrb_Wl2oeZvPuHkjUGJBiI1ZAFHNBhmI9oNtzRJk47rHEYOCmD17wK7C4-Fd1Il-vLPlrhrGUGE8aPaJcIHYyp2h26ISxPBALFAskBs78Af3P-bQ" />
          </div>
          <div className="space-y-4">
            <div>
              <label className="font-label-bold text-label-bold text-outline block mb-1">FILENAME</label>
              <input className="w-full border-outline-variant focus:border-primary focus:ring-0 rounded-none font-bold outline-none border p-2" type="text" defaultValue="G7_Summit_Final_2024.jpg" />
            </div>
            <div>
              <label className="font-label-bold text-label-bold text-outline block mb-1">ALT TEXT (SEO & ACCESSIBILITY)</label>
              <textarea className="w-full h-24 border-outline-variant focus:border-primary focus:ring-0 rounded-none text-sm outline-none border p-2" defaultValue="G7 world leaders posing for the official family photo in Berlin, 2024. Focus on Chancellor Scholz and President Biden in conversation."></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-label-bold text-label-bold text-outline block mb-1">RESOLUTION</label>
                <p className="text-sm font-bold">4500 x 3000 (13.5 MP)</p>
              </div>
              <div>
                <label className="font-label-bold text-label-bold text-outline block mb-1">COLOR SPACE</label>
                <p className="text-sm font-bold">Adobe RGB (1998)</p>
              </div>
            </div>
            <div>
              <label className="font-label-bold text-label-bold text-outline block mb-1">LICENSING STATUS</label>
              <div className="flex items-center gap-2 p-3 bg-secondary-fixed text-on-secondary-fixed border-l-4 border-secondary">
                <span className="material-symbols-outlined">gavel</span>
                <span className="font-label-bold">Exclusive Editorial Rights</span>
              </div>
              <p className="text-[11px] text-outline mt-2 italic">Valid until: Dec 31, 2026. Global distribution permitted.</p>
            </div>
          </div>
          
          <div className="pt-stack-md flex flex-col gap-2 border-t mt-4">
            <button className="w-full bg-primary text-on-primary font-label-bold py-3 uppercase tracking-widest hover:opacity-90 cursor-pointer">Save Changes</button>
            <button className="w-full border border-primary text-primary font-label-bold py-3 uppercase tracking-widest hover:bg-surface-container-low transition-colors cursor-pointer">Download Original</button>
            <button className="w-full text-secondary font-label-bold py-3 flex items-center justify-center gap-2 hover:bg-secondary-fixed transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">delete</span> Delete Permanently
            </button>
          </div>
        </div>
      </div>
      
      {/* Backdrop for panel */}
      {panelOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 transition-opacity" 
          onClick={() => setPanelOpen(false)}
        />
      )}
    </>
  )
}
