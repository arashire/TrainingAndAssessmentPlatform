"use client"

import { useState } from "react"
import { SearchIcon, ArrowUpRight, TrendingUp, TrendingDown, MessageSquareText } from "lucide-react"
import { Card } from "@/components/ui/card" 
import { BranchLogo } from "@/components/branch-logo"

// Mock data for the students
const MOCK_STUDENTS = [
  { 
    id: 1, 
    initials: "JD", 
    name: "Jane Doe", 
    branch: "U.S. Navy", 
    isLive: true, 
    score: 94, 
    milestone: "Phase II: Instrument Solo",
    lastEval: "14 mins ago",
    totalProjects: 14, 
    endedProjects: 8,
    runningProjects: 4,
    pendingProjects: 2,
    projectTrend: "increased" as const,
    endedTrend: "increased" as const,
    runningTrend: "decreased" as const,
    pendingTrend: "increased" as const,
  },
  { 
    id: 2, 
    initials: "MR", 
    name: "Mark Reeds", 
    branch: "U.S. Army", 
    isLive: false, 
    score: 78, 
    milestone: "Tactical Navigation Qual",
    lastEval: "2 hrs ago",
    totalProjects: 8, 
    endedProjects: 5,
    runningProjects: 2,
    pendingProjects: 1,
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
    endedProjects: 11,
    runningProjects: 5,
    pendingProjects: 3,
    projectTrend: "increased" as const,
    endedTrend: "increased" as const,
    runningTrend: "increased" as const,
    pendingTrend: "decreased" as const,
  },
  { 
    id: 4, 
    initials: "TC", 
    name: "Tom Cruise", 
    branch: "U.S. Navy", 
    isLive: true, 
    score: 99, 
    milestone: "Carrier Deck Landing",
    lastEval: "1 hr ago",
    totalProjects: 26, 
    endedProjects: 17,
    runningProjects: 6,
    pendingProjects: 3,
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
    endedProjects: 3,
    runningProjects: 2,
    pendingProjects: 1,
    projectTrend: "decreased" as const,
    endedTrend: "decreased" as const,
    runningTrend: "decreased" as const,
    pendingTrend: "increased" as const,
  },
  { 
    id: 6, 
    initials: "RJ", 
    name: "Rick James", 
    branch: "U.S. Marines", 
    isLive: true, 
    score: 85, 
    milestone: "Close Air Support Check",
    lastEval: "Yesterday",
    totalProjects: 12, 
    endedProjects: 7,
    runningProjects: 3,
    pendingProjects: 2,
    projectTrend: "increased" as const,
    endedTrend: "increased" as const,
    runningTrend: "decreased" as const,
    pendingTrend: "increased" as const,
  },
  { 
    id: 7, 
    initials: "EP", 
    name: "Ellen Page", 
    branch: "U.S. Navy", 
    isLive: false, 
    score: 91, 
    milestone: "Night Approach Cert",
    lastEval: "5 hrs ago",
    totalProjects: 15, 
    endedProjects: 9,
    runningProjects: 4,
    pendingProjects: 2,
    projectTrend: "decreased" as const,
    endedTrend: "increased" as const,
    runningTrend: "decreased" as const,
    pendingTrend: "decreased" as const,
  },
];

export function SectionCards() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeStudentId, setActiveStudentId] = useState(1)
  const [activeProjectFilter, setActiveProjectFilter] = useState<string | null>(null)

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
    <div className="flex w-full h-[85vh] min-h-[600px] overflow-hidden rounded-xl border border-border/50 bg-background text-foreground shadow-sm font-sans [transform:translateZ(0)]">
      
      {/* Left Sidebar: Expanding Column */}
      <div 
        className={`flex flex-col border-r border-border/50 bg-muted/20 transition-all duration-300 ease-in-out shrink-0 ${
          isSidebarExpanded ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Header / Search Toggle */}
        <div className="flex h-20 shrink-0 items-center border-b border-border/50 px-3">
          <button 
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="flex size-10 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Toggle Search"
          >
            <SearchIcon className="size-5" />
          </button>
          
          {isSidebarExpanded && (
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
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
                      ? "border-primary bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.7),0_4px_14px_-2px_rgba(0,0,0,0.15)] group-hover/student-btn:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.7),0_8px_16px_-4px_rgba(0,0,0,0.25)]" 
                      : "border-black/[0.06] dark:border-white/[0.08] bg-black/[0.035] dark:bg-white/[0.02] text-foreground backdrop-blur-[2px] [-webkit-backdrop-filter:blur(2px)] shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_4px_12px_-2px_rgba(0,0,0,0.06)] group-hover/student-btn:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_8px_16px_-4px_rgba(0,0,0,0.12)] dark:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.25),inset_1px_0_0.5px_0_rgba(255,255,255,0.1),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_4px_12px_-2px_rgba(0,0,0,0.4)] dark:group-hover/student-btn:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.35),inset_1px_0_0.5px_0_rgba(255,255,255,0.15),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_10px_20px_-4px_rgba(0,0,0,0.65)] group-hover/student-btn:border-black/15 dark:group-hover/student-btn:border-white/20 group-hover/student-btn:bg-black/[0.05] dark:group-hover/student-btn:bg-white/[0.04]"
                  }`}
                >
                  <span className="text-sm font-semibold">{student.initials}</span>

                  {!isActive && student.isLive && !isSidebarExpanded && (
                    <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 border border-background translate-x-0.5 translate-y-0.5"></span>
                  )}
                </div>

                {isSidebarExpanded && (
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className={`truncate text-sm font-medium ${isActive ? "text-primary" : "text-foreground"}`}>
                      {student.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{student.branch}</span>
                      {student.isLive && (
                        <span className="size-1.5 rounded-full bg-emerald-500"></span>
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
      <div className="flex flex-1 flex-col overflow-hidden bg-background">
        
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto @container/main relative isolate bg-background bg-[radial-gradient(circle,rgba(0,0,0,0.25)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] [transform:translateZ(0)] [-webkit-overflow-scrolling:touch] [overscroll-behavior:contain]">
          
          {/* Sticky Backdrop Blur Header */}
          <header className="sticky top-0 z-20 flex min-h-20 shrink-0 items-center justify-between border-b border-border/50 bg-background/70 px-6 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)]">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Squadron 231
              </h1>
              <p className="text-sm font-medium text-muted-foreground">
                3rd Class
              </p>
            </div>
          </header>

          {/* Instructor View Header */}
          <div className="px-6 pt-6">
            <h2 className="text-base font-black uppercase tracking-wide text-foreground">
              Instructor View
            </h2>
          </div>

          {/* Massive Ghost Hero Section */}
          <div className="px-6 py-5 lg:px-8 lg:py-6">
            <div className="flex flex-col">
              
              {/* Top Row: Live Indicator & Title Hierarchy */}
              <div className="flex items-center gap-3 mb-4">
                {activeSubject.isLive && (
                  <span className="relative flex size-3.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-3.5 rounded-full bg-emerald-500"></span>
                  </span>
                )}
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {activeSubject.isLive ? (
                    <>
                      <span className="text-emerald-500">LIVE</span> Student Performance
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
                        activeSubject.score >= 90 ? "stroke-emerald-500" :
                        activeSubject.score >= 75 ? "stroke-amber-500" : 
                        "stroke-rose-500"
                      }`}
                    />
                  </svg>

                  {/* Inner Avatar */}
                  <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-full bg-muted border-2 border-background shadow-inner">
                    <span className="text-3xl font-bold text-muted-foreground">
                      {activeSubject.initials}
                    </span>
                  </div>

                  {/* Opaque Telemetry Score Badge with Tabular Monospace font */}
                  <div className={`absolute -right-1 -top-1 flex h-11 min-w-11 items-center justify-center rounded-full border-[3px] border-background px-1.5 text-lg font-black text-white shadow-md tabular-nums font-mono ${
                        activeSubject.score >= 90 ? "bg-emerald-500" :
                        activeSubject.score >= 75 ? "bg-amber-500" : 
                        "bg-rose-500"
                  }`}>
                    {activeSubject.score}
                  </div>
                </div>

                {/* Typography Stack */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground whitespace-nowrap">
                    {activeSubject.name}
                  </h2>

                  {/* Operational Telemetry Row */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-2 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                      <BranchLogo branch={activeSubject.branch} className="size-4 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">{activeSubject.branch}</span>
                    </div>
                    <span className="text-border">•</span>
                    <span className="text-xs text-muted-foreground font-medium">
                      Last Eval: <span className="font-mono text-foreground font-semibold">{activeSubject.lastEval}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Metric Cards: Positioned Underneath Main User Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                {metricCards.map((card) => {
                  const isFiltered = activeProjectFilter === card.id
                  return (
                    <div
                      key={card.id}
                      className="group/metric-card relative overflow-hidden flex flex-col justify-start p-4 min-h-32 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.035] dark:bg-white/[0.02] backdrop-blur-[2px] [-webkit-backdrop-filter:blur(2px)] transform-gpu hover:-translate-y-1.5 hover:border-black/15 dark:hover:border-white/20 hover:bg-black/[0.05] dark:hover:bg-white/[0.04] shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.95),inset_1px_0_0.5px_0_rgba(255,255,255,0.4),inset_0_-1.5px_1px_0_rgba(0,0,0,0.06),0_20px_35px_-8px_rgba(0,0,0,0.12),0_10px_15px_-4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.25),inset_1px_0_0.5px_0_rgba(255,255,255,0.1),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.4)] dark:hover:shadow-[inset_0_1.5px_0.5px_0_rgba(255,255,255,0.35),inset_1px_0_0.5px_0_rgba(255,255,255,0.15),inset_0_-1.5px_1px_0_rgba(0,0,0,0.35),0_24px_45px_-8px_rgba(0,0,0,0.65),0_12px_20px_-4px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out"
                    >
                      {/* Top: Left-justified Title inline with Right-aligned Filter Button */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {card.title}
                        </span>
                        <button
                          onClick={() => setActiveProjectFilter(isFiltered ? null : card.id)}
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all ${
                            isFiltered
                              ? "bg-primary text-primary-foreground shadow-sm scale-105 border-transparent"
                              : "border-black/[0.08] dark:border-white/10 bg-white/60 dark:bg-white/10 text-muted-foreground hover:bg-white/90 dark:hover:bg-white/20 hover:text-foreground active:scale-95 shadow-xs"
                          }`}
                          title={isFiltered ? `Clear ${card.title} filter` : `Filter ${card.title}`}
                        >
                          <ArrowUpRight className="size-3.5" />
                        </button>
                      </div>

                      {/* Number: Moved up close to title with tabular monospace formatting */}
                      <span className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums font-mono text-foreground leading-none mt-1">
                        {card.count}
                      </span>

                      {/* Trend Badge: Positioned away towards bottom */}
                      <div className="mt-auto pt-2">
                        {card.id === "pending" ? (
                          <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap border border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <MessageSquareText className="size-3" />
                            <span>Pending discussions</span>
                          </div>
                        ) : (
                          <div
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap border ${
                              card.trend === "increased"
                                ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            }`}
                          >
                            {card.trend === "increased" ? (
                              <>
                                <TrendingUp className="size-3" />
                                <span>Increased from last month</span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="size-3" />
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
                  )
                })}
              </div>
              
            </div>
          </div>

          {/* Full Width Thin Divider */}
          <hr className="w-full border-t border-border/50" />

          {/* Metrics Grid Section */}
          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
              
              {/* Card 1: Current Project (Spans 2 columns) */}
              <Card className="flex min-h-48 flex-col p-6 @xl/main:col-span-2 dark:bg-card">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">Current Project</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-0.5">Start Up Sequence Data</p>
                </div>
                <div className="mt-6 flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10 text-xs text-muted-foreground/70">
                  Current project visualizations load here
                </div>
              </Card>
              
              {/* Card 2: Repair Sequence */}
              <Card className="flex min-h-48 flex-col p-6 dark:bg-card">
                <h3 className="text-lg font-bold tracking-tight text-foreground">Repair Sequence</h3>
                <div className="mt-6 flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10 text-xs text-muted-foreground/70">
                  Data loads here
                </div>
              </Card>

              {/* Card 3: Scenario 1 */}
              <Card className="flex min-h-48 flex-col p-6 dark:bg-card">
                <h3 className="text-lg font-bold tracking-tight text-foreground">Scenario 1</h3>
                <div className="mt-6 flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10 text-xs text-muted-foreground/70">
                  Data loads here
                </div>
              </Card>

              {/* Card 4: Scenario 2 */}
              <Card className="flex min-h-48 flex-col p-6 dark:bg-card">
                <h3 className="text-lg font-bold tracking-tight text-foreground">Scenario 2</h3>
                <div className="mt-6 flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10 text-xs text-muted-foreground/70">
                  Data loads here
                </div>
              </Card>

              {/* Card 5: Scenario 3 */}
              <Card className="flex min-h-48 flex-col p-6 dark:bg-card">
                <h3 className="text-lg font-bold tracking-tight text-foreground">Scenario 3</h3>
                <div className="mt-6 flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10 text-xs text-muted-foreground/70">
                  Data loads here
                </div>
              </Card>

            </div>
          </div>

        </div>
      </div>
      
    </div>
  )
}
