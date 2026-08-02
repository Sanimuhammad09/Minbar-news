import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/newsletters')({
  component: NewsletterArchive,
})

function NewsletterArchive() {
  const [activeTab, setActiveTab] = useState('All Archives')

  const tabs = [
    'All Archives',
    'Daily Brief',
    'Weekly Digest',
    'Breaking Alerts',
    'Tech Dispatch'
  ]

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <main className="max-w-7xl mx-auto px-grid-margin py-stack-lg">
        
        {/* Hero Section: Subscription Value Prop */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center mb-section-gap">
          <div className="md:col-span-7 flex flex-col gap-stack-md">
            <div className="flex items-center gap-2 text-secondary font-label-bold uppercase tracking-widest">
              <span className="w-8 h-[2px] bg-secondary"></span>
              Global Intelligence
            </div>
            <h1 className="font-display-lg text-display-lg md:text-[64px] md:leading-[72px] tracking-tight">
              Truth. Perspective. Impact.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Join 250,000+ global citizens who start their day with Minbar's rigorous analysis. No noise, just the stories that shape our world.
            </p>
            <form className="mt-stack-md flex flex-col sm:flex-row gap-0 max-w-lg" onSubmit={e => e.preventDefault()}>
              <input 
                className="flex-grow border border-outline px-4 py-4 bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-body-md rounded-none" 
                placeholder="Enter your email address" 
                type="email" 
              />
              <button className="bg-primary text-on-primary px-8 py-4 font-label-bold text-label-bold hover:bg-opacity-90 transition-all uppercase cursor-pointer" type="submit">Join Now</button>
            </form>
            <p className="font-label-sm text-label-sm text-outline">Free daily brief. Unsubscribe anytime.</p>
          </div>
          <div className="md:col-span-5 relative aspect-[4/5] overflow-hidden">
            <img className="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-700" alt="Hero" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjDjqIe1SdnfNg0KHxQvW9au5NRuSnO2iae4gkypcK0B_9njKY_5YKit0XxgcWWME31G51v_wh0YBEpw_0SwWqWoAy908NcWbV2k1Xsyi-o0pdR2LVeX906LMjy2751XuJX_VQG87jPJzirmN2dGARB3cu-IDreCEYe_i_F-jJUSBrZm5bVJmDvM3b_KUDVbPkxAbNquKvWhjy9LKaMwodH1IcC59pQJtAne1kOxPtjId5elfjVJQ" />
            <div className="absolute inset-0 border-[16px] border-surface pointer-events-none"></div>
          </div>
        </section>

        {/* Newsletter Category Navigation */}
        <section className="mb-stack-lg border-b border-outline-variant">
          <div className="flex flex-wrap gap-stack-lg overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {tabs.map((tab) => (
              <button 
                key={tab}
                className={`pb-stack-sm font-label-bold text-label-bold whitespace-nowrap transition-all uppercase cursor-pointer ${
                  activeTab === tab 
                    ? 'border-b-2 border-secondary text-secondary' 
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Archive Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-section-gap">
          {/* Newsletter Card 1: Featured */}
          <article className="flex flex-col gap-stack-md group cursor-pointer">
            <div className="h-[1px] bg-gradient-to-r from-secondary to-transparent w-full mb-1"></div>
            <div className="flex justify-between items-center font-label-sm text-label-sm text-outline uppercase tracking-wider">
              <span>Daily Brief</span>
              <span>October 24, 2024</span>
            </div>
            <div className="overflow-hidden aspect-video relative">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="News 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqJtOet8amCceEAR9gcw7OrMcdnyH4rVzlH6tlww-Lf4iy1FOkOEPOpX9IhVf6rxdj5MdEe6rkjEPRme8Ybj1TZV1DejncnHoJlOYL6eI4fFgiLB78Fmjw-KjAngzkDXp115gk6t3Zfnk-j8yrrC1jV-InotLBELEX1eylh-qMta73PifjHg-gEbue_hsxnm0ekOs8h6O3VlXZ3UdZ3SLPKyCjtfi7pBTpKiVdBqwWqUuPCv4fjdU" />
              <div className="absolute top-4 left-4 bg-secondary text-on-primary px-3 py-1 font-label-sm text-label-sm font-bold uppercase">Must Read</div>
            </div>
            <h2 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">The Pivot Point: Global Markets and the Energy Transition</h2>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
              As major economies re-evaluate their reliance on traditional fuel sources, a new geopolitical map is emerging. We explore the winners, the losers, and the hidden costs of the 2025 energy mandate.
            </p>
            <a className="font-label-bold text-label-bold text-secondary flex items-center gap-2 group/link cursor-pointer">
              Read Full Brief
              <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </article>

          {/* Newsletter Card 2 */}
          <article className="flex flex-col gap-stack-md group cursor-pointer">
            <div className="h-[1px] bg-gradient-to-r from-secondary to-transparent w-full mb-1"></div>
            <div className="flex justify-between items-center font-label-sm text-label-sm text-outline uppercase tracking-wider">
              <span>Weekly Digest</span>
              <span>October 20, 2024</span>
            </div>
            <div className="overflow-hidden aspect-video">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="News 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtLIcLquq2Tl5s99fShXG3KxcszCfh7FZmFi_sDZoh3u6rFShFVJlMlyTqoNX9SunVw-zUAFx5bFg5e99alzqpN1Vwp1Lvm72QR1wzHf6dyrPAjirMPWr1unTx3Nir2pYXn6RLyea578V9p-wWAxK2hBvacMC7eDOXruyhNLTNJYZevgEO5P_SpEqQKZ3lRLPnygzIAuQDokhM7t0pedGLmro3NHgHP4kBr5-li1yDMTRlI2R9b7E" />
            </div>
            <h2 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">Weekly Digest: The Architecture of Intelligence</h2>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
              A deep dive into how silicon valley is rethinking urban planning through the lens of artificial intelligence and community-driven data.
            </p>
            <a className="font-label-bold text-label-bold text-secondary flex items-center gap-2 group/link cursor-pointer">
              Read Full Brief
              <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </article>

          {/* Newsletter Card 3 */}
          <article className="flex flex-col gap-stack-md group cursor-pointer">
            <div className="h-[1px] bg-gradient-to-r from-secondary to-transparent w-full mb-1"></div>
            <div className="flex justify-between items-center font-label-sm text-label-sm text-outline uppercase tracking-wider">
              <span>Breaking Alerts</span>
              <span>October 19, 2024</span>
            </div>
            <div className="overflow-hidden aspect-video">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="News 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3ssSGZzxO-X462Oe8q0p2RfQwNGB7Jt9-NLM1qZL8QqrjKYmo3PJXY7R-NplqQX6pjgYrTuWXIGiCDDqPsbaB2WgfYpeOdkrde942uaLSmk7-CF4dNhxq-t1w7SXwSxFe_CkOplpofXjuz722EQjEZCSGG30Ah9LTdOZBnm6g8RNxLOF4S9d44maN-VItmq4hgLD8Bl2nx_wqy-sXwqYrXsv-ky9PgATrZ-24XFr2PUUlE8FVccI" />
            </div>
            <h2 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">Alert: Global Supply Chain Disruptions Intensify</h2>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
              Instant analysis on the port closures across three continents and the projected impact on holiday retail pricing. 
            </p>
            <a className="font-label-bold text-label-bold text-secondary flex items-center gap-2 group/link cursor-pointer">
              Read Full Brief
              <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </article>

          {/* Newsletter Card 4 */}
          <article className="flex flex-col gap-stack-md group cursor-pointer">
            <div className="h-[1px] bg-gradient-to-r from-secondary to-transparent w-full mb-1"></div>
            <div className="flex justify-between items-center font-label-sm text-label-sm text-outline uppercase tracking-wider">
              <span>Daily Brief</span>
              <span>October 18, 2024</span>
            </div>
            <h2 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">Diplomatic Shifts in the Indo-Pacific</h2>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
              The latest treaty signatures could redefine regional security for the next decade. Our experts weigh in on the strategic implications.
            </p>
            <a className="font-label-bold text-label-bold text-secondary flex items-center gap-2 group/link cursor-pointer">
              Read Full Brief
              <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </article>

          {/* Newsletter Card 5 */}
          <article className="flex flex-col gap-stack-md group cursor-pointer">
            <div className="h-[1px] bg-gradient-to-r from-secondary to-transparent w-full mb-1"></div>
            <div className="flex justify-between items-center font-label-sm text-label-sm text-outline uppercase tracking-wider">
              <span>Daily Brief</span>
              <span>October 17, 2024</span>
            </div>
            <h2 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">Fintech: The Death of the Physical Card?</h2>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
              Consumer behavior is shifting faster than the banking infrastructure. Why 2024 is the tipping point for biometric payments.
            </p>
            <a className="font-label-bold text-label-bold text-secondary flex items-center gap-2 group/link cursor-pointer">
              Read Full Brief
              <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </article>

          {/* Newsletter Card 6 */}
          <article className="flex flex-col gap-stack-md group cursor-pointer">
            <div className="h-[1px] bg-gradient-to-r from-secondary to-transparent w-full mb-1"></div>
            <div className="flex justify-between items-center font-label-sm text-label-sm text-outline uppercase tracking-wider">
              <span>Daily Brief</span>
              <span>October 16, 2024</span>
            </div>
            <h2 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">Climate: The Rise of Regenerative Urbanism</h2>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
              How cities in arid regions are using centuries-old techniques combined with modern sensors to solve water scarcity.
            </p>
            <a className="font-label-bold text-label-bold text-secondary flex items-center gap-2 group/link cursor-pointer">
              Read Full Brief
              <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </article>
        </section>

        {/* Pagination */}
        <div className="mt-section-gap flex items-center justify-center gap-4">
          <button className="p-3 border border-outline hover:bg-surface-container transition-all cursor-pointer">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="font-label-bold text-label-bold text-primary px-4">Page 1 of 42</span>
          <button className="p-3 border border-outline hover:bg-surface-container transition-all cursor-pointer">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>

      {/* Mid-Page CTA Section */}
      <section className="bg-primary py-section-gap w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="max-w-7xl mx-auto px-grid-margin grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">
          <div>
            <h2 className="font-display-lg text-display-lg text-on-primary mb-stack-md">Never miss a perspective.</h2>
            <p className="font-body-lg text-body-lg text-on-primary-container">
              Get our premium Weekly Digest sent straight to your inbox every Sunday morning. Expert curation of the week's most critical developments.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-0">
              <input className="flex-grow border-none px-4 py-4 bg-surface text-primary focus:outline-none focus:ring-0 rounded-none" placeholder="Email Address" type="email" />
              <button className="bg-secondary text-on-primary px-8 py-4 font-label-bold text-label-bold hover:bg-opacity-90 transition-all uppercase cursor-pointer">Get Digest</button>
            </div>
            <div className="flex items-center gap-4 text-on-primary-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-label-sm text-label-sm">No Spam</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span className="font-label-sm text-label-sm">Data Secured</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
