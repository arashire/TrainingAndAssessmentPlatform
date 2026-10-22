import React from "react"

export function ArmyLogo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="U.S. Army">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <polygon
        points="12,3.8 14.5,8.8 20,9.6 16,13.5 16.9,19 12,16.4 7.1,19 8,13.5 4,9.6 9.5,8.8"
        fill="currentColor"
      />
    </svg>
  )
}

export function NavyLogo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="U.S. Navy">
      <circle cx="12" cy="4" r="2" strokeWidth="1.8" />
      <line x1="7" y1="8" x2="17" y2="8" strokeWidth="2.2" />
      <circle cx="6.5" cy="8" r="0.8" fill="currentColor" />
      <circle cx="17.5" cy="8" r="0.8" fill="currentColor" />
      <line x1="12" y1="6" x2="12" y2="20.5" strokeWidth="2.2" />
      <path d="M4.5 14.5C4.5 18.5 7.8 21 12 21C16.2 21 19.5 18.5 19.5 14.5" strokeWidth="2.2" />
      <path d="M3 14L5.5 15.5" strokeWidth="2" />
      <path d="M21 14L18.5 15.5" strokeWidth="2" />
      <path d="M9.5 6.5C8.5 8 10 9.5 12 9.5C14.5 9.5 14.5 11.5 13.5 13C12.5 14.5 9.8 15 10.5 17C11.2 18.8 13.5 19 14.5 19.5" strokeWidth="1.4" />
    </svg>
  )
}

export function AirForceLogo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="U.S. Air Force">
      <path d="M12 11.5L4 3.5H7.5L12 8L16.5 3.5H20L12 11.5Z" />
      <path d="M12 14.5L6 7.5H8.5L12 11.5L15.5 7.5H18L12 14.5Z" opacity="0.85" />
      <path d="M12 17L8.5 11.5H10.5L12 14L13.5 11.5H15.5L12 17Z" opacity="0.7" />
      <polygon points="12,14 13.2,17.2 16.5,17.2 13.8,19.2 14.8,22.5 12,20.5 9.2,22.5 10.2,19.2 7.5,17.2 10.8,17.2" />
    </svg>
  )
}

export function MarinesLogo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="U.S. Marines">
      <path d="M7 6C8.5 4.5 10 4 12 4C14 4 15.5 4.5 17 6" strokeWidth="1.5" />
      <path d="M9 4.5L12 2.5L15 4.5" strokeWidth="1.5" />
      <path d="M6 7L12 5.2L18 7" strokeWidth="1.5" />
      <line x1="5.5" y1="18.5" x2="18.5" y2="5.5" strokeWidth="2.2" />
      <line x1="16" y1="4" x2="20" y2="8" strokeWidth="1.8" />
      <circle cx="18.5" cy="5.5" r="1.5" strokeWidth="1.5" />
      <circle cx="12" cy="13" r="5" fill="currentColor" fillOpacity="0.15" strokeWidth="1.7" />
      <ellipse cx="12" cy="13" rx="5" ry="2" strokeWidth="1.2" />
      <line x1="12" y1="8" x2="12" y2="18" strokeWidth="1.2" />
      <path d="M3.5 16C4.5 19.5 8 20.8 11.5 19.8" strokeWidth="2.2" />
      <path d="M3 15.5L5 17.5" strokeWidth="2" />
    </svg>
  )
}

export type ValidBranch = "U.S. Air Force" | "U.S. Navy" | "U.S. Army" | "U.S. Marines"

export function BranchLogo({ branch, className = "size-6" }: { branch: string; className?: string }) {
  const normalized = branch.toLowerCase()
  if (normalized.includes("navy")) return <NavyLogo className={className} />
  if (normalized.includes("army")) return <ArmyLogo className={className} />
  if (normalized.includes("air force") || normalized.includes("airforce")) return <AirForceLogo className={className} />
  if (normalized.includes("marine")) return <MarinesLogo className={className} />
  return null
}

