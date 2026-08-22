import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'

type Phase =
  | 'stars-appear'
  | 'stars-converge'
  | 'glow'
  | 'collapse'
  | 'date'
  | 'reveal'
  | 'done'

const STAR_POSITIONS_OUTER = [
  { x: 15, y: 20 }, { x: 85, y: 15 }, { x: 50, y: 10 },
  { x: 10, y: 50 }, { x: 90, y: 45 }, { x: 20, y: 80 },
  { x: 80, y: 75 }, { x: 50, y: 85 }, { x: 35, y: 5 },
  { x: 65, y: 8 }, { x: 5, y: 30 }, { x: 92, y: 65 },
  { x: 30, y: 90 }, { x: 70, y: 88 }, { x: 8, y: 65 },
  { x: 95, y: 25 }, { x: 45, y: 92 }, { x: 60, y: 92 },
  { x: 25, y: 35 }, { x: 75, y: 32 }, { x: 15, y: 60 }, { x: 85, y: 58 },
]

export const Chapter22Cinematic: React.FC = () => {
  const navigate = useNavigate()
  const { isChapterCompleted } = useGame()
  const [phase, setPhase] = useState<Phase>('stars-appear')
  const [starOpacity, setStarOpacity] = useState(0)
  const [converge, setConverge] = useState(false)
  const [glowing, setGlowing] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const [showReveal, setShowReveal] = useState(false)
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([])

  // Gate: must have completed ch22
  useEffect(() => {
    if (!isChapterCompleted(22)) {
      navigate('/chapter/22', { replace: true })
      return
    }

    const add = (fn: () => void, delay: number) => {
      const t = setTimeout(fn, delay)
      timerRefs.current.push(t)
    }

    add(() => setStarOpacity(1), 300)
    add(() => { setPhase('stars-converge'); setConverge(true) }, 2200)
    add(() => { setPhase('glow'); setGlowing(true) }, 4800)
    add(() => { setPhase('collapse'); setCollapsed(true) }, 6800)
    add(() => { setPhase('date'); setShowDate(true) }, 8200)
    add(() => { setPhase('reveal'); setShowReveal(true) }, 10500)
    add(() => navigate('/final', { replace: true }), 12800)

    return () => timerRefs.current.forEach(clearTimeout)
  }, [isChapterCompleted, navigate])

  const centerX = 50 // vw percent
  const centerY = 50 // vh percent

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ zIndex: 20, background: '#020214' }}
    >
      {/* Background fade */}
      <div
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #020214 70%)',
          opacity: converge ? 1 : 0.4,
          transition: 'opacity 2s ease',
        }}
      />

      {/* 22 converging stars */}
      {STAR_POSITIONS_OUTER.map((pos, i) => {
        const tx = converge ? centerX : pos.x
        const ty = converge ? centerY : pos.y
        const delay = converge ? i * 0.05 : 0

        return (
          <div
            key={i}
            style={{
              position: 'fixed',
              left: `${tx}%`,
              top: `${ty}%`,
              width: glowing ? (collapsed ? '0px' : '10px') : '6px',
              height: glowing ? (collapsed ? '0px' : '10px') : '6px',
              borderRadius: '50%',
              background: glowing ? '#fff' : '#c4b5fd',
              opacity: collapsed ? 0 : starOpacity,
              transform: 'translate(-50%, -50%)',
              boxShadow: glowing
                ? '0 0 16px rgba(255,255,255,0.9), 0 0 40px rgba(196,181,253,0.6)'
                : '0 0 6px rgba(196,181,253,0.5)',
              transition: `left ${1.8 + delay}s cubic-bezier(0.22,1,0.36,1),
                           top ${1.8 + delay}s cubic-bezier(0.22,1,0.36,1),
                           opacity 1s ease ${converge ? 0 : 0.3 + i * 0.08}s,
                           width 0.8s ease, height 0.8s ease,
                           box-shadow 1s ease`,
            }}
          />
        )
      })}

      {/* Central glow when collapsed */}
      {glowing && !collapsed && (
        <div
          className="fixed"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,181,253,0.3) 0%, transparent 70%)',
            boxShadow: '0 0 60px rgba(196,181,253,0.4), 0 0 120px rgba(129,140,248,0.2)',
            animation: 'pulse 1s ease-in-out infinite alternate',
          }}
        />
      )}

      {/* Big flash on collapse */}
      {collapsed && (
        <div
          className="fixed inset-0"
          style={{
            background: 'rgba(196,181,253,0.05)',
            animation: 'cinemaFade 2s ease forwards',
          }}
        />
      )}

      {/* Date reveal */}
      {showDate && (
        <div
          className="relative z-20 text-center"
          style={{
            opacity: showReveal ? 0 : 1,
            transition: 'opacity 2s ease',
          }}
        >
          <div
            className="font-ui text-xs tracking-[0.5em] uppercase mb-8"
            style={{ color: '#818cf8', animation: 'fadeIn 1.5s ease forwards' }}
          >
            one year
          </div>
          <div
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 5rem)',
              color: '#f0f4ff',
              textShadow: '0 0 40px rgba(196,181,253,0.5)',
              letterSpacing: '0.15em',
              animation: 'fadeIn 2s ease forwards',
            }}
          >
            23 · 08 · 2026
          </div>
          <div
            className="font-display text-xl mt-6"
            style={{
              color: '#64748b',
              fontStyle: 'italic',
              animation: 'fadeIn 2.5s ease forwards',
            }}
          >
            The final star is waiting.
          </div>
        </div>
      )}

      {/* Screen fade to final */}
      {showReveal && (
        <div
          className="fixed inset-0 z-30"
          style={{
            background: '#020214',
            animation: 'cinemaFade 2.2s ease forwards',
          }}
        />
      )}
    </div>
  )
}
