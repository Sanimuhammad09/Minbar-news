import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/article/$articleId')({
  component: ArticleView,
})

function ArticleView() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md overflow-x-hidden min-h-screen">
      {/* Reading Progress Bar (Fixed at top just below the global header which is usually sticky) */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none mt-[72px]">
        <div 
          className="bg-secondary h-1 transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-grid-margin grid grid-cols-12 gap-gutter py-stack-lg relative">
        
        {/* Social Sidebar (Left - Desktop Only) */}
        <aside className="hidden lg:flex lg:col-span-1 flex-col items-center pt-stack-lg sticky top-32 h-fit space-y-6">
          <button className="group flex flex-col items-center space-y-1 cursor-pointer">
            <span className="material-symbols-outlined p-3 rounded-full border border-outline-variant text-on-surface-variant group-hover:bg-secondary group-hover:text-white transition-all">share</span>
            <span className="text-[10px] font-label-bold uppercase text-outline">Share</span>
          </button>
          <button className="group flex flex-col items-center space-y-1 cursor-pointer">
            <span className="material-symbols-outlined p-3 rounded-full border border-outline-variant text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all">bookmark</span>
            <span className="text-[10px] font-label-bold uppercase text-outline">Save</span>
          </button>
          <button className="group flex flex-col items-center space-y-1 cursor-pointer">
            <span className="material-symbols-outlined p-3 rounded-full border border-outline-variant text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all">mode_comment</span>
            <span className="text-[10px] font-label-bold uppercase text-outline">124</span>
          </button>
          <div className="h-16 w-[1px] bg-outline-variant"></div>
          <button className="group cursor-pointer">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary transition-colors">print</span>
          </button>
        </aside>

        {/* Article Container */}
        <article className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-0 md:p-stack-lg lg:bg-transparent lg:p-0">
          
          {/* Category Tag */}
          <div className="mb-stack-md">
            <span className="font-label-sm text-label-bold uppercase text-secondary tracking-widest border-b border-secondary pb-1">Geopolitics & Ethics</span>
          </div>
          
          {/* Headline */}
          <h1 className="font-headline-lg text-display-lg md:text-5xl lg:text-6xl text-primary leading-tight mb-stack-md">
            The Silent Renaissance: How Digital Sovereignty is Reshaping Global Trust.
          </h1>
          
          {/* Meta & Author Bio */}
          <div className="flex items-center space-x-4 mb-stack-lg pb-stack-lg border-b border-outline-variant">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover" alt="Author" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFfDfzB9_DNHdxtZ8JEikW4CHi7kke3RKlna0h9L12dMUL_PH1wKrbO5MqmA2WUs0fyG_K-frRD528Suf3nEnHme7Rlr4I4PrOdALeRD4rN-zOK8RrBMBt1gMPEwE_RLTZt_PJd87jTBl9jOctKERB853AL6I6jYukRB4A03ciFvQVfFZGQSdwo27rme9B51bscaCu9yfVXCQUxgaJsP1nLKDpbtIWbijq6DBpllmTV-GacZjMaY4" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-bold text-label-bold text-primary">Dr. Elias Vance</span>
              <div className="flex items-center space-x-2 text-on-surface-variant text-label-sm">
                <span>Senior Editorial Fellow</span>
                <span className="text-outline-variant">•</span>
                <time dateTime="2024-08-24">August 24, 2024</time>
                <span className="text-outline-variant">•</span>
                <span>8 min read</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <figure className="mb-stack-lg">
            <div className="aspect-[16/9] w-full overflow-hidden mb-2">
              <img className="w-full h-full object-cover" alt="Hero" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMHJm4xd4QUcG4eTE57SuAkfrjZtvoMwoYFqUssU6bC-DUmYqvgwpU3IqBbUg_AtFD8QIbyU4_fjLpjVp0903YuLpmBKAKG2P26wQMY6Cpwb1qI0ihnnOPDSQdsSd12QYX75ACcrRF8c9bh_Gx5Q2HK-O2Pzxp8tU5ZydG5j6bD2cJ6JYvWhZUX50EvkQ8bvPAfGHsGPZEpjSKMCQYul4pSFqB1hD9fGlQl-xCgIv7NxEvOwXQkNw" />
            </div>
            <figcaption className="text-label-sm text-on-surface-variant italic">
              The intersection of infrastructure and data sovereignty. Visual by Minbar Global Archive.
            </figcaption>
          </figure>
          
          {/* Article Body Content */}
          <div className="font-body-md text-body-lg leading-relaxed text-on-surface space-y-stack-lg max-w-none">
            <p>
              <span className="text-5xl float-left mr-3 mt-1 font-headline-lg font-bold text-primary leading-[0.8]">I</span>n an era increasingly defined by the erosion of traditional institutional trust, a new architecture of sovereignty is emerging from the digital periphery. No longer content with mere participation, nations and individuals alike are seeking a fundamental recalibration of their relationship with the structures that govern their lives.
            </p>
            <p>
              This is not merely a technical shift. It is a profound philosophical realignment. For decades, the global order has relied on centralized nodes of power—financial, communicative, and jurisdictional. Today, those nodes are being challenged by decentralized protocols that prioritize transparency and mathematical certainty over bureaucratic discretion.
            </p>
            
            {/* Pull Quote */}
            <blockquote className="my-stack-lg py-stack-md border-y-2 border-secondary relative">
              <span className="material-symbols-outlined absolute -top-4 left-4 bg-background px-2 text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
              <p className="font-headline-md text-headline-md italic text-primary px-4 md:px-12 text-center leading-relaxed">
                "The pursuit of truth is no longer a passive observation of the status quo, but an active engagement with the protocols that define our reality."
              </p>
            </blockquote>
            
            <h2 className="font-headline-lg text-headline-lg text-primary pt-stack-md">The Ethics of Transparency</h2>
            <p>
              As we navigate the complexities of this transition, the primary challenge remains one of ethics. How do we ensure that the democratization of data leads to genuine empowerment rather than sophisticated new forms of enclosure? The answer lies in our commitment to "Truth, Perspective, and Impact"—the core pillars that must ground our collective advancement.
            </p>
            <p>
              Recent case studies in the Global South suggest that digital sovereignty is providing a lifeline for economies previously marginalized by the traditional banking system. By bypassing intermediary hurdles, these regions are leapfrogging entire generations of industrial development.
            </p>
            
            {/* Embedded Micro-card */}
            <div className="bg-surface-container-low p-stack-md border-l-4 border-primary my-stack-lg">
              <h4 className="font-label-bold text-label-bold uppercase text-primary mb-2">Editor's Note: Tracking the Impact</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Our research team has compiled a detailed report on regional data laws across 45 countries. Subscribers can access the full dashboard via the <a className="text-secondary underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer">Editorial Desk</a> portal.
              </p>
            </div>
            
            <p>
              Ultimately, the renaissance of trust will not be built on promises, but on code. It will be built on the verifiable, the immutable, and the inclusive. As we continue to document these shifts at Minbar News, our role remains unchanged: to provide the clarity required to turn perspective into meaningful impact.
            </p>
          </div>
          
          {/* Tags & Sharing Footer */}
          <div className="mt-section-gap pt-stack-lg border-t border-outline-variant flex flex-wrap gap-2">
            <a className="font-label-sm text-label-sm px-3 py-1 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors cursor-pointer">Digital Sovereignty</a>
            <a className="font-label-sm text-label-sm px-3 py-1 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors cursor-pointer">Global Trust</a>
            <a className="font-label-sm text-label-sm px-3 py-1 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors cursor-pointer">Technology Ethics</a>
            <a className="font-label-sm text-label-sm px-3 py-1 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors cursor-pointer">Future Governance</a>
          </div>
        </article>
        
        {/* Right Sidebar (Latest/Related) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-stack-lg">
          
          {/* Newsletter Sign-up */}
          <div className="border border-outline-variant p-stack-md bg-surface-container-lowest">
            <h3 className="font-label-bold text-label-bold uppercase text-primary mb-2">The Perspective Daily</h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">Deep analysis delivered to your inbox every morning at 6 AM.</p>
            <form className="space-y-3" onSubmit={e => e.preventDefault()}>
              <input className="w-full font-label-sm text-label-sm border-outline-variant focus:border-primary focus:ring-0 rounded-none bg-surface p-2 border outline-none" placeholder="Email Address" type="email" />
              <button className="w-full bg-primary text-on-primary font-label-bold text-label-bold uppercase py-2 hover:opacity-90 transition-opacity cursor-pointer">Subscribe</button>
            </form>
          </div>
          
          {/* Related Articles */}
          <div>
            <h3 className="font-label-bold text-label-bold uppercase text-secondary mb-stack-md flex items-center">
              <span className="w-8 h-[2px] bg-secondary mr-2"></span>
              Latest Analysis
            </h3>
            <div className="space-y-stack-md">
              <article className="group cursor-pointer">
                <div className="aspect-video w-full overflow-hidden mb-2 bg-surface-container">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Related 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZwSQHo0wGLfeywrBFb9v4r-BtRsWEKZDrfaBUPbKaeo7KcGcYfecCvpmZjajbdAdox_3XjCY-j5b74tAVz1swIV42SWniFwqC0uzm1cHRdzjt1VFw-FzB2G-VZ1RQhgBqya2RPY1rSwnf8Lb8MQzUbf9KIu_JKd7xD9JV6R8Pb4rpPbYL63o5ndahbY4MlTzV4dSU8Lm8-A5oie4iKP3d-vbGzTwVlyj3KgM0sAHJZIhJSFcnkPE" />
                </div>
                <h4 className="font-headline-md text-[18px] text-primary group-hover:text-secondary transition-colors leading-tight">Reimagining Judicial Accountability in the Age of AI.</h4>
                <span className="font-label-sm text-label-sm text-outline-variant mt-1 block">5 min read</span>
              </article>
              <div className="h-[1px] bg-outline-variant w-full"></div>
              <article className="group cursor-pointer">
                <h4 className="font-headline-md text-[18px] text-primary group-hover:text-secondary transition-colors leading-tight">The Green Corridor: Infrastructure as a Catalyst for Peace.</h4>
                <span className="font-label-sm text-label-sm text-outline-variant mt-1 block">12 min read</span>
              </article>
              <div className="h-[1px] bg-outline-variant w-full"></div>
              <article className="group cursor-pointer">
                <h4 className="font-headline-md text-[18px] text-primary group-hover:text-secondary transition-colors leading-tight">Cyber-Resilience: The New Frontier of National Defense.</h4>
                <span className="font-label-sm text-label-sm text-outline-variant mt-1 block">9 min read</span>
              </article>
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom "Read More" Grid */}
      <section className="max-w-7xl mx-auto px-grid-margin py-section-gap border-t border-outline-variant">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-lg">Explore Further Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          <div className="flex flex-col group cursor-pointer">
            <div className="aspect-[16/9] bg-surface-container overflow-hidden mb-4">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Grid 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtellVVaayH5p3NE-q2sAHBSqgQnWKHudQ7xf8RcNWQ7GlnJEm0l05_La_a77QzD1vh1zahBLxytGdwAsyYZooJbrDxIEB69dVUpybzM6JatY9MFhSmGzXHUssHuMcTSsqHCU8ZPfWj43EOycZqgpoIorWyTUk0lhKMOJVv6k9UrSGsv-G2xajEHPiaBDbkp9stQ4e8B2NtiFqzXHw2PcG7hEPmuVFs-68g1HBw80fXqu-yqbt0OA" />
            </div>
            <span className="font-label-sm text-[10px] uppercase font-bold text-secondary tracking-widest mb-2">World News</span>
            <h3 className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-secondary transition-colors">Navigating the New Silk Road: Economic Realities.</h3>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">A deep-dive into the logistical and ethical implications of trans-continental trade networks.</p>
          </div>
          <div className="flex flex-col group cursor-pointer">
            <div className="aspect-[16/9] bg-surface-container overflow-hidden mb-4">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Grid 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7yytjaImX2AFkcalQw6ishl6U1PpxFBZNHBkXc-QG4eiQ7yb0mR5pJkvqUffP2rT_AkYd6I0eqwXCE7_aLc6K1SLx2rLbsaZ9ADU18fEdJAPhXIo65E5Y8f7Xkp-hvY9GPaHLnbGeDxmWEtClE0FJz02zRc6sal5xqClNNbhy_vyswxel2i-dg1k_ZUTcwZT3ewuQ1Zm09jl6og3bSHs4QzhjVIU9z2Zf0Id_DkZaE2Ej2aYqAm4" />
            </div>
            <span className="font-label-sm text-[10px] uppercase font-bold text-secondary tracking-widest mb-2">Analysis</span>
            <h3 className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-secondary transition-colors">The Algorithms of Choice: Predicting Human Intent.</h3>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">How predictive modeling is fundamentally altering the landscape of political discourse.</p>
          </div>
          <div className="flex flex-col group cursor-pointer">
            <div className="aspect-[16/9] bg-surface-container overflow-hidden mb-4">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Grid 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzz8DeEatSPNbdFZps9GOui0_BoVgkrAnJcTwo2UrSEmbaz2VJketDL8HfPbYSUdGqyqN1Sl2EEMRsDjmW_33u-iaX_pTeBzW55_p28GaDtQNuxsQ23R5za5iony69fVNFmTImOv_11_c-wuoqvFuaJfH9rrZeL1T2_vlYiAjFh5IFb_Zm4eL4D471sx8xY5m90JWJccgT6weCoD3K6fBhVtq776EJeEzaX2HFo6_Mx0BGww0oRjs" />
            </div>
            <span className="font-label-sm text-[10px] uppercase font-bold text-secondary tracking-widest mb-2">Impact</span>
            <h3 className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-secondary transition-colors">Sustainable Cities: Lessons from the Vanguard.</h3>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Exploring the urban centers that have successfully integrated nature with hyper-efficiency.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
