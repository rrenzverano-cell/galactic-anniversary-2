import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'

export const GalaxyEntry: React.FC = () => {
  const navigate = useNavigate()
  const { state, setHasStarted } = useGame()
  const [phase, setPhase] = useState<'loading' | 'ready' | 'entering'>('loading')

  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 600)
    return () => clearTimeout(t)
  }, [])

  const handleBegin = () => {
    setPhase('entering')
    setHasStarted()
    setTimeout(() => {
      const done = state.completedChapters
      if (done.length > 0) {
        const maxDone = Math.max(...done)
        const next = Math.min(maxDone + 1, 23)
        if (next === 23 && done.includes(22)) navigate('/final')
        else navigate(`/chapter/${next}`)
      } else {
        navigate('/chapter/1')
      }
    }, 1000)
  }

  const isReturning = state.completedChapters.length > 0
  const pct = Math.round((state.completedChapters.length / 23) * 100)

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#020214' }}>
      {/* Background */}
      <div className="fixed inset-0" style={{
        zIndex: 1,
        backgroundImage: "url('/assets/backgrounds/galaxy-01.webp')",
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      <div className="fixed inset-0" style={{
        zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(2,2,20,0.38) 0%, rgba(2,2,20,0.6) 50%, rgba(2,2,20,0.88) 100%)',
      }} />

      {/* Content */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-center px-6"
        style={{
          zIndex: 10,
          opacity: phase === 'loading' ? 0 : phase === 'entering' ? 0 : 1,
          transform: phase === 'entering' ? 'scale(1.04)' : 'scale(1)',
          transition: 'opacity 1s ease, transform 1.2s ease',
        }}
      >
        <div className="text-center max-w-lg w-full">
          {/* Eyebrow */}
          <div className="font-ui text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: '#818cf8', opacity: 0.75 }}>
            A private universe · {isReturning ? `${pct}% explored` : '23 chapters'}
          </div>

          {/* Star icon */}
          <div className="text-5xl mb-6" style={{
            filter: 'drop-shadow(0 0 20px rgba(196,181,253,0.7)) drop-shadow(0 0 50px rgba(129,140,248,0.3))',
            animation: 'float 5s ease-in-out infinite',
          }}>✦</div>

          {/* Title */}
          <h1 className="font-display mb-3 leading-[1.1]" style={{
            fontSize: 'clamp(2.8rem, 10vw, 4.5rem)',
            color: '#f0f4ff',
            textShadow: '0 0 60px rgba(196,181,253,0.25)',
          }}>
            Our Universe
          </h1>

          <div className="font-display text-xl mb-2" style={{ color: '#94a3b8', fontStyle: 'italic' }}>
            23 chapters · one love story
          </div>

          <div className="font-ui text-xs tracking-[0.3em] uppercase mb-12"
            style={{ color: '#818cf8', opacity: 0.55 }}>
            23 · 08 · 2026
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8 justify-center opacity-35">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-400" />
            <span style={{ color: '#818cf8', fontSize: '8px' }}>✦ ✦ ✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-400" />
          </div>

          {/* Tagline */}
          <p className="font-display text-lg mb-10 leading-relaxed px-4"
            style={{ color: '#94a3b8', fontStyle: 'italic' }}>
            {isReturning
              ? 'Welcome back. The stars have been waiting.'
              : 'Two people. Two places. One universe.\nTravel through 23 chapters to reach the final star.'}
          </p>

          {/* CTA */}
          <button onClick={handleBegin}
            className="cosmic-btn cosmic-btn-primary text-base"
            style={{ maxWidth: '280px', margin: '0 auto', display: 'block',
              letterSpacing: '0.1em', padding: '16px 32px' }}>
            {isReturning ? 'Continue the journey →' : 'Begin the journey →'}
          </button>

          {isReturning && (
            <p className="font-ui text-xs mt-4" style={{ color: '#475569' }}>
              {state.completedChapters.length} / 23 chapters completed
            </p>
          )}

          {/* Progress constellation dots */}
          <div className="flex justify-center gap-[5px] flex-wrap mt-10"
            style={{ maxWidth: '220px', margin: '2.5rem auto 0' }}>
            {Array.from({ length: 23 }, (_, i) => {
              const done = state.completedChapters.includes(i + 1)
              return (
                <div key={i} style={{
                  width: done ? 7 : 5, height: done ? 7 : 5,
                  borderRadius: '50%',
                  background: done ? '#c4b5fd' : 'rgba(129,140,248,0.15)',
                  boxShadow: done ? '0 0 6px rgba(196,181,253,0.5)' : 'none',
                  transition: 'all 0.3s ease',
                }} />
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      <div className="fixed bottom-6 left-0 right-0 text-center font-ui text-xs tracking-widest"
        style={{ zIndex: 10, color: '#334155',
          opacity: phase === 'ready' ? 1 : 0,
          transition: 'opacity 1s ease 1.5s' }}>
        Solve puzzles · Unlock chapters · Reach the final star
      </div>
    </div>
  )
}
