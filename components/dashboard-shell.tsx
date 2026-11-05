"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { getBranchFromPath } from "@/lib/branch-config"
import { SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const branch = getBranchFromPath(pathname)

  return (
    <SidebarInset 
      className={`flex flex-col h-[calc(100svh-1rem)] max-h-[calc(100svh-1rem)] overflow-hidden ${branch.bgGradient} [transform:translateZ(0)] transition-colors duration-500`}
    >
      <SiteHeader />
      <div className="flex flex-1 flex-col min-h-0 overflow-hidden p-3 sm:p-4 pt-2 sm:pt-2">
        <div className="@container/main flex flex-1 flex-col h-full min-h-0 overflow-hidden">
          {children}
        </div>
      </div>
    </SidebarInset>
  )
}

