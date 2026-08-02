import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/settings')({
  component: SiteSettings,
})

type TabType = 'identity' | 'seo' | 'nav' | 'api'

function SiteSettings() {
  const [activeTab, setActiveTab] = useState<TabType>('identity')

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-30">
        <div className="flex justify-between items-center w-full px-grid-margin py-4 max-w-7xl mx-auto">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">Site Settings</h2>
            <p className="text-on-surface-variant font-label-sm text-label-sm">Configure global agency standards and technical integrations</p>
          </div>
          <div className="flex items-center gap-stack-md">
            <button className="px-6 py-2 border-2 border-primary text-primary font-label-bold text-label-bold hover:bg-surface-container-low transition-all cursor-pointer">
              Discard Changes
            </button>
            <button className="px-6 py-2 bg-secondary text-on-primary font-label-bold text-label-bold hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save All Changes
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-grid-margin py-stack-lg w-full flex-grow">
        
        {/* Settings Tabs */}
        <div className="flex gap-stack-lg border-b border-outline-variant mb-10 overflow-x-auto">
          <button 
            className={`pb-4 relative font-label-bold text-label-bold whitespace-nowrap transition-colors cursor-pointer ${activeTab === 'identity' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('identity')}
          >
            Brand Identity
          </button>
          <button 
            className={`pb-4 relative font-label-bold text-label-bold whitespace-nowrap transition-colors cursor-pointer ${activeTab === 'seo' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('seo')}
          >
            SEO & Discovery
          </button>
          <button 
            className={`pb-4 relative font-label-bold text-label-bold whitespace-nowrap transition-colors cursor-pointer ${activeTab === 'nav' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('nav')}
          >
            Navigation Management
          </button>
          <button 
            className={`pb-4 relative font-label-bold text-label-bold whitespace-nowrap transition-colors cursor-pointer ${activeTab === 'api' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('api')}
          >
            Integrations & APIs
          </button>
        </div>

        {/* Tab Content: Brand Identity */}
        {activeTab === 'identity' && (
          <section className="space-y-section-gap">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg">
              <div className="md:col-span-4">
                <h3 className="font-headline-md text-headline-md text-primary mb-2">Visual Heritage</h3>
                <p className="text-on-surface-variant font-body-md">Manage the primary logo, favicon, and brand marks that define Minbar News across all platforms.</p>
              </div>
              <div className="md:col-span-8 bg-white p-stack-lg border border-outline-variant">
                <div className="space-y-stack-lg">
                  <div>
                    <label className="block font-label-bold text-label-bold text-primary mb-2">Primary Agency Logo</label>
                    <div className="flex items-center gap-stack-md border-2 border-dashed border-outline-variant p-stack-lg hover:bg-surface-container-low transition-all cursor-pointer">
                      <div className="w-24 h-24 bg-primary flex items-center justify-center">
                        <span className="text-on-primary font-display-lg text-[24px]">M</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-label-bold text-label-bold">minbar_logo_main.svg</p>
                        <p className="text-label-sm text-on-surface-variant">Recommended: SVG or 400x120 PNG</p>
                      </div>
                      <button className="text-secondary font-label-bold text-label-bold cursor-pointer">Replace</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-stack-md">
                    <div>
                      <label className="block font-label-bold text-label-bold text-primary mb-2">Favicon (32x32)</label>
                      <div className="border border-outline-variant p-4 flex items-center justify-between">
                        <div className="w-8 h-8 bg-primary rounded-sm"></div>
                        <button className="text-[#7686ab] font-label-sm cursor-pointer">Change</button>
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-bold text-label-bold text-primary mb-2">Social Sharing Image</label>
                      <div className="border border-outline-variant p-4 flex items-center justify-between">
                        <div className="w-12 h-8 bg-surface-variant"></div>
                        <button className="text-[#7686ab] font-label-sm cursor-pointer">Change</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg">
              <div className="md:col-span-4">
                <h3 className="font-headline-md text-headline-md text-primary mb-2">Typography & Tone</h3>
                <p className="text-on-surface-variant font-body-md">Configure the editorial font pairings and default legal disclaimers.</p>
              </div>
              <div className="md:col-span-8 bg-white p-stack-lg border border-outline-variant">
                <div className="space-y-stack-md">
                  <div>
                    <label className="block font-label-bold text-label-bold text-primary mb-2">Primary Headline Font</label>
                    <select className="w-full border border-outline-variant p-3 font-body-md focus:border-primary focus:ring-0 outline-none">
                      <option>Source Serif 4 (Current)</option>
                      <option>IBM Plex Sans</option>
                      <option>System Sans-Serif</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-primary mb-2">Copyright Disclaimer</label>
                    <textarea 
                      className="w-full border border-outline-variant p-3 font-body-md focus:border-primary focus:ring-0 outline-none" 
                      rows={3} 
                      defaultValue="© 2024 Minbar News Agency. All rights reserved. Global Editorial Standards Applied."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab Content: SEO */}
        {activeTab === 'seo' && (
          <section className="space-y-section-gap">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg">
              <div className="md:col-span-4">
                <h3 className="font-headline-md text-headline-md text-primary mb-2">Metadata Mastery</h3>
                <p className="text-on-surface-variant font-body-md">Optimizing for global news indexers and search engines.</p>
              </div>
              <div className="md:col-span-8 bg-white p-stack-lg border border-outline-variant">
                <div className="space-y-stack-md">
                  <div>
                    <label className="block font-label-bold text-label-bold text-primary mb-1">Global Page Title Suffix</label>
                    <input className="w-full border border-outline-variant p-3 font-body-md focus:border-primary focus:ring-0 outline-none" type="text" defaultValue="| Minbar News Agency"/>
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-primary mb-1">Meta Description</label>
                    <textarea 
                      className="w-full border border-outline-variant p-3 font-body-md focus:border-primary focus:ring-0 outline-none" 
                      rows={3}
                      defaultValue="Leading global news agency providing real-time analysis, breaking reports, and investigative journalism for decision-makers."
                    ></textarea>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input defaultChecked className="text-primary border-outline-variant focus:ring-primary h-5 w-5" type="checkbox" />
                    <span className="font-label-bold text-label-bold">Enable Google News Indexing (XML Sitemap)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab Content: Navigation */}
        {activeTab === 'nav' && (
          <section className="space-y-section-gap">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg">
              <div className="md:col-span-4">
                <h3 className="font-headline-md text-headline-md text-primary mb-2">Primary Menu</h3>
                <p className="text-on-surface-variant font-body-md">Drag and drop to reorder the main categories in the top navigation bar.</p>
              </div>
              <div className="md:col-span-8 bg-white border border-outline-variant divide-y divide-outline-variant">
                
                <div className="p-4 flex items-center justify-between hover:bg-surface-container-low cursor-move">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-outline">drag_indicator</span>
                    <span className="font-label-bold text-label-bold">World</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="text-[#7686ab] material-symbols-outlined cursor-pointer">edit</button>
                    <button className="text-secondary material-symbols-outlined cursor-pointer">delete</button>
                  </div>
                </div>
                
                <div className="p-4 flex items-center justify-between hover:bg-surface-container-low cursor-move">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-outline">drag_indicator</span>
                    <span className="font-label-bold text-label-bold">Politics</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="text-[#7686ab] material-symbols-outlined cursor-pointer">edit</button>
                    <button className="text-secondary material-symbols-outlined cursor-pointer">delete</button>
                  </div>
                </div>
                
                <div className="p-4 flex items-center justify-between hover:bg-surface-container-low cursor-move">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-outline">drag_indicator</span>
                    <span className="font-label-bold text-label-bold">Economy</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="text-[#7686ab] material-symbols-outlined cursor-pointer">edit</button>
                    <button className="text-secondary material-symbols-outlined cursor-pointer">delete</button>
                  </div>
                </div>
                
                <button className="w-full p-4 text-center text-primary font-label-bold text-label-bold bg-surface-container-low border-t border-outline-variant hover:bg-surface-container-high transition-colors cursor-pointer">
                  + Add Navigation Link
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Tab Content: Integrations */}
        {activeTab === 'api' && (
          <section className="space-y-section-gap">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg">
              <div className="md:col-span-4">
                <h3 className="font-headline-md text-headline-md text-primary mb-2">Connected Systems</h3>
                <p className="text-on-surface-variant font-body-md">Connect third-party analytics, social broadcasters, and wire service APIs.</p>
              </div>
              <div className="md:col-span-8 space-y-stack-md">
                
                <div className="bg-white p-6 border border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary-container flex items-center justify-center text-on-secondary-container font-black text-xl italic">G</div>
                    <div>
                      <h4 className="font-label-bold text-label-bold">Google Analytics 4</h4>
                      <p className="text-label-sm text-[#7c879c]">Status: Connected (G-XXXXXXX)</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-outline text-label-bold font-label-bold hover:bg-surface-container-low transition-colors cursor-pointer">Settings</button>
                </div>
                
                <div className="bg-white p-6 border border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center text-on-primary material-symbols-outlined">rss_feed</div>
                    <div>
                      <h4 className="font-label-bold text-label-bold">Reuters Wire API</h4>
                      <p className="text-label-sm text-[#7c879c]">Status: Active Service</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-outline text-label-bold font-label-bold hover:bg-surface-container-low transition-colors cursor-pointer">Settings</button>
                </div>
                
                <div className="bg-surface-container-low p-6 border-2 border-dashed border-outline-variant flex items-center justify-center">
                  <button className="flex items-center gap-2 text-primary font-label-bold text-label-bold hover:opacity-80 transition-opacity cursor-pointer">
                    <span className="material-symbols-outlined">add_circle</span>
                    Connect New Integration
                  </button>
                </div>
                
              </div>
            </div>
          </section>
        )}

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
    </div>
  )
}
