'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Welcome() {
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  const onPlay = async () => {
    try {
      if (!audioRef.current) return
      // When the audio ends, go to /home#top
      audioRef.current.onended = () => router.push('/home#top')
      await audioRef.current.play()
      setPlaying(true)
    } catch {
      // ignored — user gesture usually required, this button provides it
    }
  }

  return (
    <section className="section min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-3xl">
        <p className="uppercase tracking-wide text-brand-300 font-semibold mb-3">ELI RUTH</p>
        <h1 className="h1">Welcome to the Gateway of Innovations</h1>
        <p className="muted mt-4">Tap play to hear the greeting. When it finishes, we’ll take you to the site. Or enter now.</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => router.push('/home#top')} className="btn btn-primary">Enter Site</button>
          <button onClick={onPlay} className="btn btn-secondary">{playing ? 'Playing…' : '▶ Play Welcome'}</button>
        </div>

        {/* MP3 should live at public/eli_ruth_greeting.mp3 */}
        <audio ref={audioRef} src="/eli_ruth_greeting.mp3" preload="auto" />
      </div>
    </section>
  )
}
