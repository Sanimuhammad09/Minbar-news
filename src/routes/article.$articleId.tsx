import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { getArticleBySlug } from '../server/articles'
import { getArticleInteractions, toggleSaveArticle, addComment, checkUserSaved } from '../server/interactions'

export const Route = createFileRoute('/article/$articleId')({
  loader: async ({ params }) => {
    const article = await getArticleBySlug({ data: params.articleId })
    const { getTrendingArticles, getArticles } = await import('../server/articles')
    const trending = await getTrendingArticles()
    const allArticles = await getArticles()
    const latest = allArticles.filter((a: any) => a.id !== article?.id).slice(0, 3)
    return { article, trending: trending.slice(0, 3), latest }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.article ? `${loaderData.article.title} | Minbar News` : 'Article | Minbar News' },
      { name: 'description', content: loaderData?.article?.excerpt },
      { property: 'og:title', content: loaderData?.article?.title },
      { property: 'og:description', content: loaderData?.article?.excerpt },
      { property: 'og:image', content: loaderData?.article?.featured_image },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: loaderData?.title },
      { name: 'twitter:description', content: loaderData?.article?.excerpt },
      { name: 'twitter:image', content: loaderData?.article?.featured_image },
    ],
  }),
  component: ArticleView,
})

function ArticleView() {
  const { article, trending, latest } = Route.useLoaderData() as any
  const [scrollProgress, setScrollProgress] = useState(0)
  const router = useRouter()
  
  // Interaction States
  const [isSaved, setIsSaved] = useState(false)
  const [savesCount, setSavesCount] = useState(0)
  const [comments, setComments] = useState<any[]>([])
  const [commentText, setCommentText] = useState('')
  const [commenting, setCommenting] = useState(false)
  const [shareText, setShareText] = useState('Share')

  // Server Functions
  const fetchInteractionsFn = useServerFn(getArticleInteractions)
  const checkSavedFn = useServerFn(checkUserSaved)
  const toggleSaveFn = useServerFn(toggleSaveArticle)
  const addCommentFn = useServerFn(addComment)

  // Load Initial Interactions Data
  useEffect(() => {
    if (article?.slug) {
      fetchInteractionsFn({ data: article.slug }).then(res => {
        setComments(res.comments || [])
        setSavesCount(res.savesCount || 0)
      })
      checkSavedFn({ data: article.slug }).then(saved => {
        setIsSaved(saved)
      })
    }
  }, [article?.slug])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setShareText('Copied!')
    setTimeout(() => setShareText('Share'), 2000)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleSave = async () => {
    try {
      const res = await toggleSaveFn({ data: article.slug })
      setIsSaved(res.isSaved)
      setSavesCount(prev => res.isSaved ? prev + 1 : prev - 1)
    } catch (e: any) {
      alert(e.message) // Usually "Must be logged in"
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return
    setCommenting(true)
    try {
      const newComment = await addCommentFn({ data: { articleId: article.slug, content: commentText } })
      setComments([...comments, newComment])
      setCommentText('')
    } catch (e: any) {
      alert(e.message) // Usually "Must be logged in"
    } finally {
      setCommenting(false)
    }
  }

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
          <button onClick={handleShare} className="group flex flex-col items-center space-y-1 cursor-pointer">
            <span className="material-symbols-outlined p-3 rounded-full border border-outline-variant text-on-surface-variant group-hover:bg-secondary group-hover:text-white transition-all">
              {shareText === 'Copied!' ? 'check' : 'share'}
            </span>
            <span className="text-[10px] font-label-bold uppercase text-outline">{shareText}</span>
          </button>
          <button onClick={handleSave} className="group flex flex-col items-center space-y-1 cursor-pointer">
            <span className={`material-symbols-outlined p-3 rounded-full border border-outline-variant transition-all ${isSaved ? 'bg-primary text-white' : 'text-on-surface-variant group-hover:bg-primary group-hover:text-white'}`}>
              {isSaved ? 'bookmark_added' : 'bookmark'}
            </span>
            <span className="text-[10px] font-label-bold uppercase text-outline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })} className="group flex flex-col items-center space-y-1 cursor-pointer">
            <span className="material-symbols-outlined p-3 rounded-full border border-outline-variant text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all">mode_comment</span>
            <span className="text-[10px] font-label-bold uppercase text-outline">{comments.length}</span>
          </button>
          <div className="h-16 w-[1px] bg-outline-variant"></div>
          <button onClick={handlePrint} className="group cursor-pointer">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary transition-colors">print</span>
          </button>
        </aside>

        {/* Article Container */}
        <article className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-0 md:p-stack-lg lg:bg-transparent lg:p-0">
          
          {/* Category Tag */}
          <div className="mb-stack-md">
            <span className="font-label-sm text-label-bold uppercase text-secondary tracking-widest border-b border-secondary pb-1">{article?.categories?.name || 'Uncategorized'}</span>
          </div>
          
          {/* Headline */}
          <h1 className="font-headline-lg text-display-lg md:text-5xl lg:text-6xl text-primary leading-tight mb-stack-md">
            {article?.title}
          </h1>
          
          {/* Meta & Author Bio */}
          <div className="flex items-center space-x-4 mb-stack-lg pb-stack-lg border-b border-outline-variant">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container flex items-center justify-center font-bold text-lg">
              {article?.users?.avatar_url ? (
                <img className="w-full h-full object-cover" alt="Author" src={article.users.avatar_url} />
              ) : (
                <span>{article?.users?.full_name?.substring(0, 1).toUpperCase() || '?'}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-label-bold text-label-bold text-primary">{article?.users?.full_name || 'Staff Writer'}</span>
              <div className="flex items-center space-x-2 text-on-surface-variant text-label-sm">
                <span>Minbar Contributor</span>
                <span className="text-outline-variant">•</span>
                <time dateTime={article?.created_at}>{article?.created_at ? new Date(article.created_at).toLocaleDateString() : 'Today'}</time>
                <span className="text-outline-variant">•</span>
                <span>{Math.max(1, Math.ceil((article?.content?.length || 0) / 1000))} min read</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          {article?.featured_image && (
            <figure className="mb-stack-lg">
              <div className="aspect-[16/9] w-full overflow-hidden mb-2">
                <img className="w-full h-full object-cover" alt="Hero" src={article.featured_image} />
              </div>
            </figure>
          )}
          
          {/* Article Body Content */}
          <div 
            className="font-body-md text-body-lg leading-relaxed text-on-surface space-y-stack-lg max-w-none prose prose-primary"
            dangerouslySetInnerHTML={{ __html: article?.content || '' }} 
          />
          
          {/* Tags & Sharing Footer */}
          <div className="mt-section-gap pt-stack-lg border-t border-outline-variant flex flex-wrap gap-2">
            <Link to="/search" search={{ q: 'Global' }} className="font-label-sm text-label-sm px-3 py-1 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors cursor-pointer">Global</Link>
            <Link to="/search" search={{ q: 'Politics' }} className="font-label-sm text-label-sm px-3 py-1 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors cursor-pointer">Politics</Link>
            <Link to="/search" search={{ q: 'Economy' }} className="font-label-sm text-label-sm px-3 py-1 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors cursor-pointer">Economy</Link>
            <Link to="/search" search={{ q: 'Analysis' }} className="font-label-sm text-label-sm px-3 py-1 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors cursor-pointer">Analysis</Link>
          </div>
          
          {/* Comments Section */}
          <section id="comments-section" className="mt-12 pt-8 border-t border-outline-variant">
            <h3 className="font-headline-lg text-2xl text-primary mb-6">Discussion ({comments.length})</h3>
            
            <form onSubmit={handleSubmitComment} className="mb-8">
              <textarea 
                className="w-full bg-surface-container p-4 font-body-md text-on-surface border border-outline-variant focus:border-primary outline-none resize-y min-h-[100px] mb-3"
                placeholder="Share your perspective..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
              />
              <button 
                type="submit"
                disabled={commenting || !commentText.trim()}
                className="bg-primary text-white font-label-bold uppercase px-6 py-2 hover:bg-secondary transition-colors disabled:opacity-50"
              >
                {commenting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
            
            <div className="space-y-6">
              {comments.map((comment, i) => (
                <div key={i} className="pb-6 border-b border-outline-variant last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-bold text-xs uppercase">
                      {comment.userName.charAt(0)}
                    </div>
                    <span className="font-label-bold text-primary">{comment.userName}</span>
                    <span className="text-outline-variant text-xs">•</span>
                    <span className="text-outline-variant text-xs">{new Date(comment.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="font-body-md text-on-surface pl-11">{comment.content}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-on-surface-variant italic">No comments yet. Be the first to start the discussion.</p>
              )}
            </div>
          </section>
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
              Trending Analysis
            </h3>
            <div className="space-y-stack-md">
              {trending.map((trendArticle: any, idx: number) => (
                <div key={trendArticle.id}>
                  <Link to="/article/$articleId" params={{ articleId: trendArticle.slug }} className="group cursor-pointer block">
                    {idx === 0 && (
                      <div className="aspect-video w-full overflow-hidden mb-2 bg-surface-container">
                        {trendArticle.featured_image && (
                          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={trendArticle.title} src={trendArticle.featured_image} />
                        )}
                      </div>
                    )}
                    <h4 className="font-headline-md text-[18px] text-primary group-hover:text-secondary transition-colors leading-tight">{trendArticle.title}</h4>
                    <span className="font-label-sm text-label-sm text-outline-variant mt-1 block">
                      {Math.max(1, Math.ceil((trendArticle.content?.length || 0) / 1000))} min read
                    </span>
                  </Link>
                  {idx < trending.length - 1 && <div className="h-[1px] bg-outline-variant w-full mt-stack-md"></div>}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom "Read More" Grid */}
      <section className="max-w-7xl mx-auto px-grid-margin py-section-gap border-t border-outline-variant">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-lg">Explore Further Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {latest.map((item: any) => (
            <Link key={item.id} to="/article/$articleId" params={{ articleId: item.slug }} className="flex flex-col group cursor-pointer">
              <div className="aspect-[16/9] bg-surface-container overflow-hidden mb-4">
                {item.featured_image ? (
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} src={item.featured_image} />
                ) : (
                  <span className="material-symbols-outlined text-outline-variant text-4xl w-full h-full flex items-center justify-center">public</span>
                )}
              </div>
              <span className="font-label-sm text-[10px] uppercase font-bold text-secondary tracking-widest mb-2">
                {item.categories?.name || 'News'}
              </span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-secondary transition-colors">{item.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">{item.excerpt || item.content?.replace(/<[^>]*>?/gm, '').substring(0, 150)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
