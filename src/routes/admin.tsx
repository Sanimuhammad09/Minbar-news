import { createFileRoute, Outlet, useLocation, redirect } from '@tanstack/react-router'
import AdminSidebar from '../components/AdminSidebar'
import { useState } from 'react'
import { getAuthSession } from '../server/auth'

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    const session = await getAuthSession()
    if (!session || session.role !== 'admin') {
      throw redirect({ to: '/login' })
    }
    return { user: session }
  },
  component: AdminLayout,
})

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user } = Route.useRouteContext()



  return (
    <div className="flex min-h-screen bg-background text-on-background font-body-md selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* SideNavBar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}
