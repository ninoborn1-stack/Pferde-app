import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'
import { DynamicProvidersProvider } from './hooks/useDynamicProviders.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DynamicProvidersProvider>
        <App />
      </DynamicProvidersProvider>
    </AuthProvider>
  </StrictMode>,
)
