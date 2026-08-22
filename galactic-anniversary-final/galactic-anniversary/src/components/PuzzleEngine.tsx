import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Puzzle } from '../types'
import { checkAnswer } from '../systems/progressSystem'
import { useGame } from '../context/GameContext'

interface PuzzleEngineProps {
  puzzle: Puzzle
  chapterId: number
  onSolve: () => void
}

type Status = 'idle' | 'error' | 'success'

// ─── Text Puzzle ─────────────────────────────────────────────────────────────
const TextPuzzle: React.FC<{
  puzzle: Puzzle; status: Status
  onSubmit: (v: string) => void
}> = ({ puzzle, status, onSubmit }) => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) onSubmit(value)
  }

  return (
    <div className="w-full space-y-4">
      <p className="font-display text-xl text-center leading-snug mb-6"
        style={{ color: '#e2e8f0', fontStyle: 'italic' }}>
        {puzzle.prompt}
      </p>
      <input
        ref={inputRef}
        className={`cosmic-input ${status}`}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Type your answer..."
        autoComplete="off"
        spellCheck={false}
      />
      <button
        className="cosmic-btn cosmic-btn-primary"
        onClick={() => value.trim() && onSubmit(value)}
        disabled={!value.trim()}
      >
        Confirm
      </button>
    </div>
  )
}

// ─── Choice Puzzle ────────────────────────────────────────────────────────────
const ChoicePuzzle: React.FC<{
  puzzle: Puzzle; status: Status
  onSubmit: (v: string) => void
}> = ({ puzzle, status, onSubmit }) => {
  const [selected, setSelected] = useState<string | null>(null)

  const options = puzzle.options ?? []

  return (
    <div className="w-full space-y-3">
      <p className="font-display text-xl text-center leading-snug mb-6"
        style={{ color: '#e2e8f0', fontStyle: 'italic' }}>
        {puzzle.prompt}
      </p>
      {options.map(opt => (
        <button
          key={opt.id}
          onClick={() => setSelected(opt.id)}
          className={`cosmic-btn text-left flex items-start gap-3 ${selected === opt.id ? 'cosmic-btn-primary' : ''}`}
          style={{
            borderColor: selected === opt.id ? 'rgba(167,139,250,0.7)' : undefined,
            textAlign: 'left',
          }}
        >
          <span className="font-ui text-xs tracking-widest uppercase mt-1 shrink-0"
            style={{ color: selected === opt.id ? '#c4b5fd' : '#64748b' }}>
            {opt.id.toUpperCase()}
          </span>
          <span style={{ color: selected === opt.id ? '#f0f4ff' : '#94a3b8' }}>{opt.label}</span>
        </button>
      ))}
      <button
        className={`cosmic-btn cosmic-btn-primary mt-2 ${status === 'error' ? 'border-red-400/50' : ''}`}
        onClick={() => selected && onSubmit(selected)}
        disabled={!selected}
      >
        Confirm
      </button>
    </div>
  )
}

// ─── Cipher Puzzle ────────────────────────────────────────────────────────────
const CipherPuzzle: React.FC<{
  puzzle: Puzzle; status: Status
  onSubmit: (v: string) => void
}> = ({ puzzle, status, onSubmit }) => {
  const [value, setValue] = useState('')

  return (
    <div className="w-full space-y-5">
      <p className="font-display text-xl text-center leading-snug"
        style={{ color: '#e2e8f0', fontStyle: 'italic' }}>
        {puzzle.prompt}
      </p>
      <div className="glass-card rounded-xl p-6 text-center">
        <div className="font-display text-3xl tracking-[0.4em] mb-3"
          style={{ color: '#c4b5fd', letterSpacing: '0.5em' }}>
          {puzzle.cipher}
        </div>
        {puzzle.cipherKey && (
          <p className="font-ui text-xs" style={{ color: '#64748b' }}>{puzzle.cipherKey}</p>
        )}
      </div>
      <input
        className={`cosmic-input ${status}`}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && value.trim() && onSubmit(value)}
        placeholder="Decoded word..."
        autoComplete="off"
        spellCheck={false}
      />
      <button
        className="cosmic-btn cosmic-btn-primary"
        onClick={() => value.trim() && onSubmit(value)}
        disabled={!value.trim()}
      >
        Confirm
      </button>
    </div>
  )
}

// ─── Constellation Puzzle ─────────────────────────────────────────────────────
const STAR_POSITIONS = [
  { x: 200, y: 72 }, { x: 140, y: 60 }, { x: 260, y: 60 },
  { x: 95, y: 100 }, { x: 305, y: 100 }, { x: 68, y: 140 },
  { x: 332, y: 140 }, { x: 72, y: 185 }, { x: 328, y: 185 },
  { x: 100, y: 222 }, { x: 300, y: 222 }, { x: 138, y: 248 },
  { x: 262, y: 248 }, { x: 200, y: 268 }, { x: 165, y: 100 },
  { x: 235, y: 100 }, { x: 130, y: 155 }, { x: 270, y: 155 },
  { x: 165, y: 205 }, { x: 235, y: 205 }, { x: 200, y: 132 },
  { x: 200, y: 175 },
]

const ConstellationPuzzle: React.FC<{
  puzzle: Puzzle; status: Status
  onSubmit: (v: string) => void
}> = ({ puzzle, status, onSubmit }) => {
  const total = puzzle.starCount ?? 22
  const [lit, setLit] = useState<Set<number>>(new Set())
  const [answer, setAnswer] = useState('')
  const allLit = lit.size === total

  const handleStar = (i: number) => {
    setLit(prev => {
      const next = new Set(prev)
      next.add(i)
      return next
    })
  }

  return (
    <div className="w-full space-y-5">
      <p className="font-display text-xl text-center leading-snug mb-2"
        style={{ color: '#e2e8f0', fontStyle: 'italic' }}>
        {puzzle.prompt}
      </p>
      <div className="font-ui text-xs text-center tracking-widest mb-1"
        style={{ color: '#818cf8' }}>
        {lit.size} / {total} stars lit
      </div>

      {/* SVG Constellation */}
      <div className="flex justify-center">
        <svg
          viewBox="0 0 400 320"
          className="w-full"
          style={{ maxWidth: '360px', filter: 'drop-shadow(0 0 24px rgba(129,140,248,0.15))' }}
        >
          {/* Connection lines (show when all lit) */}
          {allLit && STAR_POSITIONS.slice(0, total).map((s, i) => {
            const next = STAR_POSITIONS[(i + 1) % (total)]
            if (i < total - 1 && i % 3 !== 2) {
              return (
                <line key={`l${i}`}
                  x1={s.x} y1={s.y} x2={next.x} y2={next.y}
                  stroke="rgba(196,181,253,0.25)" strokeWidth="0.8"
                  strokeDasharray="3,4"
                />
              )
            }
            return null
          })}

          {/* Stars */}
          {STAR_POSITIONS.slice(0, total).map((pos, i) => {
            const isLit = lit.has(i)
            return (
              <g key={i} className="constellation-star" onClick={() => handleStar(i)}
                style={{ cursor: 'pointer' }}>
                {isLit && (
                  <circle cx={pos.x} cy={pos.y} r={18} fill="rgba(196,181,253,0.06)" />
                )}
                <circle
                  cx={pos.x} cy={pos.y}
                  r={isLit ? 6 : 4}
                  fill={isLit ? '#c4b5fd' : 'rgba(129,140,248,0.3)'}
                  style={{
                    filter: isLit ? 'drop-shadow(0 0 8px rgba(196,181,253,0.9))' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                />
                {isLit && (
                  <text x={pos.x} y={pos.y - 10}
                    textAnchor="middle"
                    fontSize="7"
                    fill="rgba(196,181,253,0.5)"
                    style={{ userSelect: 'none' }}>
                    ✦
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Input appears when all stars lit */}
      {allLit && (
        <div className="space-y-3 animate-cosmic-reveal">
          <p className="font-ui text-xs text-center tracking-widest uppercase"
            style={{ color: '#fbbf24' }}>
            ✦ The constellation remembers. Speak the word. ✦
          </p>
          <input
            className={`cosmic-input ${status}`}
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && answer.trim() && onSubmit(answer)}
            placeholder="The word at the heart of everything..."
            autoComplete="off"
            autoFocus
          />
          <button
            className="cosmic-btn cosmic-btn-primary"
            onClick={() => answer.trim() && onSubmit(answer)}
            disabled={!answer.trim()}
          >
            Speak it
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Hint System ─────────────────────────────────────────────────────────────
const HintSystem: React.FC<{ puzzle: Puzzle; chapterId: number }> = ({ puzzle, chapterId }) => {
  const { getHintsUsed, useHint } = useGame()
  const [open, setOpen] = useState(false)
  const used = getHintsUsed(chapterId)

  const hints = [puzzle.hint1, puzzle.hint2, puzzle.hint3]
  const visibleHints = hints.slice(0, used)

  const handleReveal = () => {
    if (used < 3) useHint(chapterId)
  }

  return (
    <div className="mt-6 text-center">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="font-ui text-xs tracking-widest uppercase"
          style={{ color: '#475569', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#818cf8')}
          onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
        >
          Need a little help?
        </button>
      ) : (
        <div className="glass-card rounded-xl p-4 text-left space-y-2">
          <p className="font-ui text-xs tracking-widest uppercase mb-3"
            style={{ color: '#64748b' }}>
            Hints
          </p>
          {visibleHints.map((h, i) => (
            <p key={i} className="font-ui text-sm animate-fade-up"
              style={{ color: '#94a3b8', animationDelay: `${i * 0.1}s` }}>
              {i + 1}. {h}
            </p>
          ))}
          {used < 3 && (
            <button
              onClick={handleReveal}
              className="font-ui text-xs mt-2"
              style={{ color: '#818cf8' }}
            >
              Reveal another hint ({3 - used} remaining)
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main Puzzle Engine ───────────────────────────────────────────────────────
const STATUS_TEXT: Record<Status, string> = {
  idle: '',
  error: "The stars haven't aligned yet. Try again.",
  success: 'The constellation remembers. ✦',
}

export const PuzzleEngine: React.FC<PuzzleEngineProps> = ({ puzzle, chapterId, onSolve }) => {
  const [status, setStatus] = useState<Status>('idle')
  const solveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSubmit = useCallback((value: string) => {
    if (status === 'success') return
    const correct = checkAnswer(value, puzzle.answers)
    if (correct) {
      setStatus('success')
      solveTimerRef.current = setTimeout(onSolve, 2200)
    } else {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 1800)
    }
  }, [puzzle.answers, onSolve, status])

  useEffect(() => () => {
    if (solveTimerRef.current) clearTimeout(solveTimerRef.current)
  }, [])

  const renderPuzzle = () => {
    switch (puzzle.type) {
      case 'text':
        return <TextPuzzle puzzle={puzzle} status={status} onSubmit={handleSubmit} />
      case 'choice':
        return <ChoicePuzzle puzzle={puzzle} status={status} onSubmit={handleSubmit} />
      case 'cipher':
        return <CipherPuzzle puzzle={puzzle} status={status} onSubmit={handleSubmit} />
      case 'constellation':
        return <ConstellationPuzzle puzzle={puzzle} status={status} onSubmit={handleSubmit} />
    }
  }

  return (
    <div className="w-full">
      {renderPuzzle()}

      {/* Status message */}
      {status !== 'idle' && (
        <div
          className="mt-4 text-center font-ui text-sm animate-fade-up"
          style={{
            color: status === 'success' ? '#c4b5fd' : '#f87171',
            animationDuration: '0.4s',
          }}
        >
          {STATUS_TEXT[status]}
        </div>
      )}

      {/* Hint system */}
      {status !== 'success' && (
        <HintSystem puzzle={puzzle} chapterId={chapterId} />
      )}
    </div>
  )
}
