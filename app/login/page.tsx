"use client"

import React, { useEffect, useState } from "react"
import { LoginForm } from "@/components/login-form"
import { Shield, Radio, Lock } from "lucide-react"

export default function LoginPage() {
  const [isMounting, setIsMounting] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounting(false)
    }, 40)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0e1014] via-[#14171d] to-[#090b0d] text-white flex flex-col justify-between selection:bg-white/20 selection:text-white">
      {/* Tactical Dot Grid Background Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px] opacity-70" 
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Glow Orbs (Subtle Charcoal/Slate) */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-white/[0.025] blur-[140px] -z-0"
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-zinc-500/[0.02] blur-[120px] -z-0"
        aria-hidden="true" 
      />

      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[inset_0_1px_0.5px_0_rgba(255,255,255,0.2)]">
            <Shield className="size-4.5 text-zinc-300" />
          </div>
          <div>
            <span className="block text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase">
              Unified Platform
            </span>
            <span className="block text-[10px] font-mono text-zinc-500">
              SECURE ASSESSMENT & EVALUATION
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-zinc-400 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wide">SYSTEM READY</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md animate-[dashboardFadeUp_650ms_cubic-bezier(0.16,1,0.3,1)_both]">
          {/* Header Typography Stack */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-widest text-zinc-300 mb-3 shadow-xs">
              <Lock className="size-3 text-zinc-400" />
              <span>Restricted Access Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Admin Login
            </h1>
          </div>

          {/* Frosted Glass Login Form */}
          <LoginForm onSuccess={() => setIsExiting(true)} />

          {/* Test Credentials Hint Pill */}
          <div className="mt-5 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 px-3 py-1 rounded-lg border border-white/5 bg-white/[0.02]">
              <span>TEST CREDENTIALS:</span>
              <span className="text-zinc-300 font-bold">admin</span>
              <span>/</span>
              <span className="text-zinc-300 font-bold">1234</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-6 py-4 lg:px-10 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span>CLASSIFICATION: CONTROLLED UNCLASSIFIED</span>
        </div>
        <div className="flex items-center gap-4">
          <span>PORTAL VER: 2.4.0</span>
          <span>•</span>
          <span>SUPPORT: AUTON-OPS-9</span>
        </div>
      </footer>

      {/* Full-Screen Charcoal Bridge Veil */}
      <div 
        className={`pointer-events-none fixed inset-0 z-[100] bg-[#0d1015] transition-opacity duration-350 ease-in-out ${
          isMounting || isExiting ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </div>
  )
}
