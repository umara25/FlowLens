import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-background py-12 px-6 md:px-8 max-w-[1400px] mx-auto border-t border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="size-4 bg-primary flex items-center justify-center rounded-[1px]" />
            <span className="text-white font-medium text-sm">NexusDev</span>
          </div>
          <p className="text-xs text-gray-500">
            © 2024 NexusDev Inc.<br />
            San Francisco, CA
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-mono text-white uppercase tracking-wider">Product</h4>
          <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Features</Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Pricing</Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Changelog</Link>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-mono text-white uppercase tracking-wider">Resources</h4>
          <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Documentation</Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">API Reference</Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Community</Link>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-mono text-white uppercase tracking-wider">Legal</h4>
          <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
