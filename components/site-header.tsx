"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="flex h-(--header-height) shrink-0 items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between pl-0 pr-4 lg:pr-6">
        <div className="flex items-center">
          <SidebarTrigger className="h-8 w-16 rounded-md text-muted-foreground transition-all duration-200 hover:bg-transparent hover:text-foreground hover:brightness-125 dark:hover:bg-transparent" />
          <h1 className="pl-6 text-base font-bold tracking-wide">DASHBOARD</h1>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground shadow-sm transition-all hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          title="Toggle Theme"
        >
          {mounted ? (
            theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />
          ) : (
            <span className="size-4" />
          )}
        </button>
      </div>
    </header>
  )
}
