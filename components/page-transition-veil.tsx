"use client"

import { useEffect, useState } from "react"

export function PageTransitionVeil() {
  const [isLifting, setIsLifting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Hold solid color briefly to let WebGL canvas & layout paint first frame
    const liftTimer = setTimeout(() => {
      setIsLifting(true)
    }, 40)

    // Remove veil from DOM once fade-out completes
    const doneTimer = setTimeout(() => {
      setIsDone(true)
    }, 450)

    return () => {
      clearTimeout(liftTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  if (isDone) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999] transition-opacity duration-400 ease-out ${
        isLifting ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(180deg, #0a1322 0%, #101c2e 50%, #070d18 100%)",
      }}
      aria-hidden="true"
    />
  )
}

