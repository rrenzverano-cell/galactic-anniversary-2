import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { GameState } from '../types'
import {
  loadProgress, saveProgress, completeChapter as doComplete,
  isUnlocked, isCompleted, resetProgress, recordHint,
} from '../systems/progressSystem'

interface GameContextValue {
  state: GameState
  completeChapter: (id: number) => void
  useHint: (chapterId: number) => number
  getHintsUsed: (chapterId: number) => number
  isChapterUnlocked: (id: number) => boolean
  isChapterCompleted: (id: number) => boolean
  setMusicEnabled: (enabled: boolean) => void
  setHasStarted: () => void
  reset: () => void
}

type Action =
  | { type: 'LOAD'; payload: GameState }
  | { type: 'COMPLETE'; id: number }
  | { type: 'SET_MUSIC'; enabled: boolean }
  | { type: 'SET_STARTED' }
  | { type: 'USE_HINT'; chapterId: number }
  | { type: 'RESET' }

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'LOAD': return action.payload
    case 'COMPLETE': return doComplete(state, action.id)
    case 'SET_MUSIC': {
      const next = { ...state, musicEnabled: action.enabled }
      saveProgress(next)
      return next
    }
    case 'SET_STARTED': {
      const next = { ...state, hasStarted: true }
      saveProgress(next)
      return next
    }
    case 'USE_HINT': return recordHint(state, action.chapterId)
    case 'RESET': return resetProgress()
    default: return state
  }
}

const GameContext = createContext<GameContextValue | null>(null)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadProgress())

  useEffect(() => {
    const saved = loadProgress()
    dispatch({ type: 'LOAD', payload: saved })
  }, [])

  const completeChapter = useCallback((id: number) => {
    dispatch({ type: 'COMPLETE', id })
  }, [])

  const useHint = useCallback((chapterId: number): number => {
    dispatch({ type: 'USE_HINT', chapterId })
    const current = state.hintsUsed[chapterId] ?? 0
    return Math.min(current + 1, 3)
  }, [state.hintsUsed])

  const getHintsUsed = useCallback((chapterId: number): number =>
    state.hintsUsed[chapterId] ?? 0, [state.hintsUsed])

  const isChapterUnlocked = useCallback((id: number) => isUnlocked(state, id), [state])
  const isChapterCompleted = useCallback((id: number) => isCompleted(state, id), [state])

  const setMusicEnabled = useCallback((enabled: boolean) => {
    dispatch({ type: 'SET_MUSIC', enabled })
  }, [])

  const setHasStarted = useCallback(() => {
    dispatch({ type: 'SET_STARTED' })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  return (
    <GameContext.Provider value={{
      state, completeChapter, useHint, getHintsUsed,
      isChapterUnlocked, isChapterCompleted,
      setMusicEnabled, setHasStarted, reset,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = (): GameContextValue => {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
