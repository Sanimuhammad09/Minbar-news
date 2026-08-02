import { Link } from '@tanstack/react-router'

export default function AdminSidebar() {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant py-stack-lg z-50">
      <div className="px-6 mb-stack-lg">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Minbar News Logo" className="h-8 w-auto object-contain rounded" />
          <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tighter">MINBAR</h1>
        </div>
        <div className="mt-2">
          <p className="font-label-bold text-label-bold text-primary">Editorial Portal</p>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Minbar News CMS</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        <Link 
          to="/admin/analytics"
          className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary [&.active]:text-on-primary [&.active]:shadow-md text-on-surface-variant hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined mr-3">analytics</span>
          <span className="font-label-bold text-label-bold">Analytics</span>
        </Link>
        <Link 
          to="/admin/editorial"
          className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary [&.active]:text-on-primary [&.active]:shadow-md text-on-surface-variant hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined mr-3">edit_note</span>
          <span className="font-label-bold text-label-bold">Editorial Desk</span>
        </Link>
        <Link 
          to="/admin/articles"
          className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary [&.active]:text-on-primary [&.active]:shadow-md text-on-surface-variant hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined mr-3">auto_stories</span>
          <span className="font-label-bold text-label-bold">Article Library</span>
        </Link>
        <Link 
          to="/admin/media"
          className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary [&.active]:text-on-primary [&.active]:shadow-md text-on-surface-variant hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined mr-3">perm_media</span>
          <span className="font-label-bold text-label-bold">Media Library</span>
        </Link>
        <Link 
          to="/admin/staff"
          className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary [&.active]:text-on-primary [&.active]:shadow-md text-on-surface-variant hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined mr-3">group</span>
          <span className="font-label-bold text-label-bold">Staff Settings</span>
        </Link>
        <Link 
          to="/admin/settings"
          className="flex items-center px-4 py-3 mx-2 rounded-lg transition-all group [&.active]:bg-primary [&.active]:text-on-primary [&.active]:shadow-md text-on-surface-variant hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined mr-3">settings</span>
          <span className="font-label-bold text-label-bold">Site Settings</span>
        </Link>
      </nav>
      
      <div className="px-4 mt-auto space-y-1">
        <Link 
          to="/admin/new-article" 
          className="w-full bg-secondary text-on-secondary font-label-bold py-3 rounded-lg flex items-center justify-center gap-2 mb-4 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined">add</span>
          New Article
        </Link>
        
        <div className="border-t border-outline-variant pt-4">
          <button className="flex w-full items-center px-4 py-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined mr-3">help</span>
            <span className="font-label-sm text-label-sm">Help Center</span>
          </button>
          <button className="flex w-full items-center px-4 py-2 text-on-surface-variant hover:text-secondary transition-colors">
            <span className="material-symbols-outlined mr-3">logout</span>
            <span className="font-label-sm text-label-sm">Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
