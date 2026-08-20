import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen">
      <main className="max-w-7xl mx-auto px-grid-margin py-stack-lg">
        <section className="flex flex-col md:flex-row gap-gutter items-center border-b border-outline-variant pb-section-gap mb-section-gap">
          <div className="md:w-1/2">
            <h1 className="font-display-lg text-display-lg text-primary mb-stack-md leading-tight">
              Truth in a Complex World.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Minbar News was founded on the principle that clear, rigorous journalism is the cornerstone of a functioning global society. We go beyond the headlines to provide the analysis and context necessary to understand the forces shaping our world.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="aspect-video bg-surface-container relative overflow-hidden">
              <img className="w-full h-full object-cover grayscale-[0.2]" alt="Minbar News Office" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjDjqIe1SdnfNg0KHxQvW9au5NRuSnO2iae4gkypcK0B_9njKY_5YKit0XxgcWWME31G51v_wh0YBEpw_0SwWqWoAy908NcWbV2k1Xsyi-o0pdR2LVeX906LMjy2751XuJX_VQG87jPJzirmN2dGARB3cu-IDreCEYe_i_F-jJUSBrZm5bVJmDvM3b_KUDVbPkxAbNquKvWhjy9LKaMwodH1IcC59pQJtAne1kOxPtjId5elfjVJQ" />
              <div className="absolute inset-0 bg-primary/10"></div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-section-gap">
          <div className="bg-surface-container-low p-stack-lg border-t-4 border-secondary">
            <h3 className="font-headline-md text-headline-md text-primary mb-4">Our Mission</h3>
            <p className="text-on-surface-variant text-sm">To deliver uncompromising, objective journalism that empowers our readers to make informed decisions in an interconnected global economy.</p>
          </div>
          <div className="bg-surface-container-low p-stack-lg border-t-4 border-secondary">
            <h3 className="font-headline-md text-headline-md text-primary mb-4">Global Reach</h3>
            <p className="text-on-surface-variant text-sm">With bureaus in 14 major economic hubs, we bring local expertise to global narratives, ensuring our reporting is grounded in reality, not just rhetoric.</p>
          </div>
          <div className="bg-surface-container-low p-stack-lg border-t-4 border-secondary">
            <h3 className="font-headline-md text-headline-md text-primary mb-4">Editorial Integrity</h3>
            <p className="text-on-surface-variant text-sm">We are independently funded and fiercely protective of our editorial independence. Our loyalty is to the truth, and to our readers.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
