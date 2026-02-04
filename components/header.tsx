import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="flex h-12 sm:h-14 items-center justify-center px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto w-full">
        <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <Link 
            href="/features" 
            className="text-[10px] sm:text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest font-mono"
          >
            Features
          </Link>
          <Link 
            href="/docs" 
            className="text-[10px] sm:text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest font-mono"
          >
            Docs
          </Link>
          <Link 
            href="https://github.com/umara25/FlowLens" 
            target="_blank"
            className="text-[10px] sm:text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest font-mono"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </header>
  )
}
