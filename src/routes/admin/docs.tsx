import { createFileRoute } from '@tanstack/react-router'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export const Route = createFileRoute('/admin/docs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-slate-800">API Documentation</h1>
        <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <SwaggerUI url="/api/openapi.json" />
        </div>
      </div>
    </div>
  )
}
