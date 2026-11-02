"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

interface HudCrosshairProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function HudCrosshair({ containerRef }: HudCrosshairProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const hLineRef = useRef<HTMLDivElement>(null)
  const vLineRef = useRef<HTMLDivElement>(null)
  const reticleRef = useRef<HTMLDivElement>(null)
  const coordsRef = useRef<HTMLDivElement>(null)

  const isLockedRef = useRef(false)
  isLockedRef.current = isLocked

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()

      // Coordinates relative to the dashboard container
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check bounds
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        setIsVisible(false)
        return
      }

      setIsVisible(true)

      // Direct GPU transform updates for 120fps hardware responsiveness
      if (hLineRef.current) {
        hLineRef.current.style.transform = `translate3d(0, ${y}px, 0)`
      }
      if (vLineRef.current) {
        vLineRef.current.style.transform = `translate3d(${x}px, 0, 0)`
      }
      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }

      // Detect interactive targets under the cursor
      const target = document.elementFromPoint(e.clientX, e.clientY)
      const interactiveEl = target?.closest(
        'button, a, input, select, textarea, [role="button"], [role="tab"], .group\\/metric-card, .group\\/interactive-card, .cursor-pointer, [data-interactive="true"]'
      )
      const locked = !!interactiveEl

      if (locked !== isLockedRef.current) {
        setIsLocked(locked)
      }

      // Update coordinates display
      if (coordsRef.current) {
        const xVal = Math.round(x)
        const yVal = Math.round(y)
        coordsRef.current.textContent = `x: ${xVal}  y: ${yVal}`
      }
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => {
      setIsVisible(false)
      setIsLocked(false)
    }

    container.addEventListener("mousemove", handleMouseMove, { passive: true })
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [containerRef])

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-40 overflow-hidden transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Horizontal Hairline (Black 0.15 opacity in light mode, White 0.15 opacity in dark mode) */}
      <div
        ref={hLineRef}
        className={`pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-black/15 dark:bg-white/15 will-change-transform transition-opacity duration-200 ${
          isLocked ? "opacity-40" : "opacity-100"
        }`}
      />

      {/* Vertical Hairline (Black 0.15 opacity in light mode, White 0.15 opacity in dark mode) */}
      <div
        ref={vLineRef}
        className={`pointer-events-none absolute left-0 top-0 h-full w-[1px] bg-black/15 dark:bg-white/15 will-change-transform transition-opacity duration-200 ${
          isLocked ? "opacity-40" : "opacity-100"
        }`}
      />

      {/* Cursor Reticle Tracking Group */}
      <div
        ref={reticleRef}
        className="pointer-events-none absolute left-0 top-0 will-change-transform"
      >
        {/* Pier Gorelli Style Center Blue Square (Minimalist 5px) */}
        <div
          className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out ${
            isLocked
              ? "opacity-0 scale-0"
              : "size-[5px] bg-blue-600 dark:bg-blue-400 shadow-[0_0_4px_rgba(59,130,246,0.5)] opacity-100 scale-100"
          }`}
        />

        {/* Hover "INTERACT ↗" Reticle Group (Stroked Circle + Text Beside) */}
        <div
          className={`absolute left-0 top-0 pointer-events-none transition-all duration-200 ease-out ${
            isLocked ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          {/* Stroked Circle (Not filled, preserves drop shadow) */}
          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 size-7 rounded-full border-2 border-blue-600 dark:border-blue-400 bg-transparent shadow-xl shadow-blue-500/35" />

          {/* Beside the circle: INTERACT label with ArrowUpRight */}
          <div className="absolute left-0 top-0 translate-x-5 -translate-y-1/2 flex items-center gap-1 whitespace-nowrap">
            <span className="font-mono text-[9px] font-black tracking-widest uppercase select-none text-blue-600 dark:text-blue-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              INTERACT
            </span>
            <ArrowUpRight className="size-3.5 stroke-[2.5] text-blue-600 dark:text-blue-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
          </div>
        </div>

        {/* Dynamic Telemetry Coordinates Readout (Positioned to the right, 0.3 opacity) */}
        <div
          className={`absolute left-0 top-0 translate-x-3.5 translate-y-2 pointer-events-none transition-opacity duration-150 ${
            isLocked ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            ref={coordsRef}
            className="font-mono text-[9px] font-medium tracking-wider tabular-nums text-black/30 dark:text-white/30 select-none whitespace-nowrap"
          >
            x: 0  y: 0
          </div>
        </div>
      </div>
    </div>
  )
}


