"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card } from "@/components/ui/card"
import { SearchIcon, MoonIcon, SunIcon } from "lucide-react"

// Mock data for the students
const MOCK_STUDENTS = [
  { id: 1, initials: "JD", name: "Jane Doe", branch: "U.S. Navy", isLive: true, score: 94 },
  { id: 2, initials: "MR", name: "Mark Reeds", branch: "U.S. Army", isLive: false, score: 78 },
  { id: 3, initials: "AS", name: "Alex Smith", branch: "U.S. Air Force", isLive: true, score: 88 },
  { id: 4, initials: "TC", name: "Tom Cruise", branch: "U.S. Navy", isLive: true, score: 99 },
  { id: 5, initials: "SJ", name: "Sarah Jones", branch: "Space Force", isLive: false, score: 62 },
  { id: 6, initials: "RJ", name: "Rick James", branch: "U.S. Marines", isLive: true, score: 85 },
  { id: 7, initials: "EP", name: "Ellen Page", branch: "U.S. Navy", isLive: false, score: 91 },
];

export function SectionCards() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeStudentId, setActiveStudentId] = useState(1)
  
  // Use next-themes for global theme control
  const { theme, setTheme } = useTheme()

  // Filter students based on search query
  const filteredStudents = MOCK_STUDENTS.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Get the currently selected subject's data
  const activeSubject = MOCK_STUDENTS.find(s => s.id === activeStudentId) || MOCK_STUDENTS[0]

  const handleStudentSelect = (id: number) => {
    setActiveStudentId(id)
    if (isSidebarExpanded) {
      setIsSidebarExpanded(false)
      setSearchQuery("")
    }
  }

  return (
    // Root container
    <div className="flex w-full h-[85vh] min-h-[600px] overflow-hidden rounded-xl border border-border/50 bg-background text-foreground shadow-sm font-sans">
      
      {/* Left Sidebar: Expanding Column */}
      <div 
        className={`flex flex-col border-r border-border/50 bg-muted/20 transition-all duration-300 ease-in-out shrink-0 ${
          isSidebarExpanded ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Header / Search Toggle */}
        <div className="flex h-16 shrink-0 items-center border-b border-border/50 px-3">
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
        
        {/* Sticky Backdrop Blur Header with Theme Toggle */}
        <header className="sticky top-0 z-10 flex min-h-20 shrink-0 items-center justify-between border-b border-border/50 bg-background/70 px-6 backdrop-blur-xl transition-colors duration-300">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Task — Start Up Sequence
          </h1>
          
          {/* Light/Dark Mode Toggle */}
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground shadow-sm transition-all hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            title="Toggle Theme"
          >
            {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
          </button>
        </header>

        {/* Scrollable Metrics Grid */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            
            {/* Combined Hero Card: Subject Profile + Overall Score */}
            <Card className="relative overflow-visible @container/profile dark:bg-card w-fit min-w-[340px] @xl/main:col-span-2">
              <div className="flex flex-col p-6">
                
                {/* Top Row: Live Indicator & Title Hierarchy */}
                <div className="flex items-center gap-2 mb-6">
                  {activeSubject.isLive && (
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500"></span>
                    </span>
                  )}
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Student Performance
                  </span>
                </div>
                
                {/* Bottom Row: Halo Avatar & Text Stack */}
                <div className="flex items-center gap-6">
                  
                  {/* Halo Avatar Container */}
                  <div className="relative flex size-24 shrink-0 items-center justify-center">
                    
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
                    <div className="relative flex size-16 items-center justify-center overflow-hidden rounded-full bg-muted border border-background shadow-inner">
                      <span className="text-xl font-semibold text-muted-foreground">
                        {activeSubject.initials}
                      </span>
                    </div>

                    {/* Large Opaque Score Badge (Top Right) */}
                    <div className={`absolute -right-1 -top-1 flex h-8 min-w-8 items-center justify-center rounded-full border-[3px] border-background px-1.5 text-sm font-black text-white shadow-md ${
                          activeSubject.score >= 90 ? "bg-emerald-500" :
                          activeSubject.score >= 75 ? "bg-amber-500" : 
                          "bg-rose-500"
                    }`}>
                      {activeSubject.score}
                    </div>
                  </div>

                  {/* Typography Stack */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground whitespace-nowrap pr-4">
                      {activeSubject.name}
                    </h2>
                    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mt-0.5">
                      {activeSubject.branch}
                    </p>
                  </div>
                </div>
                
              </div>
            </Card>

            {/* Placeholder for the next metrics */}
            <div className="min-h-32 rounded-xl border border-dashed border-border/60 bg-muted/10 flex items-center justify-center text-muted-foreground text-sm">
              Next Metric Card
            </div>

          </div>
        </div>
      </div>
      
    </div>
  )
}
