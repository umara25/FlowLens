import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <div className="w-full border-b border-border bg-background py-24 px-6">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-3xl font-medium text-white mb-6">Ready to debug smarter?</h2>
        <p className="text-gray-500 mb-8">Install the HubSpot sidebar app and start understanding your workflows in minutes.</p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button className="h-10 px-6 bg-primary hover:bg-primary/90 text-white font-medium text-sm border border-primary">
            Install FlowLens
          </Button>
          <Button 
            variant="outline"
            className="h-10 px-6 bg-transparent hover:bg-white/5 text-white font-medium text-sm border-border"
          >
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  )
}
