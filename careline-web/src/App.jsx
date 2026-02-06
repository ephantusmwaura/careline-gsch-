import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import SubmitFeedback from './pages/SubmitFeedback'
import Inbox from './pages/Inbox'
import Memos from './pages/Memos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitFeedback />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/memos" element={<Memos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
