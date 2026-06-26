import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SiteDataProvider } from '@/lib/data'
import './index.css'
import App from './App.jsx'
import AdminPage from '@/pages/Admin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SiteDataProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </SiteDataProvider>
    </BrowserRouter>
  </StrictMode>,
)
