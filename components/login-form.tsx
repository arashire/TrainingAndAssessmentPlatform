"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertTriangle,
  Radio
} from "lucide-react"

export function LoginForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsAuthenticating(true)

    // Simulate tactical authentication delay
    setTimeout(() => {
      const cleanUser = username.trim().toLowerCase()
      const cleanPass = password.trim()

      if (cleanUser === "admin" && cleanPass === "1234") {
        setIsSuccess(true)
        setIsAuthenticating(false)

        // Trigger full-screen charcoal bridge veil at 420ms after success banner appears
        setTimeout(() => {
          onSuccess?.()
        }, 420)

        // Navigate while fully shrouded at 750ms
        setTimeout(() => {
          router.push("/select-branch")
        }, 750)
      } else {
        setIsAuthenticating(false)
        const nextAttempts = failedAttempts + 1
        setFailedAttempts(nextAttempts)
        setErrorMessage("Authentication failed: Invalid operational credentials.")
        setShakeKey(prev => prev + 1)
      }
    }, 400)
  }

  return (
    <div className="w-full">
      {/* Outer Frosted Glass Card Container */}
      <div 
        key={shakeKey}
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-7 sm:p-9 shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.2),inset_1px_0_0.5px_0_rgba(255,255,255,0.08),inset_0_-1.5px_1px_0_rgba(0,0,0,0.5),0_24px_48px_-12px_rgba(0,0,0,0.7)] transition-all duration-300 ${
          errorMessage ? "animate-[tacticalShake_400ms_ease-in-out]" : ""
        }`}
      >
        {/* Ambient Top Glow Line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Security Alert Banner (Failed Attempt) */}
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 backdrop-blur-md animate-[dashboardFadeUp_300ms_ease-out_both]">
            <div className="flex items-start gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                <ShieldAlert className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Access Denied
                  </h4>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    ATTEMPT #{failedAttempts}
                  </span>
                </div>
                <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                  {errorMessage}
                </p>
                <div className="mt-2 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[10px] font-mono text-amber-300/80">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="size-3 text-amber-400" />
                    SECURITY EVENT LOGGED
                  </span>
                  <span>IP: 127.0.0.1</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Banner */}
        {isSuccess && (
          <div className="mb-6 rounded-xl border border-emerald-500/40 bg-emerald-500/15 p-3.5 backdrop-blur-md animate-[dashboardFadeUp_300ms_ease-out_both]">
            <div className="flex items-center gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/30 text-emerald-400">
                <ShieldCheck className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Identity Cleared • Access Granted
                </h4>
                <p className="text-xs text-emerald-200/90 mt-0.5">
                  Redirecting to Operational Branch Selection...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label 
              htmlFor="username" 
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5"
            >
              Operator Call-Sign / Username
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-zinc-500">
                <User className="size-4" />
              </span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                disabled={isAuthenticating || isSuccess}
                autoComplete="username"
                required
                className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 shadow-inner outline-none transition-all duration-200 focus:border-white/30 focus:bg-black/60 focus:ring-1 focus:ring-white/20 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="mb-1.5">
              <label 
                htmlFor="password" 
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Passcode
              </label>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-zinc-500">
                <Lock className="size-4" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                disabled={isAuthenticating || isSuccess}
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-11 py-2.5 text-sm text-white placeholder-zinc-500 shadow-inner outline-none transition-all duration-200 focus:border-white/30 focus:bg-black/60 focus:ring-1 focus:ring-white/20 disabled:opacity-60 font-mono tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3.5 text-zinc-400 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isAuthenticating || isSuccess}
              className="group/btn relative w-full overflow-hidden rounded-xl border border-white/20 bg-gradient-to-r from-zinc-200 to-white text-zinc-950 font-bold text-sm py-3 px-4 shadow-[0_4px_16px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
            >
              {isAuthenticating ? (
                <>
                  <span className="size-4 rounded-full border-2 border-zinc-950/30 border-t-zinc-950 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : isSuccess ? (
                <>
                  <ShieldCheck className="size-4 text-emerald-700" />
                  <span>Access Granted</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter</span>
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </>
              )}

              {/* High-speed specular light sheen sweep */}
              <div 
                className="pointer-events-none absolute inset-y-0 -left-[100%] w-[100%] bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%)] transition-transform duration-0 group-hover/btn:translate-x-[200%] group-hover/btn:duration-700 group-hover/btn:ease-out" 
                aria-hidden="true" 
              />
            </button>
          </div>
        </form>

        {/* Bottom Gateway Telemetry Meta */}
        <div className="mt-6 pt-4 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>TERMINAL: CLOUD-ALPHA</span>
          </div>
          <span>ENCRYPTION: AES-256-GCM</span>
        </div>
      </div>
    </div>
  )
}
