"use client"

import {
  Card,
} from "@/components/ui/card"

export function SectionCards() {
  // We'll hardcode the visual data here for now so you can focus on the layout.
  // The engineering team will replace this with real props later.
  const subject = {
    name: "Jane Doe",
    branch: "U.S. Navy",
    initials: "JD",
    isLive: true
  };

  return (
    // We are keeping your original grid wrapper so the main layout doesn't break
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      
      {/* Subject Profile Card */}
      <Card className="relative overflow-hidden @container/profile dark:bg-card">
        {/* Using a standard div instead of CardContent to prevent import errors */}
        <div className="flex items-center gap-5 p-6">
          
          {/* Avatar Container */}
          <div className="relative shrink-0">
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-muted border border-border shadow-xs">
              <span className="text-xl font-semibold text-muted-foreground">
                {subject.initials}
              </span>
            </div>
            
            {/* Live Ping Indicator */}
            {subject.isLive && (
               <span className="absolute bottom-0 right-0 flex size-4 translate-x-1/4 translate-y-1/4">
                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex size-4 rounded-full bg-emerald-500 border-2 border-background"></span>
               </span>
            )}
          </div>

          {/* Typography */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground line-clamp-1">
              {subject.name}
            </h2>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mt-0.5">
              {subject.branch}
            </p>
          </div>
          
        </div>
      </Card>

      {/* Future real-time metric cards will go here */}

    </div>
  )
}
