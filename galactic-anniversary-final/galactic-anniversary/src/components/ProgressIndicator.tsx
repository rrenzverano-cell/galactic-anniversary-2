import React from 'react'
import { useGame } from '../context/GameContext'

interface Props {
  currentId: number
}

export const ProgressIndicator: React.FC<Props> = ({ currentId }) => {
  const { isChapterCompleted } = useGame()

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-5 pt-4 pb-2 pointer-events-none"
      style={{ zIndex: 40 }}
    >
      {/* Chapter counter */}
      <div className="font-ui text-xs tracking-widest" style={{ color: '#c4b5fd', opacity: 0.8 }}>
        <span style={{ fontSize: '11px' }}>✦</span>
        {' '}
        <span style={{ fontWeight: 500 }}>{String(currentId).padStart(2, '0')}</span>
        <span style={{ opacity: 0.4, margin: '0 4px' }}>·</span>
        <span style={{ opacity: 0.5 }}>23</span>
      </div>

      {/* Progress stars */}
      <div
        className="flex items-center gap-[4px] flex-wrap justify-center"
        style={{ maxWidth: '180px' }}
      >
        {Array.from({ length: 22 }, (_, i) => {
          const id = i + 1
          const done = isChapterCompleted(id)
          const current = id === currentId
          return (
            <div
              key={id}
              className="progress-star"
              style={{
                background: current ? 'white' : done ? '#c4b5fd' : 'rgba(129,140,248,0.2)',
                boxShadow: current
                  ? '0 0 8px rgba(255,255,255,0.9)'
                  : done ? '0 0 5px rgba(196,181,253,0.5)' : 'none',
                transform: current ? 'scale(1.5)' : 'scale(1)',
                transition: 'all 0.4s ease',
              }}
            />
          )
        })}
      </div>

      {/* Spacer */}
      <div style={{ width: '60px' }} />
    </div>
  )
}
