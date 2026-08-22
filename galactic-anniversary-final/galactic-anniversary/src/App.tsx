import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import { CosmicBackground } from './components/CosmicBackground'
import { AudioController } from './components/AudioController'
import { GalaxyEntry } from './pages/GalaxyEntry'
import { ChapterPage } from './pages/ChapterPage'
import { Chapter22Cinematic } from './pages/Chapter22Cinematic'
import { FinalReveal } from './pages/FinalReveal'

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<GalaxyEntry />} />
    <Route path="/chapter/:id" element={<ChapterPage />} />
    <Route path="/cinematic" element={<Chapter22Cinematic />} />
    <Route path="/final" element={<FinalReveal />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

const App: React.FC = () => (
  <GameProvider>
    <div className="relative w-full min-h-screen" style={{ background: '#020214' }}>
      <CosmicBackground />
      <AudioController />
      <AppRoutes />
    </div>
  </GameProvider>
)

export default App
