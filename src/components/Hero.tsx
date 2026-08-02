export default function Hero() {
  return (
    <div className="lg:col-span-8 relative group overflow-hidden bg-primary cursor-pointer">
      <div className="aspect-[16/9] w-full">
        <img
          className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          alt="A cinematic, wide-angle photograph of a global summit meeting."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzhmeXFqkH9aKCQbLE4uJN_eyF0nE5cJ_uEhrCth46U3aDfXAUaQ_otqLDpe1Dp7nePZr9LPcOoAUoxqUokCRvvC5VsvPE-SfWfKwcg8dGt0m9xqQcaJkw0Xiv-3AyC4Ym70uKKabXAFA8AsGrAcMWDQ5JOwqLQ32R8z069KeQGnDqR7uD2Nw3QvYBEsNFYo0KrlOKIfEMBrih4TLdjV0Dpwj5-CKpEjcmTSrA0wM5nnAg0CD168s"
        />
      </div>
      <div className="absolute inset-0 hero-gradient flex flex-col justify-end p-stack-lg">
        <span className="inline-block bg-secondary text-on-secondary px-3 py-1 text-label-sm font-label-bold uppercase mb-4 w-fit">
          World News
        </span>
        <h2 className="font-headline-lg text-headline-lg text-on-primary mb-4 leading-tight">
          Summit for the Future: Global Leaders Converge to Address Climate Debt and Economic Sovereignty
        </h2>
        <p className="text-on-primary-container font-body-md line-clamp-2 mb-4 opacity-90">
          In a historic move, representatives from over 150 nations have gathered to draft a new framework for international cooperation, focusing on the redistribution of resources and the mitigation of historical environmental impact.
        </p>
        <div className="flex items-center gap-4 text-on-primary-container text-label-sm">
          <span>By Elena Vance</span>
          <span className="w-1 h-1 bg-secondary rounded-full"></span>
          <span>4 mins read</span>
        </div>
      </div>
    </div>
  );
}
