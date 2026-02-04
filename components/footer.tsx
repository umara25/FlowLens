import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-border py-6 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-gray-500">
          Built by{" "}
          <Link 
            href="https://umarahmer.com" 
            target="_blank"
            className="text-white font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            Umar Ahmer
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </Link>
        </p>
      </div>
    </footer>
  )
}
