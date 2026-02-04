export function Features() {
  return (
    <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 border-x border-border bg-background">
      {/* Checkpoint Logging */}
      <div className="group relative flex flex-col border-b md:border-b-0 md:border-r border-border p-6 sm:p-8 md:p-12 transition-colors hover:bg-surface">
        <div className="mb-8 h-40 w-full flex items-center justify-center bg-surface-highlight/30 border border-border/50 relative overflow-hidden">
          <svg className="w-full h-full p-4" fill="none" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
            <rect fill="#0B0C0E" height="120" width="200" x="0" y="0" />
            <text fill="#4B5563" fontFamily="monospace" fontSize="8" x="10" y="25">1</text>
            <text fill="#4B5563" fontFamily="monospace" fontSize="8" x="10" y="45">2</text>
            <text fill="#4B5563" fontFamily="monospace" fontSize="8" x="10" y="65">3</text>
            <text fill="#4B5563" fontFamily="monospace" fontSize="8" x="10" y="85">4</text>
            <rect fill="#C084FC" height="6" rx="1" width="40" x="25" y="20" />
            <rect fill="#374151" height="6" rx="1" width="60" x="70" y="20" />
            <rect fill="#60A5FA" height="6" rx="1" width="20" x="25" y="40" />
            <rect fill="#374151" height="6" rx="1" width="80" x="50" y="40" />
            <rect fill="#374151" height="6" rx="1" width="100" x="25" y="60" />
            <rect fill="#F472B6" height="6" rx="1" width="30" x="25" y="80" />
            <rect fill="#374151" height="6" rx="1" width="50" x="60" y="80" />
            <rect className="animate-pulse" fill="#FF7A59" height="8" width="2" x="115" y="80" />
            <g transform="translate(40, 92)">
              <path d="M0 0 H100 V16 H0 Z" fill="#1C1E23" stroke="#27282F" />
              <text fill="#F87171" fontFamily="monospace" fontSize="6" x="5" y="10">TypeError: undefined</text>
            </g>
          </svg>
        </div>
        <h3 className="text-sm font-mono font-medium text-white mb-2 uppercase tracking-wide">Checkpoint Logging</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Capture workflow state at key points: enrollment, branches, and actions. See exactly what data was evaluated.
        </p>
      </div>
      
      {/* Branch Tracing */}
      <div className="group relative flex flex-col border-b md:border-b-0 md:border-r border-border p-6 sm:p-8 md:p-12 transition-colors hover:bg-surface">
        <div className="mb-8 h-40 w-full flex items-center justify-center bg-surface-highlight/30 border border-border/50 relative overflow-hidden">
          <svg className="w-full h-full p-4" fill="none" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
            <line stroke="#27282F" strokeWidth="1" x1="100" x2="60" y1="60" y2="30" />
            <line stroke="#27282F" strokeWidth="1" x1="100" x2="140" y1="60" y2="30" />
            <line stroke="#27282F" strokeWidth="1" x1="100" x2="60" y1="60" y2="90" />
            <line stroke="#27282F" strokeWidth="1" x1="100" x2="140" y1="60" y2="90" />
            <line stroke="#27282F" strokeWidth="1" x1="60" x2="30" y1="90" y2="90" />
            <circle cx="100" cy="60" fill="#141518" r="12" stroke="#FF7A59" strokeWidth="1.5" />
            <circle cx="100" cy="60" fill="#FF7A59" r="4" />
            <circle cx="60" cy="30" fill="#1C1E23" r="8" stroke="#374151" />
            <circle cx="140" cy="30" fill="#1C1E23" r="8" stroke="#374151" />
            <circle cx="60" cy="90" fill="#1C1E23" r="8" stroke="#374151" />
            <circle cx="140" cy="90" fill="#1C1E23" r="8" stroke="#374151" />
            <circle cx="30" cy="90" fill="#1C1E23" r="5" stroke="#374151" />
            <circle cx="80" cy="45" fill="#9CA3AF" r="2">
              <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0;1;0" />
            </circle>
          </svg>
        </div>
        <h3 className="text-sm font-mono font-medium text-white mb-2 uppercase tracking-wide">Branch Tracing</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Visualize which path your workflow took and why. Understand branch conditions and their evaluated results.
        </p>
      </div>
      
      {/* AI Explanations */}
      <div className="group relative flex flex-col p-6 sm:p-8 md:p-12 transition-colors hover:bg-surface">
        <div className="mb-8 h-40 w-full flex items-center justify-center bg-surface-highlight/30 border border-border/50 relative overflow-hidden">
          <svg className="w-full h-full p-4" fill="none" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
            <line stroke="#27282F" x1="20" x2="180" y1="100" y2="100" />
            <line stroke="#27282F" strokeDasharray="2 2" x1="20" x2="180" y1="80" y2="80" />
            <line stroke="#27282F" strokeDasharray="2 2" x1="20" x2="180" y1="60" y2="60" />
            <line stroke="#27282F" strokeDasharray="2 2" x1="20" x2="180" y1="40" y2="40" />
            <path d="M20 90 L40 85 L60 88 L80 60 L100 85 L120 82 L140 88 L160 90 L180 92" fill="none" stroke="#FF7A59" strokeWidth="1.5" />
            <path d="M80 60 L100 85 L120 82 L80 60" fill="rgba(255, 122, 89, 0.1)" />
            <line stroke="#F87171" strokeDasharray="4 2" strokeWidth="1" x1="20" x2="180" y1="50" y2="50" />
            <text fill="#F87171" fontFamily="monospace" fontSize="8" x="150" y="45">EXPECTED</text>
            <circle cx="80" cy="60" fill="#0B0C0E" r="3" stroke="#FF7A59" strokeWidth="1" />
            <g transform="translate(85, 50)">
              <rect fill="#1C1E23" height="12" stroke="#27282F" width="40" />
              <text fill="#FFFFFF" fontFamily="monospace" fontSize="6" x="5" y="8">FAILED</text>
            </g>
          </svg>
        </div>
        <h3 className="text-sm font-mono font-medium text-white mb-2 uppercase tracking-wide">AI Explanations</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Get plain-English explanations of why your workflow didn&apos;t do what you expected, with actionable fix suggestions.
        </p>
      </div>
    </div>
  )
}
