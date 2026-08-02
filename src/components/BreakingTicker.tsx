export default function BreakingTicker() {
  return (
    <section className="w-full bg-secondary text-on-secondary py-2 overflow-hidden sticky top-0 z-50">
      <div className="flex items-center">
        <div className="px-4 py-1 bg-primary text-on-primary font-label-bold text-label-bold uppercase z-10 shrink-0">
          Breaking
        </div>
        <div className="breaking-ticker-animation font-label-bold text-label-bold uppercase flex gap-x-12 px-6">
          <span>Global Markets React to New Energy Policy Reforms</span>
          <span>Unprecedented Peace Accord Signed in Eastern Europe</span>
          <span>Space Agency Confirms Discovery of Water on Remote Exoplanet</span>
          <span>New Tech Innovations Lead to Sustainable Urban Development Plans</span>
          <span>International Sports Committee Announces Location for 2032 Games</span>
        </div>
      </div>
    </section>
  );
}
