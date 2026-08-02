export default function LiveUpdates() {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-stack-md">
      <div className="flex items-center justify-between border-b border-primary pb-2">
        <h3 className="font-label-bold text-label-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
          Live Updates
        </h3>
        <a className="text-secondary text-label-sm font-label-bold hover:underline" href="#">View All</a>
      </div>
      
      <div className="space-y-4">
        <div className="group cursor-pointer">
          <p className="text-label-sm text-secondary font-label-bold mb-1">14:32 GMT</p>
          <h4 className="font-headline-md text-[18px] leading-snug group-hover:text-secondary transition-colors">
            Central Bank announces surprise rate hike to combat inflation
          </h4>
        </div>
        
        <div className="group cursor-pointer border-t border-outline-variant pt-4">
          <p className="text-label-sm text-secondary font-label-bold mb-1">13:15 GMT</p>
          <h4 className="font-headline-md text-[18px] leading-snug group-hover:text-secondary transition-colors">
            Protests erupt in major coastal cities over housing costs
          </h4>
        </div>
        
        <div className="group cursor-pointer border-t border-outline-variant pt-4">
          <p className="text-label-sm text-secondary font-label-bold mb-1">11:50 GMT</p>
          <h4 className="font-headline-md text-[18px] leading-snug group-hover:text-secondary transition-colors">
            Tech giant reveals 'Neural-Sync' chip for public testing
          </h4>
        </div>
      </div>
      
      {/* Mini Ad/CTA */}
      <div className="mt-auto bg-primary-container p-6 border-t-4 border-secondary">
        <h5 className="text-on-primary font-headline-md mb-2">Support Independent Journalism</h5>
        <p className="text-on-primary-container text-label-sm mb-4">Deep analysis and truth-driven reporting for a complex world.</p>
        <button className="w-full bg-secondary text-on-secondary py-2 font-label-bold uppercase hover:bg-opacity-90 transition-all">
          Subscribe Now
        </button>
      </div>
    </aside>
  );
}
