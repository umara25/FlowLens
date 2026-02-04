import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Features - FlowLens",
  description: "Explore FlowLens features: checkpoint logging, branch tracing, AI explanations, and more.",
}

const features = [
  {
    title: "Checkpoint Logging",
    description: "Capture workflow state at critical points: enrollment, branch decisions, and action execution. Know exactly what data was evaluated at each step.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    details: [
      "START checkpoint captures workflow entry",
      "BRANCH checkpoint records condition evaluation",
      "ACTION checkpoint logs before key operations",
      "Includes timestamps, property values, and results"
    ]
  },
  {
    title: "Branch Tracing",
    description: "Visualize exactly which path your workflow took and understand why. See condition evaluations with actual vs expected values.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    details: [
      "Records which branch path was taken",
      "Shows condition property, operator, and expected value",
      "Displays actual value at time of evaluation",
      "Identifies exactly where workflows diverge"
    ]
  },
  {
    title: "AI-Powered Explanations",
    description: "Get plain-English explanations of why your workflow didn't do what you expected, complete with evidence and actionable fix suggestions.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    details: [
      "Clear summary of what happened",
      "Most likely cause identification",
      "Supporting evidence from logs",
      "Actionable fix suggestions"
    ]
  },
  {
    title: "Real-Time Monitoring",
    description: "Watch your workflows execute in real-time. Logs are captured as each checkpoint is reached, giving you instant visibility.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    details: [
      "Logs captured instantly via webhook",
      "No polling or delays",
      "Secure HMAC signature validation",
      "Lightweight impact on workflow execution"
    ]
  },
  {
    title: "HubSpot CRM Integration",
    description: "Automatically fetches deal data from HubSpot to provide richer context in explanations. Understands your CRM state.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    details: [
      "Fetches deal properties automatically",
      "Uses HubSpot Private App authentication",
      "Correlates CRM data with checkpoint logs",
      "Works even without CRM access (logs-only mode)"
    ]
  },
  {
    title: "Rule-Based Analysis",
    description: "Fast, deterministic analysis using pattern matching on checkpoint logs. Identifies common workflow issues instantly.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    details: [
      "Detects missing checkpoints",
      "Identifies failed branch conditions",
      "Spots action execution errors",
      "Recognizes incomplete workflow runs"
    ]
  }
]

const useCases = [
  {
    title: "\"Why didn't this deal get a task?\"",
    description: "A sales rep expected a follow-up task to be created when a deal moved to a certain stage, but it never appeared.",
    solution: "FlowLens shows that the branch condition checked for amount > $10,000, but the deal was only $8,500."
  },
  {
    title: "\"The email never sent\"",
    description: "An internal notification email should have been sent when a deal closed, but no one received it.",
    solution: "FlowLens reveals the workflow started but exited early because the deal owner field was empty."
  },
  {
    title: "\"Wrong path taken\"",
    description: "A deal went through the wrong workflow branch and received incorrect automation.",
    solution: "FlowLens traces the exact branch path and shows which condition evaluated differently than expected."
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-12 sm:h-14 items-center justify-between px-3 sm:px-6 max-w-7xl mx-auto">
          <Link href="/" className="text-white font-medium text-xs sm:text-sm hover:text-primary transition-colors">
            ← Back
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link href="/docs" className="text-[10px] sm:text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest font-mono">
              Docs
            </Link>
            <Link href="https://github.com/umara25/FlowLens" target="_blank" className="text-[10px] sm:text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest font-mono">
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-medium text-white mb-4 sm:mb-6">
            Features
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand why your HubSpot workflows aren&apos;t working as expected.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-surface border border-border p-4 sm:p-6 rounded-lg hover:border-primary/50 transition-colors">
                <div className="text-primary mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{feature.description}</p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="text-[10px] sm:text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <h2 className="text-xl sm:text-2xl font-medium text-white mb-3 sm:mb-4 text-center">Common Use Cases</h2>
          <p className="text-xs sm:text-sm text-muted-foreground text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
            Real scenarios where FlowLens helps you quickly identify and fix workflow issues.
          </p>
          <div className="space-y-4 sm:space-y-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-surface border border-border p-4 sm:p-6 rounded-lg">
                <h3 className="text-base sm:text-lg font-medium text-white mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{useCase.description}</p>
                <div className="bg-black/50 border border-border/50 p-3 sm:p-4 rounded">
                  <p className="text-xs sm:text-sm">
                    <span className="text-primary font-medium">FlowLens insight: </span>
                    <span className="text-gray-300">{useCase.solution}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <h2 className="text-xl sm:text-2xl font-medium text-white mb-3 sm:mb-4 text-center">How It Works</h2>
          <p className="text-xs sm:text-sm text-muted-foreground text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
            FlowLens integrates seamlessly with your existing HubSpot workflows.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-base sm:text-lg font-bold">
                1
              </div>
              <h3 className="text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Instrument</h3>
              <p className="text-muted-foreground text-[10px] sm:text-sm">Add custom code actions at checkpoints</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-base sm:text-lg font-bold">
                2
              </div>
              <h3 className="text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Execute</h3>
              <p className="text-muted-foreground text-[10px] sm:text-sm">Run your workflow - logs are captured</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-base sm:text-lg font-bold">
                3
              </div>
              <h3 className="text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Query</h3>
              <p className="text-muted-foreground text-[10px] sm:text-sm">When something goes wrong, call the API</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-base sm:text-lg font-bold">
                4
              </div>
              <h3 className="text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Understand</h3>
              <p className="text-muted-foreground text-[10px] sm:text-sm">Get explanations with fix suggestions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-medium text-white mb-3 sm:mb-4">Ready to debug smarter?</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
            Check out the documentation to get started, or view the source on GitHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/docs"
              className="inline-flex items-center justify-center h-9 sm:h-10 px-5 sm:px-6 bg-primary hover:bg-primary/90 text-white font-medium text-sm rounded transition-colors"
            >
              Read Documentation
            </Link>
            <Link 
              href="https://github.com/umara25/FlowLens"
              target="_blank"
              className="inline-flex items-center justify-center h-9 sm:h-10 px-5 sm:px-6 bg-transparent hover:bg-white/5 text-white font-medium text-sm border border-border rounded transition-colors"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
