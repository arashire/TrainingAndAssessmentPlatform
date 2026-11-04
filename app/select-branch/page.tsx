"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  AirForceLogo, 
  NavyLogo, 
  ArmyLogo, 
  MarinesLogo 
} from "@/components/branch-logo"
import { 
  ArrowRight, 
  ChevronRight, 
  LayoutGrid, 
  Wrench, 
  LogOut,
  Sparkles,
  Lock
} from "lucide-react"

interface BranchConfig {
  id: string
  name: string
  code: string
  motto: string
  tagline: string
  primaryColor: string
  secondaryColor: string
  bgGradient: string
  accentGlow: string
  insignia: React.ComponentType<{ className?: string }>
  primaryUrl: string
  primaryLabel: string
  primaryDescription: string
  status: "active" | "queued"
  subDestinations?: {
    id: string
    title: string
    subtitle: string
    url: string
    badge: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

const BRANCHES: BranchConfig[] = [
  {
    id: "air-force",
    name: "U.S. Air Force",
    code: "USAF",
    motto: "Fly, Fight and Win",
    tagline: "Air Superiority, Global Strike & Autonomous Fleet Telemetry",
    primaryColor: "#60A5FA",
    secondaryColor: "#3B82F6",
    bgGradient: "linear-gradient(180deg, #0a1322 0%, #101c2e 50%, #070d18 100%)",
    accentGlow: "radial-gradient(circle 850px at 50% 50%, rgba(59, 130, 246, 0.28) 0%, transparent 70%)",
    insignia: AirForceLogo,
    primaryUrl: "/dashboard",
    primaryLabel: "U.S. Air Force",
    primaryDescription: "Candidate Flight Training & Assessment Dashboard",
    status: "active",
    subDestinations: [
      {
        id: "afcec",
        title: "AFCEC",
        subtitle: "Air Force Civil Engineer Center • Infrastructure & Engineering Readiness",
        url: "/dashboard/afcec",
        badge: "ENGINEERING",
        icon: Wrench,
      },
    ],
  },
  {
    id: "navy",
    name: "U.S. Navy",
    code: "USN",
    motto: "Non Sibi Sed Patriae",
    tagline: "Maritime Air Superiority & Carrier Strike Group Operations",
    primaryColor: "#38BDF8",
    secondaryColor: "#0284C7",
    bgGradient: "linear-gradient(180deg, #091724 0%, #0d2235 50%, #060f17 100%)",
    accentGlow: "radial-gradient(circle 850px at 50% 50%, rgba(56, 189, 248, 0.25) 0%, transparent 70%)",
    insignia: NavyLogo,
    primaryUrl: "#",
    primaryLabel: "U.S. Navy",
    primaryDescription: "Naval Aviation Enterprise & Carrier Trap Quals",
    status: "queued",
  },
  {
    id: "army",
    name: "U.S. Army",
    code: "USA",
    motto: "This We'll Defend",
    tagline: "Rotary Wing Aviation, Ground Air Integration & Tactical Recon",
    primaryColor: "#F59E0B",
    secondaryColor: "#D97706",
    bgGradient: "linear-gradient(180deg, #18150e 0%, #241e12 50%, #0f0d08 100%)",
    accentGlow: "radial-gradient(circle 850px at 50% 50%, rgba(245, 158, 11, 0.25) 0%, transparent 70%)",
    insignia: ArmyLogo,
    primaryUrl: "#",
    primaryLabel: "U.S. Army",
    primaryDescription: "Army Aviation Center of Excellence & Flight Syllabus",
    status: "queued",
  },
  {
    id: "marines",
    name: "U.S. Marines",
    code: "USMC",
    motto: "Semper Fidelis",
    tagline: "Marine Air-Ground Task Force & Expeditionary Strike Envelopes",
    primaryColor: "#EF4444",
    secondaryColor: "#DC2626",
    bgGradient: "linear-gradient(180deg, #1c1012 0%, #281418 50%, #120a0b 100%)",
    accentGlow: "radial-gradient(circle 850px at 50% 50%, rgba(239, 68, 68, 0.25) 0%, transparent 70%)",
    insignia: MarinesLogo,
    primaryUrl: "#",
    primaryLabel: "U.S. Marines",
    primaryDescription: "Marine Corps Aviation Command & Close Air Support",
    status: "queued",
  },
]

export default function SelectBranchPage() {
  const router = useRouter()
  const [hoveredBranch, setHoveredBranch] = useState<string>("air-force")
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<{ url: string; title: string } | null>(null)
  const [isCovered, setIsCovered] = useState(false)
  const [isMounting, setIsMounting] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    // Lift charcoal veil on entrance from login
    const timer = setTimeout(() => {
      setIsMounting(false)
    }, 40)
    return () => clearTimeout(timer)
  }, [])

  const handleLogOut = () => {
    setIsLoggingOut(true)
    setTimeout(() => {
      router.push("/login")
    }, 350)
  }

  const handleSelectBranch = (url: string, branchId: string, title: string) => {
    if (selectedBranch) return
    setSelectedBranch(branchId)
    setSelectedDestination({ url, title })

    // Start fading in the color bridge veil at 420ms as column reaches full expansion
    setTimeout(() => {
      setIsCovered(true)
    }, 420)

    // Complete route navigation at 750ms while completely covered
    setTimeout(() => {
      router.push(url)
    }, 750)
  }

  return (
    <div className="relative min-h-screen h-[100dvh] w-full overflow-hidden bg-[#07090c] text-white flex flex-col select-none">
      {/* Top Universal HUD Bar (Frosted Glass Overlay with Long Soft Drop Shadow) */}
      <header className={`absolute top-0 inset-x-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-black/35 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] px-6 shadow-[0_16px_36px_-4px_rgba(0,0,0,0.6),0_6px_16px_-2px_rgba(0,0,0,0.4)] transition-all duration-500 ease-in-out ${
        selectedBranch ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
      }`}>
        <div className="flex items-center gap-3">
          <LayoutGrid strokeWidth={1.25} className="size-7.5 text-zinc-400 opacity-60 shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-widest text-zinc-200 uppercase">
                BRANCH SELECTION
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-semibold tracking-wide">
                ACCESS LEVEL - ADMIN
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 tracking-wider">
              MULTI-BRANCH OPERATIONAL GATEWAY
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <strong className="text-zinc-200 font-bold tracking-wider">ADMIN</strong>
          </div>

          <button
            onClick={handleLogOut}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* 4 Angled Accordion Columns Container */}
      <main className="relative size-full flex-1 min-h-0 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden bg-[#07090c] pt-16 lg:pt-0">
        {/* Stage Wrapper: Subtle 60px overhang on desktop compensates for the 4.5deg slant to bleed flush to edges */}
        <div className="flex flex-col lg:flex-row w-full lg:w-[calc(100%+60px)] lg:-ml-[30px] h-full min-h-0">
          {BRANCHES.map((branch) => {
            const isSelected = selectedBranch === branch.id
            const isOtherSelected = Boolean(selectedBranch && !isSelected)
            const isHovered = hoveredBranch === branch.id && !selectedBranch
            const InsigniaIcon = branch.insignia

            return (
              <div
                key={branch.id}
                onMouseEnter={() => {
                  if (!selectedBranch) setHoveredBranch(branch.id)
                }}
                onClick={() => {
                  if (!selectedBranch) setHoveredBranch(branch.id)
                }}
                style={{
                  background: branch.bgGradient,
                }}
                className={`group/col relative flex flex-col justify-between overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isSelected
                    ? "lg:flex-[100] z-30 lg:[transform:skewX(0deg)]"
                    : isOtherSelected
                    ? "lg:flex-[0.0001] opacity-0 pointer-events-none scale-95 lg:[transform:skewX(-4.5deg)]"
                    : isHovered
                    ? "lg:flex-[2.8] shadow-[0_0_60px_rgba(0,0,0,0.85)] z-10 lg:[transform:skewX(-4.5deg)]"
                    : "lg:flex-1 opacity-80 hover:opacity-100 lg:[transform:skewX(-4.5deg)]"
                }`}
              >
                {/* Tactical Dot Grid Layer */}
                <div 
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" 
                  aria-hidden="true"
                />

                {/* Ambient Center Glow Gradient */}
                <div 
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isSelected || isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ background: branch.accentGlow }}
                  aria-hidden="true"
                />

                {/* Counter-Skew Content Wrapper: Cancels angle with +4.5deg so all content is 100% upright */}
                <div className={`relative z-20 flex flex-col justify-between size-full p-5 lg:pt-[84px] lg:pb-7 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isSelected ? "lg:[transform:skewX(0deg)] lg:px-20" : "lg:[transform:skewX(4.5deg)]"
                } ${
                  branch.id === "marines"
                    ? "lg:pl-16 lg:pr-16"
                    : "lg:pl-16 lg:pr-8"
                }`}>
                  {/* Large Watermark Insignia in Background (Doubled size & ultra-subtle ghost opacity) */}
                  <div 
                    className={`pointer-events-none absolute -bottom-16 -right-16 size-[460px] lg:size-[620px] transition-all duration-700 ease-in-out select-none ${
                      isSelected
                        ? "opacity-[0.14] scale-125"
                        : isHovered 
                        ? "opacity-[0.08] scale-105 translate-x-2 translate-y-2" 
                        : "opacity-[0.025] scale-95"
                    }`}
                    aria-hidden="true"
                  >
                    <InsigniaIcon className="size-full text-white" />
                  </div>

                  {/* Column Top: Branch Code & Insignia Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_0.5px_0_rgba(255,255,255,0.25)] transition-transform duration-700 ease-in-out ${
                          isHovered || isSelected ? "scale-105" : ""
                        }`}
                      >
                        <InsigniaIcon className="size-6 text-white" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold tracking-widest text-zinc-300">
                          {branch.code}
                        </span>
                        <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                          BRANCH
                        </span>
                      </div>
                    </div>

                    {/* Status Indicator (Only on Active branch) */}
                    {branch.status === "active" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                        ONLINE
                      </span>
                    )}
                  </div>

                  {/* Column Center: Title, Motto & Action Buttons Stack */}
                  <div className="relative z-10 py-5 my-auto max-w-[420px] w-full">
                    <p className="text-xs font-mono font-semibold tracking-widest text-zinc-400 uppercase mb-1.5 transition-colors duration-700 ease-in-out">
                      {branch.motto}
                    </p>
                    <h2 className={`font-black tracking-tight text-white transition-all duration-700 ease-in-out ${
                      isSelected ? "text-4xl lg:text-5xl" : isHovered ? "text-3xl lg:text-4xl" : "text-2xl lg:text-3xl text-zinc-300"
                    }`}>
                      {branch.name}
                    </h2>
                    
                    {/* Description shows fully when hovered */}
                    <p className={`text-xs text-zinc-400 mt-2 line-clamp-2 max-w-sm transition-all duration-700 ease-in-out ${
                      isSelected || isHovered ? "opacity-100 max-h-20" : "lg:opacity-0 lg:max-h-0 overflow-hidden"
                    }`}>
                      {branch.tagline}
                    </p>

                    {/* Interactive Action Buttons directly beneath subtitle */}
                    <div className="pt-6 w-full max-w-[390px]">
                      <div className={`space-y-2.5 transition-all duration-500 ease-in-out ${
                        isSelected
                          ? "opacity-0 -translate-y-2 pointer-events-none max-h-0 overflow-hidden"
                          : isHovered 
                          ? "opacity-100 translate-y-0" 
                          : "lg:opacity-0 lg:pointer-events-none lg:translate-y-4 lg:max-h-0 lg:overflow-hidden"
                      }`}>
                        {/* Primary Branch Option (Air Force -> /dashboard) */}
                        {branch.status === "active" ? (
                          <button
                            onClick={() => handleSelectBranch(branch.primaryUrl, branch.id, branch.primaryLabel)}
                            className="group/btn relative w-full overflow-hidden flex items-center justify-between p-3.5 rounded-xl border border-white/20 bg-white/[0.08] hover:bg-white/[0.14] hover:border-white/35 backdrop-blur-md shadow-[inset_0_1px_0.5px_0_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-pointer text-left"
                          >
                            <div className="flex-1 min-w-0 pr-3">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-sm text-white tracking-wide">
                                  {branch.primaryLabel}
                                </span>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                  HQ
                                </span>
                              </div>
                              <p className="text-xs text-zinc-300 mt-0.5 truncate">
                                {branch.primaryDescription}
                              </p>
                            </div>
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition-transform duration-200 group-hover/btn:translate-x-1 group-hover/btn:bg-white group-hover/btn:text-zinc-950">
                              <ArrowRight className="size-4" />
                            </div>

                            {/* Specular sheen sweep */}
                            <div 
                              className="pointer-events-none absolute inset-y-0 -left-[100%] w-[100%] bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)] transition-transform duration-0 group-hover/btn:translate-x-[200%] group-hover/btn:duration-700 group-hover/btn:ease-out" 
                              aria-hidden="true" 
                            />
                          </button>
                        ) : (
                          <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 text-xs font-mono">
                            <span className="truncate pr-2">{branch.primaryDescription}</span>
                            <span className="shrink-0 text-[10px] uppercase font-bold text-zinc-500 px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
                              QUEUED
                            </span>
                          </div>
                        )}

                        {/* Sub-Destinations (e.g. AFCEC under U.S. Air Force) */}
                        {branch.subDestinations?.map((sub) => {
                          const SubIcon = sub.icon

                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleSelectBranch(sub.url, branch.id, sub.title)}
                              className="group/sub relative w-full overflow-hidden flex items-center justify-between p-3 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] hover:border-white/30 backdrop-blur-md shadow-sm transition-all duration-200 cursor-pointer text-left"
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <div className="flex size-7.5 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 group-hover/sub:text-white group-hover/sub:bg-white/15 transition-colors">
                                  <SubIcon className="size-3.5" />
                                </div>
                                <div className="min-w-0 truncate">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-xs sm:text-sm text-zinc-100 group-hover/sub:text-white">
                                      {sub.title}
                                    </span>
                                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                      {sub.badge}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                                    {sub.subtitle}
                                  </p>
                                </div>
                              </div>

                              <div className="flex size-6.5 shrink-0 items-center justify-center rounded-md text-zinc-400 group-hover/sub:text-white transition-transform duration-200 group-hover/sub:translate-x-1">
                                <ChevronRight className="size-3.5" />
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      {/* Tactical HUD Authorization & Initialization Readout */}
                      {isSelected && (
                        <div className="pt-2 flex flex-col gap-2.5 animate-[dashboardFadeUp_400ms_cubic-bezier(0.16,1,0.3,1)_both]">
                          <div className="flex items-center gap-2.5">
                            <span className="relative flex size-2.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                            </span>
                            <span className="font-mono text-xs font-bold tracking-widest text-emerald-400 uppercase">
                              CONNECTING TO {selectedDestination?.title.toUpperCase()}...
                            </span>
                          </div>
                          <div className="h-1 w-full max-w-sm rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 animate-[loadingSweep_700ms_ease-in-out_infinite]" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Charcoal Bridge Transition Veil (To/From Login) */}
      <div 
        className={`pointer-events-none fixed inset-0 z-[100] bg-[#0d1015] transition-opacity duration-400 ease-out ${
          isMounting || isLoggingOut ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Air Force Blue Color Bridge Transition Veil (To Dashboard) */}
      <div 
        className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-320 ease-in-out ${
          isCovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(180deg, #0a1322 0%, #101c2e 50%, #070d18 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  )
}
