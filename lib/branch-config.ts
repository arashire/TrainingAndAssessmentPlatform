import React from "react"
import { 
  AirForceLogo, 
  NavyLogo, 
  ArmyLogo, 
  MarinesLogo 
} from "@/components/branch-logo"

export type BranchId = "air-force" | "navy" | "army" | "marines"

export interface BranchMeta {
  id: BranchId
  name: string
  shortName: string
  code: string
  motto: string
  tagline: string
  dashboardUrl: string
  accentColor: string
  accentTextClass: string
  borderAccentClass: string
  glowClass: string
  bgGradient: string
  Logo: React.ComponentType<{ className?: string }>
}

export const BRANCH_CONFIGS: Record<BranchId, BranchMeta> = {
  "air-force": {
    id: "air-force",
    name: "U.S. Air Force",
    shortName: "U.S. AIR FORCE",
    code: "USAF",
    motto: "Fly, Fight and Win",
    tagline: "Candidate Flight Training & Assessment Dashboard",
    dashboardUrl: "/dashboard",
    accentColor: "#3B82F6",
    accentTextClass: "text-sky-500 dark:text-sky-400",
    borderAccentClass: "border-sky-500/30",
    glowClass: "shadow-[0_0_24px_rgba(59,130,246,0.25)]",
    bgGradient: "bg-gradient-to-b from-[#587589] to-[#dff3eb] dark:from-[#0c151d] dark:to-[#152431]",
    Logo: AirForceLogo,
  },
  navy: {
    id: "navy",
    name: "U.S. Navy",
    shortName: "U.S. NAVY",
    code: "USN",
    motto: "Non Sibi Sed Patriae",
    tagline: "Naval Aviation Enterprise & Carrier Trap Quals",
    dashboardUrl: "/dashboard/navy",
    accentColor: "#FACC15",
    accentTextClass: "text-yellow-400 dark:text-yellow-400",
    borderAccentClass: "border-yellow-400/30",
    glowClass: "shadow-[0_0_24px_rgba(250,204,21,0.25)]",
    bgGradient: "bg-gradient-to-b from-[#4a5565] via-[#6a7686] to-[#a2acb9] dark:from-[#05070a] dark:via-[#090d14] dark:to-[#101722]",
    Logo: NavyLogo,
  },
  army: {
    id: "army",
    name: "U.S. Army",
    shortName: "U.S. ARMY",
    code: "USA",
    motto: "This We'll Defend",
    tagline: "Army Aviation Center of Excellence & Flight Syllabus",
    dashboardUrl: "/dashboard/army",
    accentColor: "#F59E0B",
    accentTextClass: "text-amber-500 dark:text-amber-400",
    borderAccentClass: "border-amber-500/30",
    glowClass: "shadow-[0_0_24px_rgba(245,158,11,0.25)]",
    bgGradient: "bg-gradient-to-b from-[#54524a] via-[#78756c] to-[#dad6cc] dark:from-[#0d0f0a] dark:via-[#14170f] dark:to-[#1a1f14]",
    Logo: ArmyLogo,
  },
  marines: {
    id: "marines",
    name: "U.S. Marines",
    shortName: "U.S. MARINES",
    code: "USMC",
    motto: "Semper Fidelis",
    tagline: "Marine Corps Aviation Command & Close Air Support",
    dashboardUrl: "/dashboard/marines",
    accentColor: "#EF4444",
    accentTextClass: "text-rose-500 dark:text-rose-400",
    borderAccentClass: "border-rose-500/30",
    glowClass: "shadow-[0_0_24px_rgba(239,68,68,0.25)]",
    bgGradient: "bg-gradient-to-b from-[#5c494c] via-[#7c666a] to-[#dcd3d5] dark:from-[#140a0c] dark:via-[#201013] dark:to-[#0f0709]",
    Logo: MarinesLogo,
  },
}

export function getBranchFromPath(pathname: string): BranchMeta {
  if (pathname.startsWith("/dashboard/navy")) {
    return BRANCH_CONFIGS.navy
  }
  if (pathname.startsWith("/dashboard/army")) {
    return BRANCH_CONFIGS.army
  }
  if (pathname.startsWith("/dashboard/marines")) {
    return BRANCH_CONFIGS.marines
  }
  return BRANCH_CONFIGS["air-force"]
}

