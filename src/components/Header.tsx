import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-surface dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700 transition-colors">
      <div className="flex flex-col w-full px-grid-margin py-4 max-w-7xl mx-auto">
        {/* Brand & Search Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span 
              className="material-symbols-outlined text-primary dark:text-white text-4xl cursor-pointer md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
            <Link to="/" className="flex items-center gap-4 cursor-pointer">
              <span className="material-symbols-outlined text-primary dark:text-white text-4xl hidden md:block">menu</span>
              <img src="/logo.png" alt="Minbar News Logo" className="h-10 w-auto object-contain rounded" />
              <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-white tracking-tighter uppercase hidden sm:block">
                MINBAR NEWS
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center bg-surface-container-low dark:bg-slate-800 px-4 py-2 rounded border border-outline-variant dark:border-slate-700">
              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 mr-2">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-label-bold font-label-bold w-48 outline-none dark:text-white placeholder:text-slate-500"
                placeholder="Search news..."
                type="text"
              />
            </div>
            <ThemeToggle />
            <span className="material-symbols-outlined text-primary dark:text-white cursor-pointer hidden sm:block">account_circle</span>
          </div>
        </div>
        
        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center justify-center space-x-8">
          <Link to="/category/$categoryId" params={{ categoryId: 'world' }} className="font-label-bold text-label-bold uppercase text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors cursor-pointer">World</Link>
          <Link to="/category/$categoryId" params={{ categoryId: 'politics' }} className="font-label-bold text-label-bold uppercase text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Politics</Link>
          <Link to="/category/$categoryId" params={{ categoryId: 'economy' }} className="font-label-bold text-label-bold uppercase text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Economy</Link>
          <Link to="/category/$categoryId" params={{ categoryId: 'analysis' }} className="font-label-bold text-label-bold uppercase text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Analysis</Link>
          <Link to="/opinion" className="font-label-bold text-label-bold uppercase text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Opinion</Link>
          <Link to="/live" className="font-label-bold text-label-bold uppercase text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors cursor-pointer">Live</Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden flex flex-col bg-surface-container-lowest dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 px-grid-margin py-4 space-y-4 shadow-lg">
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/$categoryId" params={{ categoryId: 'world' }} className="font-label-bold text-label-bold uppercase text-on-surface dark:text-slate-200 block py-2">World</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/$categoryId" params={{ categoryId: 'politics' }} className="font-label-bold text-label-bold uppercase text-on-surface dark:text-slate-200 block py-2">Politics</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/$categoryId" params={{ categoryId: 'economy' }} className="font-label-bold text-label-bold uppercase text-on-surface dark:text-slate-200 block py-2">Economy</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/$categoryId" params={{ categoryId: 'analysis' }} className="font-label-bold text-label-bold uppercase text-on-surface dark:text-slate-200 block py-2">Analysis</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/opinion" className="font-label-bold text-label-bold uppercase text-on-surface dark:text-slate-200 block py-2">Opinion</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/live" className="font-label-bold text-label-bold uppercase text-on-surface dark:text-slate-200 block py-2">Live</Link>
          
          <div className="flex items-center bg-surface-container-low dark:bg-slate-800 px-4 py-3 rounded-lg mt-4 border border-outline-variant dark:border-slate-700">
            <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-label-bold font-label-bold w-full outline-none dark:text-white placeholder:text-slate-500" placeholder="Search news..." type="text"/>
          </div>
        </nav>
      )}
    </header>
  );
}
