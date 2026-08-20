import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { login, getAuthSession } from '../server/auth'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const session = await getAuthSession()
    if (session) {
      if (session.role === 'admin') {
        throw redirect({ to: '/admin' })
      }
      throw redirect({ to: '/profile' })
    }
    return { user: session }
  },
  component: LoginPage,
})

function LoginPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate()
  const loginFn = useServerFn(login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      await loginFn({ data: { email } })
      setSuccessMsg('Login successful! Redirecting to dashboard...')
      setTimeout(() => {
        navigate({ to: '/admin/analytics' })
      }, 1000)
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-display-md font-serif text-primary">
          Minbar News
        </h2>
        <p className="mt-2 text-center text-body-md text-on-surface-variant uppercase tracking-widest font-label-bold">
          Editorial Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            {successMsg && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-sm text-green-700">{successMsg}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block font-label-sm text-label-sm text-on-surface uppercase tracking-wider mb-2">
                Staff Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@minbar.news"
                  className="appearance-none block w-full px-4 py-3 border border-outline-variant rounded shadow-sm placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary font-body-md transition-colors"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded bg-primary text-white font-label-bold text-label-bold uppercase tracking-widest hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? 'Authenticating...' : 'Secure Login'}
              </button>
            </div>
            
            <p className="text-center font-label-sm text-label-sm text-on-surface-variant mt-6">
              Authorized personnel only. For access issues, contact IT support.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
