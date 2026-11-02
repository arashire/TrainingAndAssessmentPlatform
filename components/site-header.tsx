"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
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
          <SidebarTrigger className="h-8 w-16 rounded-md text-white transition-all duration-200 hover:bg-transparent hover:text-white/80 hover:brightness-125 dark:text-white dark:hover:bg-transparent" />
          <h1 className="pl-6 text-base font-bold tracking-wide flex items-center gap-2 text-white">
            <span>DASHBOARD</span>
            <span className="text-white/60 font-mono font-normal">|</span>
            <span className="font-light">INSTRUCTOR VIEW</span>
          </h1>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background/50 text-foreground/80 shadow-sm transition-all hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          title="Toggle Theme"
        >
          {mounted ? (
            <svg
              className={`size-4 transition-transform duration-300 ease-out ${
                theme === "dark" ? "rotate-180" : "rotate-0"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
            </svg>
          ) : (
            <span className="size-4" />
          )}
        </button>
      </div>
    </header>
  )
}
