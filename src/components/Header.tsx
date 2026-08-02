import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="bg-surface border-b border-outline-variant">
      <div className="flex flex-col w-full px-grid-margin py-4 max-w-7xl mx-auto">
        {/* Brand & Search Row */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center gap-4 cursor-pointer">
            <span className="material-symbols-outlined text-primary text-4xl">menu</span>
            <img src="/logo.png" alt="Minbar News Logo" className="h-10 w-auto object-contain rounded" />
            <h1 className="font-headline-lg text-headline-lg font-bold text-primary tracking-tighter uppercase">
              MINBAR NEWS
            </h1>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center bg-surface-container-low px-4 py-2 rounded border border-outline-variant">
              <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-label-bold font-label-bold w-48 outline-none"
                placeholder="Search news..."
                type="text"
              />
            </div>
            <span className="material-symbols-outlined text-primary cursor-pointer">account_circle</span>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex items-center justify-center space-x-8">
          <Link to="/category/$categoryId" params={{ categoryId: 'world' }} className="font-label-bold text-label-bold uppercase text-on-surface-variant hover:text-primary transition-colors cursor-pointer">World</Link>
          <Link to="/category/$categoryId" params={{ categoryId: 'politics' }} className="font-label-bold text-label-bold uppercase text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Politics</Link>
          <Link to="/category/$categoryId" params={{ categoryId: 'economy' }} className="font-label-bold text-label-bold uppercase text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Economy</Link>
          <Link to="/category/$categoryId" params={{ categoryId: 'analysis' }} className="font-label-bold text-label-bold uppercase text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Analysis</Link>
          <Link to="/opinion" className="font-label-bold text-label-bold uppercase text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Opinion</Link>
          <Link to="/live" className="font-label-bold text-label-bold uppercase text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Live</Link>
        </nav>
      </div>
    </header>
  );
}
