import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PageTransitionVeil } from "@/components/page-transition-veil"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider
      defaultOpen={false}
      className="h-svh max-h-svh overflow-hidden"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <PageTransitionVeil />
      <AppSidebar variant="inset" />
      <SidebarInset className="flex flex-col h-[calc(100svh-1rem)] max-h-[calc(100svh-1rem)] overflow-hidden bg-gradient-to-b from-[#587589] to-[#dff3eb] dark:from-[#0c151d] dark:to-[#152431] [transform:translateZ(0)]">
        <SiteHeader />
        <div className="flex flex-1 flex-col min-h-0 overflow-hidden p-3 sm:p-4 pt-2 sm:pt-2">
          <div className="@container/main flex flex-1 flex-col h-full min-h-0 overflow-hidden">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
