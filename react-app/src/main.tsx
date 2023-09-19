import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

// index
ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/*' element={<App />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>,
  )
