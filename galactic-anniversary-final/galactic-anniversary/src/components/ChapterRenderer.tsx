import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chapter } from '../types'
import { PuzzleEngine } from './PuzzleEngine'
import { useGame } from '../context/GameContext'

interface ChapterRendererProps {
  chapter: Chapter
}

const ACT_BG: Record<number, string> = {
  1: '/assets/backgrounds/galaxy-01.webp',
  2: '/assets/backgrounds/nebula-blue.jpg',
  3: '/assets/backgrounds/orion.jpg',
  4: '/assets/backgrounds/filament.png',
  5: '/assets/backgrounds/pillars.png',
}

const THEME_COLORS: Record<string, string> = {
  'act-1': '#818cf8',
  'act-2': '#a78bfa',
  'act-3': '#34d399',
  'act-4': '#f472b6',
  'act-5': '#fbbf24',
}

export const ChapterRenderer: React.FC<ChapterRendererProps> = ({ chapter }) => {
  const navigate = useNavigate()
  const { completeChapter, isChapterCompleted } = useGame()
  const [visible, setVisible] = useState(false)
  const alreadyDone = isChapterCompleted(chapter.id)
  const accentColor = THEME_COLORS[chapter.themeClass] ?? '#818cf8'
  const bgSrc = chapter.bg || ACT_BG[chapter.actNumber] || ''

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [chapter.id])

  const handleSolve = () => {
    completeChapter(chapter.id)
    if (chapter.id === 22) {
      setTimeout(() => navigate('/cinematic'), 600)
    } else {
      setTimeout(() => navigate(`/chapter/${chapter.id + 1}`), 700)
    }
  }

  const goNext = () => {
    if (chapter.id === 22) navigate('/cinematic')
    else navigate(`/chapter/${chapter.id + 1}`)
  }

  return (
    <>
      {/* Background image — z-index 1 (below stars canvas at 5) */}
      <div
        className="fixed inset-0"
        style={{
          zIndex: 1,
          backgroundImage: bgSrc ? `url(${bgSrc})` : undefined,
          backgroundColor: '#020214',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'background-image 1.2s ease',
        }}
      />
      {/* Dark overlay — z-index 2 */}
      <div
        className="fixed inset-0"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(2,2,20,0.48) 0%, rgba(2,2,20,0.68) 40%, rgba(2,2,20,0.93) 100%)',
        }}
      />

      {/* Page content — z-index 10 (above stars canvas at 5) */}
      <div
        className="relative min-h-screen flex flex-col items-center px-6 pt-24 pb-16"
        style={{
          zIndex: 10,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.9s ease',
        }}
      >
        <div className="w-full max-w-md mx-auto">

          {/* Act label */}
          <div className="font-ui text-xs tracking-[0.3em] uppercase mb-6 text-center"
            style={{ color: accentColor, opacity: 0.7 }}>
            {chapter.act}
          </div>

          {/* Chapter number */}
          <div className="text-center mb-2">
            <span className="font-ui text-xs tracking-widest" style={{ color: accentColor, opacity: 0.45 }}>
              Chapter {String(chapter.id).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-center mb-3 leading-tight"
            style={{
              fontSize: 'clamp(2rem, 7vw, 3rem)',
              color: '#f0f4ff',
              textShadow: `0 0 40px ${accentColor}44`,
            }}>
            {chapter.title}
          </h1>

          {/* Subtitle */}
          <p className="font-display text-center mb-10 leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 3vw, 1.1rem)', color: '#94a3b8', fontStyle: 'italic' }}>
            {chapter.subtitle}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${accentColor}40)` }} />
            <span style={{ color: accentColor, fontSize: '10px' }}>✦</span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${accentColor}40)` }} />
          </div>

          {/* Story */}
          <div className="space-y-5 mb-12">
            {chapter.story.map((para, i) => (
              <p key={i} className="font-ui leading-relaxed text-center"
                style={{
                  fontSize: 'clamp(0.9rem, 2.8vw, 1rem)',
                  color: '#cbd5e1',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
                }}>
                {para}
              </p>
            ))}
          </div>

          {/* Puzzle */}
          {chapter.puzzle && (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1" style={{ background: `${accentColor}25` }} />
                <span className="font-ui text-xs tracking-widest uppercase" style={{ color: accentColor, opacity: 0.55 }}>
                  puzzle
                </span>
                <div className="h-px flex-1" style={{ background: `${accentColor}25` }} />
              </div>

              {alreadyDone ? (
                <div className="text-center space-y-4">
                  <p className="font-ui text-sm" style={{ color: '#64748b' }}>Chapter complete ✦</p>
                  <button onClick={goNext} className="cosmic-btn cosmic-btn-primary">
                    Continue →
                  </button>
                </div>
              ) : (
                <PuzzleEngine puzzle={chapter.puzzle} chapterId={chapter.id} onSolve={handleSolve} />
              )}
            </div>
          )}

          <div className="text-center mt-12 pb-4">
            <span style={{ color: accentColor, opacity: 0.25, fontSize: '10px' }}>✦</span>
          </div>
        </div>
      </div>
    </>
  )
}
