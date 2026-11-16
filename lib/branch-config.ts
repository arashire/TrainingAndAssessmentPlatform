import React from "react"
import { 
  AirForceLogo, 
  NavyLogo, 
  ArmyLogo, 
  MarinesLogo 
} from "@/components/branch-logo"
import {
  AfcecLogo,
  CxrEmblem,
  CxfEmblem,
  CxdEmblem,
  CxxEmblem,
  JeodEmblem,
  CxpEmblem
} from "@/components/afcec-logos"

export type BranchId = 
  | "cxr" 
  | "cxf" 
  | "cxd" 
  | "cxx" 
  | "jeodtd" 
  | "cxp"
  | "air-force" 
  | "navy" 
  | "army" 
  | "marines"

export interface BranchMeta {
  id: BranchId
  name: string
  shortName: string
  code: string
  directorate: string
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
  // --- 6 AFCEC READINESS DIVISIONS (CX) ---
  cxr: {
    id: "cxr",
    name: "Emergency Management Division",
    shortName: "AFCEC // CXR",
    code: "CXR",
    directorate: "READINESS DIRECTORATE (CX)",
    motto: "All-Hazards Readiness & CBRN Passive Defense",
    tagline: "Disaster Response Force (DRF), IEMP 10-2, Contamination Mitigation & CBRN Telemetry",
    dashboardUrl: "/dashboard",
    accentColor: "#FACC15",
    accentTextClass: "text-yellow-400 dark:text-yellow-400",
    borderAccentClass: "border-yellow-400/30",
    glowClass: "shadow-[0_0_24px_rgba(250,204,21,0.28)]",
    bgGradient: "bg-gradient-to-b from-[#3b4758] via-[#4d5d73] to-[#8d9cb0] dark:from-[#060d17] dark:via-[#0c1829] dark:to-[#12233b]",
    Logo: CxrEmblem,
  },
  cxf: {
    id: "cxf",
    name: "Fire & Emergency Services Division",
    shortName: "AFCEC // CXF",
    code: "CXF",
    directorate: "READINESS DIRECTORATE (CX)",
    motto: "First In, Last Out • Airfield Crash Fire Rescue",
    tagline: "Aircraft Rescue Fire Fighting (ARFF), Structural Suppression, HAZMAT Level-A Response",
    dashboardUrl: "/dashboard/cxf",
    accentColor: "#EF4444",
    accentTextClass: "text-red-500 dark:text-red-400",
    borderAccentClass: "border-red-500/30",
    glowClass: "shadow-[0_0_24px_rgba(239,68,68,0.28)]",
    bgGradient: "bg-gradient-to-b from-[#4a3a3d] via-[#5c4449] to-[#997f84] dark:from-[#110709] dark:via-[#1c0c10] dark:to-[#101927]",
    Logo: CxfEmblem,
  },
  cxd: {
    id: "cxd",
    name: "Explosive Ordnance Disposal Division",
    shortName: "AFCEC // CXD",
    code: "CXD",
    directorate: "READINESS DIRECTORATE (CX)",
    motto: "Initial Success or Total Failure",
    tagline: "Unexploded Ordnance (UXO), Counter-IED Render-Safe Procedures & Robotics Operations",
    dashboardUrl: "/dashboard/cxd",
    accentColor: "#F97316",
    accentTextClass: "text-orange-500 dark:text-orange-400",
    borderAccentClass: "border-orange-500/30",
    glowClass: "shadow-[0_0_24px_rgba(249,115,22,0.28)]",
    bgGradient: "bg-gradient-to-b from-[#4d3d33] via-[#614b3d] to-[#9e8473] dark:from-[#120a05] dark:via-[#1e1008] dark:to-[#0f1724]",
    Logo: CxdEmblem,
  },
  cxx: {
    id: "cxx",
    name: "Expeditionary Engineering Division",
    shortName: "AFCEC // CXX",
    code: "CXX",
    directorate: "READINESS DIRECTORATE (CX)",
    motto: "Can Do, Will Do • Engineer the Force",
    tagline: "Rapid Airfield Damage Repair (RADR), Silver Flag, Prime BEEF & Base Recovery Packages",
    dashboardUrl: "/dashboard/cxx",
    accentColor: "#EAB308",
    accentTextClass: "text-amber-400 dark:text-amber-400",
    borderAccentClass: "border-amber-400/30",
    glowClass: "shadow-[0_0_24px_rgba(234,179,8,0.28)]",
    bgGradient: "bg-gradient-to-b from-[#454238] via-[#595546] to-[#999480] dark:from-[#0d0d08] dark:via-[#17160c] dark:to-[#0d1624]",
    Logo: CxxEmblem,
  },
  jeodtd: {
    id: "jeodtd",
    name: "Joint EOD Technology Division",
    shortName: "AFCEC // JEODTD",
    code: "JEOD",
    directorate: "READINESS DIRECTORATE (CX)",
    motto: "Joint Precision & Technological Superiority",
    tagline: "Advanced Diagnostics, Multi-Service Telemetry, X-Ray Rendering & Robotic Manipulators",
    dashboardUrl: "/dashboard/jeodtd",
    accentColor: "#06B6D4",
    accentTextClass: "text-cyan-400 dark:text-cyan-400",
    borderAccentClass: "border-cyan-400/30",
    glowClass: "shadow-[0_0_24px_rgba(6,182,212,0.28)]",
    bgGradient: "bg-gradient-to-b from-[#33464d] via-[#3f5761] to-[#7f9aa6] dark:from-[#040e13] dark:via-[#071922] dark:to-[#091522]",
    Logo: JeodEmblem,
  },
  cxp: {
    id: "cxp",
    name: "Requirements, R&D & Acquisition",
    shortName: "AFCEC // CXP",
    code: "CXP",
    directorate: "READINESS DIRECTORATE (CX)",
    motto: "Modernizing the Resilient Airbase",
    tagline: "Automated Sensor Platforms, Material Testing, Wearable CBRN Detection & Field Modernization",
    dashboardUrl: "/dashboard/cxp",
    accentColor: "#A855F7",
    accentTextClass: "text-purple-400 dark:text-purple-400",
    borderAccentClass: "border-purple-400/30",
    glowClass: "shadow-[0_0_24px_rgba(168,85,247,0.28)]",
    bgGradient: "bg-gradient-to-b from-[#3f384d] via-[#514663] to-[#8d80a3] dark:from-[#0c0714] dark:via-[#160c24] dark:to-[#0b1424]",
    Logo: CxpEmblem,
  },

  // Legacy fallback configs for military branch links
  "air-force": {
    id: "air-force",
    name: "U.S. Air Force",
    shortName: "U.S. AIR FORCE",
    code: "USAF",
    directorate: "HEADQUARTERS AIR FORCE",
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
    directorate: "NAVAL AIR FORCES",
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
    directorate: "ARMY AVIATION CENTER OF EXCELLENCE",
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
    directorate: "MARINE AVIATION",
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
  if (pathname.startsWith("/dashboard/cxf") || pathname.startsWith("/dashboard/fire")) {
    return BRANCH_CONFIGS.cxf
  }
  if (pathname.startsWith("/dashboard/cxd") || pathname.startsWith("/dashboard/eod")) {
    return BRANCH_CONFIGS.cxd
  }
  if (pathname.startsWith("/dashboard/cxx") || pathname.startsWith("/dashboard/expeditionary")) {
    return BRANCH_CONFIGS.cxx
  }
  if (pathname.startsWith("/dashboard/jeodtd") || pathname.startsWith("/dashboard/joint-eod")) {
    return BRANCH_CONFIGS.jeodtd
  }
  if (pathname.startsWith("/dashboard/cxp") || pathname.startsWith("/dashboard/acquisition")) {
    return BRANCH_CONFIGS.cxp
  }
  if (pathname.startsWith("/dashboard/navy")) {
    return BRANCH_CONFIGS.navy
  }
  if (pathname.startsWith("/dashboard/army")) {
    return BRANCH_CONFIGS.army
  }
  if (pathname.startsWith("/dashboard/marines")) {
    return BRANCH_CONFIGS.marines
  }
  return BRANCH_CONFIGS.cxr
}
