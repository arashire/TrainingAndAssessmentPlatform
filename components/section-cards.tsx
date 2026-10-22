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
                className={`flex w-full items-center gap-3 rounded-full transition-all ${
                  isSidebarExpanded ? "px-2 py-1.5 hover:bg-muted" : "justify-center"
                }`}
              >
                <div 
                  className={`relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border shadow-xs transition-all ${
                    isActive 
                      ? "border-primary bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background" 
                      : "border-border bg-muted text-muted-foreground hover:ring-2 hover:ring-primary/50 hover:ring-offset-2"
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
        <div className="flex-1 overflow-y-auto @container/main relative isolate [-webkit-overflow-scrolling:touch] [overscroll-behavior:contain]">
          
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

          {/* Instructor View Badge */}
          <div className="px-8 pt-8 lg:px-12">
            <div className="inline-flex items-center rounded-md border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground shadow-sm">
              Instructor View
            </div>
          </div>

          {/* Massive Ghost Hero Section */}
          <div className="px-8 py-8 lg:px-12 lg:py-10">
            <div className="flex flex-col">
              
              {/* Top Row: Live Indicator & Title Hierarchy */}
              <div className="flex items-center gap-3 mb-8">
                {activeSubject.isLive && (
                  <span className="relative flex size-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-4 rounded-full bg-emerald-500"></span>
                  </span>
                )}
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
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
              <div className="flex items-center gap-10">
                
                {/* 2x Halo Avatar Container */}
                <div className="relative flex size-48 shrink-0 items-center justify-center">
                  
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

                  {/* 2x Inner Avatar */}
                  <div className="relative flex size-32 items-center justify-center overflow-hidden rounded-full bg-muted border-2 border-background shadow-inner">
                    <span className="text-5xl font-semibold text-muted-foreground">
                      {activeSubject.initials}
                    </span>
                  </div>

                  {/* 2x Opaque Score Badge */}
                  <div className={`absolute right-1 top-1 flex h-14 min-w-14 items-center justify-center rounded-full border-[4px] border-background px-2 text-2xl font-black text-white shadow-lg ${
                        activeSubject.score >= 90 ? "bg-emerald-500" :
                        activeSubject.score >= 75 ? "bg-amber-500" : 
                        "bg-rose-500"
                  }`}>
                    {activeSubject.score}
                  </div>
                </div>

                {/* 2x Typography Stack */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-5xl font-bold tracking-tight text-foreground whitespace-nowrap pr-4">
                    {activeSubject.name}
                  </h2>
                  <div className="flex items-center gap-2.5 mt-2">
                    <BranchLogo branch={activeSubject.branch} className="size-6 text-muted-foreground shrink-0" />
                    <p className="text-xl font-medium uppercase tracking-widest text-muted-foreground">
                      {activeSubject.branch}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Metric Cards: Positioned Underneath Main User Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-10">
                {metricCards.map((card) => {
                  const isFiltered = activeProjectFilter === card.id
                  return (
                    <Card
                      key={card.id}
                      className="flex flex-col justify-start p-4 min-h-32 rounded-xl border border-border/50 bg-card/60 backdrop-blur-xs shadow-xs transition-all hover:border-border"
                    >
                      {/* Top: Left-justified Title inline with Right-aligned Filter Button */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {card.title}
                        </span>
                        <button
                          onClick={() => setActiveProjectFilter(isFiltered ? null : card.id)}
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-border/50 transition-all ${
                            isFiltered
                              ? "bg-primary text-primary-foreground shadow-sm scale-105"
                              : "bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
                          }`}
                          title={isFiltered ? `Clear ${card.title} filter` : `Filter ${card.title}`}
                        >
                          <ArrowUpRight className="size-3.5" />
                        </button>
                      </div>

                      {/* Number: Moved up close to title */}
                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-none mt-1">
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
                    </Card>
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
