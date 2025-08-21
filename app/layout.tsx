import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'ELI RUTH — Empowering Innovation Through Intelligent AI',
  description: 'Intelligent AI solutions for B2B & B2C: data systems, automation, and consumer apps.',
  metadataBase: new URL('https://www.eli-ruth.com'),
  openGraph: {
    title: 'ELI RUTH — Intelligent AI Solutions',
    description: 'Advanced robotics, AI-driven data platforms, and consumer apps.',
    url: 'https://www.eli-ruth.com',
    siteName: 'ELI RUTH',
    images: [
      { url: '/og.png', width: 1200, height: 630, alt: 'ELI RUTH' }
    ],
    locale: 'en_US',
    type: 'website'
  },
  robots: { index: true, follow: true }
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-20">
          <Suspense fallback={<div className="section">Loading…</div>}>{children}</Suspense>
        </main>
        <Footer />
      </body>
    </html>
  )
}