import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/category/$categoryId')({
  component: CategoryView,
})

function CategoryView() {
  const { categoryId } = Route.useParams()
  // Capitalize categoryId
  const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1)

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      {/* Sub-Navigation for Category */}
      <div className="bg-surface-container-low border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-grid-margin py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="font-headline-md text-headline-md text-primary border-r border-outline-variant pr-6">{categoryName}</h1>
            <nav className="hidden md:flex items-center space-x-6">
              <a className="font-label-bold text-label-bold text-secondary border-b-2 border-secondary pb-1 cursor-pointer">Middle East</a>
              <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary cursor-pointer">Europe</a>
              <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary cursor-pointer">Americas</a>
              <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary cursor-pointer">Asia</a>
              <a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary cursor-pointer">Africa</a>
            </nav>
          </div>
          <div className="flex items-center text-on-surface-variant font-label-sm text-label-sm">
            <span className="mr-2">Sort by:</span>
            <select className="bg-transparent border-none focus:ring-0 font-label-bold text-label-bold cursor-pointer outline-none">
              <option>Latest</option>
              <option>Trending</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-grid-margin py-stack-lg">
        <div className="grid grid-cols-12 gap-gutter">
          
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-section-gap">
            
            {/* Lead Story Card */}
            <section className="relative pt-stack-md before:content-[''] before:absolute before:top-0 before:left-0 before:w-10 before:h-[3px] before:bg-secondary">
              <div className="grid md:grid-cols-2 gap-stack-lg items-center">
                <div className="order-2 md:order-1 space-y-4">
                  <div className="flex items-center space-x-2 text-secondary font-label-bold uppercase tracking-widest text-xs">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                    <span>Developing Story</span>
                  </div>
                  <h2 className="font-display-lg text-display-lg text-primary leading-tight">Navigating the New Silk Road: Geopolitics in the 21st Century</h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">As infrastructure projects span across three continents, the shifting balance of power creates new economic realities for emerging markets and established superpowers alike. Our investigative team reports from the ground.</p>
                  <div className="flex items-center space-x-4 pt-4">
                    <button className="bg-primary text-on-primary px-8 py-3 font-label-bold uppercase tracking-tighter hover:opacity-90 transition-opacity cursor-pointer">Full Analysis</button>
                    <span className="text-on-surface-variant font-label-sm uppercase">12 Min Read • By Sarah Jenkins</span>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="aspect-video w-full overflow-hidden border border-outline-variant">
                    <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Hero" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKYuN-EnYBVuToS89Ioy3m3phfIDi3igKbW_lyDWNHRUg0ow1IvqFessSLQkWri2hyzO7np11y4q2RKJXiNupvvScsYLdQ1BNJ_TuGo_fjHa7zLba9HM-DqiqmjzVlbUKjRTIOjqCpCp_Nz2ifiOmgVqooPwbiY8Beu6zsChnyvjLzEwuyi2rJL855ngjqqmnjFJ1zZEtxFu7VMqqEqioyTGh1Q0UGQEvpc-kdZIwrnXE5mbEL61U" />
                  </div>
                </div>
              </div>
            </section>

            {/* News Grid Section */}
            <section className="space-y-stack-lg">
              <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                <h3 className="font-headline-md text-headline-md text-primary">Regional Updates</h3>
                <a className="text-secondary font-label-bold hover:underline cursor-pointer">View All</a>
              </div>
              <div className="grid md:grid-cols-2 gap-gutter">
                {/* Card 1 */}
                <div className="group cursor-pointer space-y-4 border-b border-outline-variant pb-6">
                  <div className="aspect-[3/2] w-full overflow-hidden bg-surface-container border border-outline-variant">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Europe" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0PunIm37qYif-uMWbwLXjyt5SxAcvfLOLFa-f0RBgZ7u093G1xXddn4TrH1tfKf4YR5JJclZMLTtfxv8eBcpT5V8chndKBiXX0kMO2O2_KlaNTEIJRvJzXNxeNQ58mt1gwq0mR1LQwaWYl7lBP5zXx5joDgGZZqGlCqwTfLSmXtbU-RQNhhzcTanV10qUP1_srB8EA7Vi_iKPP4gj2zu8JqM5lltBqxKaUHqYt-C48v2a4L749uM" />
                  </div>
                  <div className="space-y-2">
                    <span className="font-label-bold text-label-bold text-secondary uppercase text-xs">Europe</span>
                    <h4 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">Stockholm Summit Focuses on Digital Privacy Legislation</h4>
                    <p className="text-on-surface-variant font-body-md line-clamp-2">European leaders gather to discuss the implications of AI on individual data rights and cross-border security protocols.</p>
                    <div className="font-label-sm text-label-sm text-outline pt-2">4 Hours Ago • 6 Min Read</div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group cursor-pointer space-y-4 border-b border-outline-variant pb-6">
                  <div className="aspect-[3/2] w-full overflow-hidden bg-surface-container border border-outline-variant">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Americas" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUV5PA1f6gZod2lgblyUALrXHL-_94UrIAHY_ePI6bzwdNYg_eFk-7tV-v2U5jyYOs3f98oVhbakLs8JipC6DMDqQKb-kSQc68LvxK7pIomP4Vcrweb1yPRdY7gvQBETPXYQxUDaJQkWuQnjWdN2nOOGhAdXJduMeR7W6u3sf-BDuw1Lab8om9gE1iWB-jXHUHgZh46Ui4YPc6QNhQ0cgaBDJhwkCnmoO3UHOakduNZKy6XkFqop8" />
                  </div>
                  <div className="space-y-2">
                    <span className="font-label-bold text-label-bold text-secondary uppercase text-xs">Americas</span>
                    <h4 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">Rainforest Protection Pact Receives Multilateral Funding</h4>
                    <p className="text-on-surface-variant font-body-md line-clamp-2">A coalition of twelve nations has pledged $4 billion towards the preservation of critical biodiversity hotspots in the Amazon basin.</p>
                    <div className="font-label-sm text-label-sm text-outline pt-2">7 Hours Ago • 8 Min Read</div>
                  </div>
                </div>
              </div>
            </section>

            {/* List Style Previews */}
            <section className="space-y-stack-md">
              <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                <h3 className="font-headline-md text-headline-md text-primary">Quick Reads</h3>
              </div>
              <div className="divide-y divide-outline-variant">
                <div className="py-6 flex gap-stack-md group cursor-pointer">
                  <div className="flex-1 space-y-2">
                    <span className="font-label-bold text-label-bold text-on-surface-variant uppercase text-xs">Asia • Economy</span>
                    <h4 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">Tokyo Markets Rally on News of Tech Merger</h4>
                    <p className="text-on-surface-variant font-body-md hidden md:block">Leading semiconductor manufacturers announce a strategic partnership aimed at revolutionizing local supply chains.</p>
                    <div className="font-label-sm text-label-sm text-outline">2 Hours Ago</div>
                  </div>
                  <div className="w-32 h-20 bg-surface-container border border-outline-variant shrink-0">
                    <img className="w-full h-full object-cover" alt="Asia" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeKTczFg6mzu1FxzrLBPRWDHuFTzGae-KjisjGwzwWPn0anj1ignGpTQt2dRT-4mQcJVbWSm1V39qvQGZL6eWKfkcFo1D2pT9GEHwGPBgXTrtYYtCaxO6tAnuXC3tgqlSP-k77dQ2qV2LFRBfGn7CAmQE3Ox0ytP_wTTFj5d6zRwgLKTjeB_k1CYLp6mUAXtipsHCp-GuicjqVjZ9X9igcu6KgcQ2pF1Dgwzu_C8-0rzZlvGf_yrk" />
                  </div>
                </div>
                <div className="py-6 flex gap-stack-md group cursor-pointer">
                  <div className="flex-1 space-y-2">
                    <span className="font-label-bold text-label-bold text-on-surface-variant uppercase text-xs">Africa • Culture</span>
                    <h4 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors">Nairobi Hosts Largest Pan-African Arts Festival in a Decade</h4>
                    <p className="text-on-surface-variant font-body-md hidden md:block">Thousands of artists and curators converge to celebrate a new era of African creative influence on the global stage.</p>
                    <div className="font-label-sm text-label-sm text-outline">9 Hours Ago</div>
                  </div>
                  <div className="w-32 h-20 bg-surface-container border border-outline-variant shrink-0">
                    <img className="w-full h-full object-cover" alt="Africa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9YV3H9pmd3YcUJyjK46JcR3LxfzM0V1Gd89fvUcWLSdp3BWL4Ewm3Ky44YHFqanh_8a7JPQUmjyN0HmnGV4SVqw22jugQoGUYRvorJ0WuYUdXGYkLPv7g-2QhTKYA14Dc_ljx-eTjXYkz-lmzJWCN7UD3Emf_VrFEgqng1mmMSzV-K03hgnrl79S0PG3MB0lpziDAPmjs4FhFHjhW5TItOwVxAOiJ7AVcibusjTjk0ZyQ9WtH1wY" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-stack-lg">
            
            {/* Most Read in World */}
            <div className="bg-surface-container-low p-stack-md border border-outline-variant">
              <h3 className="font-label-bold text-label-bold uppercase tracking-widest border-b-2 border-primary pb-2 mb-4">Most Read in {categoryName}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="font-display-lg text-display-lg text-outline-variant leading-none">01</span>
                  <div className="space-y-1">
                    <a className="font-label-bold text-label-bold hover:text-secondary leading-tight block cursor-pointer">The Hidden Costs of Global Energy Transitions</a>
                    <span className="font-label-sm text-label-sm text-outline">Analysis • 15k views</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-display-lg text-display-lg text-outline-variant leading-none">02</span>
                  <div className="space-y-1">
                    <a className="font-label-bold text-label-bold hover:text-secondary leading-tight block cursor-pointer">Tensions Rise at the Nordic Border Post-Accord</a>
                    <span className="font-label-sm text-label-sm text-outline">Live Update • 12k views</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-display-lg text-display-lg text-outline-variant leading-none">03</span>
                  <div className="space-y-1">
                    <a className="font-label-bold text-label-bold hover:text-secondary leading-tight block cursor-pointer">The Future of Remote Work in Emerging Markets</a>
                    <span className="font-label-sm text-label-sm text-outline">Economy • 10k views</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-primary-container text-on-primary-container p-stack-md space-y-4">
              <h3 className="font-headline-md text-headline-md text-on-primary font-bold">The {categoryName} Brief</h3>
              <p className="font-label-sm text-label-sm">Get the most important global news delivered to your inbox every morning at 6:00 AM.</p>
              <form className="space-y-2" onSubmit={e => e.preventDefault()}>
                <input className="w-full bg-surface-container-lowest text-primary px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-secondary rounded-none" placeholder="email@agency.com" type="email" />
                <button className="w-full bg-secondary text-on-secondary font-label-bold text-label-bold uppercase py-3 hover:opacity-90 transition-opacity cursor-pointer">Subscribe Now</button>
              </form>
            </div>

            {/* Live Ticker Sidebar */}
            <div className="border border-outline-variant p-stack-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-bold text-label-bold uppercase">Live Market Data</h3>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-3 font-label-sm text-label-sm">
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span>S&P 500</span>
                  <span className="text-green-600">+0.42%</span>
                </div>
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span>Nikkei 225</span>
                  <span className="text-red-600">-0.18%</span>
                </div>
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span>Brent Crude</span>
                  <span className="text-on-surface">$82.45</span>
                </div>
                <div className="flex justify-between">
                  <span>Gold (XAU)</span>
                  <span className="text-on-surface">$2,145.20</span>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </main>
    </div>
  )
}
