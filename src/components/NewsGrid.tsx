export default function NewsGrid() {
  return (
    <div className="lg:col-span-8 space-y-section-gap">
      {/* World News Section */}
      <section>
        <div className="flex items-center justify-between mb-stack-lg border-b-2 border-primary pb-2">
          <h2 className="font-headline-lg text-headline-lg uppercase tracking-tighter">World News</h2>
          <span className="material-symbols-outlined text-primary">arrow_forward</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
          <article className="group">
            <div className="aspect-video bg-surface-container-high mb-4 overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                alt="A crisp, editorial photograph of a bustling international port at sunrise."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd5G_GfP8jAyWOuet7uLiD9P9D07N44beU77p_1k0alhX4saRzdoF1HDM4b8XHA_jJLmIV4rHSVJrWITiHsaQnigu7NdGOEFvCS6XrZmMsh3HvQskmP9ehzRh9VrVlFNlVUaQ3T_5zUgtD8chT9mFuEXLhwl601FIdS-YRL6MV3e408H39nxGK4jhwLfDJ4i_cpnFr7ICSof1GYx-7Em9E_tb-gGIZhgPx-f4qKfHQ-xgcGtwkBw8"
              />
            </div>
            <span className="text-secondary font-label-bold text-label-sm uppercase tracking-widest mb-2 block">Supply Chain</span>
            <h3 className="font-headline-md text-headline-md leading-tight mb-2 group-hover:underline underline-offset-4 decoration-secondary">
              The Silent Shift: How Trade Routes are Bypassing Traditional Hubs
            </h3>
            <p className="text-on-surface-variant line-clamp-3">
              New geopolitical alliances are creating a second tier of global shipping routes that promise faster delivery but higher costs.
            </p>
          </article>
          
          <article className="group">
            <div className="aspect-video bg-surface-container-high mb-4 overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                alt="An artistic, high-resolution photo of a dense, lush rainforest."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHaRrVcAO-WAK5asVqLj5Fa3uozIBCZ6E5RFTJkkCgykdB-Zw9SEyQFka6QvmUVdi3g95qFh4cQGom983C6KLrUVT8sy6Sydvz1tEYGF7wG8KqfNAF5YaS9UakGhU86Asxxa6VMYZidlsr8wzcSRr652telte4cRfqmavtfeueYUeLbajsOZvWkBwowDxccMlEE9ez1TDbpDMxRemFwCny4R_1FbTMxhPXnn6_tkpumBI4Vzb0gXI"
              />
            </div>
            <span className="text-secondary font-label-bold text-label-sm uppercase tracking-widest mb-2 block">Sustainability</span>
            <h3 className="font-headline-md text-headline-md leading-tight mb-2 group-hover:underline underline-offset-4 decoration-secondary">
              Tech-Infused Conservation: The New Era of Forest Guardianship
            </h3>
            <p className="text-on-surface-variant line-clamp-3">
              Autonomous drones and AI sensors are now the primary defense against illegal logging in the world's most vulnerable ecosystems.
            </p>
          </article>
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
            <article className="flex gap-4 group">
              <div className="w-24 h-24 shrink-0 bg-surface-container-high overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  alt="Modern legislative chamber."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_ygndrSoi19WuxLce1FK5E4cT7bJ78-V1-MJjZ-c7yiHLsIGXMZOAX0skx_IA0uZT4GXl_IWeXlEjjMxn_J3DqeOOV6cVmXZuyETCpl1bcLrrVl2DvTAzCTORNcnqEpBTVXpSt88e5yBuQwGx9DSo3WyohXwSIA95o7L1W6d9muy0OdLTr-Yv-HFw4sK6qyBe4AoDy6ML2GP_JWuU9nhyxTAOZM_c8ni7AdrMbf8kl0pLoTY-wjw"
                />
              </div>
              <div>
                <h4 className="font-headline-md text-[18px] leading-tight mb-1 group-hover:text-secondary">
                  Electoral Reform Bill Faces Crucial Vote in Senate
                </h4>
                <p className="text-label-sm text-on-surface-variant">2 hours ago</p>
              </div>
            </article>
            
            <article className="flex gap-4 group">
              <div className="w-24 h-24 shrink-0 bg-surface-container-high overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  alt="Diplomatic handshake."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ74C3qi7n1Vzd8a5owQIc9n1ld2a7NpYKQYRgYxNVk3zXDewdhRvbr4Lonq6sr9LPdGCuo7Mz_sK8-38wbPitx9pxoRxYPZHbgOWSbacPdhFwZUU9cfmcag-VRD9LSmMDusx39nB83KTXVv1w7HMNvDNngxpc6i9QkWbqiedsneNNcN6K4UuJG9vb9ETQEjmXN_Gkfk3JtUM8h3i7aB-COOJN7_S5Tp6NSPc5Vri34RmGpf9VqZE"
                />
              </div>
              <div>
                <h4 className="font-headline-md text-[18px] leading-tight mb-1 group-hover:text-secondary">
                  Bilateral Talks Begin Between Regional Superpowers
                </h4>
                <p className="text-label-sm text-on-surface-variant">5 hours ago</p>
              </div>
            </article>
          </div>
        </section>

        {/* Economy Column */}
        <section>
          <div className="flex items-center justify-between mb-stack-md border-b border-outline-variant pb-2">
            <h2 className="font-label-bold text-label-bold uppercase text-primary">Economy</h2>
          </div>
          <div className="space-y-6">
            <article className="flex gap-4 group">
              <div className="w-24 h-24 shrink-0 bg-surface-container-high overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  alt="Digital stock market display."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYm7FL7fEjA6TCATGU0cCFO4lCtE9vcmPqHGzDvCU9Z3jgvee_FBCeKR-sRAuP4GCjmQDPQEbJapJ-R3F9yOI04xn-ZidrObgIl5s3TCtfj5eNgJUyjL75TZakis_0_DHsDfzlS2FK8Mly0loFL7QYo8457NgeukDdkwE13hjKNaaB6XXRnkcOTJqSywFGDJSl6uehYjnEmZnCy-7IbuD2a5FyOalxJlvxm--cnTRKMeBLLtW6P5o"
                />
              </div>
              <div>
                <h4 className="font-headline-md text-[18px] leading-tight mb-1 group-hover:text-secondary">
                  Market Volatility Increases Amid Energy Uncertainty
                </h4>
                <p className="text-label-sm text-on-surface-variant">1 hour ago</p>
              </div>
            </article>
            
            <article className="flex gap-4 group">
              <div className="w-24 h-24 shrink-0 bg-surface-container-high overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  alt="Gold coins stacked."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw9KSZLfROmVOXOPnD1urxGq-tBeKg6n1XbXP9cPqINABAo5R1GVutg_SiXJ5V1GczMI_f_vwtVuGcHpS-JBiBpYQviHUODkqvigbiaX3hrXyUnfp0h1X5dKymftNzptjMqCQ_S3GoEqbZ_13H_E-7VqjTNkoJAfI2XSWb-pxpR_qg9hSg1HV0GM0DyLP8NCyncGTE25gtfDBADSljCo5i0xc4ZULB10beTrNFfyBmKHChe9XRe_k"
                />
              </div>
              <div>
                <h4 className="font-headline-md text-[18px] leading-tight mb-1 group-hover:text-secondary">
                  Gold Reaches Record Highs as Investors Seek Safe Havens
                </h4>
                <p className="text-label-sm text-on-surface-variant">8 hours ago</p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
