"use client"

import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RollingText } from "@/components/ui/rolling-text"

export function Hero() {
  const handleCopy = () => {
    navigator.clipboard.writeText("git clone https://github.com/umara25/FlowLens.git")
  }

  return (
    <div className="relative w-full border-b border-border">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6 text-balance">
          <RollingText 
            text="Debug your HubSpot workflows."
            className="font-medium"
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            inView={true}
            highlightWords={["HubSpot", "workflows."]}
            highlightClassName="text-primary"
            repeatInterval={10000}
          />
        </h1>
        
        <p className="max-w-2xl mx-auto mb-10 text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed font-light">
          AI-powered workflow debugging for HubSpot. Understand why workflows fail with real-time insights and actionable fixes.
        </p>
        
        <div className="flex w-full justify-center mb-12 sm:mb-16 px-2">
          <div className="flex items-center border border-border bg-black pl-2 sm:pl-3 pr-1 h-9 sm:h-10 w-full max-w-[420px] sm:max-w-lg group transition-colors hover:border-primary/50">
            <span className="text-primary mr-1 sm:mr-2 font-mono text-sm">$</span>
            <input
              className="bg-transparent border-none text-gray-300 text-xs sm:text-sm font-mono w-full focus:ring-0 focus:outline-none p-0 placeholder-gray-700"
              readOnly
              value="git clone https://github.com/umara25/FlowLens.git"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="ml-1 sm:ml-2 p-1 sm:p-1.5 hover:bg-white/10 text-gray-500 hover:text-white transition-colors h-7 w-7 sm:h-8 sm:w-8 shrink-0"
            >
              <Copy className="size-3.5 sm:size-4" />
              <span className="sr-only">Copy command</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
