import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/new-article')({
  component: NewArticleEditor,
})

function NewArticleEditor() {
  const [showModal, setShowModal] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-surface-bright">
      {/* TopAppBar */}
      <header className="bg-surface sticky top-0 w-full h-16 border-b border-outline-variant flex justify-between items-center px-grid-margin z-40 shrink-0">
        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex items-center space-x-6">
            <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-all" href="#">Global</a>
            <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-all" href="#">Politics</a>
            <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-all" href="#">Economy</a>
            <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-all" href="#">Culture</a>
          </nav>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/30">
            <span className="material-symbols-outlined text-outline mr-2">search</span>
            <input className="bg-transparent border-none outline-none text-label-sm font-label-sm w-48 focus:ring-0" placeholder="Search archive..." type="text"/>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-secondary text-on-secondary px-4 py-2 rounded font-label-bold text-label-bold uppercase tracking-wider text-xs">Breaking</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-secondary transition-all opacity-80 active:opacity-100 cursor-pointer">notifications</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-secondary transition-all opacity-80 active:opacity-100 cursor-pointer">settings</button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
              <img className="w-full h-full object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9wlEdP89ad_uyLBgAVF26VlRLfYC26lbpg7ebki0PYnqsouSZJxIfX3a_pk_dHrWHCSi1ni6quFQCbVXEfSEj1hCup7Z1vFuZVMW1CgnB2A8WqERY7bypOu_iN_juT1DZTQD7VznvzIBA3sVXgyBdxeEnk-NN_wWQo207EQrB0i0CNGGyQduQbO2zweKlOMkXlDJgbLTAvEUA3ooZofC7QzKfPQb_7OEhJnVHnub6Z78heifycZI"/>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <div 
        className="flex-1 overflow-y-auto bg-surface-bright"
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 50)}
      >
        <div className="max-w-[1400px] mx-auto p-grid-margin grid grid-cols-12 gap-gutter relative">
          
          {/* Floating Navigation Ticker / Breadcrumb */}
          <div className="col-span-12 mb-stack-md flex items-center justify-between">
            <div className="flex items-center space-x-2 text-on-surface-variant">
              <span className="font-label-bold text-label-bold uppercase text-[10px] tracking-tighter opacity-50">Drafting New Article</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="font-label-bold text-label-bold text-secondary">Editorial Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-6 py-2 border border-primary text-primary font-label-bold text-label-bold rounded hover:bg-primary hover:text-white transition-all cursor-pointer">Save Draft</button>
              <button onClick={() => setShowModal(true)} className="px-6 py-2 bg-primary text-on-primary font-label-bold text-label-bold rounded shadow-md hover:bg-primary-container transition-all cursor-pointer">Publish Now</button>
            </div>
          </div>

          {/* Left Column: Writing Area */}
          <div className="col-span-12 lg:col-span-8 bg-white border border-outline-variant p-stack-lg shadow-sm">
            {/* Headline */}
            <textarea className="w-full font-display-lg text-display-lg border-none resize-none placeholder-outline-variant text-primary mb-stack-md focus:ring-0 leading-tight outline-none" placeholder="Enter headline..." rows={2}></textarea>
            
            <div className="h-px bg-outline-variant/30 w-full mb-stack-lg"></div>
            
            {/* Editor Toolbar */}
            <div className={`flex items-center space-x-2 mb-stack-md bg-surface-container-lowest p-2 border rounded sticky top-0 z-10 transition-all ${isScrolled ? 'shadow-md border-primary/20' : 'border-outline-variant/20'}`}>
              <button className="p-2 hover:bg-surface-container rounded transition-colors cursor-pointer" title="Header 1"><span className="font-bold text-lg">H1</span></button>
              <button className="p-2 hover:bg-surface-container rounded transition-colors cursor-pointer" title="Header 2"><span className="font-bold text-base">H2</span></button>
              <div className="w-px h-6 bg-outline-variant mx-2"></div>
              <button className="material-symbols-outlined p-2 hover:bg-surface-container rounded transition-colors cursor-pointer">format_bold</button>
              <button className="material-symbols-outlined p-2 hover:bg-surface-container rounded transition-colors cursor-pointer">format_italic</button>
              <button className="material-symbols-outlined p-2 hover:bg-surface-container rounded transition-colors cursor-pointer">link</button>
              <button className="material-symbols-outlined p-2 hover:bg-surface-container rounded transition-colors cursor-pointer">format_quote</button>
              <div className="w-px h-6 bg-outline-variant mx-2"></div>
              <button className="material-symbols-outlined p-2 hover:bg-surface-container rounded transition-colors cursor-pointer">format_list_bulleted</button>
              <button className="material-symbols-outlined p-2 hover:bg-surface-container rounded transition-colors cursor-pointer">format_list_numbered</button>
              <div className="w-px h-6 bg-outline-variant mx-2"></div>
              <button className="material-symbols-outlined p-2 hover:bg-surface-container rounded transition-colors cursor-pointer">image</button>
              <button className="material-symbols-outlined p-2 hover:bg-surface-container rounded transition-colors cursor-pointer">code</button>
            </div>
            
            {/* Content Area */}
            <div className="min-h-[600px] font-body-lg text-body-lg text-on-surface-variant leading-relaxed outline-none" contentEditable={true} suppressContentEditableWarning={true}>
              Start writing your analysis here...
            </div>
          </div>

          {/* Right Column: Sidebar Metadata */}
          <div className="col-span-12 lg:col-span-4 space-y-gutter">
            {/* Category & Ticker */}
            <section className="bg-white border border-outline-variant p-stack-md shadow-sm">
              <h3 className="font-label-bold text-label-bold text-primary mb-4 border-b border-secondary pb-1 inline-block">Section &amp; Visibility</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-label-bold text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Primary Category</label>
                  <select className="w-full border-outline-variant text-label-bold text-on-surface focus:border-primary focus:ring-0 rounded-none cursor-pointer">
                    <option>World News</option>
                    <option>Politics</option>
                    <option>Economy</option>
                    <option>Science &amp; Tech</option>
                    <option>Culture</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/5 border border-secondary/20 rounded">
                  <div className="flex flex-col">
                    <span className="font-label-bold text-label-bold text-secondary">Breaking Ticker</span>
                    <span className="text-xs text-on-surface-variant">Promote to global alert bar</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox"/>
                    <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
              </div>
            </section>
            
            {/* Featured Image */}
            <section className="bg-white border border-outline-variant p-stack-md shadow-sm">
              <h3 className="font-label-bold text-label-bold text-primary mb-4 border-b border-secondary pb-1 inline-block">Featured Image</h3>
              <div className="aspect-video w-full border-2 border-dashed border-outline-variant bg-surface-container-low flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors group">
                <div className="w-full h-full relative hidden group-[.has-image]:block">
                  {/* Image container placeholder */}
                </div>
                <div className="flex flex-col items-center p-6 text-center">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">add_photo_alternate</span>
                  <span className="font-label-bold text-label-bold text-on-surface-variant">Click to upload hero image</span>
                  <span className="text-xs text-outline mt-1">Recommended: 1600x900px (16:9)</span>
                </div>
              </div>
              <div className="mt-4">
                <input className="w-full text-label-sm font-label-sm border-none bg-surface-container-lowest focus:ring-1 focus:ring-primary rounded p-2 outline-none" placeholder="Image credit / caption..." type="text"/>
              </div>
            </section>
            
            {/* SEO & Meta */}
            <section className="bg-white border border-outline-variant p-stack-md shadow-sm">
              <h3 className="font-label-bold text-label-bold text-primary mb-4 border-b border-secondary pb-1 inline-block">SEO &amp; Search</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-label-bold text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">URL Slug</label>
                  <div className="flex border border-outline-variant focus-within:border-primary">
                    <span className="bg-surface-container px-2 py-2 text-xs text-outline border-r border-outline-variant">minbarnews.com/</span>
                    <input className="w-full border-none text-label-sm focus:ring-0 p-2 outline-none" placeholder="article-title-here" type="text"/>
                  </div>
                </div>
                <div>
                  <label className="block font-label-bold text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Meta Description</label>
                  <textarea className="w-full border-outline-variant text-label-sm focus:border-primary focus:ring-0 rounded-none p-2 resize-none outline-none" placeholder="Brief summary for search results..." rows={3}></textarea>
                </div>
                <div>
                  <label className="block font-label-bold text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2" id="tag-container">
                    <span className="px-2 py-1 bg-surface-container-high text-[10px] font-label-bold text-primary flex items-center">
                      GEOPOLITICS <span className="material-symbols-outlined text-xs ml-1 cursor-pointer">close</span>
                    </span>
                  </div>
                  <input className="w-full border-outline-variant text-label-sm focus:border-primary focus:ring-0 rounded-none p-2 outline-none" placeholder="Press enter to add tags..." type="text"/>
                </div>
              </div>
            </section>
            
            {/* Scheduling */}
            <section className="bg-white border border-outline-variant p-stack-md shadow-sm">
              <h3 className="font-label-bold text-label-bold text-primary mb-4 border-b border-secondary pb-1 inline-block">Publishing Schedule</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input defaultChecked className="text-primary focus:ring-primary h-4 w-4 cursor-pointer" id="immediate" name="publish-time" type="radio"/>
                  <label className="ml-2 font-label-bold text-label-bold text-on-surface cursor-pointer" htmlFor="immediate">Publish Immediately</label>
                </div>
                <div className="flex items-center">
                  <input className="text-primary focus:ring-primary h-4 w-4 cursor-pointer" id="scheduled" name="publish-time" type="radio"/>
                  <label className="ml-2 font-label-bold text-label-bold text-on-surface cursor-pointer" htmlFor="scheduled">Schedule Publication</label>
                </div>
                <div className="mt-2 pl-6">
                  <input className="w-full border-outline-variant text-label-sm p-2 bg-surface-container-low text-outline focus:border-primary focus:ring-0 outline-none cursor-pointer" type="datetime-local"/>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-[100] flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white p-stack-lg max-w-md w-full text-center shadow-2xl transition-transform duration-300 scale-100">
            <span className="material-symbols-outlined text-secondary text-6xl mb-4">check_circle</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Article Published</h2>
            <p className="text-on-surface-variant font-body-md mb-stack-lg">"The shifting landscape of global trade routes" has been successfully published to Minbar News.</p>
            <div className="flex space-x-4">
              <button className="flex-grow py-3 border border-primary text-primary font-label-bold text-label-bold hover:bg-surface-container transition-colors cursor-pointer" onClick={() => setShowModal(false)}>Go to Library</button>
              <button className="flex-grow py-3 bg-primary text-on-primary font-label-bold text-label-bold hover:bg-primary-container transition-colors shadow-lg cursor-pointer" onClick={() => setShowModal(false)}>View Live</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
