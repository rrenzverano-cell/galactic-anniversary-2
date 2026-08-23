import React, { useEffect, useState } from 'react'
import { useGame } from '../context/GameContext'

const SPOTIFY_URL =
  'https://open.spotify.com/track/1exRP2xlPCHDlHW3chFTjt'

export const AudioController: React.FC = () => {
  const { state } = useGame()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!state.hasStarted) return

    const timer = window.setTimeout(() => {
      setShown(true)
    }, 1200)

    return () => {
      window.clearTimeout(timer)
    }
  }, [state.hasStarted])

  if (!shown) return null

  const openSpotify = () => {
    window.open(
      SPOTIFY_URL,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <button
      type="button"
      onClick={openSpotify}
      title="Open Your Universe on Spotify"
      aria-label="Open Your Universe by Rico Blanco on Spotify"
      className="fixed top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full
        text-xs font-ui tracking-widest uppercase transition-all duration-300
        border border-white/10 hover:border-white/25 bg-black/30 backdrop-blur-sm"
      style={{ zIndex: 50, color: '#c4b5fd' }}
    >
      <span style={{ fontSize: '13px' }}>♪</span>

      <span className="hidden sm:inline">
        Your Universe · Spotify
      </span>
    </button>
  )
}
