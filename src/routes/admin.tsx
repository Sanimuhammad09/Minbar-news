import { createFileRoute, Outlet } from '@tanstack/react-router'
import AdminSidebar from '../components/AdminSidebar'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background text-on-background font-body-md selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* SideNavBar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}
