'use client'
import { useRef, useState } from 'react'

type Props = { src: string; label?: string }

export default function AudioGreeting({ src, label = 'Play' }: Props){
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggle = async () => {
    try{
      if(!audioRef.current) return
      if(playing){
        audioRef.current.pause()
        setPlaying(false)
      } else {
        await audioRef.current.play()
        setPlaying(true)
      }
    }catch(e){
      setError('Could not play audio. Tap again or check file path.')
    }
  }

  return (
    <div className="flex items-center gap-3">
      <audio ref={audioRef} src={src} preload="none" />
      <button type="button" className="btn btn-secondary" onClick={toggle}>
        {playing ? 'Pause' : label}
      </button>
      {error && <span className="muted text-sm">{error}</span>}
    </div>
  )
}