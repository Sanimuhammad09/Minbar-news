import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { getArticlesByCategory } from '../server/articles'

export const Route = createFileRoute('/opinion')({
  loader: async () => await getArticlesByCategory({ data: 'opinion' }),
  component: OpinionAnalysis,
})

function OpinionAnalysis() {
  const articles: any = Route.useLoaderData()
  const featured = articles[0]
  const list = articles.slice(1, 4)

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <main className="max-w-7xl mx-auto px-grid-margin pt-stack-lg">
        
        {/* Hero Section: Featured Editorial */}
        {featured ? (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter border-b border-outline-variant pb-section-gap">
            <Link to={`/article/${featured.slug}`} className="lg:col-span-8 group cursor-pointer block">
              <div className="mb-stack-md">
                <span className="text-secondary font-label-bold text-label-bold uppercase tracking-widest border-b border-secondary pb-1">Weekly Editorial</span>
              </div>
              <h1 className="font-display-lg text-display-lg md:text-5xl lg:text-6xl mb-stack-md leading-tight group-hover:text-secondary transition-colors">
                {featured.title}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg first-letter:float-left first-letter:font-headline-lg first-letter:text-[5rem] first-letter:leading-[4rem] first-letter:pt-1 first-letter:pr-2 first-letter:pl-1 first-letter:font-black first-letter:text-primary line-clamp-4">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-stack-md">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" alt={featured.users?.full_name} src={featured.users?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCYi0qpaS9HZdxZomwRGBXXw7LoWQQIjQ5mPiMhYcEY8m3NI8aE-KVF633oy1nISfcSzzZ12lKQOg2xLvdq40Wa-Dn7ZGsPqbvDfL_-BbPThiqaBVZnAgwqiWZsv5-GExzlpEGmb_ijIgPil88ro_ClN63cfEk9M6WiG5OOFXpGMrDsCJmXHfVSjSbgMMEQR6vX1cBVOeTAgSHAi_yzPQLwMyRFPuQPWjVZTVfbLVzvOFJXHuoc1u0"} />
                </div>
                <div>
                  <p className="font-label-bold text-label-bold">{featured.users?.full_name}</p>
                  <p className="font-label-sm text-label-sm text-on-tertiary-container">Chief Editorialist • {new Date(featured.published_at || featured.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
            
            <div className="lg:col-span-4 border-l border-outline-variant pl-gutter hidden lg:block">
              <div className="mb-stack-lg">
                <h3 className="font-label-bold text-label-bold uppercase tracking-tighter mb-stack-md border-b-2 border-primary inline-block">Impactful Analysis</h3>
                <div className="space-y-stack-lg">
                  {list.map((article: any) => (
                    <Link to={`/article/${article.slug}`} key={article.id} className="group cursor-pointer block">
                      <h4 className="font-headline-md text-headline-md leading-snug group-hover:text-secondary transition-colors">{article.title}</h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">{article.users?.full_name} • Opinion</p>
                    </Link>
                  ))}
                  {list.length === 0 && (
                    <p className="text-on-surface-variant text-sm">More opinions coming soon.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="py-12 text-center text-on-surface-variant">
            No opinion articles available at the moment.
          </div>
        )}

        {/* Columnists Grid Section */}
        <section className="py-section-gap">
          <div className="flex justify-between items-end mb-stack-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg">Our Columnists</h2>
              <p className="text-on-surface-variant mt-2">Expert voices from around the globe.</p>
            </div>
            <a className="text-secondary font-label-bold text-label-bold flex items-center gap-1 hover:underline cursor-pointer">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            
            {/* Columnist 1 */}
            <div className="bg-white border border-outline-variant p-stack-md flex flex-col items-center text-center hover:border-secondary transition-colors cursor-pointer group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-stack-md border-2 border-primary p-1">
                <img className="w-full h-full object-cover rounded-full" alt="Anita" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEgUqGFXLS-Cal1x5q-pgoMwLqx1HSrXhR3Fsh5r4DMnIQZAz0c-v9n0V0sIcoJEzkRC6Dx8V1T_ar3vrCCWQkxgOcc6qEsZ3tB68bV65wBlevNjXgSuK-778IFQIQy2r6Hghhtgx7JiB2bRdIUO3IVOngwavkKUJfULviRmG8YE_whcNOyf3Z0thW6F-jiZyUTvTKAeHznNWJpuq0yVk4o47t2n-grobIOB_xJJC6xuoxm9XQGto" />
              </div>
              <h3 className="font-headline-md text-headline-md group-hover:text-secondary">Anita Desai</h3>
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-stack-sm">The Global South</p>
              <p className="text-on-surface-variant font-body-md line-clamp-3">Specializing in emerging markets and the social impact of technological adoption in developing nations.</p>
            </div>
            
            {/* Columnist 2 */}
            <div className="bg-white border border-outline-variant p-stack-md flex flex-col items-center text-center hover:border-secondary transition-colors cursor-pointer group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-stack-md border-2 border-primary p-1">
                <img className="w-full h-full object-cover rounded-full" alt="Julian" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJSJL72eWnuI3-B5zuamdw2_4RxTcu2TGyiubczMd5J8ma3rwMzaJar3pCo1HrfQjp01KQai5wKK7zdBjPIs-2Ycv1BnMbaZ9PB3zKkmtV8eECcgMXjdd8TQwBYMkF1T2qja3EuVMnhMd8OFmytRHfj-yu-daxrMt1rMxCkiJQzNp4f31QQZxObDZQbCYN0WrXRV0ebAkgFs7kXY7sRKs2RDc6HGqBxFYqejt3uw5NWHTR31A03HQ" />
              </div>
              <h3 className="font-headline-md text-headline-md group-hover:text-secondary">Julian Vance</h3>
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-stack-sm">Capital & Power</p>
              <p className="text-on-surface-variant font-body-md line-clamp-3">A deep dive into the boardrooms of the world's largest conglomerates and the legislation that enables them.</p>
            </div>
            
            {/* Columnist 3 */}
            <div className="bg-white border border-outline-variant p-stack-md flex flex-col items-center text-center hover:border-secondary transition-colors cursor-pointer group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-stack-md border-2 border-primary p-1">
                <img className="w-full h-full object-cover rounded-full" alt="Chloe" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9_pGBgHmoVu2Yuz4Equ4qQl2vBCMcKGGpQarjhPB9JRsezD9MZwBpy_t6mwKIaSOjGcAumrVHUCXrrp6Vx53qd62CkPJx5a8_eZMCOQIvBBF9f3CH3YfEqbOmGgbnNG5LXpnS9zCKXOELDpR3rBbH6zJLyZfJabxj4XNsRXHGSja2AVhLOdtqNprBpIhAtv7dabkov3aIELTizhMY7zPb1ggzeNYhHfIEynbYv_dOODwqsh0kS2M" />
              </div>
              <h3 className="font-headline-md text-headline-md group-hover:text-secondary">Chloe Zhang</h3>
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-stack-sm">The Tech Frontier</p>
              <p className="text-on-surface-variant font-body-md line-clamp-3">Investigating the ethics of AI, the future of biotech, and the silicon giants shaping our future.</p>
            </div>
            
            {/* Columnist 4 */}
            <div className="bg-white border border-outline-variant p-stack-md flex flex-col items-center text-center hover:border-secondary transition-colors cursor-pointer group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-stack-md border-2 border-primary p-1">
                <img className="w-full h-full object-cover rounded-full" alt="Robert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDukfoWppjQ4eqBULfSm9d8uWqiZOwAxiA1KD9ctZT-_OdkKNNd7CWSnLJnFRJ4a91fr1yXycBWT_S8GZt4jlSxQE-twmAfGPrl-FaYNrlnIxbP23TzDbmHL13Jz_OQf8avbD0oN3-Ym6hniMydBlc5BqGW2M2rWjs7WBnccnhmmGX_TjDtgYpvOI6_ed8uWlablwFlsfR08vu7W-GZA0GklxcUu-KnVS4pjMUs3nJ1yc1gcApsfc" />
              </div>
              <h3 className="font-headline-md text-headline-md group-hover:text-secondary">Dr. Robert Cole</h3>
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-stack-sm">Public Health</p>
              <p className="text-on-surface-variant font-body-md line-clamp-3">Bringing scientific rigor to the most pressing global health crises and environmental challenges of our time.</p>
            </div>
          </div>
        </section>

        {/* Letters to the Editor & Submission */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter py-section-gap border-t border-outline-variant">
          <div className="lg:col-span-4 bg-surface-container-low p-stack-lg border border-outline-variant">
            <h2 className="font-headline-lg text-headline-lg mb-stack-md">Letter to the Editor</h2>
            <p className="text-on-surface-variant mb-stack-lg">We welcome diverse perspectives. Submit your thoughts on our recent coverage for a chance to be featured in our weekly print edition.</p>
            <form className="space-y-stack-md" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block font-label-bold text-label-bold text-primary mb-1">Full Name</label>
                <input className="w-full bg-white border border-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-none p-3" placeholder="Your name" type="text" />
              </div>
              <div>
                <label className="block font-label-bold text-label-bold text-primary mb-1">Email Address</label>
                <input className="w-full bg-white border border-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-none p-3" placeholder="email@example.com" type="email" />
              </div>
              <div>
                <label className="block font-label-bold text-label-bold text-primary mb-1">Your Perspective</label>
                <textarea className="w-full bg-white border border-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-none p-3" placeholder="Share your analysis..." rows={5}></textarea>
              </div>
              <button className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-4 uppercase tracking-widest hover:bg-secondary transition-all cursor-pointer">Submit Analysis</button>
            </form>
          </div>
          <div className="lg:col-span-8">
            <h3 className="font-label-bold text-label-bold uppercase tracking-widest text-secondary mb-stack-md border-b-2 border-secondary inline-block">Voices of the Readers</h3>
            <div className="space-y-stack-lg mt-stack-md">
              <div className="p-stack-md border-b border-outline-variant pb-stack-lg">
                <h4 className="font-headline-md text-headline-md mb-2 italic">"On the Fragility of Logistics"</h4>
                <p className="font-body-md text-body-md text-on-surface mb-stack-md">"Thorne's analysis of global supply chains misses the crucial point about small-scale resilience. Our reliance on the 'just-in-time' model is not just a logistical error; it's a moral failure that prioritizes profit over community stability..."</p>
                <p className="font-label-bold text-label-bold">— Helena Rossi, Milan</p>
              </div>
              <div className="p-stack-md border-b border-outline-variant pb-stack-lg">
                <h4 className="font-headline-md text-headline-md mb-2 italic">"A Rebuttal: The Real Cost of Green Energy"</h4>
                <p className="font-body-md text-body-md text-on-surface mb-stack-md">"While I applaud Jenkins' focus on megacities, we must be honest about the environmental impact of lithium extraction in the global south. To save the north, we are scarring the south..."</p>
                <p className="font-label-bold text-label-bold">— David M. Okafor, Lagos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Atmospheric Secondary Feature */}
        <section className="py-section-gap w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div className="relative h-[500px] flex items-center justify-center text-center p-grid-margin overflow-hidden bg-primary">
            <div className="absolute inset-0 z-0 opacity-40">
              <img className="w-full h-full object-cover" alt="Feature" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG7fq2-57Ayj0uQpQTEwbVQjIQlSeGU5YNN160bsJuRB88kw2sWmktsYiTuO8znQfLFjv0q6yzMtu-CJwdG3iUvMqupvdoZWZTo28SmYOrmIRFs8QsJTjwDo0P3T9hT3aH0aXSZCnsfe8vOPvrHI8sLHS_1arRF1BuZqW_W7KLUwWzHfSuKDYKbKjYvunL-p02TSyhWfR6nfus8u4INcJHMRKY0LQ-LQ-LXKKKNcM6U7BSjt7Lc_Q" />
            </div>
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-primary"></div>
            <div className="relative z-20 max-w-2xl text-on-primary">
              <span className="font-label-bold text-label-bold uppercase tracking-[0.3em] mb-stack-md block">Special Report</span>
              <h2 className="font-display-lg text-display-lg mb-stack-lg leading-tight">The 2024 Global Ethics Accord: Why it Matters for You.</h2>
              <button className="border-2 border-on-primary text-on-primary font-label-bold text-label-bold px-stack-lg py-4 uppercase tracking-widest hover:bg-on-primary hover:text-primary transition-all cursor-pointer">Read the Full Analysis</button>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
