"use client"

import { usePathname } from "next/navigation"
import { getBranchFromPath, BranchId, BRANCH_CONFIGS } from "@/lib/branch-config"

interface DashboardInsigniaProps {
  className?: string
  branch?: BranchId
}

export function DashboardInsignia({ className = "", branch }: DashboardInsigniaProps) {
  const pathname = usePathname()
  const activeBranch = branch ? BRANCH_CONFIGS[branch] : getBranchFromPath(pathname)
  const Logo = activeBranch.Logo

  return (
    <div
      className={`pointer-events-none sticky top-0 left-0 w-0 h-0 -z-[4] ${className}`}
      aria-hidden="true"
    >
      <div className="absolute top-2 left-4 sm:top-4 sm:left-6 -translate-x-[200px] translate-y-[50px] w-96 sm:w-[480px] md:w-[576px] lg:w-[630px] text-white opacity-[0.08] dark:opacity-[0.04]">
        <Logo className="w-full h-auto fill-current" />
      </div>
    </div>
  )
}
