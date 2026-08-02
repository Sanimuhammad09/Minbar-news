import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/articles')({
  component: ArticleLibrary,
})

function ArticleLibrary() {
  const [isFocused, setIsFocused] = useState(false)
  const [filterActive, setFilterActive] = useState(false)

  return (
    <>
      {/* HEADER / TOOLBAR */}
      <header className="h-20 bg-surface border-b border-outline-variant flex items-center justify-between px-grid-margin shrink-0">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">Article Library</h2>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Archived and active editorial content</p>
        </div>
        
        <div className="flex items-center gap-4">
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
            <span className="font-display-lg text-4xl text-primary">2,841</span>
            <span className="text-secondary font-label-bold text-label-sm">+12%</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md flex flex-col justify-between h-32">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Drafts Pending</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-4xl text-primary">14</span>
            <span className="text-on-surface-variant font-label-bold text-label-sm">High Priority</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md flex flex-col justify-between h-32">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Engagement</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-4xl text-primary">4.2m</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">trending_up</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md flex flex-col justify-between h-32">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Editorial Integrity</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-4xl text-primary">99.2%</span>
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
            
            {/* Row 1 */}
            <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-outline-variant hover:bg-surface-container-low/80 transition-colors items-center">
              <div className="col-span-5 flex gap-4">
                <div className="w-24 h-16 shrink-0 bg-surface-container-high overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Stock market" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMuthxWhv4QahJjQmIkobTRHrD2gQ2lyo9wkS5uv0-9OywQ10rTPuGL5iW43uF0KgPNIAmHd_2PRog8i2H1HhKwrHdWkjhawT7_RuJ3z5Vh7p11a4_21HZ-4TYt6xFB-MF1I8F4pPwRw72DmxkrobOLkCa4OX9QiOk4dx9O-Xqpxt7MTDBVspwEiROryb4yCVe9bWWLqIIHuqh-7c_Ty6I4VZ6EvtxkGs7tQz4m1iB1_Vf9Q9pn7M" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-label-sm text-[11px] text-secondary font-bold uppercase mb-1">Economy</span>
                  <h3 className="font-headline-md text-[18px] leading-tight text-primary hover:underline cursor-pointer">Global Trade Routes Brace for Volatile Quarter as New Tariffs Loom</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-surface-container-high text-[10px] font-label-bold uppercase text-on-surface-variant">Archived</span>
                    <span className="px-2 py-0.5 bg-surface-container-high text-[10px] font-label-bold uppercase text-on-surface-variant">Premium</span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-[10px] font-bold">ET</div>
                <span className="font-body-md text-body-md text-on-surface">Elena Turov</span>
              </div>
              <div className="col-span-2 text-right space-y-1">
                <div className="flex items-center justify-end gap-1 font-label-bold text-label-bold text-primary">
                  <span className="material-symbols-outlined text-[14px]">visibility</span> 1.2M
                </div>
                <div className="flex items-center justify-end gap-1 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">chat_bubble</span> 432
                </div>
              </div>
              <div className="col-span-2 text-right">
                <div className="font-label-bold text-label-bold text-primary">Oct 24, 2023</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">09:15 AM</div>
              </div>
              <div className="col-span-1 flex justify-end">
                <button className="p-2 hover:bg-surface-container-high transition-all rounded-full cursor-pointer">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-outline-variant hover:bg-surface-container-low/80 transition-colors items-center">
              <div className="col-span-5 flex gap-4">
                <div className="w-24 h-16 shrink-0 bg-surface-container-high overflow-hidden">
                  <img className="w-full h-full object-cover" alt="AI Robot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzu5h8QBNur5waubxuTk-Aqf5p6MpH2rOa04lv6zOpVt0cdthWJCuccRraBhSE1oN1l2YAMPQhloD6ajn4s5Kmy-yrTdrJXZ8VNh8y_AGrnK2lZr9qjLACICSHE5e2sXCDQfFbD1h54xPwM3P1o-13vyH69x3UBh_z_LOOMytKCHaPdaIGcpZ9vle6okQpucMHYlMydFcTZfiNtJA_3LBmVEDodGykQ3fDdRcibQ8xJbljIM3ZOOI" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-label-sm text-[11px] text-secondary font-bold uppercase mb-1">Analysis</span>
                  <h3 className="font-headline-md text-[18px] leading-tight text-primary hover:underline cursor-pointer">The Silent Revolution: How AI is Reshaping Middle-Management</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-secondary-container text-[10px] font-label-bold uppercase text-on-secondary-container">Live</span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed text-[10px] font-bold">JW</div>
                <span className="font-body-md text-body-md text-on-surface">Julian Webb</span>
              </div>
              <div className="col-span-2 text-right space-y-1">
                <div className="flex items-center justify-end gap-1 font-label-bold text-label-bold text-primary">
                  <span className="material-symbols-outlined text-[14px]">visibility</span> 840K
                </div>
                <div className="flex items-center justify-end gap-1 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">chat_bubble</span> 1,028
                </div>
              </div>
              <div className="col-span-2 text-right">
                <div className="font-label-bold text-label-bold text-primary">Yesterday</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">04:45 PM</div>
              </div>
              <div className="col-span-1 flex justify-end">
                <button className="p-2 hover:bg-surface-container-high transition-all rounded-full cursor-pointer">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-outline-variant hover:bg-surface-container-low/80 transition-colors items-center">
              <div className="col-span-5 flex gap-4">
                <div className="w-24 h-16 shrink-0 bg-surface-container-high overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Urban Landscape" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC27IrwED8aHO5mU0eCaTm1iseYfpVrA9_Ps3kyHW1souoISDWIDEcTO-G5w5RUUQPHjNJNiQqSK2QyGNL4C5SNJCYYs-pRhXyLqYbTF7bqer-SWEdqBKC4f2oUeoccGyK4kV2gNxAq7HBSmncTBGU6akAXIgcqzY29Ay0AfHwRGvFzCPIOZoFVnaIdkcRp7SXrx9PvASkQSeaVYWszdwxEZ_t1UksyBmXPJ1KOOE3DM8_nHFU50AA" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-label-sm text-[11px] text-secondary font-bold uppercase mb-1">Politics</span>
                  <h3 className="font-headline-md text-[18px] leading-tight text-primary hover:underline cursor-pointer">Constitutional Crisis: Navigating the Legislative Gridlock</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-surface-container-high text-[10px] font-label-bold uppercase text-on-surface-variant">Editorial</span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed text-[10px] font-bold">SM</div>
                <span className="font-body-md text-body-md text-on-surface">Sarah Mendez</span>
              </div>
              <div className="col-span-2 text-right space-y-1">
                <div className="flex items-center justify-end gap-1 font-label-bold text-label-bold text-primary">
                  <span className="material-symbols-outlined text-[14px]">visibility</span> 2.4M
                </div>
                <div className="flex items-center justify-end gap-1 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">chat_bubble</span> 3,190
                </div>
              </div>
              <div className="col-span-2 text-right">
                <div className="font-label-bold text-label-bold text-primary">Oct 20, 2023</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">11:02 AM</div>
              </div>
              <div className="col-span-1 flex justify-end">
                <button className="p-2 hover:bg-surface-container-high transition-all rounded-full cursor-pointer">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-outline-variant hover:bg-surface-container-low/80 transition-colors items-center">
              <div className="col-span-5 flex gap-4">
                <div className="w-24 h-16 shrink-0 bg-surface-container-high overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Printing Press" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1gRXZ2NGosj9jqdPum3qEA0C0kQPje8T_EZPqBK4VFB-E165U4SX3ZCjqeDGgguyjXbT0jcktOPAUnjnEPHJF1fG9a_0MU0xUU-VUAcQbC1uH4Lf1LNN0Y2kbpEmGbUezeypz5_dwPAH3hfc5UkpEc_UPlgoR4FuHzsLEYr3DOyle5MVjcv_2HJ_bOFiylFsxJDIMZmMsemXaoAIwdwBJlw6PTIHQzYzLTvh5BE9chtWsdsq3Q1c" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-label-sm text-[11px] text-secondary font-bold uppercase mb-1">Opinion</span>
                  <h3 className="font-headline-md text-[18px] leading-tight text-primary hover:underline cursor-pointer">The Death of Local News: A Direct Threat to Democracy?</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-surface-container-high text-[10px] font-label-bold uppercase text-on-surface-variant">Featured</span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-[10px] font-bold">MT</div>
                <span className="font-body-md text-body-md text-on-surface">Marcus Thorne</span>
              </div>
              <div className="col-span-2 text-right space-y-1">
                <div className="flex items-center justify-end gap-1 font-label-bold text-label-bold text-primary">
                  <span className="material-symbols-outlined text-[14px]">visibility</span> 65K
                </div>
                <div className="flex items-center justify-end gap-1 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">chat_bubble</span> 88
                </div>
              </div>
              <div className="col-span-2 text-right">
                <div className="font-label-bold text-label-bold text-primary">Oct 18, 2023</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">08:30 AM</div>
              </div>
              <div className="col-span-1 flex justify-end">
                <button className="p-2 hover:bg-surface-container-high transition-all rounded-full cursor-pointer">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>

            {/* Row 5 (Draft) */}
            <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-outline-variant hover:bg-surface-container-low/80 transition-colors items-center bg-surface">
              <div className="col-span-5 flex gap-4 opacity-75">
                <div className="w-24 h-16 shrink-0 bg-surface-container-high border border-dashed border-outline flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline">image</span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-label-sm text-[11px] text-on-surface-variant font-bold uppercase mb-1">World</span>
                  <h3 className="font-headline-md text-[18px] leading-tight text-primary">UNTITLED: Regional Summit Expectations...</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-outline-variant text-[10px] font-label-bold uppercase text-on-surface-variant">Draft</span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant text-[10px] font-bold">?</div>
                <span className="font-body-md text-body-md text-on-surface-variant italic">Unassigned</span>
              </div>
              <div className="col-span-2 text-right space-y-1">
                <div className="font-label-bold text-label-bold text-outline">N/A</div>
              </div>
              <div className="col-span-2 text-right">
                <div className="font-label-bold text-label-bold text-primary">Just now</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">Draft saved</div>
              </div>
              <div className="col-span-1 flex justify-end">
                <button className="p-2 hover:bg-surface-container-high transition-all rounded-full cursor-pointer">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            </div>

          </div>

          {/* Footer / Pagination */}
          <div className="h-14 px-6 bg-surface-container-low flex items-center justify-between border-t border-outline-variant shrink-0">
            <div className="font-label-sm text-label-sm text-on-surface-variant">
              Showing <span className="font-bold text-primary">1 - 25</span> of 2,841 articles
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
