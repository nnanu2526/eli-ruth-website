'use client'

import PlayGate from '@/components/PlayGate'
// ⬆️ add this import
// keep all your other imports below
import Hero from '@/components/Hero'
// ...whatever else you already had

export default function HomePage() {
  return (
    <>
      <PlayGate src="/message.mp3" label="Play Message" />
      {/* ⬆️ add this line just once at the very top of the JSX */}

      {/* keep all your original homepage JSX here unchanged */}
      <Hero />
      {/* ...the rest of your homepage sections */}
    </>
  )
}
