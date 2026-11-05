import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { PageTransitionVeil } from "@/components/page-transition-veil"
import { DashboardShell } from "@/components/dashboard-shell"

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
      <DashboardShell>
        {children}
      </DashboardShell>
    </SidebarProvider>
  )
}
