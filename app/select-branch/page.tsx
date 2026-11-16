"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  AfcecLogo, 
  CxrEmblem, 
  CxfEmblem, 
  CxdEmblem, 
  CxxEmblem, 
  JeodEmblem, 
  CxpEmblem 
} from "@/components/afcec-logos"
import { 
  ArrowRight, 
  LogOut,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Activity
} from "lucide-react"

interface DivisionConfig {
  id: string
  name: string
  shortName: string
  code: string
  afsc: string
  motto: string
  tagline: string
  primaryColor: string
  secondaryColor: string
  accentColorClass: string
  badgeBgClass: string
  badgeBorderClass: string
  badgeTextClass: string
  bgGradient: string
  accentGlow: string
  insignia: React.ComponentType<{ className?: string }>
  primaryUrl: string
  primaryLabel: string
  primaryDescription: string
  capabilities: string[]
  status: "active" | "queued"
}

const DIVISIONS: DivisionConfig[] = [
  {
    id: "cxr",
    name: "Emergency Management",
    shortName: "AFCEC // CXR",
    code: "CXR",
    afsc: "AFSC 3E9X1",
    motto: "All-Hazards Readiness & CBRN Passive Defense",
    tagline: "Disaster Response Force (DRF), IEMP 10-2 execution, contamination avoidance, and CBRN reconnaissance telemetry.",
    primaryColor: "#FACC15",
    secondaryColor: "#EAB308",
    accentColorClass: "text-yellow-400",
    badgeBgClass: "bg-yellow-400/10",
    badgeBorderClass: "border-yellow-400/30",
    badgeTextClass: "text-yellow-300",
    bgGradient: "linear-gradient(180deg, #070e18 0%, #0d1a2d 50%, #060c14 100%)",
    accentGlow: "radial-gradient(circle 800px at 50% 50%, rgba(250, 204, 21, 0.22) 0%, transparent 70%)",
    insignia: CxrEmblem,
    primaryUrl: "/dashboard",
    primaryLabel: "Emergency Management",
    primaryDescription: "CBRN Recon, DRF Incident Command & IEMP Readiness",
    capabilities: ["CBRN DEFENSE", "IEMP 10-2", "DRF COMMAND"],
    status: "active",
  },
  {
    id: "cxf",
    name: "Fire & Emergency Services",
    shortName: "AFCEC // CXF",
    code: "CXF",
    afsc: "AFSC 3E7X1",
    motto: "First In, Last Out • Airfield Crash Fire Rescue",
    tagline: "Aircraft Rescue Fire Fighting (ARFF), structural fire suppression, live-fire drill evaluation, and HAZMAT Level-A mitigation.",
    primaryColor: "#EF4444",
    secondaryColor: "#DC2626",
    accentColorClass: "text-red-400",
    badgeBgClass: "bg-red-500/10",
    badgeBorderClass: "border-red-500/30",
    badgeTextClass: "text-red-300",
    bgGradient: "linear-gradient(180deg, #12090b 0%, #1e0e12 50%, #0a0607 100%)",
    accentGlow: "radial-gradient(circle 800px at 50% 50%, rgba(239, 68, 68, 0.22) 0%, transparent 70%)",
    insignia: CxfEmblem,
    primaryUrl: "/dashboard/cxf",
    primaryLabel: "Fire & Emergency Services",
    primaryDescription: "ARFF Fleet Telemetry, Egress Drills & HAZMAT Mitigation",
    capabilities: ["ARFF CRASH RESCUE", "HAZMAT LEVEL-A", "BURN EVALUATION"],
    status: "active",
  },
  {
    id: "cxd",
    name: "Explosive Ordnance Disposal",
    shortName: "AFCEC // CXD",
    code: "CXD",
    afsc: "AFSC 3E8X1",
    motto: "Initial Success or Total Failure",
    tagline: "Unexploded Ordnance (UXO) clearance, remote robotics manipulation, shaped-charge standoff, and counter-IED render-safe operations.",
    primaryColor: "#F97316",
    secondaryColor: "#EA580C",
    accentColorClass: "text-orange-400",
    badgeBgClass: "bg-orange-500/10",
    badgeBorderClass: "border-orange-500/30",
    badgeTextClass: "text-orange-300",
    bgGradient: "linear-gradient(180deg, #130a05 0%, #201208 50%, #0b0704 100%)",
    accentGlow: "radial-gradient(circle 800px at 50% 50%, rgba(249, 115, 22, 0.22) 0%, transparent 70%)",
    insignia: CxdEmblem,
    primaryUrl: "/dashboard/cxd",
    primaryLabel: "Explosive Ordnance Disposal",
    primaryDescription: "UXO Render-Safe Protocols, IED Neutralization & Robotics",
    capabilities: ["UXO RECON", "COUNTER-IED", "ROBOTICS RSP"],
    status: "active",
  },
  {
    id: "cxx",
    name: "Expeditionary Engineering",
    shortName: "AFCEC // CXX",
    code: "CXX",
    afsc: "PRIME BEEF / RED HORSE",
    motto: "Can Do, Will Do • Engineer the Force",
    tagline: "Rapid Airfield Damage Repair (RADR), Silver Flag exercises, heavy crater clearance, and austere bare-base utility deployment.",
    primaryColor: "#EAB308",
    secondaryColor: "#CA8A04",
    accentColorClass: "text-amber-400",
    badgeBgClass: "bg-amber-500/10",
    badgeBorderClass: "border-amber-500/30",
    badgeTextClass: "text-amber-300",
    bgGradient: "linear-gradient(180deg, #100f09 0%, #1c1a0e 50%, #090906 100%)",
    accentGlow: "radial-gradient(circle 800px at 50% 50%, rgba(234, 179, 8, 0.22) 0%, transparent 70%)",
    insignia: CxxEmblem,
    primaryUrl: "/dashboard/cxx",
    primaryLabel: "Expeditionary Engineering",
    primaryDescription: "RADR Airfield Recovery, Silver Flag & Base Survivability",
    capabilities: ["RADR RECOVERY", "PRIME BEEF", "CRATER CLEARANCE"],
    status: "active",
  },
  {
    id: "jeodtd",
    name: "Joint EOD Technology",
    shortName: "AFCEC // JEODTD",
    code: "JEOD",
    afsc: "JOINT SERVICES",
    motto: "Joint Interoperability & Tech Superiority",
    tagline: "Multi-service advanced robotics diagnostics, x-ray telemetry analysis, technical data distribution, and automated EOD sensor feeds.",
    primaryColor: "#06B6D4",
    secondaryColor: "#0891B2",
    accentColorClass: "text-cyan-400",
    badgeBgClass: "bg-cyan-500/10",
    badgeBorderClass: "border-cyan-500/30",
    badgeTextClass: "text-cyan-300",
    bgGradient: "linear-gradient(180deg, #050e13 0%, #081a24 50%, #04090d 100%)",
    accentGlow: "radial-gradient(circle 800px at 50% 50%, rgba(6, 182, 212, 0.22) 0%, transparent 70%)",
    insignia: JeodEmblem,
    primaryUrl: "/dashboard/jeodtd",
    primaryLabel: "Joint EOD Technology",
    primaryDescription: "Multi-Service Sensor Link, Robotics Telemetry & X-Ray Data",
    capabilities: ["JOINT TELEMETRY", "X-RAY DIAGNOSTICS", "ROBOTIC SENSORS"],
    status: "active",
  },
  {
    id: "cxp",
    name: "Requirements & Acquisition",
    shortName: "AFCEC // CXP",
    code: "CXP",
    afsc: "R&D / ACQUISITION",
    motto: "Modernizing the Resilient Airbase",
    tagline: "Capability prototyping, next-gen autonomous chemical sensor platforms, wearable telemetry testing, and equipment fielding.",
    primaryColor: "#A855F7",
    secondaryColor: "#9333EA",
    accentColorClass: "text-purple-400",
    badgeBgClass: "bg-purple-500/10",
    badgeBorderClass: "border-purple-500/30",
    badgeTextClass: "text-purple-300",
    bgGradient: "linear-gradient(180deg, #0e0716 0%, #180d26 50%, #08040d 100%)",
    accentGlow: "radial-gradient(circle 800px at 50% 50%, rgba(168, 85, 247, 0.22) 0%, transparent 70%)",
    insignia: CxpEmblem,
    primaryUrl: "/dashboard/cxp",
    primaryLabel: "Requirements & Acquisition",
    primaryDescription: "Advanced Field Prototyping, Sensor Modernization & Trials",
    capabilities: ["SENSOR R&D", "PROTOTYPE TRIALS", "FIELD ACQUISITION"],
    status: "active",
  },
]

export default function SelectBranchPage() {
  const router = useRouter()
  const [hoveredDivision, setHoveredDivision] = useState<string>("cxr")
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null)
  const [isCovered, setIsCovered] = useState(false)
  const [isMounting, setIsMounting] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    // Lift transition veil on entrance from login
    const timer = setTimeout(() => {
      setIsMounting(false)
    }, 40)
    return () => clearTimeout(timer)
  }, [])

  const handleLogOut = () => {
    setIsLoggingOut(true)
    setTimeout(() => {
      router.push("/login")
    }, 400)
  }

  const handleSelectDivision = (url: string, id: string) => {
    setSelectedDivision(id)
    setIsCovered(true)

    setTimeout(() => {
      router.push(url)
    }, 420)
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050B14] font-sans text-white select-none">
      {/* Dynamic Background Gradient from Hovered Division */}
      <div 
        className="pointer-events-none fixed inset-0 transition-all duration-700 ease-in-out z-0"
        style={{
          background: DIVISIONS.find(d => d.id === hoveredDivision)?.bgGradient || DIVISIONS[0].bgGradient
        }}
      />

      {/* Unified AFCEC Blue-Steel Tactical Mesh Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 opacity-40 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.18),rgba(255,255,255,0))]"
        aria-hidden="true"
      />
      
      {/* Topographic Contour Lines */}
      <div 
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35 z-0" 
        aria-hidden="true" 
      />

      {/* Top Header Navigation */}
      <header className="relative z-30 flex h-20 w-full items-center justify-between px-6 lg:px-12 border-b border-white/10 bg-[#050B14]/85 backdrop-blur-xl">
        {/* Left: Official AFCEC Crest & Title */}
        <div className="flex items-center gap-3.5">
          <div className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md shadow-[inset_0_1px_0.5px_0_rgba(255,255,255,0.3)]">
            <AfcecLogo className="size-6 text-[#60A5FA]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black tracking-widest text-[#93C5FD]">
                AFCEC // AIR FORCE CIVIL ENGINEER CENTER
              </span>
              <span className="hidden sm:inline-flex rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-mono font-bold text-blue-300 border border-blue-500/30">
                AFIMSC
              </span>
            </div>
            <span className="text-[11px] font-mono font-semibold tracking-wider text-zinc-400">
              READINESS DIRECTORATE (CX) • INTEGRATED BASE RECOVERY
            </span>
          </div>
        </div>

        {/* Right: Operational Status Indicator & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </span>
            <span className="font-mono text-[10px] font-bold tracking-wider text-emerald-400">
              6 DIVISIONS ONLINE
            </span>
          </div>

          <button
            onClick={handleLogOut}
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-mono font-medium text-zinc-300 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white cursor-pointer"
            title="Log Out of Portal"
          >
            <LogOut className="size-3.5 text-zinc-400" />
            <span className="hidden sm:inline">EXIT</span>
          </button>
        </div>
      </header>

      {/* Main Stage: 6-Blade Diagonal Accordion */}
      <main className="relative z-20 flex min-h-[calc(100vh-80px)] w-full lg:w-[calc(100%+128px)] lg:-ml-16 flex-col lg:flex-row overflow-hidden">
        {DIVISIONS.map((division, idx) => {
          const isHovered = hoveredDivision === division.id
          const isSelected = selectedDivision === division.id
          const isFirst = idx === 0
          const isLast = idx === DIVISIONS.length - 1
          const InsigniaIcon = division.insignia

          return (
            <div
              key={division.id}
              onMouseEnter={() => setHoveredDivision(division.id)}
              className={`relative flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none ${
                isSelected
                  ? "lg:flex-[4.0] z-20 shadow-[0_0_80px_rgba(0,0,0,0.9)]"
                  : isHovered
                  ? "lg:flex-[2.6] z-10 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
                  : "lg:flex-1 opacity-75 hover:opacity-100"
              } lg:[transform:skewX(-4deg)]`}
            >
              {/* Tactical Dot Matrix Layer */}
              <div 
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-35" 
                aria-hidden="true"
              />

              {/* Ambient Center Glow */}
              <div 
                className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isSelected || isHovered ? "opacity-100" : "opacity-0"
                }`}
                style={{ background: division.accentGlow }}
                aria-hidden="true"
              />

              {/* Counter-Skew Content Container (+4deg cancels -4deg skew so all typography & icons stay 100% upright) */}
              <div className={`relative z-20 flex flex-col justify-between size-full p-5 lg:py-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:[transform:skewX(4deg)] ${
                isFirst ? "lg:pl-24 lg:pr-8" : isLast ? "lg:pl-12 lg:pr-24" : "lg:pl-12 lg:pr-8"
              }`}>
                
                {/* Large Subtle Watermark Emblem in Background */}
                <div 
                  className={`pointer-events-none absolute -bottom-10 -right-10 size-[320px] lg:size-[420px] transition-all duration-700 ease-in-out select-none ${
                    isSelected
                      ? "opacity-[0.16] scale-110"
                      : isHovered 
                      ? "opacity-[0.10] scale-100" 
                      : "opacity-[0.03] scale-90"
                  }`}
                  aria-hidden="true"
                >
                  <InsigniaIcon className="size-full text-white" />
                </div>

                {/* Blade Top: Code, AFSC Badge & Insignia */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div 
                      className={`relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] backdrop-blur-md shadow-[inset_0_1px_0.5px_0_rgba(255,255,255,0.25)] transition-transform duration-300 ${
                        isHovered || isSelected ? "scale-105 border-white/40" : ""
                      }`}
                    >
                      <InsigniaIcon className={`size-5 ${division.accentColorClass}`} />
                      <span className={`hidden lg:block absolute -top-1 -right-1 size-2 rounded-full ${division.accentColorClass} bg-current animate-pulse transition-opacity duration-300 ${
                        isHovered || isSelected ? "opacity-0" : "opacity-100"
                      }`} />
                    </div>
                    <div className={`transition-all duration-400 ${
                      isHovered || isSelected ? "opacity-100 translate-x-0 delay-100" : "lg:opacity-0 lg:-translate-x-2 lg:pointer-events-none"
                    }`}>
                      <span className="font-mono text-xs font-black tracking-widest text-zinc-200 whitespace-nowrap">
                        {division.code}
                      </span>
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                        {division.afsc}
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${division.badgeBgClass} ${division.badgeBorderClass} ${division.badgeTextClass} border shrink-0 transition-all duration-400 ${
                    isHovered || isSelected ? "opacity-100 scale-100 delay-150" : "lg:opacity-0 lg:scale-95 lg:pointer-events-none"
                  }`}>
                    <span className="size-1.5 rounded-full bg-current animate-pulse" />
                    READY
                  </span>
                </div>

                {/* Blade Middle: Dynamic Responsive Presentation */}
                <div className="relative z-10 my-auto py-4 w-full min-h-[300px] flex items-center">
                  {/* Collapsed State (Desktop only): Clean Horizontal Title */}
                  <div className={`hidden lg:flex absolute inset-0 flex-col justify-center pointer-events-none transition-all duration-200 ${
                    isHovered || isSelected ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0 delay-100"
                  }`}>
                    <span className={`font-mono text-[10px] font-bold tracking-widest uppercase mb-1.5 ${division.accentColorClass}`}>
                      {division.shortName}
                    </span>
                    <h2 className="text-sm xl:text-[15px] font-black tracking-tight leading-snug text-zinc-200">
                      {division.name}
                    </h2>
                  </div>

                  {/* Expanded State (Full Details on Hover or on Mobile) */}
                  <div className={`w-full lg:min-w-[420px] transition-all ease-out ${
                    isHovered || isSelected 
                      ? "opacity-100 translate-y-0 duration-500 delay-150" 
                      : "lg:opacity-0 lg:translate-y-2 lg:pointer-events-none duration-150"
                  }`}>
                    <p className="text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase mb-1">
                      {division.motto}
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                      {division.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-2 line-clamp-3 max-w-lg leading-relaxed">
                      {division.tagline}
                    </p>

                    {/* Capability Badges */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {division.capabilities.map((cap) => (
                        <span 
                          key={cap}
                          className="rounded border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-zinc-300 backdrop-blur-sm"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>

                    {/* Launch Action Button */}
                    <div className="mt-6 w-full max-w-[340px]">
                      <button
                        onClick={() => handleSelectDivision(division.primaryUrl, division.id)}
                        className="group/btn relative w-full overflow-hidden flex items-center justify-between p-3.5 rounded-xl border border-white/25 bg-white/[0.09] hover:bg-white/[0.16] hover:border-white/45 backdrop-blur-md shadow-[inset_0_1px_0.5px_0_rgba(255,255,255,0.3),0_10px_24px_rgba(0,0,0,0.5)] transition-all duration-200 cursor-pointer text-left"
                      >
                        <div className="flex-1 min-w-0 pr-3">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-white tracking-wide">
                              ENTER {division.code} PORTAL
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-300 mt-0.5 truncate">
                            {division.primaryDescription}
                          </p>
                        </div>
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition-all duration-200 group-hover/btn:translate-x-1 group-hover/btn:bg-white group-hover/btn:text-zinc-950`}>
                          <ArrowRight className="size-4" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Blade Footer: Division Code & Operational Unit */}
                <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-zinc-500 whitespace-nowrap">
                  <span className={`hidden lg:inline absolute left-0 font-black tracking-widest text-zinc-400 transition-opacity duration-300 ${
                    isHovered || isSelected ? "opacity-0 pointer-events-none" : "opacity-100 delay-100"
                  }`}>
                    {division.code}
                  </span>
                  <span className={`transition-opacity duration-400 ${
                    isHovered || isSelected ? "opacity-100 delay-100" : "lg:opacity-0 lg:pointer-events-none"
                  }`}>
                    AFCEC/CX // {division.code}
                  </span>
                  <span className={`${isHovered ? division.accentColorClass : "text-zinc-400"} font-bold transition-all duration-400 ${
                    isHovered || isSelected ? "opacity-100 delay-150" : "lg:opacity-0 lg:pointer-events-none"
                  }`}>
                    TYNDALL AFB, FL
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </main>

      {/* Screen Entrance & Navigation Charcoal Veil Transition */}
      <div 
        className={`pointer-events-none fixed inset-0 z-50 bg-[#070D18] transition-opacity duration-400 ease-in-out ${
          isMounting || isCovered || isLoggingOut ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </div>
  )
}
