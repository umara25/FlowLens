export function Monitoring() {
  const logEntries = [
    { time: "10:42:01", level: "START", levelClass: "text-primary", message: "Workflow 'Deal Stage Change' triggered" },
    { time: "10:42:02", level: "INFO", levelClass: "text-primary", message: "Checking enrollment: dealstage = 'contractsent'" },
    { time: "10:42:02", level: "BRANCH", levelClass: "text-yellow-500", message: "Condition failed: amount > 10000 (actual: 8500)" },
    { time: "10:42:03", level: "INFO", levelClass: "text-primary", message: "Skipping 'Send notification' action" },
    { time: "10:42:05", level: "WARN", levelClass: "text-yellow-500", message: "Deal owner not assigned - fallback to default" },
    { time: "10:42:05", level: "ACTION", levelClass: "text-primary", message: "Creating task for sales team..." },
    { time: "10:42:08", level: "SUCCESS", levelClass: "text-green-500", message: "Task created: Review deal #4521" },
    { time: "10:42:12", level: "INFO", levelClass: "text-primary", message: "Workflow execution complete" },
    { time: "10:42:15", level: "DEBUG", levelClass: "text-gray-400", message: "Checkpoint logs saved to FlowLens" },
    { time: "10:42:18", level: "INFO", levelClass: "text-primary", message: "Ready for next trigger..." },
  ]

  return (
    <div className="w-full border-b border-border bg-surface">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left content */}
        <div className="p-8 md:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border">
          <div className="font-mono text-xs text-primary mb-4">● LIVE WORKFLOW MONITORING</div>
          <h2 className="text-3xl font-medium text-white mb-6">See Every Workflow Step</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Watch your HubSpot workflows execute in real-time. Capture checkpoints at enrollment, branches, and actions to understand exactly what happened.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border p-4 bg-background">
              <div className="text-xs text-gray-500 font-mono mb-1">WORKFLOWS TRACKED</div>
              <div className="text-2xl text-white font-mono">1,247</div>
            </div>
            <div className="border border-border p-4 bg-background">
              <div className="text-xs text-gray-500 font-mono mb-1">ISSUES FOUND</div>
              <div className="text-2xl text-white font-mono">23</div>
            </div>
          </div>
        </div>
        
        {/* Right terminal */}
        <div className="bg-background p-8 md:p-12 relative overflow-hidden flex flex-col font-mono text-xs">
          <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
            <div className="size-2 rounded-full bg-red-500/50" />
            <div className="size-2 rounded-full bg-yellow-500/50" />
            <div className="size-2 rounded-full bg-green-500/50" />
            <span className="ml-auto text-gray-600">workflow.log</span>
          </div>
          <div className="space-y-2 text-gray-500 opacity-80 overflow-hidden h-[300px]">
            {logEntries.map((entry, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-gray-700">{entry.time}</span>
                <span className={entry.levelClass}>{entry.level}</span>
                <span>{entry.message}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </div>
  )
}
