'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'

export default function InlineGreeting() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const play = async () => {
    try {
      setError(null)
      if (!audioRef.current) return
      await audioRef.current.play()
      setPlaying(true)
      audioRef.current.onended = () => setPlaying(false)
    } catch (e) {
      setError('Playback blocked. Tap again.')
      setPlaying(false)
    }
  }

  return (
    <div className="mt-6">
      <p className="text-white/80 mb-4">Please listen before entering</p>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600"
        >
          Enter Site
        </Link>

        <div>
          <audio ref={audioRef} src="/eli_ruth_greeting.mp3" preload="auto" />
          <button
            type="button"
            onClick={play}
            disabled={playing}
            className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20"
          >
            {playing ? 'Playing…' : 'Play Message'}
          </button>
          {error && <p className="text-sm text-red-300 mt-1">{error}</p>}
        </div>
      </div>
    </div>
  )
}
