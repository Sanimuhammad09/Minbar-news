export default function OpinionSidebar() {
  return (
    <aside className="lg:col-span-4">
      <div className="bg-surface-container-low p-stack-lg border-l border-outline-variant h-full">
        <h2 className="font-headline-lg text-headline-lg mb-stack-lg sidebar-rule uppercase tracking-tighter">Opinion</h2>
        
        <div className="space-y-stack-lg">
          <article className="group cursor-pointer">
            <h3 className="font-headline-md text-headline-md italic mb-2 group-hover:text-secondary">
              "The Death of Neutrality: Why Media Must Take a Stand on Global Ethics"
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-container"></div>
              <div>
                <p className="font-label-bold text-label-bold">Dr. Aris Thorne</p>
                <p className="text-label-sm text-on-surface-variant">Chief Correspondent</p>
              </div>
            </div>
          </article>
          
          <article className="group cursor-pointer pt-stack-md border-t border-outline-variant">
            <h3 className="font-headline-md text-headline-md italic mb-2 group-hover:text-secondary">
              "Universal Basic Income: Not a Welfare Dream, But a Robotic Reality"
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary"></div>
              <div>
                <p className="font-label-bold text-label-bold">Sarah Jenkins</p>
                <p className="text-label-sm text-on-surface-variant">Economist</p>
              </div>
            </div>
          </article>
          
          <article className="group cursor-pointer pt-stack-md border-t border-outline-variant">
            <h3 className="font-headline-md text-headline-md italic mb-2 group-hover:text-secondary">
              "Architecture for a Flooded World: Reimagining Our Coastal Urban Sprawl"
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary"></div>
              <div>
                <p className="font-label-bold text-label-bold">Marcus Ling</p>
                <p className="text-label-sm text-on-surface-variant">Urban Theorist</p>
              </div>
            </div>
          </article>
          
          {/* Newsletter Box */}
          <div className="mt-section-gap p-6 bg-primary text-on-primary">
            <h4 className="font-headline-md mb-2">The Perspective</h4>
            <p className="text-label-sm mb-4 opacity-80">
              Our weekly deep-dive into the stories that define the decade. Delivered every Friday morning.
            </p>
            <input
              className="w-full bg-white text-primary border-none p-2 mb-2 font-label-bold outline-none"
              placeholder="Email Address"
              type="email"
            />
            <button className="w-full bg-secondary text-on-secondary py-2 font-label-bold uppercase cursor-pointer hover:bg-secondary/90 transition-colors">
              Join The Briefing
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
