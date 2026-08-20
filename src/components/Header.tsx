import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useServerFn } from '@tanstack/react-start'
import ThemeToggle from './ThemeToggle'
import { getTrendingArticles } from '../server/articles'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [trending, setTrending] = useState<any[]>([])
  const fetchTrending = useServerFn(getTrendingArticles)

  useEffect(() => {
    fetchTrending().then(data => setTrending(data)).catch(console.error)
  }, [])

  return (
    <header className="bg-surface dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700 font-sans transition-colors">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 lg:px-8 max-w-7xl mx-auto h-[72px]">
        
        {/* Left: Logo & Links */}
        <div className="flex items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-8 h-full py-2">
            <img src="/logo.png" alt="Minbar News Logo" className="h-10 md:h-12 w-auto object-contain rounded mr-3" />
            <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-primary dark:text-white tracking-tighter uppercase hidden sm:block">
              MINBAR
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center h-full space-x-6 text-on-surface dark:text-slate-200">
            
            {/* News Dropdown */}
            <div className="group relative h-full flex items-center">
              <Link to="/category/news" className="font-label-bold text-label-bold hover:text-secondary flex items-center gap-1 transition-colors">
                News <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </Link>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-surface dark:bg-slate-800 border-t-2 border-secondary shadow-xl py-2 min-w-[200px] z-50">
                <Link to="/category/africa" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Africa</Link>
                <Link to="/category/asia" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Asia</Link>
                <Link to="/category/us-canada" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">US & Canada</Link>
                <Link to="/category/latin-america" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Latin America</Link>
                <Link to="/category/europe" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Europe</Link>
                <Link to="/category/asia-pacific" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Asia Pacific</Link>
              </div>
            </div>

            <Link to="/category/middle-east" className="font-label-bold text-label-bold hover:text-secondary transition-colors">Middle East</Link>
            <Link to="/category/explained" className="font-label-bold text-label-bold hover:text-secondary transition-colors">Explained</Link>
            <Link to="/category/sport" className="font-label-bold text-label-bold hover:text-secondary transition-colors">Sport</Link>
            <Link to="/opinion" className="font-label-bold text-label-bold hover:text-secondary transition-colors">Opinion</Link>
            <Link to="/category/video" className="font-label-bold text-label-bold hover:text-secondary transition-colors">Video</Link>
            
            {/* More Dropdown */}
            <div className="group relative h-full flex items-center">
              <button className="font-label-bold text-label-bold hover:text-secondary flex items-center gap-1 transition-colors cursor-pointer">
                More <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-surface dark:bg-slate-800 border-t-2 border-secondary shadow-xl py-2 min-w-[200px] z-50">
                <Link to="/category/features" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Features</Link>
                <Link to="/category/economy" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Economy</Link>
                <Link to="/category/human-rights" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Human Rights</Link>
                <Link to="/category/climate" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Climate Crisis</Link>
                <Link to="/category/investigations" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Investigations</Link>
                <Link to="/category/science" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Science & Technology</Link>
                <Link to="/category/podcasts" className="px-5 py-2.5 font-label-bold text-label-bold hover:bg-surface-container-low dark:hover:bg-slate-700 hover:text-secondary transition-colors">Podcasts</Link>
              </div>
            </div>

          </nav>
        </div>

        {/* Right: Theme Toggle, Live, Search, Sign Up */}
        <div className="flex items-center gap-4 lg:gap-6">
          <ThemeToggle />
          
          <Link to="/live" className="hidden lg:flex items-center gap-2 font-label-bold text-label-bold hover:text-secondary transition-colors text-on-surface dark:text-white">
            <span className="material-symbols-outlined text-secondary text-[22px] filled">play_circle</span>
            LIVE
          </Link>
          
          <button className="hidden lg:block text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>

          <Link to="/sign-up" className="hidden lg:block bg-primary text-on-primary px-5 py-2 rounded font-label-bold text-[14px] hover:opacity-90 transition-opacity">
            Sign up
          </Link>

          {/* Mobile Menu Toggle */}
          <span 
            className="material-symbols-outlined text-on-surface dark:text-white text-3xl cursor-pointer lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </div>
      </div>

      {/* Trending Sub-Bar */}
      <div className="hidden lg:flex items-center justify-center border-t border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 py-3 font-label-sm text-on-surface-variant dark:text-slate-400">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 font-label-bold text-primary dark:text-white border-b-2 border-primary dark:border-white pb-[2px] whitespace-nowrap">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            Trending
          </div>
          
          {trending.length > 0 ? (
            trending.map((article: any) => (
              <Link 
                key={article.id} 
                to="/article/$articleId" 
                params={{ articleId: article.slug }} 
                className="hover:text-primary dark:hover:text-white transition-colors truncate max-w-[250px]"
                title={article.title}
              >
                {article.title}
              </Link>
            ))
          ) : (
            <span className="animate-pulse">Loading live trends...</span>
          )}
        </div>
      </div>

      {/* Mobile Menu (Overlay) */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden flex flex-col bg-surface dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 px-6 py-4 space-y-4 shadow-lg absolute w-full z-50">
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/news" className="font-label-bold text-label-bold text-on-surface dark:text-white block py-2 border-b border-outline-variant dark:border-slate-800">News</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/middle-east" className="font-label-bold text-label-bold text-on-surface dark:text-white block py-2 border-b border-outline-variant dark:border-slate-800">Middle East</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/africa" className="font-label-bold text-label-bold text-on-surface dark:text-white block py-2 border-b border-outline-variant dark:border-slate-800">Africa</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/category/asia" className="font-label-bold text-label-bold text-on-surface dark:text-white block py-2 border-b border-outline-variant dark:border-slate-800">Asia</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/opinion" className="font-label-bold text-label-bold text-secondary block py-2">Opinion</Link>
          
          <div className="flex items-center bg-surface-container-low dark:bg-slate-800 px-4 py-3 rounded mt-4 border border-outline-variant dark:border-slate-700">
            <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 font-label-bold text-label-bold w-full outline-none text-on-surface dark:text-white placeholder:text-on-surface-variant dark:placeholder-slate-500" placeholder="Search news..." type="text"/>
          </div>
        </nav>
      )}
    </header>
  )
}
