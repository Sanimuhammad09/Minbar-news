import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { getSettings, updateSettings } from '../../server/settings'

export const Route = createFileRoute('/admin/settings')({
  component: SiteSettings,
  loader: async () => await getSettings()
})

type TabType = 'identity' | 'seo' | 'nav' | 'api'

function SiteSettings() {
  const [activeTab, setActiveTab] = useState<TabType>('identity')
  const initialSettings = Route.useLoaderData()
  const [settings, setSettings] = useState(() => ({
    ...initialSettings,
    navigation: initialSettings.navigation || [],
    integrations: initialSettings.integrations || []
  }))
  const updateSettingsFn = useServerFn(updateSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [editingNavId, setEditingNavId] = useState<string | null>(null)
  const [editNavLabel, setEditNavLabel] = useState('')
  const [editNavUrl, setEditNavUrl] = useState('')
  const [imagePrompt, setImagePrompt] = useState<{ isOpen: boolean, key: 'logoUrl' | 'faviconUrl' | 'socialImageUrl' | null, url: string }>({ isOpen: false, key: null, url: '' })
  
  const [editingIntegrationId, setEditingIntegrationId] = useState<string | null>(null)
  const [editIntegrationKey, setEditIntegrationKey] = useState('')
  const [integrationPrompt, setIntegrationPrompt] = useState<{ isOpen: boolean, name: string }>({ isOpen: false, name: '' })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateSettingsFn({ data: settings })
      alert('Settings saved successfully!')
    } catch (e) {
      alert('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDiscard = () => {
    setSettings({
      ...initialSettings,
      navigation: initialSettings.navigation || [],
      integrations: initialSettings.integrations || []
    })
    setEditingNavId(null)
    setEditingIntegrationId(null)
  }

  const handleAddNav = () => {
    const newId = Date.now().toString()
    setSettings({
      ...settings,
      navigation: [...settings.navigation, { id: newId, label: 'New Link', url: '/' }]
    })
    setEditingNavId(newId)
    setEditNavLabel('New Link')
    setEditNavUrl('/')
  }

  const handleEditNav = (nav: any) => {
    setEditingNavId(nav.id)
    setEditNavLabel(nav.label)
    setEditNavUrl(nav.url)
  }

  const handleSaveNav = (id: string) => {
    setSettings({
      ...settings,
      navigation: settings.navigation.map((nav: any) => 
        nav.id === id ? { ...nav, label: editNavLabel, url: editNavUrl } : nav
      )
    })
    setEditingNavId(null)
  }

  const handleDeleteNav = (id: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      setSettings({
        ...settings,
        navigation: settings.navigation.filter((nav: any) => nav.id !== id)
      })
      if (editingNavId === id) setEditingNavId(null)
    }
  }

  const handleMoveNav = (index: number, direction: 'up' | 'down') => {
    const newNav = [...settings.navigation]
    if (direction === 'up' && index > 0) {
      [newNav[index - 1], newNav[index]] = [newNav[index], newNav[index - 1]]
    } else if (direction === 'down' && index < newNav.length - 1) {
      [newNav[index + 1], newNav[index]] = [newNav[index], newNav[index + 1]]
    }
    setSettings({ ...settings, navigation: newNav })
  }

  const handleImageUpdate = (key: 'logoUrl' | 'faviconUrl' | 'socialImageUrl') => {
    setImagePrompt({ isOpen: true, key, url: settings[key] || '' })
  }

  const handleSaveImagePrompt = () => {
    if (imagePrompt.key) {
      setSettings({ ...settings, [imagePrompt.key]: imagePrompt.url })
    }
    setImagePrompt({ isOpen: false, key: null, url: '' })
  }

  const handleAddIntegrationClick = () => {
    setIntegrationPrompt({ isOpen: true, name: '' })
  }

  const handleSaveIntegrationPrompt = () => {
    if (integrationPrompt.name.trim() === '') return
    const newId = Date.now().toString()
    setSettings({
      ...settings,
      integrations: [
        ...settings.integrations,
        {
          id: newId,
          name: integrationPrompt.name,
          iconType: 'text',
          icon: integrationPrompt.name.charAt(0).toUpperCase(),
          status: 'Pending Configuration',
          key: ''
        }
      ]
    })
    setIntegrationPrompt({ isOpen: false, name: '' })
    setEditingIntegrationId(newId)
    setEditIntegrationKey('')
  }

  const handleEditIntegration = (integration: any) => {
    setEditingIntegrationId(integration.id)
    setEditIntegrationKey(integration.key)
  }

  const handleSaveIntegration = (id: string) => {
    setSettings({
      ...settings,
      integrations: settings.integrations.map((intg: any) =>
        intg.id === id ? { ...intg, key: editIntegrationKey } : intg
      )
    })
    setEditingIntegrationId(null)
  }

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
            <button onClick={handleDiscard} className="px-6 py-2 border-2 border-primary text-primary font-label-bold text-label-bold hover:bg-surface-container-low transition-all cursor-pointer">
              Discard Changes
            </button>
            <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-secondary text-on-primary font-label-bold text-label-bold hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50">
              <span className="material-symbols-outlined text-[18px]">save</span>
              {isSaving ? 'Saving...' : 'Save All Changes'}
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
                    <div className="flex items-center gap-stack-md border-2 border-dashed border-outline-variant p-stack-lg hover:bg-surface-container-low transition-all cursor-pointer" onClick={() => handleImageUpdate('logoUrl')}>
                      <div className="w-24 h-24 bg-primary flex items-center justify-center overflow-hidden">
                        {settings.logoUrl ? (
                          <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-contain bg-white" />
                        ) : (
                          <span className="text-on-primary font-display-lg text-[24px]">M</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-label-bold text-label-bold">{settings.logoUrl ? 'Custom Logo Applied' : 'minbar_logo_main.svg'}</p>
                        <p className="text-label-sm text-on-surface-variant">Recommended: SVG or 400x120 PNG</p>
                      </div>
                      <button className="text-secondary font-label-bold text-label-bold cursor-pointer">Replace</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-stack-md">
                    <div>
                      <label className="block font-label-bold text-label-bold text-primary mb-2">Favicon (32x32)</label>
                      <div className="border border-outline-variant p-4 flex items-center justify-between">
                        <div className="w-8 h-8 bg-primary rounded-sm overflow-hidden flex items-center justify-center">
                          {settings.faviconUrl && <img src={settings.faviconUrl} alt="Favicon" className="w-full h-full object-cover bg-white" />}
                        </div>
                        <button onClick={() => handleImageUpdate('faviconUrl')} className="text-[#7686ab] font-label-sm cursor-pointer hover:underline">Change</button>
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-bold text-label-bold text-primary mb-2">Social Sharing Image</label>
                      <div className="border border-outline-variant p-4 flex items-center justify-between">
                        <div className="w-12 h-8 bg-surface-variant overflow-hidden flex items-center justify-center">
                          {settings.socialImageUrl && <img src={settings.socialImageUrl} alt="Social" className="w-full h-full object-cover" />}
                        </div>
                        <button onClick={() => handleImageUpdate('socialImageUrl')} className="text-[#7686ab] font-label-sm cursor-pointer hover:underline">Change</button>
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
                    <select 
                      className="w-full border border-outline-variant p-3 font-body-md focus:border-primary focus:ring-0 outline-none"
                      value={settings.primaryFont}
                      onChange={e => setSettings({...settings, primaryFont: e.target.value})}
                    >
                      <option value="Source Serif 4">Source Serif 4 (Current)</option>
                      <option value="IBM Plex Sans">IBM Plex Sans</option>
                      <option value="System Sans-Serif">System Sans-Serif</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-primary mb-2">Copyright Disclaimer</label>
                    <textarea 
                      className="w-full border border-outline-variant p-3 font-body-md focus:border-primary focus:ring-0 outline-none" 
                      rows={3} 
                      value={settings.disclaimer}
                      onChange={e => setSettings({...settings, disclaimer: e.target.value})}
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
                    <input 
                      className="w-full border border-outline-variant p-3 font-body-md focus:border-primary focus:ring-0 outline-none" 
                      type="text" 
                      value={settings.seoTitle}
                      onChange={e => setSettings({...settings, seoTitle: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block font-label-bold text-label-bold text-primary mb-1">Meta Description</label>
                    <textarea 
                      className="w-full border border-outline-variant p-3 font-body-md focus:border-primary focus:ring-0 outline-none" 
                      rows={3}
                      value={settings.seoDescription}
                      onChange={e => setSettings({...settings, seoDescription: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input 
                      checked={settings.googleNewsIndexing !== false} 
                      onChange={e => setSettings({...settings, googleNewsIndexing: e.target.checked})}
                      className="text-primary border-outline-variant focus:ring-primary h-5 w-5" 
                      type="checkbox" 
                    />
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
                
                {settings.navigation.map((nav: any, index: number) => (
                  <div key={nav.id} className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                    {editingNavId === nav.id ? (
                      <div className="flex-1 flex gap-2 mr-4">
                        <input 
                          type="text" 
                          className="flex-1 border border-outline-variant p-2 font-label-bold text-label-bold focus:border-primary focus:ring-0 outline-none" 
                          value={editNavLabel}
                          onChange={(e) => setEditNavLabel(e.target.value)}
                          placeholder="Label (e.g. World)"
                        />
                        <input 
                          type="text" 
                          className="flex-1 border border-outline-variant p-2 font-body-sm text-body-sm text-on-surface-variant focus:border-primary focus:ring-0 outline-none" 
                          value={editNavUrl}
                          onChange={(e) => setEditNavUrl(e.target.value)}
                          placeholder="URL (e.g. /category/world)"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <span className="font-label-bold text-label-bold">{nav.label}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">{nav.url}</span>
                      </div>
                    )}
                    
                    <div className="flex gap-4 items-center shrink-0">
                      {editingNavId === nav.id ? (
                        <>
                          <button onClick={() => handleSaveNav(nav.id)} className="text-primary font-label-bold text-label-bold hover:underline cursor-pointer">Save</button>
                          <button onClick={() => setEditingNavId(null)} className="text-[#7686ab] font-label-bold text-label-bold hover:underline cursor-pointer">Cancel</button>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col border-r border-outline-variant pr-4 mr-2">
                            <button onClick={() => handleMoveNav(index, 'up')} disabled={index === 0} className="text-outline hover:text-primary disabled:opacity-30 cursor-pointer h-5 flex items-center"><span className="material-symbols-outlined text-[18px]">keyboard_arrow_up</span></button>
                            <button onClick={() => handleMoveNav(index, 'down')} disabled={index === settings.navigation.length - 1} className="text-outline hover:text-primary disabled:opacity-30 cursor-pointer h-5 flex items-center"><span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span></button>
                          </div>
                          <button onClick={() => handleEditNav(nav)} className="text-[#7686ab] material-symbols-outlined hover:text-primary transition-colors cursor-pointer" title="Edit">edit</button>
                          <button onClick={() => handleDeleteNav(nav.id)} className="text-secondary material-symbols-outlined hover:opacity-80 transition-opacity cursor-pointer" title="Delete">delete</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                
                {settings.navigation.length === 0 && (
                  <div className="p-8 text-center text-on-surface-variant font-label-sm">
                    No navigation links defined. Add one below.
                  </div>
                )}
                
                <button onClick={handleAddNav} className="w-full p-4 text-center text-primary font-label-bold text-label-bold bg-surface-container-low border-t border-outline-variant hover:bg-surface-container-high transition-colors cursor-pointer">
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
                
                {settings.integrations.map((integration: any) => (
                  <div key={integration.id} className="bg-white p-6 border border-outline-variant flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {integration.iconType === 'text' ? (
                          <div className="w-12 h-12 bg-secondary-container flex items-center justify-center text-on-secondary-container font-black text-xl italic">{integration.icon}</div>
                        ) : (
                          <div className="w-12 h-12 bg-primary flex items-center justify-center text-on-primary material-symbols-outlined">{integration.icon}</div>
                        )}
                        <div>
                          <h4 className="font-label-bold text-label-bold">{integration.name}</h4>
                          <p className="text-label-sm text-[#7c879c]">Status: {integration.status} ({integration.key})</p>
                        </div>
                      </div>
                      {editingIntegrationId === integration.id ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleSaveIntegration(integration.id)} className="px-4 py-2 bg-primary text-on-primary font-label-bold rounded hover:brightness-110 cursor-pointer">Save</button>
                          <button onClick={() => setEditingIntegrationId(null)} className="px-4 py-2 border border-outline hover:bg-surface-container-low rounded cursor-pointer">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => handleEditIntegration(integration)} className="px-4 py-2 border border-outline text-label-bold font-label-bold hover:bg-surface-container-low transition-colors cursor-pointer">Settings</button>
                      )}
                    </div>
                    {editingIntegrationId === integration.id && (
                      <div className="mt-2 pt-4 border-t border-outline-variant animate-in slide-in-from-top-2">
                        <label className="block font-label-bold text-label-bold text-primary mb-1">API Key / Tracking ID</label>
                        <input 
                          type="text" 
                          className="w-full border border-outline-variant p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded"
                          value={editIntegrationKey}
                          onChange={(e) => setEditIntegrationKey(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ))}
                
                {settings.integrations.length === 0 && (
                  <div className="p-8 text-center text-on-surface-variant bg-white border border-outline-variant">
                    No active integrations.
                  </div>
                )}
                
                <div className="bg-surface-container-low p-6 border-2 border-dashed border-outline-variant flex items-center justify-center">
                  <button onClick={handleAddIntegrationClick} className="flex items-center gap-2 text-primary font-label-bold text-label-bold hover:opacity-80 transition-opacity cursor-pointer">
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

      {/* Custom Image Prompt Modal */}
      {imagePrompt.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-md border border-outline-variant rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-lowest">
              <h3 className="font-headline-md text-headline-md text-primary">Update Image URL</h3>
              <p className="text-label-sm text-on-surface-variant mt-1">Paste a direct link to your media asset.</p>
            </div>
            <div className="p-6">
              <label className="block font-label-bold text-label-bold text-primary mb-2">Image URL</label>
              <input 
                autoFocus
                className="w-full border border-outline-variant p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded bg-surface-container-lowest" 
                type="url" 
                placeholder="https://example.com/image.png"
                value={imagePrompt.url}
                onChange={(e) => setImagePrompt({ ...imagePrompt, url: e.target.value })}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveImagePrompt() }}
              />
              {imagePrompt.url && (
                <div className="mt-4 border border-outline-variant rounded p-2 bg-surface-container-lowest flex justify-center">
                  <img src={imagePrompt.url} alt="Preview" className="max-h-32 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} onLoad={(e) => (e.currentTarget.style.display = 'block')} />
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-surface-container-low flex justify-end gap-3 border-t border-outline-variant">
              <button onClick={() => setImagePrompt({ isOpen: false, key: null, url: '' })} className="px-4 py-2 text-on-surface-variant font-label-bold text-label-bold hover:bg-surface-container-high rounded transition-colors cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSaveImagePrompt} className="px-4 py-2 bg-primary text-on-primary font-label-bold text-label-bold hover:brightness-110 rounded transition-all cursor-pointer">
                Apply Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Integration Prompt Modal */}
      {integrationPrompt.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-md border border-outline-variant rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-lowest">
              <h3 className="font-headline-md text-headline-md text-primary">Connect Integration</h3>
              <p className="text-label-sm text-on-surface-variant mt-1">Add a new third-party service or API.</p>
            </div>
            <div className="p-6">
              <label className="block font-label-bold text-label-bold text-primary mb-2">Integration Name</label>
              <input 
                autoFocus
                className="w-full border border-outline-variant p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded bg-surface-container-lowest" 
                type="text" 
                placeholder="e.g. SendGrid, Stripe, AWS"
                value={integrationPrompt.name}
                onChange={(e) => setIntegrationPrompt({ ...integrationPrompt, name: e.target.value })}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveIntegrationPrompt() }}
              />
            </div>
            <div className="px-6 py-4 bg-surface-container-low flex justify-end gap-3 border-t border-outline-variant">
              <button onClick={() => setIntegrationPrompt({ isOpen: false, name: '' })} className="px-4 py-2 text-on-surface-variant font-label-bold text-label-bold hover:bg-surface-container-high rounded transition-colors cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSaveIntegrationPrompt} className="px-4 py-2 bg-primary text-on-primary font-label-bold text-label-bold hover:brightness-110 rounded transition-all cursor-pointer">
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
