import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { getChapter } from '../chapters/chapterData'
import { ChapterRenderer } from '../components/ChapterRenderer'
import { ProgressIndicator } from '../components/ProgressIndicator'
import { LockedChapter } from '../components/LockedChapter'

export const ChapterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const chapterId = parseInt(id ?? '1', 10)
  const { isChapterUnlocked } = useGame()

  if (isNaN(chapterId) || chapterId < 1 || chapterId > 23) {
    return <Navigate to="/" replace />
  }

  // Chapter 23 has its own route
  if (chapterId === 23) {
    return <Navigate to="/final" replace />
  }

  const chapter = getChapter(chapterId)
  if (!chapter) return <Navigate to="/" replace />

  if (!isChapterUnlocked(chapterId)) {
    return (
      <>
        <div className="fixed inset-0 z-0" style={{
          background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #020214 70%)',
        }} />
        <LockedChapter />
      </>
    )
  }

  return (
    <>
      <ProgressIndicator currentId={chapterId} />
      <ChapterRenderer chapter={chapter} />
    </>
  )
}
