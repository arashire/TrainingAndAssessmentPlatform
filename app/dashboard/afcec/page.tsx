"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { 
  Wrench, 
  ArrowLeft, 
  Shield, 
  Building2, 
  Power, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  HardHat,
  Flame,
  Radio
} from "lucide-react"

export default function AfcecDashboardPage() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0c151d] via-[#101c27] to-[#152431] text-white flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-black/40 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/select-branch")}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>Select Branch</span>
          </button>
          <div className="h-4 w-px bg-white/15" />
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/5">
              <Wrench className="size-4 text-[#60A5FA]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black tracking-wide text-white">AFCEC</h1>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  CIVIL ENGINEER CENTER
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-400">
                AIR FORCE INSTALLATION & MISSION SUPPORT CENTER
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300">FACILITY READINESS: 96.4%</span>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/20 px-3 py-1.5 text-xs font-bold text-blue-300 hover:bg-blue-500/30 transition-colors cursor-pointer"
          >
            <span>Flight Training Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6 sm:p-8 shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.2)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#60A5FA] mb-2">
                <HardHat className="size-4" />
                <span>Base Infrastructure & Readiness Directive</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Civil Engineering Operations Center
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
                Real-time airfield pavement telemetry, energy resilience grids, explosive ordnance disposal (EOD) readiness, and rapid runway repair deployment status.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="block text-2xl font-black font-mono text-white">74 / 76</span>
                <span className="block text-[10px] font-mono text-emerald-400">BASES CLEARED</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Infrastructure Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase">Runway Pavement (PCI)</span>
              <Activity className="size-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white">92.8</div>
            <span className="text-[11px] text-emerald-400">Runway 04L/22R Active Solo Clear</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase">Grid Power Resilience</span>
              <Power className="size-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white">99.98%</div>
            <span className="text-[11px] text-zinc-400">Microgrid & Dual-Feed Active</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase">Fire & Emergency Svcs</span>
              <Flame className="size-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white">100%</div>
            <span className="text-[11px] text-amber-400">Class 1 Response Capability</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase">EOD Unit Status</span>
              <Shield className="size-4 text-[#60A5FA]" />
            </div>
            <div className="text-2xl font-black font-mono text-white">24 / 24</div>
            <span className="text-[11px] text-zinc-400">Flightline Escort Ready</span>
          </div>
        </div>
      </main>
    </div>
  )
}

