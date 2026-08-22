import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'

export const LockedChapter: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useGame()

  const handleReturn = () => {
    const ch = state.currentChapter
    if (ch === 23 && state.completedChapters.includes(22)) {
      navigate('/final')
    } else {
      navigate(`/chapter/${ch}`)
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-6"
      style={{ zIndex: 10 }}
    >
      <div className="text-center animate-cosmic-reveal max-w-sm">
        <div
          className="text-5xl mb-8"
          style={{ filter: 'drop-shadow(0 0 12px rgba(129,140,248,0.4))' }}
        >
          🔒
        </div>
        <div
          className="font-ui text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: '#818cf8' }}
        >
          Destination Locked
        </div>
        <h2 className="font-display text-2xl mb-4" style={{ color: '#f0f4ff' }}>
          Some stories are meant to be discovered one star at a time.
        </h2>
        <p className="font-ui text-sm leading-relaxed mb-10" style={{ color: '#94a3b8' }}>
          You haven't reached this chapter yet.<br />
          Continue your journey in order.
        </p>
        <button onClick={handleReturn} className="cosmic-btn">
          Return to your chapter
        </button>
      </div>
    </div>
  )
}
