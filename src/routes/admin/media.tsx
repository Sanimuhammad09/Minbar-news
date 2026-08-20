import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { getMediaAssets, addMediaAsset, deleteMediaAsset } from '../../server/media'

export const Route = createFileRoute('/admin/media')({
  component: MediaLibrary,
  loader: async () => await getMediaAssets()
})

function MediaLibrary() {
  const initialMedia = Route.useLoaderData()
  const [media, setMedia] = useState(initialMedia)
  const [panelOpen, setPanelOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)
  
  const addMediaFn = useServerFn(addMediaAsset)
  const deleteMediaFn = useServerFn(deleteMediaAsset)

  const handleMockUpload = async () => {
    setIsUploading(true)
    try {
      const newAsset = await addMediaFn({ data: {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDppgLg9h6i1rm3KEfTWh5wxJkSa6qG6g_aeuN8P0W1MC21XPjsV4RorMyQsoObziDOpnhhrM9V6HtqHlr20ZOHaf34UWbp0-TB5Rkk3cWKSeWz-JryhbS2M2OqmBtr7xNMj_zjxG2FxEU-F_kWF6F_N1Msy3E7WvFuNXzOLcX9izmz8dj7hd0rHv21z05d09Yx8oJm9unPvt1LujLCaaJL9AwLGgJWUDPBHzt65pjpj0MnKDrQFfU',
        name: `new-upload-${Date.now()}.jpg`,
        type: 'image/jpeg',
        size: '1.2 MB'
      }})
      setMedia([...media, newAsset])
    } catch (e) {
      alert('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this asset?')) {
      await deleteMediaFn({ data: { id } })
      setMedia(media.filter((m: any) => m.id !== id))
      setPanelOpen(false)
    }
  }

  const openPanel = (asset: any) => {
    setSelectedAsset(asset)
    setPanelOpen(true)
  }

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
              <span className="bg-surface-container-high text-primary px-3 py-1 font-label-bold text-label-bold">Total: {media.length}</span>
              <span className="bg-secondary text-on-primary px-3 py-1 font-label-bold text-label-bold">Urgent Licensing: 0</span>
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
          
          {media.map((asset: any) => (
            <div 
              key={asset.id}
              className="group bg-white border border-outline-variant flex flex-col transition-all hover:shadow-md cursor-pointer"
              onClick={() => openPanel(asset)}
            >
              <div className="relative aspect-video overflow-hidden bg-surface-container-low border-b border-outline-variant">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={asset.name} src={asset.url} />
                <div className="absolute top-2 left-2 bg-primary text-on-primary px-2 py-0.5 text-[10px] font-label-bold uppercase">Public</div>
              </div>
              <div className="p-stack-md flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-label-bold text-label-bold text-primary truncate max-w-[70%]">{asset.name}</h3>
                  <span className="font-label-sm text-[10px] text-on-surface-variant shrink-0">{asset.size}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-stack-md">
                  <div className="text-[11px]">
                    <p className="text-outline uppercase font-label-sm">Uploaded</p>
                    <p className="font-bold">{new Date(asset.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-[11px]">
                    <p className="text-outline uppercase font-label-sm">Type</p>
                    <p className="font-bold">{asset.type}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Drop Zone for New Assets */}
          <div onClick={handleMockUpload} className={`border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-grid-margin bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer group h-full min-h-[250px] ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
            <span className="material-symbols-outlined text-[48px] text-outline mb-stack-sm group-hover:text-primary group-hover:scale-110 transition-all">{isUploading ? 'sync' : 'add_photo_alternate'}</span>
            <p className="font-label-bold text-label-bold text-outline group-hover:text-primary">{isUploading ? 'Uploading...' : 'Click to Mock Upload'}</p>
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
          {selectedAsset && (
            <>
              <div className="aspect-video bg-surface-container-low border border-outline-variant overflow-hidden">
                <img className="w-full h-full object-contain" alt="Asset Preview" src={selectedAsset.url} />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="font-label-bold text-label-bold text-outline block mb-1">FILENAME</label>
                  <input className="w-full border-outline-variant focus:border-primary focus:ring-0 rounded-none font-bold outline-none border p-2" type="text" defaultValue={selectedAsset.name} />
                </div>
                <div>
                  <label className="font-label-bold text-label-bold text-outline block mb-1">ALT TEXT (SEO & ACCESSIBILITY)</label>
                  <textarea className="w-full h-24 border-outline-variant focus:border-primary focus:ring-0 rounded-none text-sm outline-none border p-2" defaultValue=""></textarea>
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
            <button onClick={() => handleDelete(selectedAsset?.id)} className="w-full text-secondary font-label-bold py-3 flex items-center justify-center gap-2 hover:bg-secondary-fixed transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">delete</span> Delete Permanently
            </button>
          </div>
          </>
          )}
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
