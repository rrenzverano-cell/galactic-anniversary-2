import { GameState } from '../types'

const STORAGE_KEY = 'galaxy_anniversary_v1'

export const defaultState: GameState = {
  currentChapter: 1,
  completedChapters: [],
  musicEnabled: false,
  hasStarted: false,
  hintsUsed: {},
}

export const loadProgress = (): GameState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<GameState>
      return { ...defaultState, ...parsed }
    }
  } catch { /* ignore */ }
  return { ...defaultState }
}

export const saveProgress = (state: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch { /* ignore */ }
}

export const completeChapter = (state: GameState, id: number): GameState => {
  const completedChapters = state.completedChapters.includes(id)
    ? state.completedChapters
    : [...state.completedChapters, id].sort((a, b) => a - b)
  const next = Math.min(id + 1, 23)
  const newState: GameState = { ...state, currentChapter: next, completedChapters }
  saveProgress(newState)
  return newState
}

export const isUnlocked = (state: GameState, id: number): boolean => {
  if (id === 1) return true
  return state.completedChapters.includes(id - 1)
}

export const isCompleted = (state: GameState, id: number): boolean =>
  state.completedChapters.includes(id)

export const resetProgress = (): GameState => {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
  return { ...defaultState }
}

export const normalizeAnswer = (s: string): string =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim()

export const checkAnswer = (input: string, accepted: string[]): boolean => {
  const norm = normalizeAnswer(input)
  return accepted.some(a => normalizeAnswer(a) === norm)
}

export const recordHint = (state: GameState, chapterId: number): GameState => {
  const current = state.hintsUsed[chapterId] ?? 0
  const next = Math.min(current + 1, 3)
  const newState: GameState = { ...state, hintsUsed: { ...state.hintsUsed, [chapterId]: next } }
  saveProgress(newState)
  return newState
}
