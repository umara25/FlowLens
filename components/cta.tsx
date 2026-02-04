import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <div className="w-full border-b border-border bg-background py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4 sm:mb-6">Ready to debug smarter?</h2>
        <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">Clone the repo and start understanding your workflows in minutes.</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
          <Button asChild className="h-9 sm:h-10 px-5 sm:px-6 bg-primary hover:bg-primary/90 text-white font-medium text-sm border border-primary">
            <Link href="https://github.com/umara25/FlowLens" target="_blank">
              View on GitHub
            </Link>
          </Button>
          <Button 
            asChild
            variant="outline"
            className="h-9 sm:h-10 px-5 sm:px-6 bg-transparent hover:bg-white/5 text-white font-medium text-sm border-border"
          >
            <Link href="/docs">
              Read Documentation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
