import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Topbar for Admin */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-surface-container-low dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700 flex items-center justify-between px-4 z-40 transition-colors">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Minbar News Logo" className="h-8 w-auto object-contain rounded" />
          <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-white tracking-tighter">MINBAR</h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="material-symbols-outlined text-primary dark:text-white text-3xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'close' : 'menu'}
          </span>
        </div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:sticky top-0 left-0 h-screen w-64 bg-surface-container-low dark:bg-slate-900 border-r border-outline-variant dark:border-slate-700 flex flex-col py-stack-lg z-50 transition-transform duration-300 md:pt-stack-lg pt-20`}>
        <div className="px-6 mb-stack-lg hidden md:block">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="Minbar News Logo" className="h-8 w-auto object-contain rounded" />
            <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-white tracking-tighter">MINBAR</h1>
          </Link>
          <div className="mt-2">
            <p className="font-label-bold text-label-bold text-primary dark:text-slate-300">Editorial Portal</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-500">Minbar News CMS</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto">
          <Link 
            onClick={() => setIsOpen(false)}
            to="/admin/analytics"
            className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary dark:[&.active]:bg-slate-800 [&.active]:text-on-primary dark:[&.active]:text-white [&.active]:shadow-md text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined mr-3">analytics</span>
            <span className="font-label-bold text-label-bold">Analytics</span>
          </Link>
          <Link 
            onClick={() => setIsOpen(false)}
            to="/admin/editorial"
            className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary dark:[&.active]:bg-slate-800 [&.active]:text-on-primary dark:[&.active]:text-white [&.active]:shadow-md text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined mr-3">edit_note</span>
            <span className="font-label-bold text-label-bold">Editorial Desk</span>
          </Link>
          <Link 
            onClick={() => setIsOpen(false)}
            to="/admin/articles"
            className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary dark:[&.active]:bg-slate-800 [&.active]:text-on-primary dark:[&.active]:text-white [&.active]:shadow-md text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined mr-3">auto_stories</span>
            <span className="font-label-bold text-label-bold">Article Library</span>
          </Link>
          <Link 
            onClick={() => setIsOpen(false)}
            to="/admin/media"
            className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary dark:[&.active]:bg-slate-800 [&.active]:text-on-primary dark:[&.active]:text-white [&.active]:shadow-md text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined mr-3">perm_media</span>
            <span className="font-label-bold text-label-bold">Media Library</span>
          </Link>
          <Link 
            onClick={() => setIsOpen(false)}
            to="/admin/staff"
            className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary dark:[&.active]:bg-slate-800 [&.active]:text-on-primary dark:[&.active]:text-white [&.active]:shadow-md text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined mr-3">group</span>
            <span className="font-label-bold text-label-bold">Staff Settings</span>
          </Link>
          <Link 
            onClick={() => setIsOpen(false)}
            to="/admin/settings"
            className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary dark:[&.active]:bg-slate-800 [&.active]:text-on-primary dark:[&.active]:text-white [&.active]:shadow-md text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined mr-3">settings</span>
            <span className="font-label-bold text-label-bold">Site Settings</span>
          </Link>
        </nav>
        
        <div className="px-4 mt-auto space-y-1 pt-4">
          <Link 
            onClick={() => setIsOpen(false)}
            to="/admin/new-article" 
            className="w-full bg-secondary text-on-secondary font-label-bold py-3 rounded-lg flex items-center justify-center gap-2 mb-4 hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined">add</span>
            New Article
          </Link>
          
          <div className="border-t border-outline-variant dark:border-slate-700 pt-4">
            <button className="flex w-full items-center px-4 py-2 text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined mr-3">help</span>
              <span className="font-label-sm text-label-sm">Help Center</span>
            </button>
            <button className="flex w-full items-center px-4 py-2 text-on-surface-variant dark:text-slate-400 hover:text-secondary transition-colors cursor-pointer">
              <span className="material-symbols-outlined mr-3">logout</span>
              <span className="font-label-sm text-label-sm">Log Out</span>
            </button>
            <div className="mt-4 px-4 hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
