"use client"

import { useState, useRef, useEffect, useId } from "react"
import { createPortal } from "react-dom"
import gsap from "gsap"
import { 
  SearchIcon, 
  ArrowUpRight, 
  TrendingUp, 
  TrendingDown, 
  MessageSquareText, 
  Check, 
  RotateCcw, 
  Clock, 
  Activity, 
  Award, 
  ShieldCheck, 
  X, 
  Calendar,
  ChevronRight,
  Crosshair,
  Target,
  Gauge,
  Zap
} from "lucide-react"
import { Card } from "@/components/ui/card" 
import { TopographicTerrain } from "@/components/topographic-terrain"
import { DashboardInsignia } from "@/components/dashboard-insignia"

export interface DetailedProject {
  id: string
  code: string
  title: string
  category: "Solo Flight" | "Tactical" | "Formation" | "Instruments" | "Carrier Ops" | "Avionics" | "Emergency"
  status: "passed" | "retried" | "running" | "pending"
  score?: number
  dateStarted: string
  dateCompleted?: string
  instructor: string
  durationHours: number
  notes: string
  progress?: number
}

const ALL_FLIGHT_PROJECTS: Omit<DetailedProject, "status">[] = [
  { id: "p1", code: "INST-101", title: "Basic Instrument Solo", category: "Instruments", dateStarted: "Oct 12, 2026", dateCompleted: "Oct 14, 2026", instructor: "CDR Miller", durationHours: 2.5, notes: "Exceptional glide-slope stabilization on ILS approach." },
  { id: "p2", code: "TAC-204", title: "High-G Combat Maneuvering", category: "Tactical", dateStarted: "Oct 16, 2026", dateCompleted: "Oct 18, 2026", instructor: "LT Vance", durationHours: 3.2, notes: "Maintained target aspect within 15° cone during high-G turns." },
  { id: "p3", code: "NVG-301", title: "Night Vision Goggle Approach", category: "Instruments", dateStarted: "Oct 20, 2026", dateCompleted: "Oct 22, 2026", instructor: "MAJ Sterling", durationHours: 2.8, notes: "Solid scan pattern; clean recovery from low-light optical illusion." },
  { id: "p4", code: "FORM-102", title: "Four-Ship Tactical Formation", category: "Formation", dateStarted: "Oct 24, 2026", dateCompleted: "Oct 26, 2026", instructor: "CDR Miller", durationHours: 3.5, notes: "Precise wingtip spacing maintained through combat spread." },
  { id: "p5", code: "BFM-401", title: "Basic Fighter Maneuvers (1v1)", category: "Tactical", dateStarted: "Oct 28, 2026", dateCompleted: "Oct 30, 2026", instructor: "LT Vance", durationHours: 2.0, notes: "Offensive perch entry timed perfectly; simulated gun kill verified." },
  { id: "p6", code: "IFR-202", title: "Low-Ceiling Instrument Approach", category: "Instruments", dateStarted: "Nov 01, 2026", dateCompleted: "Nov 03, 2026", instructor: "MAJ Sterling", durationHours: 2.4, notes: "Crossed decision height with runway centerline dead-stick aligned." },
  { id: "p7", code: "EMERG-105", title: "Engine Flameout & Restart", category: "Emergency", dateStarted: "Nov 05, 2026", dateCompleted: "Nov 06, 2026", instructor: "CDR Miller", durationHours: 1.8, notes: "Executed textbook air-start relight procedure in 38 seconds." },
  { id: "p8", code: "DECK-201", title: "Day Carrier Trap Recovery", category: "Carrier Ops", dateStarted: "Nov 08, 2026", dateCompleted: "Nov 10, 2026", instructor: "LT Vance", durationHours: 2.6, notes: "Initial attempt boltered due to high meatball; wire 3 snagged on second pass." },
  { id: "p9", code: "NAV-302", title: "Low-Level Terrain Masking", category: "Solo Flight", dateStarted: "Nov 11, 2026", instructor: "MAJ Sterling", durationHours: 3.0, notes: "Underway in Red Flag sector; radar altitude hold active.", progress: 85 },
  { id: "p10", code: "RADAR-203", title: "BVR Radar Intercept & Sort", category: "Avionics", dateStarted: "Nov 11, 2026", instructor: "CDR Miller", durationHours: 2.7, notes: "Track-while-scan active on 4 airborne targets; lock established.", progress: 62 },
  { id: "p11", code: "REFUEL-101", title: "Day Airborne Probe Refueling", category: "Tactical", dateStarted: "Nov 12, 2026", instructor: "LT Vance", durationHours: 2.1, notes: "KC-135 link-up in progress; stabilized on port drogue basket.", progress: 48 },
  { id: "p12", code: "EW-305", title: "Electronic Jamming & Chaff Corridor", category: "Avionics", dateStarted: "Nov 12, 2026", instructor: "MAJ Sterling", durationHours: 1.9, notes: "Countermeasure dispense timed to surface-to-air radar ping.", progress: 30 },
  { id: "p13", code: "DECK-302", title: "Night Carrier Trap 3-Wire", category: "Carrier Ops", dateStarted: "Nov 15, 2026", instructor: "CDR Miller", durationHours: 2.5, notes: "Scheduled: LSO night landing qualification pending tanker clearance." },
  { id: "p14", code: "SOLO-401", title: "Final Capstone Solo Evaluation", category: "Solo Flight", dateStarted: "Nov 18, 2026", instructor: "MAJ Sterling", durationHours: 4.0, notes: "Scheduled: Final phase graduation flight check before deployment." },
  { id: "p15", code: "AERO-101", title: "Aerobatic Spin Recovery", category: "Solo Flight", dateStarted: "Oct 08, 2026", dateCompleted: "Oct 10, 2026", instructor: "CDR Miller", durationHours: 2.2, notes: "Inverted flat spin recovery initiated at 14,000 ft MSL." },
  { id: "p16", code: "GUNS-202", title: "Air-to-Ground Strafe Runs", category: "Tactical", dateStarted: "Oct 14, 2026", dateCompleted: "Oct 15, 2026", instructor: "LT Vance", durationHours: 3.0, notes: "Target hits verified at 94% on 20mm Vulcan dispersion." },
  { id: "p17", code: "NVG-402", title: "Night Formation Low-Altitude", category: "Instruments", dateStarted: "Oct 18, 2026", dateCompleted: "Oct 20, 2026", instructor: "MAJ Sterling", durationHours: 3.4, notes: "NVG tactical formation maintained at 500 ft AGL." },
  { id: "p18", code: "CAS-301", title: "Close Air Support 9-Line", category: "Tactical", dateStarted: "Oct 22, 2026", dateCompleted: "Oct 24, 2026", instructor: "CDR Miller", durationHours: 2.8, notes: "JTAC coordination authenticated under 45 seconds." },
  { id: "p19", code: "COMM-102", title: "Secure Data-Link Comms Link", category: "Avionics", dateStarted: "Oct 26, 2026", dateCompleted: "Oct 27, 2026", instructor: "LT Vance", durationHours: 1.6, notes: "Link-16 situational awareness network verified operational." },
  { id: "p20", code: "DEF-205", title: "Missile Defense Evade Maneuvers", category: "Tactical", dateStarted: "Oct 30, 2026", dateCompleted: "Nov 02, 2026", instructor: "MAJ Sterling", durationHours: 3.1, notes: "Executed split-S break turn beating simulated SA-15 missile." },
  { id: "p21", code: "SIM-501", title: "Cockpit Decompression Emergency", category: "Emergency", dateStarted: "Nov 03, 2026", dateCompleted: "Nov 04, 2026", instructor: "CDR Miller", durationHours: 1.5, notes: "Rapid descent to 10,000 ft in 1 min 22 sec; oxygen mask donned." },
  { id: "p22", code: "RADAR-304", title: "AESA Radar Modes Qualification", category: "Avionics", dateStarted: "Nov 06, 2026", dateCompleted: "Nov 08, 2026", instructor: "LT Vance", durationHours: 2.9, notes: "Target track maintained despite heavy active jamming." },
  { id: "p23", code: "DECK-401", title: "Heavy Sea-State Carrier Trap", category: "Carrier Ops", dateStarted: "Nov 09, 2026", dateCompleted: "Nov 11, 2026", instructor: "CDR Miller", durationHours: 3.3, notes: "Pitching flight deck approach handled with precision." },
  { id: "p24", code: "CAP-201", title: "Combat Air Patrol Orbit", category: "Tactical", dateStarted: "Nov 12, 2026", instructor: "MAJ Sterling", durationHours: 4.2, notes: "Station-keeping maintained on primary ingress corridor.", progress: 50 },
  { id: "p25", code: "TAC-502", title: "Multi-Bogey Intercept Sortie", category: "Tactical", dateStarted: "Nov 13, 2026", instructor: "LT Vance", durationHours: 3.6, notes: "Coordinated intercept with AWACS vectoring.", progress: 20 },
  { id: "p26", code: "GRAD-601", title: "Final Fleet Deployment Readiness", category: "Solo Flight", dateStarted: "Nov 20, 2026", instructor: "CDR Miller", durationHours: 5.0, notes: "Comprehensive combat mission profile qualification." },
]

function getDetailedProjectsForStudent(student: Student): DetailedProject[] {
  const total = student.totalProjects
  const ended = student.endedProjects
  const running = student.runningProjects
  const pending = student.pendingProjects
  const passed = student.passedProjects

  const list = ALL_FLIGHT_PROJECTS.slice(0, Math.max(total, 1))

  return list.map((item, index) => {
    let status: "passed" | "retried" | "running" | "pending"
    let score: number | undefined
    let dateCompleted = item.dateCompleted

    if (index < ended) {
      const isRetried = index === ended - 1 && (total - passed > 0)
      status = isRetried ? "retried" : "passed"
      score = isRetried 
        ? Math.max(68, student.score - 15) 
        : Math.min(99, Math.max(76, student.score + ((index * 3) % 7) - 3))
      dateCompleted = item.dateCompleted || "Nov 04, 2026"
    } else if (index < ended + running) {
      status = "running"
      score = Math.min(98, Math.max(72, student.score + ((index * 2) % 5) - 2))
      dateCompleted = undefined
    } else {
      status = "pending"
      score = undefined
      dateCompleted = undefined
    }

    return {
      ...item,
      status,
      score,
      dateCompleted,
    }
  })
}

interface Sortie {
  code: string
  progress: number
  name?: string
  live?: boolean
}

interface ChecklistItem {
  name: string
  done: boolean
  detail?: string
}

interface Student {
  id: number
  initials: string
  name: string
  branch: string
  isLive: boolean
  score: number
  milestone: string
  lastEval: string
  totalProjects: number
  passedProjects: number
  endedProjects: number
  runningProjects: number
  pendingProjects: number
  recentScores: number[]
  activeSorties: Sortie[]
  pendingChecklist: ChecklistItem[]
  projectTrend: "increased" | "decreased"
  endedTrend: "increased" | "decreased"
  runningTrend: "increased" | "decreased"
  pendingTrend: "increased" | "decreased"
}

// Mock data for the students
const MOCK_STUDENTS: Student[] = [
  { 
    id: 1, 
    initials: "JD", 
    name: "Jane Doe", 
    branch: "U.S. Air Force", 
    isLive: true, 
    score: 94, 
    milestone: "Phase II: Instrument Solo",
    lastEval: "14 mins ago",
    totalProjects: 14, 
    passedProjects: 13,
    endedProjects: 8,
    runningProjects: 4,
    pendingProjects: 2,
    recentScores: [82, 86, 89, 91, 94],
    activeSorties: [
      { code: "SIM-01", progress: 85, name: "Instrument Solo", live: true },
      { code: "TAC-04", progress: 62, name: "Combat Maneuvers" },
      { code: "IFR-02", progress: 38, name: "Night Approach" },
    ],
    pendingChecklist: [
      { name: "MED CLEAR", done: true, detail: "Flight Physical Cl. 1 Cleared" },
      { name: "SIM BRIEF", done: true, detail: "Weather & Nav Briefing Signed" },
      { name: "FLT AUTH", done: false, detail: "Squadron CO Sign-Off Pending" },
    ],
    projectTrend: "increased" as const,
    endedTrend: "increased" as const,
    runningTrend: "decreased" as const,
    pendingTrend: "increased" as const,
  },
  { 
    id: 2, 
    initials: "MR", 
    name: "Mark Reeds", 
    branch: "U.S. Air Force", 
    isLive: false, 
    score: 78, 
    milestone: "Tactical Navigation Qual",
    lastEval: "2 hrs ago",
    totalProjects: 8, 
    passedProjects: 6,
    endedProjects: 5,
    runningProjects: 2,
    pendingProjects: 1,
    recentScores: [72, 75, 74, 80, 78],
    activeSorties: [
      { code: "NAV-01", progress: 70, name: "Terrain Navigation" },
      { code: "FORM-02", progress: 35, name: "Formation Flight" },
    ],
    pendingChecklist: [
      { name: "MED CLEAR", done: true, detail: "Medical Readiness Validated" },
      { name: "SIM BRIEF", done: false, detail: "Pre-Sortie Brief Incomplete" },
      { name: "FLT AUTH", done: false, detail: "Instructor Authorization Hold" },
    ],
    projectTrend: "decreased" as const,
    endedTrend: "increased" as const,
    runningTrend: "decreased" as const,
    pendingTrend: "decreased" as const,
  },
  { 
    id: 3, 
    initials: "AS", 
    name: "Alex Smith", 
    branch: "U.S. Air Force", 
    isLive: true, 
    score: 88, 
    milestone: "Formations & Intercept",
    lastEval: "45 mins ago",
    totalProjects: 19, 
    passedProjects: 16,
    endedProjects: 11,
    runningProjects: 5,
    pendingProjects: 3,
    recentScores: [80, 83, 85, 84, 88],
    activeSorties: [
      { code: "INT-03", progress: 90, name: "High-Alt Intercept", live: true },
      { code: "TAC-01", progress: 55, name: "BVR Radar Lock" },
      { code: "NIGHT-02", progress: 20, name: "Low-Light Navigation" },
    ],
    pendingChecklist: [
      { name: "MED CLEAR", done: true, detail: "G-Tolerance Clearance Active" },
      { name: "SIM BRIEF", done: true, detail: "Intercept Coordinates Approved" },
      { name: "FLT AUTH", done: false, detail: "Air Corridor Clearance Queued" },
    ],
    projectTrend: "increased" as const,
    endedTrend: "increased" as const,
    runningTrend: "increased" as const,
    pendingTrend: "decreased" as const,
  },
  { 
    id: 4, 
    initials: "TC", 
    name: "Tom Cruise", 
    branch: "U.S. Air Force", 
    isLive: true, 
    score: 99, 
    milestone: "Carrier Deck Landing",
    lastEval: "1 hr ago",
    totalProjects: 26, 
    passedProjects: 26,
    endedProjects: 17,
    runningProjects: 6,
    pendingProjects: 3,
    recentScores: [94, 96, 97, 98, 99],
    activeSorties: [
      { code: "DECK-01", progress: 95, name: "Carrier Trap 3-Wire", live: true },
      { code: "REFUEL", progress: 78, name: "Night Basket Hook" },
      { code: "DOGFIGHT", progress: 60, name: "BFM Tactical Engagement" },
    ],
    pendingChecklist: [
      { name: "MED CLEAR", done: true, detail: "Fighter Weapons Physical Cleared" },
      { name: "SIM BRIEF", done: true, detail: "Flight Lead Briefing Signed Off" },
      { name: "FLT AUTH", done: true, detail: "All Clear - Flight Ready" },
    ],
    projectTrend: "increased" as const,
    endedTrend: "increased" as const,
    runningTrend: "increased" as const,
    pendingTrend: "decreased" as const,
  },
  { 
    id: 5, 
    initials: "SJ", 
    name: "Sarah Jones", 
    branch: "U.S. Air Force", 
    isLive: false, 
    score: 62, 
    milestone: "Basic Avionics & Radar",
    lastEval: "3 hrs ago",
    totalProjects: 6, 
    passedProjects: 3,
    endedProjects: 3,
    runningProjects: 2,
    pendingProjects: 1,
    recentScores: [58, 65, 60, 59, 62],
    activeSorties: [
      { code: "RADAR-01", progress: 45, name: "APG-83 Calibration" },
      { code: "AVIONICS", progress: 25, name: "HUD Mode Diagnostics" },
    ],
    pendingChecklist: [
      { name: "MED CLEAR", done: true, detail: "Annual Flight Exam Valid" },
      { name: "SIM BRIEF", done: false, detail: "Awaiting Radar Specialist" },
      { name: "FLT AUTH", done: false, detail: "Remediation Review Scheduled" },
    ],
    projectTrend: "decreased" as const,
    endedTrend: "decreased" as const,
    runningTrend: "decreased" as const,
    pendingTrend: "increased" as const,
  },
  { 
    id: 6, 
    initials: "RJ", 
    name: "Rick James", 
    branch: "U.S. Air Force", 
    isLive: true, 
    score: 85, 
    milestone: "Close Air Support Check",
    lastEval: "Yesterday",
    totalProjects: 12, 
    passedProjects: 10,
    endedProjects: 7,
    runningProjects: 3,
    pendingProjects: 2,
    recentScores: [79, 81, 80, 86, 85],
    activeSorties: [
      { code: "CAS-02", progress: 80, name: "Close Air Support", live: true },
      { code: "GUNNERY", progress: 50, name: "Strafe Run & Target" },
      { code: "RECON", progress: 30, name: "Forward Observer Comms" },
    ],
    pendingChecklist: [
      { name: "MED CLEAR", done: true, detail: "Air Force Aviation Med Verified" },
      { name: "SIM BRIEF", done: true, detail: "JTAC Protocol Brief Completed" },
      { name: "FLT AUTH", done: false, detail: "Range Safety Approval Pending" },
    ],
    projectTrend: "increased" as const,
    endedTrend: "increased" as const,
    runningTrend: "decreased" as const,
    pendingTrend: "increased" as const,
  },
  { 
    id: 7, 
    initials: "EP", 
    name: "Ellen Page", 
    branch: "U.S. Air Force", 
    isLive: false, 
    score: 91, 
    milestone: "Night Approach Cert",
    lastEval: "5 hrs ago",
    totalProjects: 15, 
    passedProjects: 14,
    endedProjects: 9,
    runningProjects: 4,
    pendingProjects: 2,
    recentScores: [85, 87, 88, 92, 91],
    activeSorties: [
      { code: "NIGHT-01", progress: 75, name: "NVG Approach Pattern" },
      { code: "INST-04", progress: 45, name: "Blind Instrument Descent" },
    ],
    pendingChecklist: [
      { name: "MED CLEAR", done: true, detail: "Night Vision Physical Passed" },
      { name: "SIM BRIEF", done: true, detail: "Approach Deck Plan Filed" },
      { name: "FLT AUTH", done: false, detail: "LSO Sign-Off Pending" },
    ],
    projectTrend: "decreased" as const,
    endedTrend: "increased" as const,
    runningTrend: "decreased" as const,
    pendingTrend: "decreased" as const,
  },
];

// Generates smooth cubic bezier spline for historical sparkline (Card 2)
function generateSmoothPath(scores: number[], width = 160, height = 30) {
  if (!scores || scores.length === 0) return { path: "", areaPath: "", points: [] }
  const minVal = Math.min(...scores) - 4
  const maxVal = Math.max(...scores) + 4
  const range = maxVal - minVal || 1
  
  const stepX = (width - 12) / (scores.length - 1)
  const points = scores.map((score, i) => ({
    x: 6 + i * stepX,
    y: height - 6 - ((score - minVal) / range) * (height - 12),
    val: score,
  }))

  if (points.length === 1) {
    return { path: `M ${points[0].x} ${points[0].y}`, areaPath: "", points }
  }

  let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }

  const last = points[points.length - 1]
  const first = points[0]
  const areaPath = `${path} L ${last.x.toFixed(1)} ${height} L ${first.x.toFixed(1)} ${height} Z`

  return { path, areaPath, points }
}

export function SectionCards() {
  const [mounted, setMounted] = useState(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeStudentId, setActiveStudentId] = useState(1)
  const [sparklineHoverIdx, setSparklineHoverIdx] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [projectsInView, setProjectsInView] = useState(false)
  const projectsSectionRef = useRef<HTMLDivElement>(null)

  // Expanding Card Modal State
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null)
  const [backdropVisible, setBackdropVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isFullyOpen, setIsFullyOpen] = useState(false)
  const [activeModalTab, setActiveModalTab] = useState<string>("all")
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const modalCardRef = useRef<HTMLDivElement>(null)

  // Bento Charts Interactive Hover States
  const [telemetryHoverIdx, setTelemetryHoverIdx] = useState<number | null>(null)
  const [radarHoverIdx, setRadarHoverIdx] = useState<number | null>(null)
  const [ilsHoverIdx, setIlsHoverIdx] = useState<number | null>(null)
  const [bfmHoverIdx, setBfmHoverIdx] = useState<number | null>(null)
  const [milestoneHoverIdx, setMilestoneHoverIdx] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when modal is expanded
  useEffect(() => {
    if (expandedCardId) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [expandedCardId])

  const handleOpenCard = (cardId: string) => {
    const el = cardRefs.current[cardId]
    if (el) {
      const rect = el.getBoundingClientRect()
      setSourceRect(rect)
      setExpandedCardId(cardId)
      setIsClosing(false)
      setIsFullyOpen(false)
      setBackdropVisible(false)
      setActiveModalTab("all")
      // Animate backdrop blur concurrently with card motion from frame 0
      requestAnimationFrame(() => {
        setBackdropVisible(true)
      })
    }
  }

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)
    setBackdropVisible(false)

    if (modalCardRef.current && sourceRect) {
      const modalEl = modalCardRef.current
      const targetRect = modalEl.getBoundingClientRect()
      const deltaX = sourceRect.left - targetRect.left
      const deltaY = sourceRect.top - targetRect.top
      const scaleX = sourceRect.width / targetRect.width
      const scaleY = sourceRect.height / targetRect.height

      gsap.to(modalEl, {
        x: deltaX,
        y: deltaY,
        scaleX: scaleX,
        scaleY: scaleY,
        borderRadius: "12px",
        opacity: 0,
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => {
          setExpandedCardId(null)
          setSourceRect(null)
          setIsClosing(false)
          setIsFullyOpen(false)
        },
      })
    } else {
      setExpandedCardId(null)
      setSourceRect(null)
      setIsClosing(false)
      setIsFullyOpen(false)
    }
  }

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedCardId && !isClosing) {
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [expandedCardId, isClosing, sourceRect])

  // GSAP FLIP spring expansion
  useEffect(() => {
    if (expandedCardId && sourceRect && modalCardRef.current) {
      const modalEl = modalCardRef.current
      const targetRect = modalEl.getBoundingClientRect()

      const deltaX = sourceRect.left - targetRect.left
      const deltaY = sourceRect.top - targetRect.top
      const scaleX = sourceRect.width / targetRect.width
      const scaleY = sourceRect.height / targetRect.height

      gsap.fromTo(
        modalEl,
        {
          x: deltaX,
          y: deltaY,
          scaleX: scaleX,
          scaleY: scaleY,
          transformOrigin: "top left",
          borderRadius: "12px",
        },
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          borderRadius: "16px",
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => {
            setIsFullyOpen(true)
          },
        }
      )
    }
  }, [expandedCardId, sourceRect])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    const observerOptions: IntersectionObserverInit = {
      root: scrollContainer || null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.08,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === projectsSectionRef.current) {
            setProjectsInView(true)
            observer.unobserve(entry.target)
          }
        }
      })
    }, observerOptions)

    if (projectsSectionRef.current) observer.observe(projectsSectionRef.current)

    return () => observer.disconnect()
  }, [])

  // Filter students based on search query
  const filteredStudents = MOCK_STUDENTS.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Get the currently selected subject's data
  const activeSubject = MOCK_STUDENTS.find(s => s.id === activeStudentId) || MOCK_STUDENTS[0]

  const metricCards = [
    {
      id: "total",
      title: "Total Projects",
      count: activeSubject.totalProjects,
      trend: activeSubject.projectTrend,
    },
    {
      id: "ended",
      title: "Ended Projects",
      count: activeSubject.endedProjects,
      trend: activeSubject.endedTrend,
    },
    {
      id: "running",
      title: "Running Projects",
      count: activeSubject.runningProjects,
      trend: activeSubject.runningTrend,
    },
    {
      id: "pending",
      title: "Pending Projects",
      count: activeSubject.pendingProjects,
      trend: activeSubject.pendingTrend,
    },
  ]

  const handleStudentSelect = (id: number) => {
    setActiveStudentId(id)
    if (isSidebarExpanded) {
      setIsSidebarExpanded(false)
      setSearchQuery("")
    }
  }

  return (
    // Root container
    <div className="flex w-full flex-1 h-full min-h-0 overflow-hidden rounded-xl border border-black/10 dark:border-border/50 bg-white/10 dark:bg-background text-foreground shadow-sm font-sans [transform:translateZ(0)]">
      
      {/* Left Sidebar: Expanding Column */}
      <div 
        className={`flex flex-col border-r border-black/10 dark:border-border/50 bg-white/20 dark:bg-[#0C0E12] backdrop-blur-sm transition-all duration-300 ease-in-out shrink-0 ${
          isSidebarExpanded ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Header / Search Toggle */}
        <div className="flex h-20 shrink-0 items-center border-b border-border/50 px-3">
          <button 
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="flex size-10 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 hover:text-white"
            title="Toggle Search"
          >
            <SearchIcon className="size-5 text-white" />
          </button>
          
          {isSidebarExpanded && (
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-3 w-full bg-transparent text-sm outline-none text-[#163144] placeholder:text-[#163144]/60 dark:text-white dark:placeholder:text-white/60"
              autoFocus
            />
          )}
        </div>

        {/* Student List with Hidden Scrollbar */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filteredStudents.map((student) => {
            const isActive = student.id === activeStudentId;
            
            return (
              <button
                key={student.id}
                onClick={() => handleStudentSelect(student.id)}
                className={`group/student-btn flex w-full items-center gap-3 rounded-full transition-all ${
                  isSidebarExpanded ? "px-2 py-1.5 hover:bg-muted/40" : "justify-center py-1"
                }`}
              >
                <div 
                  className={`relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border transform-gpu transition-all duration-150 ease-out group-hover/student-btn:-translate-y-0.5 ${
                    isActive 
                      ? "border-[#163144] dark:border-blue-500/60 bg-[#163144] dark:bg-blue-500/50 text-white ring-2 ring-[#163144] dark:ring-blue-500/50 ring-offset-2 ring-offset-background shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.7),0_4px_14px_-2px_rgba(22,49,68,0.35)] group-hover/student-btn:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.7),0_8px_16px_-4px_rgba(22,49,68,0.45)]" 
                      : "border-black/[0.06] dark:border-white/[0.08] bg-black/[0.035] dark:bg-white/[0.02] text-[#163144] dark:text-foreground backdrop-blur-[2px] [-webkit-backdrop-filter:blur(2px)] shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_4px_12px_-2px_rgba(0,0,0,0.06)] group-hover/student-btn:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_8px_16px_-4px_rgba(0,0,0,0.12)] dark:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.25),inset_1px_0_0.5px_0_rgba(255,255,255,0.1),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_4px_12px_-2px_rgba(0,0,0,0.4)] dark:group-hover/student-btn:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.35),inset_1px_0_0.5px_0_rgba(255,255,255,0.15),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_10px_20px_-4px_rgba(0,0,0,0.65)] group-hover/student-btn:border-black/15 dark:group-hover/student-btn:border-white/20 group-hover/student-btn:bg-black/[0.05] dark:group-hover/student-btn:bg-white/[0.04]"
                  }`}
                >
                  <span className="text-sm font-semibold">{student.initials}</span>

                  {!isActive && student.isLive && !isSidebarExpanded && (
                    <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 border border-background translate-x-0.5 translate-y-0.5 shadow-[0_0_6px_rgba(52,211,153,0.6)]"></span>
                  )}
                </div>

                {isSidebarExpanded && (
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className={`truncate text-sm font-medium ${isActive ? "text-[#163144] font-bold dark:text-blue-400" : "text-[#163144] dark:text-foreground"}`}>
                      {student.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#163144]/75 dark:text-muted-foreground uppercase tracking-wider">{student.branch}</span>
                      {student.isLive && (
                        <span className="relative flex size-2 items-center justify-center">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.6)]"></span>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Dashboard Area */}
      <div 
        className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-[#587589] to-[#dff3eb] dark:from-[#0c151d] dark:to-[#152431]"
      >
        {/* Scrollable Content Container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto @container/main relative isolate bg-transparent [transform:translateZ(0)] [-webkit-overflow-scrolling:touch] [overscroll-behavior:contain]"
        >
          {/* 3D Topographical Contour Background (GSAP Scroll-reactive) */}
          <TopographicTerrain scrollContainerRef={scrollContainerRef} />

          {/* Crisp Dot Grid Overlay: Sits ON TOP of 3D terrain (-z-[5] vs -z-10), covers 100% of viewable area to the bottom */}
          <div
            className="pointer-events-none sticky top-0 left-0 w-full h-[120vh] min-h-[100dvh] -mb-[120vh] -z-[5] bg-[radial-gradient(circle,rgba(255,255,255,0.5)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]"
            aria-hidden="true"
          />

          {/* Background Insignia Crest Watermark (Fixed in viewport at top-left, 0.15 opacity) */}
          <DashboardInsignia />
          
          {/* Sticky Backdrop Blur Header */}
          <header className="sticky top-0 z-20 flex min-h-20 shrink-0 items-center justify-between border-b border-black/10 dark:border-border/50 bg-white/20 dark:bg-background/70 px-6 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.2),0_4px_12px_-2px_rgba(0,0,0,0.1)] dark:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.6),0_6px_16px_-2px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Squadron 231
              </h1>
              <p className="text-sm font-medium text-white">
                3rd Class
              </p>
            </div>
          </header>

          {/* Massive Ghost Hero Section */}
          <div className="px-6 py-5 lg:px-8 lg:py-6 animate-[dashboardFadeUp_600ms_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:100ms]">
            <div className="flex flex-col">
              
              {/* Top Row: Live Indicator & Title Hierarchy */}
              <div className="flex items-center gap-3 mb-4">
                {activeSubject.isLive && (
                  <span className="relative flex size-3.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-3.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]"></span>
                  </span>
                )}
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  {activeSubject.isLive ? (
                    <>
                      <span className="text-emerald-400 font-black drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">LIVE</span> Student Performance
                    </>
                  ) : (
                    "Student Performance"
                  )}
                </span>
              </div>
              
              {/* Main User Card: Halo Avatar & Typography Stack */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
                
                {/* Compact Halo Avatar Container */}
                <div className="relative flex size-36 shrink-0 items-center justify-center">
                  
                  {/* SVG Circular Progress Ring */}
                  <svg className="absolute inset-0 size-full -rotate-90 transform drop-shadow-sm" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" strokeWidth="6" className="stroke-muted/30" />
                    <circle
                      cx="50" cy="50" r="44" fill="none" strokeWidth="6" strokeLinecap="round"
                      strokeDasharray="276.46"
                      strokeDashoffset={276.46 - (activeSubject.score / 100) * 276.46}
                      className={`transition-all duration-1000 ease-out ${
                        activeSubject.score >= 90
                          ? "stroke-[#163144] dark:stroke-[#60A5FA] [filter:drop-shadow(0_0_6px_rgba(22,49,68,0.3))] dark:[filter:drop-shadow(0_0_8px_rgba(96,165,250,0.65))]"
                          : activeSubject.score >= 75
                          ? "stroke-[#163144]/70 dark:stroke-[#60A5FA]/70"
                          : "stroke-[#163144]/35 dark:stroke-[#60A5FA]/35"
                      }`}
                    />
                  </svg>

                  {/* Inner Avatar Placeholder */}
                  <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-full border-2 border-white/60 dark:border-white/15 bg-black/[0.04] dark:bg-[#162736]/70 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
                    <span className="text-3xl font-black tracking-wider text-[#163144] dark:text-[#60A5FA] drop-shadow-xs dark:drop-shadow-[0_0_10px_rgba(96,165,250,0.35)]">
                      {activeSubject.initials}
                    </span>
                  </div>

                  {/* Opaque Telemetry Score Badge with Tabular Monospace font */}
                  <div className="absolute -right-1 -top-1 flex h-11 min-w-11 items-center justify-center rounded-full border-[3px] border-background px-1.5 text-lg font-black bg-[#163144] dark:bg-[#60A5FA] text-white dark:text-zinc-950 shadow-md tabular-nums font-mono">
                    {activeSubject.score}
                  </div>
                </div>

                {/* Typography Stack */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white whitespace-nowrap">
                    {activeSubject.name}
                  </h2>

                  {/* Operational Telemetry Row */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-2 text-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">{activeSubject.branch}</span>
                    <span className="text-white/60">•</span>
                    <span className="text-xs text-white font-medium">
                      Last Eval: <span className="font-mono text-white font-semibold">{activeSubject.lastEval}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Metric Cards: Positioned Underneath Main User Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                {metricCards.map((card, index) => {
                  const isCurrentExpanded = expandedCardId === card.id
                  return (
                    <div
                      key={card.id}
                      className="animate-[dashboardFadeUp_600ms_cubic-bezier(0.16,1,0.3,1)_both]"
                      style={{ animationDelay: `${180 + index * 80}ms` }}
                    >
                      <div
                        ref={(el) => { cardRefs.current[card.id] = el }}
                        className={`group/metric-card relative overflow-hidden flex flex-col justify-start p-4 min-h-[185px] rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-t from-white/20 to-transparent dark:from-background/70 dark:to-transparent backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] hover:-translate-y-1.5 hover:border-black/15 dark:hover:border-white/20 hover:from-white/30 dark:hover:from-background/85 shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_20px_35px_-8px_rgba(0,0,0,0.12),0_10px_15px_-4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.25),inset_1px_0_0.5px_0_rgba(255,255,255,0.1),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.4)] dark:hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.35),inset_1px_0_0.5px_0_rgba(255,255,255,0.15),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_24px_45px_-8px_rgba(0,0,0,0.65),0_12px_20px_-4px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out h-full ${
                          isCurrentExpanded ? "opacity-20 pointer-events-none" : ""
                        }`}
                      >
                        {/* Top: Left-justified Title inline with Right-aligned Expand Button */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-white dark:text-muted-foreground">
                            {card.title}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenCard(card.id)
                            }}
                            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/10 bg-white/60 dark:bg-white/10 text-[#163144] dark:text-muted-foreground hover:bg-white/90 dark:hover:bg-white/20 hover:text-foreground active:scale-95 shadow-xs transition-all duration-300 group/btn"
                            title={`Expand ${card.title} dossier`}
                            aria-label={`Expand ${card.title}`}
                          >
                            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:scale-110" />
                          </button>
                        </div>

                        {/* Number: Moved up close to title with tabular monospace formatting */}
                        <span className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums font-mono text-white dark:text-foreground leading-none mt-1">
                          {card.count}
                        </span>

                        {/* Micro HUD Chart */}
                        <div className="my-2.5 flex-1 flex flex-col justify-center min-h-[46px]">
                          {card.id === "total" && (() => {
                            const passed = activeSubject.passedProjects
                            const total = activeSubject.totalProjects
                            const retry = Math.max(0, total - passed)
                            const passRate = total > 0 ? Math.round((passed / total) * 100) : 0
                            return (
                              <div className="flex flex-col justify-center w-full relative">
                                {/* Dual-Tone Segmented Ribbon */}
                                <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden flex gap-0.5 p-[0.5px]">
                                  {/* Pass Segment */}
                                  <div 
                                    className="group/pass relative h-full rounded-full bg-[#163144] dark:bg-[#60A5FA] shadow-[0_0_8px_rgba(22,49,68,0.35)] dark:shadow-[0_0_8px_rgba(96,165,250,0.45)] hover:brightness-110 transition-all duration-300 ease-out cursor-pointer"
                                    style={{ width: `${passRate}%` }}
                                  >
                                    {/* Tooltip on hover */}
                                    <div className="pointer-events-none opacity-0 group-hover/pass:opacity-100 transition-all duration-150 absolute -top-8 left-1/2 -translate-x-1/2 z-40 px-2.5 py-1 rounded-md bg-background/95 dark:bg-[#0C0E12]/95 backdrop-blur-md shadow-lg text-xs font-mono font-bold text-[#163144] dark:text-[#60A5FA] whitespace-nowrap">
                                      QUALIFIED: {passed}/{total} ({passRate}%)
                                    </div>
                                  </div>

                                  {/* Retry Segment */}
                                  {retry > 0 && (
                                    <div 
                                      className="group/retry relative h-full rounded-full bg-[#163144]/25 dark:bg-[#60A5FA]/25 hover:bg-[#163144]/40 dark:hover:bg-[#60A5FA]/45 transition-all duration-300 ease-out cursor-pointer"
                                      style={{ width: `${100 - passRate}%` }}
                                    >
                                      {/* Tooltip on hover */}
                                      <div className="pointer-events-none opacity-0 group-hover/retry:opacity-100 transition-all duration-150 absolute -top-8 left-1/2 -translate-x-1/2 z-40 px-2.5 py-1 rounded-md bg-background/95 dark:bg-[#0C0E12]/95 backdrop-blur-md shadow-lg text-xs font-mono font-bold text-muted-foreground whitespace-nowrap">
                                        RETEST: {retry}/{total} ({100 - passRate}%)
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {/* Micro Telemetry Legend */}
                                <div className="flex items-center justify-between mt-1.5 font-mono text-[10px] uppercase font-semibold">
                                  <div className="flex items-center gap-1 text-white dark:text-muted-foreground">
                                    <span className="text-white dark:text-foreground font-bold">{passed} PASS</span>
                                    <span className="opacity-40">•</span>
                                    <span>{retry} RETRY</span>
                                  </div>
                                  <span className="text-[#163144] dark:text-[#60A5FA] font-bold">{passRate}% QUAL</span>
                                </div>
                              </div>
                            )
                          })()}

                          {card.id === "ended" && (() => {
                            const { path, areaPath, points } = generateSmoothPath(activeSubject.recentScores, 150, 30)
                            const activeIdx = sparklineHoverIdx !== null ? sparklineHoverIdx : points.length - 1
                            const activePoint = points[activeIdx] || points[points.length - 1]
                            const gradId = `spark-grad-${activeSubject.id}`
                            return (
                              <div className="flex flex-col justify-center w-full relative">
                                {/* Floating Tooltip if hovering */}
                                {sparklineHoverIdx !== null && activePoint && (
                                  <div 
                                    className="pointer-events-none absolute -top-7 z-40 px-2.5 py-1 rounded-md bg-background/95 dark:bg-[#0C0E12]/95 backdrop-blur-md shadow-lg text-xs font-mono font-bold text-[#163144] dark:text-[#60A5FA] whitespace-nowrap transition-all duration-150 -translate-x-1/2"
                                    style={{ left: `${Math.max(28, Math.min(72, (activePoint.x / 150) * 100))}%` }}
                                  >
                                    SORTIE #{activeIdx + 1}: {activePoint.val} PTS
                                  </div>
                                )}

                                <div 
                                  className="w-full h-7 relative cursor-pointer"
                                  onMouseLeave={() => setSparklineHoverIdx(null)}
                                >
                                  {/* Smoothed Curve & Area SVG (scales horizontally across card) */}
                                  <svg className="w-full h-full overflow-visible" viewBox="0 0 150 30" preserveAspectRatio="none">
                                    <defs>
                                      <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" className="[stop-color:#163144] dark:[stop-color:#60A5FA]" stopOpacity="0.25" />
                                        <stop offset="100%" className="[stop-color:#163144] dark:[stop-color:#60A5FA]" stopOpacity="0.0" />
                                      </linearGradient>
                                    </defs>
                                    {areaPath && (
                                      <path d={areaPath} fill={`url(#${gradId})`} className="transition-all duration-500 ease-out" />
                                    )}
                                    {path && (
                                      <path 
                                        d={path} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        className="text-[#163144] dark:text-[#60A5FA] transition-all duration-500 ease-out [filter:drop-shadow(0_1px_4px_rgba(22,49,68,0.25))] dark:[filter:drop-shadow(0_1px_4px_rgba(96,165,250,0.4))]" 
                                      />
                                    )}

                                    {/* Invisible interactive hover hitzones across the 5 points */}
                                    {points.map((pt, i) => (
                                      <rect 
                                        key={i}
                                        x={pt.x - 14}
                                        y={0}
                                        width={28}
                                        height={30}
                                        fill="transparent"
                                        className="cursor-pointer"
                                        onMouseEnter={() => setSparklineHoverIdx(i)}
                                      />
                                    ))}
                                  </svg>

                                  {/* Vertical Telemetry Guideline (HTML overlay) */}
                                  {sparklineHoverIdx !== null && activePoint && (
                                    <div 
                                      className="pointer-events-none absolute top-0 bottom-0 w-0 border-l border-dashed border-[#163144]/40 dark:border-[#60A5FA]/60 transition-all duration-150"
                                      style={{ left: `${(activePoint.x / 150) * 100}%` }}
                                    />
                                  )}

                                  {/* Perfectly Circular Active Indicator (HTML overlay - never squished by SVG scaling) */}
                                  {activePoint && (
                                    <div 
                                      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-150"
                                      style={{ 
                                        left: `${(activePoint.x / 150) * 100}%`,
                                        top: `${(activePoint.y / 30) * 100}%`
                                      }}
                                    >
                                      {/* Steady circular halo */}
                                      <div className="absolute size-4 rounded-full bg-[#163144]/20 dark:bg-[#60A5FA]/30" />
                                      {/* Core circle */}
                                      <div className="size-2 rounded-full bg-[#163144] dark:bg-[#60A5FA] border-[1.5px] border-background shadow-xs" />
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center justify-between mt-1 font-mono text-[10px] uppercase font-semibold">
                                  <span className="text-white dark:text-muted-foreground tracking-wider">
                                    {sparklineHoverIdx !== null ? `SORTIE ${sparklineHoverIdx + 1} OF ${points.length}` : "5-SORTIE TREND"}
                                  </span>
                                  <span className="text-[#163144] dark:text-[#60A5FA] font-bold">
                                    {activePoint.val} PTS {sparklineHoverIdx === null ? "PEAK" : ""}
                                  </span>
                                </div>
                              </div>
                            )
                          })()}

                          {card.id === "running" && (
                            <div className="flex flex-col justify-center w-full space-y-1">
                              {activeSubject.activeSorties.slice(0, 2).map((sortie) => (
                                <div 
                                  key={sortie.code} 
                                  className="group/sortie relative flex items-center gap-2 font-mono text-[10px] hover:bg-black/5 dark:hover:bg-white/5 px-1 -mx-1 py-0.5 rounded cursor-pointer transition-colors"
                                >
                                  {/* Floating HUD Tooltip */}
                                  <div className="pointer-events-none opacity-0 group-hover/sortie:opacity-100 transition-all duration-150 absolute -top-7 left-1/2 -translate-x-1/2 z-40 px-2.5 py-1 rounded-md bg-background/95 dark:bg-[#0C0E12]/95 backdrop-blur-md shadow-lg text-xs font-mono font-bold text-[#163144] dark:text-[#60A5FA] whitespace-nowrap">
                                    {sortie.code}: {sortie.name || "Sortie"} • {sortie.progress}% ACTIVE
                                  </div>

                                  <span className="w-14 truncate font-bold text-white dark:text-muted-foreground flex items-center gap-1">
                                    {sortie.live && (
                                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_4px_rgba(52,211,153,0.6)]" />
                                    )}
                                    {sortie.code}
                                  </span>
                                  <div className="h-1.5 flex-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden p-[0.5px]">
                                    <div 
                                      className="h-full rounded-full bg-[#163144] dark:bg-[#60A5FA] transition-all duration-700 ease-out"
                                      style={{ width: `${sortie.progress}%` }}
                                    />
                                  </div>
                                  <span className="w-7 text-right font-semibold text-white dark:text-foreground tabular-nums">
                                    {sortie.progress}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {card.id === "pending" && (
                            <div className="flex flex-col justify-center w-full">
                              <div className="relative flex items-center justify-between px-1 my-0.5">
                                {/* Rail */}
                                <div className="absolute left-3 right-3 top-2 -translate-y-1/2 h-[1.5px] bg-black/10 dark:bg-white/15" />
                                {activeSubject.pendingChecklist.map((item, idx) => {
                                  const alignClass = idx === 0 
                                    ? "left-0 translate-x-0" 
                                    : idx === activeSubject.pendingChecklist.length - 1 
                                    ? "right-0 translate-x-0" 
                                    : "left-1/2 -translate-x-1/2"
                                  return (
                                    <div key={item.name} className="group/node relative z-10 flex flex-col items-center cursor-pointer">
                                      {/* Floating HUD Tooltip */}
                                      <div className={`pointer-events-none opacity-0 group-hover/node:opacity-100 transition-all duration-150 absolute -top-7.5 z-40 px-2.5 py-1 rounded-md bg-background/95 dark:bg-[#0C0E12]/95 backdrop-blur-md shadow-lg text-xs font-mono font-bold whitespace-nowrap text-foreground ${alignClass}`}>
                                        <span className={item.done ? "text-[#163144] dark:text-[#60A5FA]" : "text-amber-500"}>
                                          {item.done ? "CLEARED: " : "WAITING: "}
                                        </span>
                                        {item.detail || item.name}
                                      </div>

                                      <div 
                                        className={`size-4 rounded-full flex items-center justify-center border transition-all group-hover/node:scale-110 ${
                                          item.done 
                                            ? "bg-[#163144] dark:bg-[#60A5FA] border-[#163144] dark:border-[#60A5FA] text-white dark:text-zinc-950 shadow-[0_0_8px_rgba(22,49,68,0.3)] dark:shadow-[0_0_8px_rgba(96,165,250,0.4)]"
                                            : "bg-background border-white/40 dark:border-muted-foreground/40 text-white dark:text-muted-foreground"
                                        }`}
                                      >
                                        {item.done ? (
                                          <Check className="size-2.5 stroke-[3]" />
                                        ) : (
                                          <span className="size-1 rounded-full bg-white/60 dark:bg-muted-foreground/60" />
                                        )}
                                      </div>
                                      <span className={`mt-1 font-mono text-[8px] uppercase tracking-wider font-bold whitespace-nowrap transition-colors group-hover/node:text-foreground ${
                                        item.done ? "text-white dark:text-foreground" : "text-white/80 dark:text-muted-foreground"
                                      }`}>
                                        {item.name}
                                      </span>
                                    </div>
                                  )
                                })}
                              </div>
                              <div className="flex items-center justify-between mt-1 font-mono text-[10px] uppercase font-semibold">
                                <span className="text-white dark:text-muted-foreground">
                                  {activeSubject.pendingChecklist.filter(c => c.done).length}/{activeSubject.pendingChecklist.length} READY
                                </span>
                                <span className="text-[#163144] dark:text-[#60A5FA] font-bold">
                                  {activeSubject.pendingChecklist.every(c => c.done) ? "ALL CLEARED" : "AUTH QUEUED"}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Trend Badge: Positioned away towards bottom */}
                        <div className="mt-auto pt-3.5">
                          {card.id === "pending" ? (
                            <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap border border-[#163144]/20 bg-[#163144]/10 text-[#163144] dark:border-[#60A5FA]/25 dark:bg-[#60A5FA]/10 dark:text-[#60A5FA]">
                              <MessageSquareText className="size-3.5" />
                              <span>Pending discussions</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap border border-[#163144]/20 bg-[#163144]/10 text-[#163144] dark:border-[#60A5FA]/25 dark:bg-[#60A5FA]/10 dark:text-[#60A5FA]">
                              {card.trend === "increased" ? (
                                <>
                                  <TrendingUp className="size-3.5" />
                                  <span>Increased from last month</span>
                                </>
                              ) : (
                                <>
                                  <TrendingDown className="size-3.5" />
                                  <span>Decreased from last month</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Diagonal Light Sheen Overlay on Hover (Sweeps across top of card content) */}
                        <div
                          className="pointer-events-none absolute inset-y-0 -left-[100%] w-[100%] bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.55)_50%,transparent_75%)] dark:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.22)_50%,transparent_75%)] transition-transform duration-0 group-hover/metric-card:translate-x-[200%] group-hover/metric-card:duration-700 group-hover/metric-card:ease-out"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              
            </div>
          </div>

          {/* Full Width Thin Divider */}
          <hr className="w-full border-t border-[#163144]/50 dark:border-border/50" />

          {/* Projects & Scores Grid Section */}
          <div ref={projectsSectionRef} className="p-6 lg:p-10">
            <div className={`mb-6 flex flex-wrap items-end justify-between gap-4 ${projectsInView ? "animate-[dashboardBlurFadeUp_950ms_cubic-bezier(0.16,1,0.3,1)_both]" : "opacity-0"}`}>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#163144] dark:text-foreground">
                  Projects & Scores
                </h2>
                <p className="text-xs sm:text-sm text-[#163144]/85 dark:text-muted-foreground mt-0.5">
                  Real-time flight envelopes, procedural compliance, competency radar, and milestone progression
                </p>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-black/[0.08] dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm text-[#163144] dark:text-foreground shadow-xs">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                <span className="tracking-wide">ACTIVE SYLLABUS • {activeSubject.name}</span>
              </div>
            </div>

            {/* Bento Grid: 2-col + 1-col + 1-col on top row, 1-col + 1-col + 2-col on bottom row */}
            <div className="grid grid-cols-1 gap-5 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
              
              {/* CARD 1: Telemetry Flight Envelope (Spans 2 columns) */}
              {(() => {
                const telemetryPoints = [
                  { t: "T+00", alt: 15020, kts: 340, g: 1.0 },
                  { t: "T+02", alt: 15090 + ((activeSubject.score % 5) * 8), kts: 345, g: 1.4 },
                  { t: "T+04", alt: 15150 - ((100 - activeSubject.score) * 3), kts: 352, g: 2.1 },
                  { t: "T+06", alt: 15110 + ((activeSubject.score % 4) * 10), kts: 350, g: 3.4 },
                  { t: "T+08", alt: 15040 - ((100 - activeSubject.score) * 2), kts: 346, g: 2.8 },
                  { t: "T+10", alt: 14980 + ((activeSubject.score % 3) * 12), kts: 342, g: 1.8 },
                  { t: "T+12", alt: 15060 + ((activeSubject.score % 6) * 6), kts: 348, g: 2.6 },
                  { t: "T+14", alt: 15120 - ((100 - activeSubject.score) * 3), kts: 354, g: 3.1 },
                  { t: "T+16", alt: 15090 + ((activeSubject.score % 4) * 8), kts: 350, g: 2.2 },
                  { t: "T+18", alt: 15010, kts: 344, g: 1.1 },
                ]

                const stepX = (540 - 75) / 9
                const splineCoords = telemetryPoints.map((pt, i) => {
                  const x = 45 + i * stepX
                  const y = 175 - ((pt.alt - 14500) / 1000) * 150
                  return { x, y, ...pt }
                })

                // Construct smooth path
                let pathStr = `M ${splineCoords[0].x.toFixed(1)} ${splineCoords[0].y.toFixed(1)}`
                for (let i = 0; i < splineCoords.length - 1; i++) {
                  const p0 = splineCoords[i === 0 ? i : i - 1]
                  const p1 = splineCoords[i]
                  const p2 = splineCoords[i + 1]
                  const p3 = splineCoords[i + 2] || p2
                  const cp1x = p1.x + (p2.x - p0.x) / 6
                  const cp1y = p1.y + (p2.y - p0.y) / 6
                  const cp2x = p2.x - (p3.x - p1.x) / 6
                  const cp2y = p2.y - (p3.y - p1.y) / 6
                  pathStr += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
                }

                const activeHoverPoint = telemetryHoverIdx !== null ? splineCoords[telemetryHoverIdx] : null

                return (
                  <div
                    className={`group/bento-card relative overflow-hidden flex flex-col p-5 sm:p-6 min-h-[380px] rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-t from-white/20 to-transparent dark:from-background/70 dark:to-transparent backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] hover:-translate-y-1 hover:border-black/15 dark:hover:border-white/20 hover:from-white/30 dark:hover:from-background/85 shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_20px_35px_-8px_rgba(0,0,0,0.12),0_10px_15px_-4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.25),inset_1px_0_0.5px_0_rgba(255,255,255,0.1),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.4)] dark:hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.35),inset_1px_0_0.5px_0_rgba(255,255,255,0.15),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_24px_45px_-8px_rgba(0,0,0,0.65),0_12px_20px_-4px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out @xl/main:col-span-2 ${
                      projectsInView ? "animate-[dashboardBlurFadeUp_950ms_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:120ms]" : "opacity-0"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-[#163144] dark:text-[#60A5FA]">
                          <Activity className="size-4.5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#163144] dark:text-foreground">
                            Current Project Telemetry
                          </h3>
                          <p className="text-xs text-[#163144]/80 dark:text-muted-foreground">
                            SIM-01 Instrument Solo • Real-Time Flight Envelope & Tolerance
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/25">
                          TOLERANCE: ±300 FT
                        </span>
                      </div>
                    </div>

                    {/* Chart Container */}
                    <div className="relative flex-1 min-h-[220px] w-full flex items-center justify-center my-1">
                      {/* Active Hover Inspection Tag */}
                      {activeHoverPoint && (
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-3 px-3 py-1 rounded-md bg-background/95 dark:bg-[#0C0E12]/95 backdrop-blur-md shadow-lg border border-border/60 text-xs font-mono font-bold text-[#163144] dark:text-[#60A5FA]">
                          <span>{activeHoverPoint.t}</span>
                          <span>•</span>
                          <span>ALT: {activeHoverPoint.alt} FT</span>
                          <span>•</span>
                          <span>IAS: {activeHoverPoint.kts} KTS</span>
                          <span>•</span>
                          <span>{activeHoverPoint.g}G</span>
                        </div>
                      )}

                      <svg
                        className="size-full overflow-visible"
                        viewBox="0 0 540 200"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id="corridorGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgb(22, 49, 68)" stopOpacity="0.12" className="dark:stop-color-[#60A5FA] dark:stop-opacity-15" />
                            <stop offset="50%" stopColor="rgb(22, 49, 68)" stopOpacity="0.04" className="dark:stop-color-[#60A5FA] dark:stop-opacity-05" />
                            <stop offset="100%" stopColor="rgb(22, 49, 68)" stopOpacity="0.12" className="dark:stop-color-[#60A5FA] dark:stop-opacity-15" />
                          </linearGradient>
                          <linearGradient id="flightLineGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#163144" className="dark:stop-color-[#60A5FA]" />
                            <stop offset="50%" stopColor="#255273" className="dark:stop-color-[#93C5FD]" />
                            <stop offset="100%" stopColor="#163144" className="dark:stop-color-[#60A5FA]" />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid & Altitude Labels */}
                        <line x1="45" y1="55" x2="515" y2="55" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
                        <text x="40" y="59" textAnchor="end" className="text-[10px] font-mono font-medium fill-[#163144]/80 dark:fill-muted-foreground">15,300</text>

                        <line x1="45" y1="100" x2="515" y2="100" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="4 2" />
                        <text x="40" y="104" textAnchor="end" className="text-[10px] font-mono font-bold fill-[#163144] dark:fill-[#60A5FA]">15,000</text>

                        <line x1="45" y1="145" x2="515" y2="145" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
                        <text x="40" y="149" textAnchor="end" className="text-[10px] font-mono font-medium fill-[#163144]/80 dark:fill-muted-foreground">14,700</text>

                        {/* Shaded Corridor Tolerance Polygon */}
                        <polygon
                          points="45,55 97.2,55 149.4,55 201.6,55 253.8,55 306,55 358.2,55 410.4,55 462.6,55 514.8,55 514.8,145 462.6,145 410.4,145 358.2,145 306,145 253.8,145 201.6,145 149.4,145 97.2,145 45,145"
                          fill="url(#corridorGrad)"
                        />

                        {/* Actual Flight Spline */}
                        <path
                          d={pathStr}
                          fill="none"
                          stroke="url(#flightLineGrad)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className="[filter:drop-shadow(0_2px_4px_rgba(22,49,68,0.25))] dark:[filter:drop-shadow(0_0_6px_rgba(96,165,250,0.5))]"
                        />

                        {/* Points & Hover Target Areas */}
                        {splineCoords.map((pt, i) => (
                          <g key={pt.t} onMouseEnter={() => setTelemetryHoverIdx(i)} onMouseLeave={() => setTelemetryHoverIdx(null)}>
                            {/* Hover trigger circle (invisible larger target) */}
                            <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" className="cursor-pointer" />
                            {/* Visual node circle */}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={telemetryHoverIdx === i ? "5.5" : "3.5"}
                              className={`transition-all duration-150 ${
                                telemetryHoverIdx === i
                                  ? "fill-white stroke-[#163144] dark:stroke-[#60A5FA] stroke-[2.5]"
                                  : "fill-[#163144] dark:fill-[#60A5FA]"
                              }`}
                            />
                            {/* X-axis time label */}
                            <text
                              x={pt.x}
                              y="190"
                              textAnchor="middle"
                              className={`text-[10px] font-mono font-medium transition-colors ${
                                telemetryHoverIdx === i
                                  ? "fill-[#163144] dark:fill-[#60A5FA] font-bold"
                                  : "fill-[#163144]/80 dark:fill-muted-foreground"
                              }`}
                            >
                              {pt.t}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>

                    {/* Footer telemetry metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/[0.08] dark:border-white/[0.06] text-xs font-medium text-[#163144] dark:text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span>Corridor Hold: <strong className="font-mono text-[#163144] dark:text-foreground">98.2%</strong></span>
                        <span>•</span>
                        <span>Max G: <strong className="font-mono text-[#163144] dark:text-foreground">3.4G</strong></span>
                        <span>•</span>
                        <span>Profile: <strong className="text-emerald-700 dark:text-emerald-400">Stable</strong></span>
                      </div>
                      <span className="font-mono text-[11px] text-[#163144]/80 dark:text-muted-foreground">FLT LOG #2026-X8</span>
                    </div>

                    {/* Sheen */}
                    <div className="pointer-events-none absolute inset-y-0 -left-[100%] w-[100%] bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.45)_50%,transparent_75%)] dark:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] transition-transform duration-0 group-hover/bento-card:translate-x-[200%] group-hover/bento-card:duration-700 group-hover/bento-card:ease-out" aria-hidden="true" />
                  </div>
                )
              })()}

              {/* CARD 2: Procedural Accuracy Arc Gauge (1 column) */}
              {(() => {
                const procScore = Math.min(99.4, Math.max(70, activeSubject.score * 1.02)).toFixed(1)
                const checklistRate = Math.min(99, Math.max(74, activeSubject.score + 2))
                const switchLatency = (0.55 - (activeSubject.score / 100) * 0.22).toFixed(2)

                return (
                  <div
                    className={`group/bento-card relative overflow-hidden flex flex-col p-5 sm:p-6 min-h-[380px] rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-t from-white/20 to-transparent dark:from-background/70 dark:to-transparent backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] hover:-translate-y-1 hover:border-black/15 dark:hover:border-white/20 hover:from-white/30 dark:hover:from-background/85 shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_20px_35px_-8px_rgba(0,0,0,0.12),0_10px_15px_-4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.25),inset_1px_0_0.5px_0_rgba(255,255,255,0.1),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.4)] dark:hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.35),inset_1px_0_0.5px_0_rgba(255,255,255,0.15),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_24px_45px_-8px_rgba(0,0,0,0.65),0_12px_20px_-4px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out ${
                      projectsInView ? "animate-[dashboardBlurFadeUp_950ms_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:240ms]" : "opacity-0"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-[#163144] dark:text-[#60A5FA]">
                        <Gauge className="size-4.5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#163144] dark:text-foreground">
                          Procedural Accuracy
                        </h3>
                        <p className="text-xs text-[#163144]/80 dark:text-muted-foreground">
                          Pre-Flight Checklist & Startup
                        </p>
                      </div>
                    </div>

                    {/* Speedometer Arc Gauge */}
                    <div className="relative flex-1 min-h-[170px] flex items-center justify-center my-1">
                      <svg className="size-48 overflow-visible" viewBox="0 0 280 190">
                        {/* Background track arc (240 deg) */}
                        <path
                          d="M 75 135 A 68 68 0 1 1 205 135"
                          fill="none"
                          stroke="currentColor"
                          strokeOpacity="0.12"
                          strokeWidth="12"
                          strokeLinecap="round"
                        />
                        {/* Animated progress arc */}
                        <path
                          d="M 75 135 A 68 68 0 1 1 205 135"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray="280"
                          strokeDashoffset={280 * (1 - Number(procScore) / 100)}
                          className="text-[#163144] dark:text-[#60A5FA] transition-all duration-1000 ease-out [filter:drop-shadow(0_2px_4px_rgba(22,49,68,0.25))] dark:[filter:drop-shadow(0_0_8px_rgba(96,165,250,0.5))]"
                        />

                        {/* Center Score readout */}
                        <text x="140" y="98" textAnchor="middle" className="text-3xl font-black font-mono tracking-tight fill-[#163144] dark:fill-foreground">
                          {procScore}%
                        </text>
                        <text x="140" y="118" textAnchor="middle" className="text-[10px] font-bold uppercase tracking-widest fill-[#163144]/80 dark:fill-muted-foreground">
                          SYSTEM COMPLIANCE
                        </text>
                      </svg>
                    </div>

                    {/* Breakdown Progress Bars */}
                    <div className="space-y-2 pt-2 border-t border-black/[0.08] dark:border-white/[0.06] text-xs font-medium text-[#163144] dark:text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Checklist Adherence</span>
                        <span className="font-mono font-bold text-[#163144] dark:text-foreground">{checklistRate}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-[#163144] dark:bg-[#60A5FA]" style={{ width: `${checklistRate}%` }} />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span>Switch Latency</span>
                        <span className="font-mono font-bold text-[#163144] dark:text-foreground">{switchLatency}s <span className="text-[10px] font-normal text-emerald-600 dark:text-emerald-400">(PASS)</span></span>
                      </div>
                    </div>

                    {/* Sheen */}
                    <div className="pointer-events-none absolute inset-y-0 -left-[100%] w-[100%] bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.45)_50%,transparent_75%)] dark:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] transition-transform duration-0 group-hover/bento-card:translate-x-[200%] group-hover/bento-card:duration-700 group-hover/bento-card:ease-out" aria-hidden="true" />
                  </div>
                )
              })()}

              {/* CARD 3: 5-Axis Tactical Radar (1 column) */}
              {(() => {
                const radarAxes = [
                  { label: "Situational", score: Math.min(99, Math.max(65, activeSubject.score + 2)), avg: 82 },
                  { label: "G-Tolerance", score: Math.min(98, Math.max(60, activeSubject.score - 2)), avg: 80 },
                  { label: "Reaction", score: Math.min(99, Math.max(66, activeSubject.score + 1)), avg: 85 },
                  { label: "Avionics", score: Math.min(98, Math.max(62, activeSubject.score - 4)), avg: 79 },
                  { label: "Comms", score: Math.min(99, Math.max(70, activeSubject.score + 3)), avg: 84 },
                ]

                const center = { x: 140, y: 110 }
                const radius = 72
                const step = (Math.PI * 2) / 5

                const getPt = (idx: number, val: number) => {
                  const angle = -Math.PI / 2 + idx * step
                  const r = (val / 100) * radius
                  return { x: center.x + r * Math.cos(angle), y: center.y + r * Math.sin(angle) }
                }

                const studentPolygon = radarAxes.map((a, i) => {
                  const p = getPt(i, a.score)
                  return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
                }).join(" ")

                const avgPolygon = radarAxes.map((a, i) => {
                  const p = getPt(i, a.avg)
                  return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
                }).join(" ")

                return (
                  <div
                    className={`group/bento-card relative overflow-hidden flex flex-col p-5 sm:p-6 min-h-[380px] rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-t from-white/20 to-transparent dark:from-background/70 dark:to-transparent backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] hover:-translate-y-1 hover:border-black/15 dark:hover:border-white/20 hover:from-white/30 dark:hover:from-background/85 shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_20px_35px_-8px_rgba(0,0,0,0.12),0_10px_15px_-4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.25),inset_1px_0_0.5px_0_rgba(255,255,255,0.1),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.4)] dark:hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.35),inset_1px_0_0.5px_0_rgba(255,255,255,0.15),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_24px_45px_-8px_rgba(0,0,0,0.65),0_12px_20px_-4px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out ${
                      projectsInView ? "animate-[dashboardBlurFadeUp_950ms_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:360ms]" : "opacity-0"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-[#163144] dark:text-[#60A5FA]">
                        <Target className="size-4.5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#163144] dark:text-foreground">
                          Competency Radar
                        </h3>
                        <p className="text-xs text-[#163144]/80 dark:text-muted-foreground">
                          5-Axis Pilot Evaluation vs Cohort Avg
                        </p>
                      </div>
                    </div>

                    {/* Radar SVG */}
                    <div className="relative flex-1 min-h-[200px] flex items-center justify-center my-1">
                      <svg className="size-full overflow-visible" viewBox="0 0 280 220">
                        {/* Concentric Web Rings (25%, 50%, 75%, 100%) */}
                        {[0.25, 0.5, 0.75, 1.0].map((scale) => {
                          const pts = [0, 1, 2, 3, 4].map((i) => {
                            const p = getPt(i, scale * 100)
                            return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
                          }).join(" ")
                          return (
                            <polygon
                              key={scale}
                              points={pts}
                              fill="none"
                              stroke="currentColor"
                              strokeOpacity={scale === 1.0 ? 0.2 : 0.1}
                              strokeDasharray={scale < 1.0 ? "2 2" : undefined}
                            />
                          )
                        })}

                        {/* Radial Spoke Lines */}
                        {[0, 1, 2, 3, 4].map((i) => {
                          const p = getPt(i, 100)
                          return (
                            <line
                              key={i}
                              x1={center.x}
                              y1={center.y}
                              x2={p.x}
                              y2={p.y}
                              stroke="currentColor"
                              strokeOpacity="0.15"
                            />
                          )
                        })}

                        {/* Cohort Average Polygon (Dashed outline) */}
                        <polygon
                          points={avgPolygon}
                          fill="none"
                          stroke="currentColor"
                          strokeOpacity="0.3"
                          strokeDasharray="3 3"
                          strokeWidth="1.5"
                        />

                        {/* Student Competency Polygon */}
                        <polygon
                          points={studentPolygon}
                          fill="currentColor"
                          fillOpacity="0.18"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="text-[#163144] dark:text-[#60A5FA] [filter:drop-shadow(0_0_6px_rgba(22,49,68,0.3))] dark:[filter:drop-shadow(0_0_8px_rgba(96,165,250,0.5))]"
                        />

                        {/* Vertices & Axis Labels */}
                        {radarAxes.map((axis, i) => {
                          const pt = getPt(i, axis.score)
                          const labelPt = getPt(i, 118)
                          const isHovered = radarHoverIdx === i

                          return (
                            <g
                              key={axis.label}
                              className="cursor-pointer"
                              onMouseEnter={() => setRadarHoverIdx(i)}
                              onMouseLeave={() => setRadarHoverIdx(null)}
                            >
                              <circle cx={pt.x} cy={pt.y} r="12" fill="transparent" />
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r={isHovered ? "5" : "3.5"}
                                className={`transition-all ${
                                  isHovered
                                    ? "fill-white stroke-[#163144] dark:stroke-[#60A5FA] stroke-2"
                                    : "fill-[#163144] dark:fill-[#60A5FA]"
                                }`}
                              />
                              <text
                                x={labelPt.x}
                                y={labelPt.y + (i === 0 ? -4 : i === 2 || i === 3 ? 10 : 3)}
                                textAnchor={i === 0 ? "middle" : i === 1 || i === 2 ? "start" : "end"}
                                className={`text-[10px] font-bold tracking-wider transition-colors ${
                                  isHovered
                                    ? "fill-[#163144] dark:fill-[#60A5FA]"
                                    : "fill-[#163144]/80 dark:fill-muted-foreground"
                                }`}
                              >
                                {axis.label} ({axis.score}%)
                              </text>
                            </g>
                          )
                        })}
                      </svg>
                    </div>

                    {/* Footer legend */}
                    <div className="flex items-center justify-between pt-3 border-t border-black/[0.08] dark:border-white/[0.06] text-xs font-medium text-[#163144] dark:text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-[#163144] dark:bg-[#60A5FA]" />
                        <span className="font-semibold text-[#163144] dark:text-foreground">Candidate</span>
                        <span className="text-[#163144]/40 dark:text-muted-foreground/60">•</span>
                        <span className="border-b border-dashed border-[#163144]/60 dark:border-muted-foreground/60 w-4 inline-block" />
                        <span>Squadron Avg</span>
                      </div>
                    </div>

                    {/* Sheen */}
                    <div className="pointer-events-none absolute inset-y-0 -left-[100%] w-[100%] bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.45)_50%,transparent_75%)] dark:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] transition-transform duration-0 group-hover/bento-card:translate-x-[200%] group-hover/bento-card:duration-700 group-hover/bento-card:ease-out" aria-hidden="true" />
                  </div>
                )
              })()}

              {/* CARD 4: ILS Landing Deviation & Deck Trap Crosshair (1 column) */}
              {(() => {
                const center = { x: 140, y: 110 }
                const attempts = [
                  { id: 1, dx: 0.8, dy: -0.4, wire: 3, label: "Trap #1" },
                  { id: 2, dx: -1.4, dy: 0.7, wire: 3, label: "Trap #2" },
                  { id: 3, dx: 1.6, dy: -1.1, wire: 2, label: "Trap #3" },
                  { id: 4, dx: -0.5, dy: 0.3, wire: 3, label: "Trap #4" },
                  { id: 5, dx: 0.3, dy: 0.2, wire: 3, label: "Trap #5" },
                  { id: 6, dx: -0.7, dy: -0.3, wire: 3, label: "Trap #6" },
                ]

                const activeAttempt = ilsHoverIdx !== null ? attempts[ilsHoverIdx] : null

                return (
                  <div
                    className={`group/bento-card relative overflow-hidden flex flex-col p-5 sm:p-6 min-h-[380px] rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-t from-white/20 to-transparent dark:from-background/70 dark:to-transparent backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] hover:-translate-y-1 hover:border-black/15 dark:hover:border-white/20 hover:from-white/30 dark:hover:from-background/85 shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_20px_35px_-8px_rgba(0,0,0,0.12),0_10px_15px_-4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.25),inset_1px_0_0.5px_0_rgba(255,255,255,0.1),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.4)] dark:hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.35),inset_1px_0_0.5px_0_rgba(255,255,255,0.15),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_24px_45px_-8px_rgba(0,0,0,0.65),0_12px_20px_-4px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out ${
                      projectsInView ? "animate-[dashboardBlurFadeUp_950ms_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:480ms]" : "opacity-0"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-[#163144] dark:text-[#60A5FA]">
                        <Crosshair className="size-4.5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#163144] dark:text-foreground">
                          ILS Landing Dispersion
                        </h3>
                        <p className="text-xs text-[#163144]/80 dark:text-muted-foreground">
                          Runway Centerline & Glide Slope Touchdown
                        </p>
                      </div>
                    </div>

                    {/* Crosshair Target Radar Scope */}
                    <div className="relative flex-1 min-h-[200px] flex items-center justify-center my-1">
                      {/* Active Hover Tag */}
                      {activeAttempt && (
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-2.5 py-0.5 rounded bg-background/95 dark:bg-[#0C0E12]/95 backdrop-blur-md shadow-md border border-border/60 text-[11px] font-mono font-bold text-[#163144] dark:text-[#60A5FA] whitespace-nowrap">
                          {activeAttempt.label}: {activeAttempt.dx > 0 ? `+${activeAttempt.dx}` : activeAttempt.dx}ft lat, {activeAttempt.dy > 0 ? `+${activeAttempt.dy}` : activeAttempt.dy}ft vert (Wire {activeAttempt.wire})
                        </div>
                      )}

                      <svg className="size-full overflow-visible" viewBox="0 0 280 220">
                        {/* Concentric Range Rings */}
                        <circle cx={center.x} cy={center.y} r="24" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 2" />
                        <circle cx={center.x} cy={center.y} r="50" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 3" />
                        <circle cx={center.x} cy={center.y} r="76" fill="none" stroke="currentColor" strokeOpacity="0.12" />

                        {/* Crosshairs */}
                        <line x1="25" y1={center.y} x2="255" y2={center.y} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="4 2" />
                        <line x1={center.x} y1="20" x2={center.x} y2="200" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="4 2" />

                        {/* Runway Touchdown Box Center Target */}
                        <rect
                          x={center.x - 8}
                          y={center.y - 6}
                          width="16"
                          height="12"
                          rx="2"
                          fill="currentColor"
                          fillOpacity="0.15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-emerald-600 dark:text-emerald-400"
                        />

                        {/* Trajectory dotted connect line */}
                        <polyline
                          points={attempts.map((a) => `${(center.x + a.dx * 18).toFixed(1)},${(center.y + a.dy * 22).toFixed(1)}`).join(" ")}
                          fill="none"
                          stroke="currentColor"
                          strokeOpacity="0.2"
                          strokeDasharray="2 2"
                        />

                        {/* Attempt Pings */}
                        {attempts.map((a, i) => {
                          const px = center.x + a.dx * 18
                          const py = center.y + a.dy * 22
                          const isHov = ilsHoverIdx === i

                          return (
                            <g
                              key={a.id}
                              className="cursor-pointer"
                              onMouseEnter={() => setIlsHoverIdx(i)}
                              onMouseLeave={() => setIlsHoverIdx(null)}
                            >
                              <circle cx={px} cy={py} r="10" fill="transparent" />
                              <circle
                                cx={px}
                                cy={py}
                                r={isHov ? "5" : "3.5"}
                                className={`transition-all ${
                                  isHov
                                    ? "fill-white stroke-[#163144] dark:stroke-[#60A5FA] stroke-2"
                                    : "fill-[#163144] dark:fill-[#60A5FA]"
                                }`}
                              />
                            </g>
                          )
                        })}

                        {/* Range markers */}
                        <text x={center.x + 28} y={center.y - 4} className="text-[9px] font-mono font-medium fill-[#163144]/80 dark:fill-muted-foreground">5ft</text>
                        <text x={center.x + 54} y={center.y - 4} className="text-[9px] font-mono font-medium fill-[#163144]/80 dark:fill-muted-foreground">15ft</text>
                      </svg>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-black/[0.08] dark:border-white/[0.06] text-xs font-medium text-[#163144] dark:text-muted-foreground">
                      <span>Carrier Trap 3-Wire: <strong className="font-mono text-emerald-700 dark:text-emerald-400">83.3%</strong></span>
                      <span>Bolters: <strong className="font-mono text-[#163144] dark:text-foreground">0</strong></span>
                    </div>

                    {/* Sheen */}
                    <div className="pointer-events-none absolute inset-y-0 -left-[100%] w-[100%] bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.45)_50%,transparent_75%)] dark:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] transition-transform duration-0 group-hover/bento-card:translate-x-[200%] group-hover/bento-card:duration-700 group-hover/bento-card:ease-out" aria-hidden="true" />
                  </div>
                )
              })()}

              {/* CARD 5: BFM Threat Response & Engagement History (1 column) */}
              {(() => {
                const bfmSorties = [
                  { id: "S-01", lockSec: 2.6, evasion: 84, outcome: "SPLASH 1" },
                  { id: "S-02", lockSec: 2.2, evasion: 88, outcome: "SPLASH 1" },
                  { id: "S-03", lockSec: 1.9, evasion: 92, outcome: "SPLASH 2" },
                  { id: "S-04", lockSec: 1.6, evasion: 95, outcome: "SPLASH 2" },
                  { id: "S-05", lockSec: 1.4, evasion: 98, outcome: "ACE" },
                ]

                return (
                  <div
                    className={`group/bento-card relative overflow-hidden flex flex-col p-5 sm:p-6 min-h-[380px] rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-t from-white/20 to-transparent dark:from-background/70 dark:to-transparent backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] hover:-translate-y-1 hover:border-black/15 dark:hover:border-white/20 hover:from-white/30 dark:hover:from-background/85 shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_20px_35px_-8px_rgba(0,0,0,0.12),0_10px_15px_-4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.25),inset_1px_0_0.5px_0_rgba(255,255,255,0.1),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.4)] dark:hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.35),inset_1px_0_0.5px_0_rgba(255,255,255,0.15),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_24px_45px_-8px_rgba(0,0,0,0.65),0_12px_20px_-4px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out ${
                      projectsInView ? "animate-[dashboardBlurFadeUp_950ms_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:600ms]" : "opacity-0"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-[#163144] dark:text-[#60A5FA]">
                        <Zap className="size-4.5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#163144] dark:text-foreground">
                          BFM Engagement Matrix
                        </h3>
                        <p className="text-xs text-[#163144]/80 dark:text-muted-foreground">
                          Dogfight Reaction & Radar Lock Speed
                        </p>
                      </div>
                    </div>

                    {/* Segmented Columns */}
                    <div className="relative flex-1 min-h-[190px] flex items-end justify-between gap-2 px-2 pb-2 my-1">
                      {bfmSorties.map((s, i) => {
                        const isHovered = bfmHoverIdx === i
                        const heightPct = 40 + i * 14

                        return (
                          <div
                            key={s.id}
                            className="flex-1 flex flex-col items-center gap-2 cursor-pointer group/col"
                            onMouseEnter={() => setBfmHoverIdx(i)}
                            onMouseLeave={() => setBfmHoverIdx(null)}
                          >
                            {/* Hover Tag */}
                            <span className={`text-[10px] font-mono font-bold transition-all ${
                              isHovered ? "text-[#163144] dark:text-[#60A5FA] scale-110" : "text-[#163144]/80 dark:text-muted-foreground"
                            }`}>
                              {s.lockSec}s
                            </span>

                            {/* Segmented Bar Track */}
                            <div className="w-full max-w-9 h-28 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] p-1 flex flex-col justify-end gap-1 overflow-hidden transition-all group-hover/col:border-black/20 dark:group-hover/col:border-white/30">
                              {/* Evasion segment */}
                              <div
                                className="w-full rounded bg-[#163144]/35 dark:bg-[#60A5FA]/35 transition-all duration-500"
                                style={{ height: `${heightPct * 0.4}%` }}
                              />
                              {/* Lock acquisition segment */}
                              <div
                                className="w-full rounded bg-[#163144] dark:bg-[#60A5FA] transition-all duration-500 [filter:drop-shadow(0_1px_3px_rgba(22,49,68,0.3))]"
                                style={{ height: `${heightPct * 0.6}%` }}
                              />
                            </div>

                            {/* Label */}
                            <span className="text-[10px] font-mono font-bold text-[#163144]/80 dark:text-muted-foreground">
                              {s.id}
                            </span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-black/[0.08] dark:border-white/[0.06] text-xs font-medium text-[#163144] dark:text-muted-foreground">
                      <span>Simulated Hits: <strong className="font-mono text-emerald-700 dark:text-emerald-400">7 Kills</strong></span>
                      <span>Apex Lock: <strong className="font-mono text-[#163144] dark:text-foreground">1.4s</strong></span>
                    </div>

                    {/* Sheen */}
                    <div className="pointer-events-none absolute inset-y-0 -left-[100%] w-[100%] bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.45)_50%,transparent_75%)] dark:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] transition-transform duration-0 group-hover/bento-card:translate-x-[200%] group-hover/bento-card:duration-700 group-hover/bento-card:ease-out" aria-hidden="true" />
                  </div>
                )
              })()}

              {/* CARD 6: Milestone Progression & Project History (Spans 2 columns) */}
              {(() => {
                const projects = getDetailedProjectsForStudent(activeSubject)
                const step = (540 - 70) / (projects.length - 1 || 1)

                const barCoords = projects.map((p, i) => {
                  const scoreVal = typeof p.score === "number" ? p.score : 80
                  const x = 35 + i * step
                  const barHeight = Math.max(10, ((scoreVal - 60) / 40) * 115)
                  const y = 160 - barHeight
                  return { x, y, barHeight, score: scoreVal, ...p }
                })

                // Construct moving average spline
                let trendPath = `M ${barCoords[0].x.toFixed(1)} ${barCoords[0].y.toFixed(1)}`
                for (let i = 0; i < barCoords.length - 1; i++) {
                  const p0 = barCoords[i === 0 ? i : i - 1]
                  const p1 = barCoords[i]
                  const p2 = barCoords[i + 1]
                  const p3 = barCoords[i + 2] || p2
                  const cp1x = p1.x + (p2.x - p0.x) / 6
                  const cp1y = p1.y + (p2.y - p0.y) / 6
                  const cp2x = p2.x - (p3.x - p1.x) / 6
                  const cp2y = p2.y - (p3.y - p1.y) / 6
                  trendPath += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
                }

                const activeBar = milestoneHoverIdx !== null ? barCoords[milestoneHoverIdx] : null

                return (
                  <div
                    className={`group/bento-card relative overflow-hidden flex flex-col p-5 sm:p-6 min-h-[380px] rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-t from-white/20 to-transparent dark:from-background/70 dark:to-transparent backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] hover:-translate-y-1 hover:border-black/15 dark:hover:border-white/20 hover:from-white/30 dark:hover:from-background/85 shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_20px_35px_-8px_rgba(0,0,0,0.12),0_10px_15px_-4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.25),inset_1px_0_0.5px_0_rgba(255,255,255,0.1),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.4)] dark:hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.35),inset_1px_0_0.5px_0_rgba(255,255,255,0.15),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_24px_45px_-8px_rgba(0,0,0,0.65),0_12px_20px_-4px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out @xl/main:col-span-2 ${
                      projectsInView ? "animate-[dashboardBlurFadeUp_950ms_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:720ms]" : "opacity-0"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-[#163144] dark:text-[#60A5FA]">
                          <Award className="size-4.5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#163144] dark:text-foreground">
                            Milestone Project Progression
                          </h3>
                          <p className="text-xs text-[#163144]/80 dark:text-muted-foreground">
                            Historical Project Performance vs 90% Qualification Minimum
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#163144]/10 dark:bg-[#60A5FA]/15 text-[#163144] dark:text-[#60A5FA] border border-[#163144]/20 dark:border-[#60A5FA]/25">
                          COHORT MEAN: 84.6%
                        </span>
                      </div>
                    </div>

                    {/* Chart Area */}
                    <div className="relative flex-1 min-h-[220px] w-full flex items-center justify-center my-1">
                      {/* Active Hover Tooltip */}
                      {activeBar && (
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2.5 px-3 py-1 rounded-md bg-background/95 dark:bg-[#0C0E12]/95 backdrop-blur-md shadow-lg border border-border/60 text-xs font-mono font-bold text-[#163144] dark:text-[#60A5FA]">
                          <span>{activeBar.code}</span>
                          <span>•</span>
                          <span className="font-sans font-semibold text-foreground">{activeBar.title}</span>
                          <span>•</span>
                          <span className="text-emerald-600 dark:text-emerald-400">{activeBar.score}%</span>
                        </div>
                      )}

                      <svg
                        className="size-full overflow-visible"
                        viewBox="0 0 540 200"
                        preserveAspectRatio="none"
                      >
                        {/* 90% Qualification Threshold Line */}
                        <line x1="30" y1="74" x2="520" y2="74" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="4 3" strokeWidth="1.5" className="text-emerald-600 dark:text-emerald-400" />
                        <text x="515" y="68" textAnchor="end" className="text-[9px] font-mono font-bold fill-emerald-700 dark:fill-emerald-400">
                          90% FLEET QUAL BENCHMARK
                        </text>

                        {/* Baseline */}
                        <line x1="30" y1="160" x2="520" y2="160" stroke="currentColor" strokeOpacity="0.2" />

                        {/* Project Bars */}
                        {barCoords.map((bar, i) => {
                          const isHovered = milestoneHoverIdx === i
                          const isPassed = bar.score >= 90

                          return (
                            <g
                              key={bar.id}
                              className="cursor-pointer"
                              onMouseEnter={() => setMilestoneHoverIdx(i)}
                              onMouseLeave={() => setMilestoneHoverIdx(null)}
                            >
                              <rect
                                x={bar.x - 7}
                                y={bar.y}
                                width="14"
                                height={bar.barHeight}
                                rx="3"
                                className={`transition-all duration-200 ${
                                  isHovered
                                    ? "fill-[#163144] dark:fill-[#60A5FA] opacity-100"
                                    : isPassed
                                    ? "fill-[#163144] dark:fill-[#60A5FA] opacity-75 group-hover/bento-card:opacity-85"
                                    : "fill-[#163144]/40 dark:fill-[#60A5FA]/40 opacity-70"
                                }`}
                              />
                              <text
                                x={bar.x}
                                y="176"
                                textAnchor="middle"
                                className={`text-[9px] font-mono font-medium transition-colors ${
                                  isHovered ? "fill-[#163144] dark:fill-[#60A5FA] font-bold" : "fill-[#163144]/80 dark:fill-muted-foreground"
                                }`}
                              >
                                {bar.code.split("-")[0]}
                              </text>
                            </g>
                          )
                        })}

                        {/* Moving Average Trend Spline */}
                        <path
                          d={trendPath}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="text-[#163144] dark:text-[#60A5FA] [filter:drop-shadow(0_1px_3px_rgba(22,49,68,0.3))] dark:[filter:drop-shadow(0_0_6px_rgba(96,165,250,0.6))]"
                        />
                      </svg>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/[0.08] dark:border-white/[0.06] text-xs font-medium text-[#163144] dark:text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span>Modules Cleared: <strong className="font-mono text-[#163144] dark:text-foreground">{activeSubject.passedProjects}/{activeSubject.totalProjects}</strong></span>
                        <span>•</span>
                        <span>Average Trend: <strong className="font-mono text-emerald-700 dark:text-emerald-400">+{((activeSubject.score - 78) * 0.4).toFixed(1)}%</strong></span>
                      </div>
                      <span className="font-medium text-emerald-700 dark:text-emerald-400">Fleet Deployment Track</span>
                    </div>

                    {/* Sheen */}
                    <div className="pointer-events-none absolute inset-y-0 -left-[100%] w-[100%] bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.45)_50%,transparent_75%)] dark:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] transition-transform duration-0 group-hover/bento-card:translate-x-[200%] group-hover/bento-card:duration-700 group-hover/bento-card:ease-out" aria-hidden="true" />
                  </div>
                )
              })()}

            </div>
          </div>

        </div>
      </div>

      {/* Expanded Card Modal Portal */}
      {mounted && expandedCardId && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-3 sm:p-6 isolate">
          {/* Backdrop Blur Overlay: blurs simultaneously with card motion via GPU opacity blending */}
          <div
            className={`fixed inset-0 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] bg-black/45 dark:bg-black/65 transition-opacity duration-550 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-[opacity] cursor-pointer ${
              backdropVisible && !isClosing ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Expanded Glass Card (FLIP Animated to Center) */}
          {(() => {
            const cardData = metricCards.find((c) => c.id === expandedCardId)
            const allProjects = getDetailedProjectsForStudent(activeSubject)
            
            // Filter projects based on the active card type
            let baseProjects: DetailedProject[] = []
            if (expandedCardId === "total") {
              baseProjects = allProjects
            } else if (expandedCardId === "ended") {
              baseProjects = allProjects.filter((p) => p.status === "passed" || p.status === "retried")
            } else if (expandedCardId === "running") {
              baseProjects = allProjects.filter((p) => p.status === "running")
            } else if (expandedCardId === "pending") {
              baseProjects = allProjects.filter((p) => p.status === "pending")
            }

            // Sub-filter by active tab
            const visibleProjects = baseProjects.filter((p) => {
              if (activeModalTab === "all") return true
              return p.status === activeModalTab
            })

            const totalHours = baseProjects.reduce((acc, p) => acc + (p.durationHours || 0), 0).toFixed(1)
            const passedCount = baseProjects.filter((p) => p.status === "passed").length
            const retriedCount = baseProjects.filter((p) => p.status === "retried").length
            const runningCount = baseProjects.filter((p) => p.status === "running").length
            const pendingCount = baseProjects.filter((p) => p.status === "pending").length

            return (
              <div
                ref={modalCardRef}
                className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(94vw,940px)] h-[min(88vh,740px)] flex flex-col rounded-2xl border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#0c151d]/95 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden font-sans text-foreground will-change-transform"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="expanded-card-title"
              >
                {/* Header (Glass pinned top bar) */}
                <div className="shrink-0 p-5 sm:p-6 pb-4 border-b border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.015]">
                  <div className="flex items-center justify-between gap-4">
                    {/* Left: Icon, Title & Counter */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-[#163144] dark:text-[#60A5FA]">
                        {expandedCardId === "total" && <ShieldCheck className="size-6" />}
                        {expandedCardId === "ended" && <Award className="size-6" />}
                        {expandedCardId === "running" && <Activity className="size-6 text-blue-600 dark:text-[#60A5FA] animate-pulse" />}
                        {expandedCardId === "pending" && <Clock className="size-6" />}
                      </div>
                      <div className="flex items-baseline gap-2.5 truncate">
                        <h2 id="expanded-card-title" className="text-xl sm:text-2xl font-bold tracking-tight text-[#163144] dark:text-foreground">
                          {cardData?.title}
                        </h2>
                        <span className="font-mono text-2xl sm:text-3xl font-black tabular-nums text-[#163144] dark:text-[#60A5FA]">
                          {cardData?.count}
                        </span>
                      </div>
                    </div>

                    {/* Right: Close button morphed from arrow to X */}
                    <button
                      onClick={handleClose}
                      className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/10 text-[#163144] dark:text-foreground hover:bg-white dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm group/close"
                      title="Close expanded view (Esc)"
                      aria-label="Close"
                    >
                      <X className="size-4.5 transition-transform duration-300 group-hover/close:rotate-90" />
                    </button>
                  </div>

                  {/* Operational Telemetry Subtitle */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-2 text-xs sm:text-sm text-[#163144]/80 dark:text-muted-foreground">
                    <span className="font-bold text-[#163144] dark:text-foreground">{activeSubject.name}</span>
                    <span>•</span>
                    <span className="uppercase tracking-wider font-semibold text-xs">{activeSubject.branch}</span>
                    <span>•</span>
                    <span>Last Eval: <span className="font-mono font-semibold text-[#163144] dark:text-foreground">{activeSubject.lastEval}</span></span>
                    <span>•</span>
                    <span className="hidden sm:inline font-medium">Milestone: <span className="text-[#163144] dark:text-foreground">{activeSubject.milestone}</span></span>
                  </div>

                  {/* Filter Chips / Tabs */}
                  <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-0.5 no-scrollbar text-xs font-semibold">
                    <button
                      onClick={() => setActiveModalTab("all")}
                      className={`px-3 py-1.5 rounded-full border transition-all ${
                        activeModalTab === "all"
                          ? "bg-[#163144] text-white dark:bg-[#60A5FA] dark:text-zinc-950 border-transparent shadow-xs"
                          : "border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-black/[0.05]"
                      }`}
                    >
                      All ({baseProjects.length})
                    </button>

                    {passedCount > 0 && (
                      <button
                        onClick={() => setActiveModalTab("passed")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                          activeModalTab === "passed"
                            ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950 border-transparent shadow-xs"
                            : "border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-black/[0.05]"
                        }`}
                      >
                        <Check className="size-3" />
                        Passed ({passedCount})
                      </button>
                    )}

                    {retriedCount > 0 && (
                      <button
                        onClick={() => setActiveModalTab("retried")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                          activeModalTab === "retried"
                            ? "bg-amber-600 text-white dark:bg-amber-500 dark:text-zinc-950 border-transparent shadow-xs"
                            : "border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-black/[0.05]"
                        }`}
                      >
                        <RotateCcw className="size-3" />
                        Retried ({retriedCount})
                      </button>
                    )}

                    {runningCount > 0 && (
                      <button
                        onClick={() => setActiveModalTab("running")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                          activeModalTab === "running"
                            ? "bg-[#163144] text-white dark:bg-[#60A5FA] dark:text-zinc-950 border-transparent shadow-xs"
                            : "border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-black/[0.05]"
                        }`}
                      >
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_4px_rgba(52,211,153,0.6)]" />
                        In Flight ({runningCount})
                      </button>
                    )}

                    {pendingCount > 0 && (
                      <button
                        onClick={() => setActiveModalTab("pending")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                          activeModalTab === "pending"
                            ? "bg-slate-700 text-white dark:bg-slate-400 dark:text-zinc-950 border-transparent shadow-xs"
                            : "border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-black/[0.05]"
                        }`}
                      >
                        <Clock className="size-3" />
                        Queued ({pendingCount})
                      </button>
                    )}
                  </div>
                </div>

                {/* Body: Scrollable Dossier Project Table / List */}
                <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-3">
                  {visibleProjects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-sm">
                      No projects found matching this filter.
                    </div>
                  ) : (
                    visibleProjects.map((project) => (
                      <div
                        key={project.id}
                        className="group/item relative overflow-hidden flex flex-col p-3.5 sm:p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200"
                      >
                        {/* Row 1: Code, Title, Category and Status Pill */}
                        <div className="flex flex-wrap items-center justify-between gap-2.5">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/[0.05] dark:bg-white/10 text-[#163144] dark:text-foreground">
                              {project.code}
                            </span>
                            <h4 className="text-sm sm:text-base font-bold text-[#163144] dark:text-foreground">
                              {project.title}
                            </h4>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground">
                              {project.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Status Badge */}
                            {project.status === "passed" && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/25">
                                <Check className="size-3" />
                                PASSED
                              </span>
                            )}
                            {project.status === "retried" && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/25">
                                <RotateCcw className="size-3" />
                                RETRIED
                              </span>
                            )}
                            {project.status === "running" && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/25">
                                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_4px_rgba(52,211,153,0.6)]" />
                                IN FLIGHT
                              </span>
                            )}
                            {project.status === "pending" && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-500/15 text-slate-700 dark:text-slate-400 border border-slate-500/25">
                                <Clock className="size-3" />
                                QUEUED
                              </span>
                            )}

                            {/* Score (if graded) */}
                            {typeof project.score === "number" && (
                              <span className="font-mono text-base font-black tabular-nums text-[#163144] dark:text-[#60A5FA] min-w-10 text-right">
                                {project.score}%
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Row 2: Dates, Instructor, Duration */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-[#163144]/75 dark:text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="size-3 opacity-60" />
                            <span>Started: <strong className="font-medium text-[#163144] dark:text-foreground">{project.dateStarted}</strong></span>
                            {project.dateCompleted ? (
                              <span> • Completed: <strong className="font-medium text-[#163144] dark:text-foreground">{project.dateCompleted}</strong></span>
                            ) : (
                              <span> • In Progress</span>
                            )}
                          </span>
                          <span>•</span>
                          <span>Instructor: <strong className="font-medium text-[#163144] dark:text-foreground">{project.instructor}</strong></span>
                          <span>•</span>
                          <span>{project.durationHours} hrs logged</span>
                        </div>

                        {/* Progress Bar for Running Projects */}
                        {project.status === "running" && typeof project.progress === "number" && (
                          <div className="mt-2.5 flex items-center gap-2">
                            <div className="h-1.5 flex-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-[#163144] dark:bg-[#60A5FA] transition-all duration-500"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px] font-bold tabular-nums text-[#163144] dark:text-[#60A5FA]">
                              {project.progress}%
                            </span>
                          </div>
                        )}

                        {/* Remarks Callout */}
                        {project.notes && (
                          <p className="mt-2 text-xs italic text-[#163144]/80 dark:text-muted-foreground/90 pl-2 border-l-2 border-[#163144]/30 dark:border-[#60A5FA]/30">
                            &ldquo;{project.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Bar */}
                <div className="shrink-0 px-5 sm:px-6 py-3.5 border-t border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.015] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[#163144]/80 dark:text-muted-foreground">
                    <span>
                      Pass Rate: <strong className="font-mono font-bold text-[#163144] dark:text-foreground">
                        {baseProjects.length > 0 ? Math.round((passedCount / baseProjects.length) * 100) : 0}%
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      Total Hours: <strong className="font-mono font-bold text-[#163144] dark:text-foreground">{totalHours} hrs</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      Press <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-[10px] font-mono">ESC</kbd> to return
                    </span>
                    <button
                      onClick={handleClose}
                      className="text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 text-[#163144] dark:text-foreground transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>,
        document.body
      )}
    </div>
  )
}
