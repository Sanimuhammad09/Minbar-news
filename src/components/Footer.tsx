export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary w-full py-stack-lg border-t-4 border-secondary mt-section-gap">
      <div className="flex flex-col items-center justify-center space-y-stack-md w-full px-grid-margin max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Minbar News Logo" className="h-8 w-auto object-contain rounded" />
          <h2 className="font-headline-md text-headline-md font-bold text-on-primary uppercase tracking-widest">
            MINBAR NEWS
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors" href="#">About Us</a>
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors" href="#">Editorial Guidelines</a>
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors" href="#">Privacy Policy</a>
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors" href="#">Terms of Service</a>
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors" href="#">Contact</a>
          <a className="font-label-sm text-label-sm text-surface-variant hover:text-on-primary transition-colors" href="#">Archive</a>
        </div>
        
        <div className="flex gap-6 pt-4">
          <span className="material-symbols-outlined text-surface-variant hover:text-on-primary cursor-pointer transition-colors">public</span>
          <span className="material-symbols-outlined text-surface-variant hover:text-on-primary cursor-pointer transition-colors">rss_feed</span>
          <span className="material-symbols-outlined text-surface-variant hover:text-on-primary cursor-pointer transition-colors">mail</span>
        </div>
        
        <p className="font-body-md text-body-md text-surface-variant pt-4 opacity-60">
          © {new Date().getFullYear()} Minbar News. Truth. Perspective. Impact.
        </p>
      </div>
    </footer>
  );
}
