import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GameStatusProvider } from './context/GameStatusProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameStatusProvider>
      <App />
    </GameStatusProvider>
  </StrictMode>,
)
