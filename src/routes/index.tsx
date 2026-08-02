import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null)

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen flex flex-col">
      <main className="flex-grow max-w-7xl mx-auto px-grid-margin py-stack-lg w-full">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-section-gap">
          <Link 
            to="/article/$articleId" 
            params={{ articleId: 'summit-for-the-future' }}
            className="lg:col-span-8 relative group overflow-hidden bg-primary cursor-pointer block"
          >
            <div className="aspect-[16/9] w-full">
              <img 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" 
                alt="Hero" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzhmeXFqkH9aKCQbLE4uJN_eyF0nE5cJ_uEhrCth46U3aDfXAUaQ_otqLDpe1Dp7nePZr9LPcOoAUoxqUokCRvvC5VsvPE-SfWfKwcg8dGt0m9xqQcaJkw0Xiv-3AyC4Ym70uKKabXAFA8AsGrAcMWDQ5JOwqLQ32R8z069KeQGnDqR7uD2Nw3QvYBEsNFYo0KrlOKIfEMBrih4TLdjV0Dpwj5-CKpEjcmTSrA0wM5nnAg0CD168s" 
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-stack-lg">
              <span className="inline-block bg-secondary text-on-secondary px-3 py-1 text-label-sm font-label-bold uppercase mb-4 w-fit">World News</span>
              <h2 className="font-headline-lg text-headline-lg text-on-primary mb-4 leading-tight font-serif">
                Summit for the Future: Global Leaders Converge to Address Climate Debt and Economic Sovereignty
              </h2>
              <p className="text-on-primary-container font-body-md text-body-md line-clamp-2 mb-4 opacity-90">
                In a historic move, representatives from over 150 nations have gathered to draft a new framework for international cooperation, focusing on the redistribution of resources and the mitigation of historical environmental impact.
              </p>
              <div className="flex items-center gap-4 text-on-primary-container text-label-sm font-label-sm">
                <span>By Elena Vance</span>
                <span className="w-1 h-1 bg-secondary rounded-full"></span>
                <span>4 mins read</span>
              </div>
            </div>
          </Link>
          
          {/* Side Live Updates */}
          <aside className="lg:col-span-4 flex flex-col gap-stack-md">
            <div className="flex items-center justify-between border-b border-primary pb-2">
              <h3 className="font-label-bold text-label-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                Live Updates
              </h3>
              <Link to="/live" className="text-secondary text-label-sm font-label-bold hover:underline cursor-pointer">View All</Link>
            </div>
            <div className="space-y-4">
              <Link to="/article/$articleId" params={{ articleId: 'central-bank-rate' }} className="group cursor-pointer block">
                <p className="text-label-sm text-secondary font-label-bold mb-1">14:32 GMT</p>
                <h4 className="font-headline-md text-[18px] leading-snug font-serif group-hover:text-secondary transition-colors">
                  Central Bank announces surprise rate hike to combat inflation
                </h4>
              </Link>
              <Link to="/article/$articleId" params={{ articleId: 'protests-coastal-cities' }} className="group cursor-pointer border-t border-outline-variant pt-4 block">
                <p className="text-label-sm text-secondary font-label-bold mb-1">13:15 GMT</p>
                <h4 className="font-headline-md text-[18px] leading-snug font-serif group-hover:text-secondary transition-colors">
                  Protests erupt in major coastal cities over housing costs
                </h4>
              </Link>
              <Link to="/article/$articleId" params={{ articleId: 'neural-sync-chip' }} className="group cursor-pointer border-t border-outline-variant pt-4 block">
                <p className="text-label-sm text-secondary font-label-bold mb-1">11:50 GMT</p>
                <h4 className="font-headline-md text-[18px] leading-snug font-serif group-hover:text-secondary transition-colors">
                  Tech giant reveals 'Neural-Sync' chip for public testing
                </h4>
              </Link>
            </div>
            {/* Mini Ad/CTA */}
            <div className="mt-auto bg-primary-container p-6 border-t-4 border-secondary">
              <h5 className="text-on-primary font-headline-md font-serif mb-2">Support Independent Journalism</h5>
              <p className="text-on-primary-container font-label-sm text-label-sm mb-4">Deep analysis and truth-driven reporting for a complex world.</p>
              <Link to="/newsletters" className="block text-center w-full bg-secondary text-on-secondary py-2 font-label-bold text-label-bold uppercase hover:bg-opacity-90 transition-all cursor-pointer">Subscribe Now</Link>
            </div>
          </aside>
        </section>

        {/* MAIN GRID SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: News Grid */}
          <div className="lg:col-span-8 space-y-section-gap">
            {/* World News Section */}
            <section>
              <div className="flex items-center justify-between mb-stack-lg border-b-2 border-primary pb-2">
                <h2 className="font-headline-lg text-headline-lg font-serif uppercase tracking-tighter">World News</h2>
                <Link to="/category/$categoryId" params={{ categoryId: 'world' }} className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80">arrow_forward</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
                <Link 
                  to="/article/$articleId" params={{ articleId: 'silent-shift' }}
                  className="group cursor-pointer block"
                  onMouseEnter={() => setHoveredArticle('world1')}
                  onMouseLeave={() => setHoveredArticle(null)}
                  style={{ transform: hoveredArticle === 'world1' ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease-out' }}
                >
                  <div className="aspect-video bg-surface-container-high mb-4 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="World 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd5G_GfP8jAyWOuet7uLiD9P9D07N44beU77p_1k0alhX4saRzdoF1HDM4b8XHA_jJLmIV4rHSVJrWITiHsaQnigu7NdGOEFvCS6XrZmMsh3HvQskmP9ehzRh9VrVlFNlVUaQ3T_5zUgtD8chT9mFuEXLhwl601FIdS-YRL6MV3e408H39nxGK4jhwLfDJ4i_cpnFr7ICSof1GYx-7Em9E_tb-gGIZhgPx-f4qKfHQ-xgcGtwkBw8" />
                  </div>
                  <span className="text-secondary font-label-bold text-label-sm uppercase tracking-widest mb-2 block">Supply Chain</span>
                  <h3 className="font-headline-md text-headline-md font-serif leading-tight mb-2 group-hover:underline underline-offset-4 decoration-secondary">The Silent Shift: How Trade Routes are Bypassing Traditional Hubs</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">New geopolitical alliances are creating a second tier of global shipping routes that promise faster delivery but higher costs.</p>
                </Link>
                <Link 
                  to="/article/$articleId" params={{ articleId: 'tech-infused-conservation' }}
                  className="group cursor-pointer block"
                  onMouseEnter={() => setHoveredArticle('world2')}
                  onMouseLeave={() => setHoveredArticle(null)}
                  style={{ transform: hoveredArticle === 'world2' ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease-out' }}
                >
                  <div className="aspect-video bg-surface-container-high mb-4 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="World 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHaRrVcAO-WAK5asVqLj5Fa3uozIBCZ6E5RFTJkkCgykdB-Zw9SEyQFka6QvmUVdi3g95qFh4cQGom983C6KLrUVT8sy6Sydvz1tEYGF7wG8KqfNAF5YaS9UakGhU86Asxxa6VMYZidlsr8wzcSRr652telte4cRfqmavtfeueYUeLbajsOZvWkBwowDxccMlEE9ez1TDbpDMxRemFwCny4R_1FbTMxhPXnn6_tkpumBI4Vzb0gXI" />
                  </div>
                  <span className="text-secondary font-label-bold text-label-sm uppercase tracking-widest mb-2 block">Sustainability</span>
                  <h3 className="font-headline-md text-headline-md font-serif leading-tight mb-2 group-hover:underline underline-offset-4 decoration-secondary">Tech-Infused Conservation: The New Era of Forest Guardianship</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">Autonomous drones and AI sensors are now the primary defense against illegal logging in the world's most vulnerable ecosystems.</p>
                </Link>
              </div>
            </section>

            {/* Politics & Economy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
              {/* Politics Column */}
              <section>
                <div className="flex items-center justify-between mb-stack-md border-b border-outline-variant pb-2">
                  <h2 className="font-label-bold text-label-bold uppercase text-primary">Politics</h2>
                </div>
                <div className="space-y-6">
                  <Link 
                    to="/article/$articleId" params={{ articleId: 'electoral-reform' }}
                    className="flex gap-4 group cursor-pointer"
                    onMouseEnter={() => setHoveredArticle('pol1')}
                    onMouseLeave={() => setHoveredArticle(null)}
                    style={{ transform: hoveredArticle === 'pol1' ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease-out' }}
                  >
                    <div className="w-24 h-24 shrink-0 bg-surface-container-high overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Pol 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_ygndrSoi19WuxLce1FK5E4cT7bJ78-V1-MJjZ-c7yiHLsIGXMZOAX0skx_IA0uZT4GXl_IWeXlEjjMxn_J3DqeOOV6cVmXZuyETCpl1bcLrrVl2DvTAzCTORNcnqEpBTVXpSt88e5yBuQwGx9DSo3WyohXwSIA95o7L1W6d9muy0OdLTr-Yv-HFw4sK6qyBe4AoDy6ML2GP_JWuU9nhyxTAOZM_c8ni7AdrMbf8kl0pLoTY-wjw" />
                    </div>
                    <div>
                      <h4 className="font-headline-md text-[18px] leading-tight font-serif mb-1 group-hover:text-secondary">Electoral Reform Bill Faces Crucial Vote in Senate</h4>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">2 hours ago</p>
                    </div>
                  </Link>
                  <Link 
                    to="/article/$articleId" params={{ articleId: 'bilateral-talks' }}
                    className="flex gap-4 group cursor-pointer"
                    onMouseEnter={() => setHoveredArticle('pol2')}
                    onMouseLeave={() => setHoveredArticle(null)}
                    style={{ transform: hoveredArticle === 'pol2' ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease-out' }}
                  >
                    <div className="w-24 h-24 shrink-0 bg-surface-container-high overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Pol 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ74C3qi7n1Vzd8a5owQIc9n1ld2a7NpYKQYRgYxNVk3zXDewdhRvbr4Lonq6sr9LPdGCuo7Mz_sK8-38wbPitx9pxoRxYPZHbgOWSbacPdhFwZUU9cfmcag-VRD9LSmMDusx39nB83KTXVv1w7HMNvDNngxpc6i9QkWbqiedsneNNcN6K4UuJG9vb9ETQEjmXN_Gkfk3JtUM8h3i7aB-COOJN7_S5Tp6NSPc5Vri34RmGpf9VqZE" />
                    </div>
                    <div>
                      <h4 className="font-headline-md text-[18px] leading-tight font-serif mb-1 group-hover:text-secondary">Bilateral Talks Begin Between Regional Superpowers</h4>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">5 hours ago</p>
                    </div>
                  </Link>
                </div>
              </section>

              {/* Economy Column */}
              <section>
                <div className="flex items-center justify-between mb-stack-md border-b border-outline-variant pb-2">
                  <h2 className="font-label-bold text-label-bold uppercase text-primary">Economy</h2>
                </div>
                <div className="space-y-6">
                  <Link 
                    to="/article/$articleId" params={{ articleId: 'market-volatility' }}
                    className="flex gap-4 group cursor-pointer"
                    onMouseEnter={() => setHoveredArticle('eco1')}
                    onMouseLeave={() => setHoveredArticle(null)}
                    style={{ transform: hoveredArticle === 'eco1' ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease-out' }}
                  >
                    <div className="w-24 h-24 shrink-0 bg-surface-container-high overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Eco 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYm7FL7fEjA6TCATGU0cCFO4lCtE9vcmPqHGzDvCU9Z3jgvee_FBCeKR-sRAuP4GCjmQDPQEbJapJ-R3F9yOI04xn-ZidrObgIl5s3TCtfj5eNgJUyjL75TZakis_0_DHsDfzlS2FK8Mly0loFL7QYo8457NgeukDdkwE13hjKNaaB6XXRnkcOTJqSywFGDJSl6uehYjnEmZnCy-7IbuD2a5FyOalxJlvxm--cnTRKMeBLLtW6P5o" />
                    </div>
                    <div>
                      <h4 className="font-headline-md text-[18px] leading-tight font-serif mb-1 group-hover:text-secondary">Market Volatility Increases Amid Energy Uncertainty</h4>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">1 hour ago</p>
                    </div>
                  </Link>
                  <Link 
                    to="/article/$articleId" params={{ articleId: 'gold-record-highs' }}
                    className="flex gap-4 group cursor-pointer"
                    onMouseEnter={() => setHoveredArticle('eco2')}
                    onMouseLeave={() => setHoveredArticle(null)}
                    style={{ transform: hoveredArticle === 'eco2' ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease-out' }}
                  >
                    <div className="w-24 h-24 shrink-0 bg-surface-container-high overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Eco 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw9KSZLfROmVOXOPnD1urxGq-tBeKg6n1XbXP9cPqINABAo5R1GVutg_SiXJ5V1GczMI_f_vwtVuGcHpS-JBiBpYQviHUODkqvigbiaX3hrXyUnfp0h1X5dKymftNzptjMqCQ_S3GoEqbZ_13H_E-7VqjTNkoJAfI2XSWb-pxpR_qg9hSg1HV0GM0DyLP8NCyncGTE25gtfDBADSljCo5i0xc4ZULB10beTrNFfyBmKHChe9XRe_k" />
                    </div>
                    <div>
                      <h4 className="font-headline-md text-[18px] leading-tight font-serif mb-1 group-hover:text-secondary">Gold Reaches Record Highs as Investors Seek Safe Havens</h4>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">8 hours ago</p>
                    </div>
                  </Link>
                </div>
              </section>
            </div>
          </div>
          
          {/* Right Column: Opinion Sidebar */}
          <aside className="lg:col-span-4">
            <div className="bg-surface-container-low p-stack-lg border-l border-outline-variant h-full">
              <Link to="/opinion" className="block w-full">
                <h2 className="font-headline-lg text-headline-lg mb-stack-lg uppercase tracking-tighter font-serif hover:text-secondary transition-colors after:content-[''] after:block after:w-10 after:h-[2px] after:bg-secondary after:mt-2">Opinion</h2>
              </Link>
              
              <div className="space-y-stack-lg">
                <Link 
                  to="/article/$articleId" params={{ articleId: 'death-of-neutrality' }}
                  className="group cursor-pointer block"
                  onMouseEnter={() => setHoveredArticle('op1')}
                  onMouseLeave={() => setHoveredArticle(null)}
                  style={{ transform: hoveredArticle === 'op1' ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease-out' }}
                >
                  <h3 className="font-headline-md text-headline-md italic font-serif mb-2 group-hover:text-secondary">"The Death of Neutrality: Why Media Must Take a Stand on Global Ethics"</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container"></div>
                    <div>
                      <p className="font-label-bold text-label-bold">Dr. Aris Thorne</p>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">Chief Correspondent</p>
                    </div>
                  </div>
                </Link>
                <Link 
                  to="/article/$articleId" params={{ articleId: 'universal-basic-income' }}
                  className="group cursor-pointer pt-stack-md border-t border-outline-variant block"
                  onMouseEnter={() => setHoveredArticle('op2')}
                  onMouseLeave={() => setHoveredArticle(null)}
                  style={{ transform: hoveredArticle === 'op2' ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease-out' }}
                >
                  <h3 className="font-headline-md text-headline-md italic font-serif mb-2 group-hover:text-secondary">"Universal Basic Income: Not a Welfare Dream, But a Robotic Reality"</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary"></div>
                    <div>
                      <p className="font-label-bold text-label-bold">Sarah Jenkins</p>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">Economist</p>
                    </div>
                  </div>
                </Link>
                <Link 
                  to="/article/$articleId" params={{ articleId: 'flooded-world' }}
                  className="group cursor-pointer pt-stack-md border-t border-outline-variant block"
                  onMouseEnter={() => setHoveredArticle('op3')}
                  onMouseLeave={() => setHoveredArticle(null)}
                  style={{ transform: hoveredArticle === 'op3' ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease-out' }}
                >
                  <h3 className="font-headline-md text-headline-md italic font-serif mb-2 group-hover:text-secondary">"Architecture for a Flooded World: Reimagining Our Coastal Urban Sprawl"</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary"></div>
                    <div>
                      <p className="font-label-bold text-label-bold">Marcus Ling</p>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">Urban Theorist</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Newsletter Box */}
              <div className="mt-section-gap p-6 bg-primary text-on-primary">
                <h4 className="font-headline-md font-serif mb-2">The Perspective</h4>
                <p className="font-label-sm text-label-sm mb-4 opacity-80">Our weekly deep-dive into the stories that define the decade. Delivered every Friday morning.</p>
                <input className="w-full bg-white text-primary border-none p-2 mb-2 font-label-bold text-label-bold focus:outline-none" placeholder="Email Address" type="email" />
                <button className="w-full bg-secondary text-on-secondary py-2 font-label-bold text-label-bold uppercase hover:opacity-90 cursor-pointer">Join The Briefing</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
