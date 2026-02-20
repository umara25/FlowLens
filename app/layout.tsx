import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'FlowLens',
  description: 'Workflow debugging for HubSpot. Understand why workflows fail with real-time insights and actionable fixes.',
  openGraph: {
    title: 'FlowLens',
    description: 'Workflow debugging for HubSpot. Understand why workflows fail with real-time insights and actionable fixes.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FlowLens - Debug your HubSpot workflows',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowLens',
    description: 'Workflow debugging for HubSpot. Understand why workflows fail with real-time insights and actionable fixes.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
