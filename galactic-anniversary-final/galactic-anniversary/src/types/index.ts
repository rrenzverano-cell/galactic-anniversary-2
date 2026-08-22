export type PuzzleType = 'text' | 'choice' | 'cipher' | 'constellation'
export type ActNumber = 1 | 2 | 3 | 4 | 5
export type ThemeClass = 'act-1' | 'act-2' | 'act-3' | 'act-4' | 'act-5'

export interface PuzzleOption {
  id: string
  label: string
}

export interface Puzzle {
  type: PuzzleType
  prompt: string
  options?: PuzzleOption[]
  cipher?: string
  cipherKey?: string
  starCount?: number
  hint1: string
  hint2: string
  hint3: string
  answers: string[]
}

export interface Chapter {
  id: number
  act: string
  actNumber: ActNumber
  title: string
  subtitle: string
  story: string[]
  puzzle?: Puzzle
  bg: string
  themeClass: ThemeClass
  successMessage: string
}

export interface GameState {
  currentChapter: number
  completedChapters: number[]
  musicEnabled: boolean
  hasStarted: boolean
  hintsUsed: Record<number, number>
}
