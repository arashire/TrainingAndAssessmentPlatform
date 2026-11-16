import React from "react"

/**
 * Official Air Force Civil Engineer Center (AFCEC) Crest / Logo
 * Features the traditional CE gear wheel, compass, and shield heraldry.
 */
export function AfcecLogo({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-label="AFCEC Logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Gear Ring */}
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.4" />
      <path
        d="M50 4 L53 10 L47 10 Z M50 96 L53 90 L47 90 Z M4 50 L10 53 L10 47 Z M96 50 L90 53 L90 47 Z M17.5 17.5 L23 21 L19 25 Z M82.5 82.5 L77 79 L81 75 Z M17.5 82.5 L21 77 L25 81 Z M82.5 17.5 L79 23 L75 19 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Middle Shield */}
      <path
        d="M26 28 L74 28 C74 28 76 52 50 78 C24 52 26 28 26 28 Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Inner Compass / Star */}
      <path
        d="M50 32 L54 46 L68 50 L54 54 L50 68 L46 54 L32 50 L46 46 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
    </svg>
  )
}

/**
 * CXR: Emergency Management Division Emblem
 * CBRN Atom, Tri-Sector Biohazard/Radiation Motif, Protective Shield
 */
export function CxrEmblem({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-label="CXR Emergency Management"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Protective Shield */}
      <path
        d="M50 8 L84 22 C84 56 68 82 50 92 C32 82 16 56 16 22 Z"
        strokeWidth="4"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* CBRN Orbital Rings */}
      <ellipse cx="50" cy="48" rx="26" ry="10" strokeWidth="2.5" transform="rotate(-30 50 48)" opacity="0.8" />
      <ellipse cx="50" cy="48" rx="26" ry="10" strokeWidth="2.5" transform="rotate(30 50 48)" opacity="0.8" />
      <ellipse cx="50" cy="48" rx="26" ry="10" strokeWidth="2.5" transform="rotate(90 50 48)" opacity="0.8" />
      {/* Core Radiation / Hazard Nucleus */}
      <circle cx="50" cy="48" r="6" fill="currentColor" stroke="none" />
      {/* Detection Ray Accents */}
      <path d="M50 20 L50 26 M50 70 L50 76 M26 48 L32 48 M68 48 L74 48" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/**
 * CXF: Fire and Emergency Services Division Emblem
 * Maltese Cross, Firefighter Axes, Central Eternal Rescue Flame
 */
export function CxfEmblem({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-label="CXF Fire and Emergency Services"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Traditional Maltese Cross Outline */}
      <path
        d="M50 14 L58 24 L72 16 L66 32 L82 34 L72 48 L86 50 L72 52 L82 66 L66 68 L72 84 L58 76 L50 86 L42 76 L28 84 L34 68 L18 66 L28 52 L14 50 L28 48 L18 34 L34 32 L28 16 L42 24 Z"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Inner Central Circle */}
      <circle cx="50" cy="50" r="18" strokeWidth="3" fill="currentColor" fillOpacity="0.2" />
      {/* Central Flame */}
      <path
        d="M50 38 C53 43 57 46 57 51 C57 56 53.5 60 50 60 C46.5 60 43 56 43 51 C43 47 46 43 48 40 C48.5 43 50.5 44 51.5 44 C50 41 49.5 39 50 38 Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

/**
 * CXD: Explosive Ordnance Disposal (EOD) Division Emblem
 * Ordnance Bomb, High-Voltage Lightning Bolts, Counter-IED Shield
 */
export function CxdEmblem({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-label="CXD Explosive Ordnance Disposal"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Tactical Shield */}
      <path
        d="M50 10 L82 22 L76 72 L50 90 L24 72 L18 22 Z"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Central Bomb Body */}
      <path
        d="M50 30 C43 30 38 37 38 48 C38 61 46 70 50 72 C54 70 62 61 62 48 C62 37 57 30 50 30 Z"
        strokeWidth="3"
        fill="currentColor"
        fillOpacity="0.25"
      />
      {/* Bomb Fins */}
      <path d="M42 30 L40 22 L60 22 L58 30 Z" strokeWidth="2.5" fill="currentColor" />
      {/* Twin Lightning Bolts */}
      <path
        d="M32 38 L25 52 L34 52 L28 66"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M68 38 L75 52 L66 52 L72 66"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Fuse Star */}
      <circle cx="50" cy="48" r="3" fill="currentColor" stroke="none" />
    </svg>
  )
}

/**
 * CXX: Expeditionary Engineering Division Emblem
 * Civil Engineer Castle/Gear, Runway Repair Grid, RED HORSE/Prime BEEF
 */
export function CxxEmblem({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-label="CXX Expeditionary Engineering"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Industrial Hexagon Shield */}
      <path
        d="M50 8 L85 28 L85 72 L50 92 L15 72 L15 28 Z"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Airfield Runway Perspective (RADR) */}
      <path d="M40 82 L46 36 L54 36 L60 82 Z" strokeWidth="2.5" fill="currentColor" fillOpacity="0.2" />
      <line x1="50" y1="42" x2="50" y2="48" strokeWidth="3" strokeDasharray="2 2" strokeLinecap="round" />
      <line x1="50" y1="54" x2="50" y2="62" strokeWidth="3" strokeDasharray="3 3" strokeLinecap="round" />
      <line x1="50" y1="68" x2="50" y2="78" strokeWidth="3.5" strokeLinecap="round" />
      {/* Engineer Tools / Compass Arch */}
      <path d="M30 38 L50 20 L70 38" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="20" r="3" fill="currentColor" />
    </svg>
  )
}

/**
 * JEODTD: Joint EOD Technology Division Emblem
 * Multi-Service Crosshairs, Digital Telemetry, Robotic Manipulation Sensor
 */
export function JeodEmblem({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-label="Joint EOD Technology Division"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular Cyber Diagnostic Ring */}
      <circle cx="50" cy="50" r="38" strokeWidth="3" strokeDasharray="14 6" fill="currentColor" fillOpacity="0.1" />
      <circle cx="50" cy="50" r="26" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
      <circle cx="50" cy="50" r="14" strokeWidth="2.5" />
      {/* Tactical Targeting Reticle */}
      <line x1="50" y1="6" x2="50" y2="28" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="72" x2="50" y2="94" strokeWidth="3" strokeLinecap="round" />
      <line x1="6" y1="50" x2="28" y2="50" strokeWidth="3" strokeLinecap="round" />
      <line x1="72" y1="50" x2="94" y2="50" strokeWidth="3" strokeLinecap="round" />
      {/* Central Sensor Lock Core */}
      <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />
      {/* 4 Corner Tech Brackets */}
      <path d="M24 34 L24 24 L34 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M76 34 L76 24 L66 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 66 L24 76 L34 76" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M76 66 L76 76 L66 76" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * CXP: Requirements, Research, Development & Acquisition Division Emblem
 * Advanced Sensor Grid, Microchip Telemetry, Modernization Compass
 */
export function CxpEmblem({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-label="CXP Requirements, R&D & Acquisition"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagonal Microchip Boundary */}
      <polygon
        points="50,10 86,30 86,70 50,90 14,70 14,30"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Central Processor Node */}
      <rect x="38" y="38" width="24" height="24" rx="4" strokeWidth="3" fill="currentColor" fillOpacity="0.25" />
      {/* Circuit Bus Lines */}
      <line x1="50" y1="18" x2="50" y2="38" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="62" x2="50" y2="82" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="50" x2="38" y2="50" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="62" y1="50" x2="78" y2="50" strokeWidth="2.5" strokeLinecap="round" />
      {/* Sensor Nodes */}
      <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />
      <circle cx="50" cy="18" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="50" cy="82" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="22" cy="50" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="78" cy="50" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
