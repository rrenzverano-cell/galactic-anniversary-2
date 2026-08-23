import React, { useEffect, useRef, useState } from 'react'
import { useGame } from '../context/GameContext'

export const AudioController: React.FC = () => {
  const { state, setMusicEnabled } = useGame()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [canPlay, setCanPlay] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const audio = new Audio('/assets/audio/iris.mp3')
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio
    audio.addEventListener('canplaythrough', () => setCanPlay(true))
    audio.addEventListener('error', () => setCanPlay(false))
    return () => { audio.pause(); audio.src = '' }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (state.musicEnabled && canPlay) {
      const p = audio.play()
      if (p) p.catch(() => {})
    } else {
      audio.pause()
    }
  }, [state.musicEnabled, canPlay])

  useEffect(() => {
    if (state.hasStarted) {
      const t = setTimeout(() => setShown(true), 1200)
      return () => clearTimeout(t)
    }
  }, [state.hasStarted])

  if (!shown) return null

  const toggle = () => setMusicEnabled(!state.musicEnabled)

  return (
    <button
      onClick={toggle}
      title={state.musicEnabled ? 'Mute music' : 'Play music'}
      className="fixed top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full
        text-xs font-ui tracking-widest uppercase transition-all duration-300
        border border-white/10 hover:border-white/25 bg-black/30 backdrop-blur-sm"
      style={{ zIndex: 50, color: state.musicEnabled ? '#c4b5fd' : '#94a3b8' }}
    >
      <span style={{ fontSize: '13px' }}>♪</span>
      <span className="hidden sm:inline">
        {state.musicEnabled ? 'music on' : 'music off'}
      </span>
    </button>
  )
}
