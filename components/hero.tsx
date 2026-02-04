"use client"

import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const handleCopy = () => {
    navigator.clipboard.writeText("git clone https://github.com/umara25/FlowLens.git")
  }

  return (
    <div className="relative w-full border-b border-border">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative z-10 px-6 py-20 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6 text-balance">
          Debug your <span className="text-primary">HubSpot workflows.</span>
        </h1>
        
        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          AI-powered workflow debugging for HubSpot.{" "}
          <br className="hidden md:block" />
          Understand why workflows fail with <span className="text-primary">real-time insights</span> and actionable fixes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-16">
          <div className="flex items-center border border-border bg-black pl-3 pr-1 h-10 w-full max-w-md group transition-colors hover:border-primary/50">
            <span className="text-primary mr-2 font-mono">$</span>
            <input
              className="bg-transparent border-none text-gray-300 text-sm font-mono w-full focus:ring-0 focus:outline-none p-0 placeholder-gray-700"
              readOnly
              value="git clone https://github.com/umara25/FlowLens.git"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="ml-2 p-1.5 hover:bg-white/10 text-gray-500 hover:text-white transition-colors h-8 w-8"
            >
              <Copy className="size-4" />
              <span className="sr-only">Copy command</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
