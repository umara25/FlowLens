import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Monitoring } from "@/components/monitoring"
import { CTA } from "@/components/cta"

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col selection:bg-primary/30 selection:text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full">
        <Hero />
        <Features />
        <Monitoring />
        <CTA />
      </main>
    </div>
  )
}
