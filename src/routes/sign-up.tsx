import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { signup } from '../server/auth'

export const Route = createFileRoute('/sign-up')({
  component: SignUpPage,
})

function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [agreeUpdates, setAgreeUpdates] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()
  const signupFn = useServerFn(signup)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeTerms) {
      setError('You must agree to the Terms and Conditions')
      return
    }
    if (password.length < 8) {
      setError('Password must contain 8+ characters.')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      await signupFn({ data: { email } })
      // On success, redirect to home page or dashboard
      navigate({ to: '/' })
    } catch (err: any) {
      setError(err.message || 'Sign up failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-72px)] flex flex-col md:flex-row bg-white font-sans text-black">
      
      {/* Left Column: Sign Up Form */}
      <div className="flex-1 px-8 md:px-16 lg:px-32 pt-12 pb-16 overflow-y-auto">
        <div className="max-w-[420px] mx-auto w-full">
          
          <h1 className="text-3xl font-bold leading-tight tracking-tight mb-8">
            Enrich your Minbar News experience<br />by creating an account.
          </h1>

          {/* Social Logins */}
          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-full text-[15px] font-bold hover:bg-gray-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-full text-[15px] font-bold hover:bg-gray-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
              Continue with Facebook
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-full text-[15px] font-bold hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-[20px] filled text-black">apple</span>
              Continue with Apple
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-[13px] uppercase text-gray-600 font-medium">OR</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && error !== 'Password must contain 8+ characters.' && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-[14px] font-medium text-black mb-1.5">
                E-mail
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className={`w-full px-3 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black ${error && email.length > 0 && !email.includes('@') ? 'border-red-500' : 'border-gray-300'}`}
              />
              {error && email.length > 0 && !email.includes('@') && (
                <p className="text-red-500 text-[12px] mt-1">Please enter a valid e-mail.</p>
              )}
            </div>

            <div>
              <label className="block text-[14px] font-medium text-black mb-1.5">
                Password
              </label>
              <div className="relative">
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black pr-10"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
              <p className="text-gray-600 text-[12px] mt-1">
                Password must contain 8+ characters.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="sr-only" 
                  />
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${agreeTerms ? 'bg-black border-black' : 'bg-white border-gray-300 group-hover:border-black'}`}>
                    {agreeTerms && <span className="material-symbols-outlined text-white text-[16px]">check</span>}
                  </div>
                </div>
                <span className="text-[12px] text-black leading-snug">
                  You agree to the <Link to="/about" className="underline">Terms and Conditions</Link> & <Link to="/about" className="underline">Privacy Policy</Link>. Your activity will be used to personalise your experience with Minbar News products and ads.<span className="text-red-600">*</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={agreeUpdates}
                    onChange={(e) => setAgreeUpdates(e.target.checked)}
                    className="sr-only" 
                  />
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${agreeUpdates ? 'bg-black border-black' : 'bg-white border-gray-300 group-hover:border-black'}`}>
                    {agreeUpdates && <span className="material-symbols-outlined text-white text-[16px]">check</span>}
                  </div>
                </div>
                <span className="text-[12px] text-black leading-snug">
                  You agree to receive personalised updates from Minbar News over email. You can opt out at any time
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#3d3d3d] hover:bg-black text-white rounded-full py-3.5 font-medium text-[16px] transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Right Column: Features List */}
      <div className="flex-1 bg-[#f9f9f9] px-8 md:px-16 lg:px-24 pt-12 pb-16 overflow-y-auto border-l border-gray-200">
        <div className="max-w-[420px] mx-auto lg:ml-0">
          
          <h2 className="text-[28px] font-light leading-tight mb-2 text-[#222]">
            Connect and engage with Minbar News
          </h2>
          <p className="text-gray-500 text-[14px] mb-10">
            This is not a paywall. It's free to join.
          </p>

          <div className="space-y-8">
            
            {/* Feature 1 */}
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-orange-400 text-[26px]">star</span>
              <div>
                <h3 className="font-bold text-[16px] text-black mb-1">One Minbar News account</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Unlock access to all Minbar News services, from our regional news websites and mobile app to documentaries and the Minbar OTT platform, using just one account.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-orange-400 text-[26px]">person_add</span>
              <div>
                <h3 className="font-bold text-[16px] text-black mb-1">Personalized "For You" Section</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Immerse yourself in a carefully customised selection of articles and videos aligned with your preferences.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-orange-400 text-[26px] scale-x-[-1]">chat_bubble_outline</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-[16px] text-black">Comment on Articles</h3>
                  <span className="bg-gray-200 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-full">Coming soon</span>
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Dive into engaging discussions about our stories! Share your thoughts and connect with other passionate readers.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-orange-400 text-[26px]">bookmark_border</span>
              <div>
                <h3 className="font-bold text-[16px] text-black mb-1">Reading list</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Curate a personal library of articles and reports that you can return to.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-orange-400 text-[26px]">how_to_reg</span>
              <div>
                <h3 className="font-bold text-[16px] text-black mb-1">Follow Authors and Topics</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Check out the latest from your preferred authors and on topics that matter to you.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-orange-400 text-[26px]">notifications</span>
              <div>
                <h3 className="font-bold text-[16px] text-black mb-1">Notifications and Alerts</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Remain ahead of the curve with timely notifications that update you on breaking developments and crucial news stories that shape our world.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
