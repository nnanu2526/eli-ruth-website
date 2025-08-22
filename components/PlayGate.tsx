'use client'
import { useEffect, useRef, useState } from 'react'

type PlayGateProps = {
  /** Path to your audio file in /public, e.g. "/message.mp3" */
  src: string
  /** Button label */
  label?: string
  /** Optional: called once when audio finishes successfully */
  onUnlock?: () => void
}

export default function PlayGate({ src, label = 'Play Message', onUnlock }: PlayGateProps) {
  // Gate is shown until audio fully ends
  const [locked, setLocked] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Prepare audio, but do NOT autoplay (mobile policies)
    const a = new Audio(src)
    a.preload = 'auto'
    audioRef.current = a

    const onEnded = () => {
      setPlaying(false)
      setLocked(false)     // ✅ unlock only after completion
      onUnlock?.()
    }
    const onError = () => {
      setPlaying(false)
      setErr('Could not play audio. Please try again.')
      // Do NOT unlock on error; user can retry
    }

    a.addEventListener('ended', onEnded)
    a.addEventListener('error', onError)
    return () => {
      a.pause()
      a.removeEventListener('ended', onEnded)
      a.removeEventListener('error', onError)
    }
  }, [src, onUnlock])

  const handlePlay = async () => {
    setErr(null)
    try {
      setPlaying(true)
      await audioRef.current?.play()
    } catch (e) {
      setPlaying(false)
      setErr('Playback blocked by the browser. Tap again.')
    }
  }

  if (!locked) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog" aria-modal="true"
    >
      <div className="text-center px-6 py-8 rounded-2xl bg-black/50 border border-white/10 max-w-sm">
        <p className="text-white/90 mb-4">Please listen before entering</p>
        <button
          type="button"
          onClick={handlePlay}
          disabled={playing}
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold"
        >
          {playing ? 'Playing…' : label}
        </button>
        {err && <p className="mt-3 text-red-300 text-sm">{err}</p>}
      </div>
    </div>
  )
}
