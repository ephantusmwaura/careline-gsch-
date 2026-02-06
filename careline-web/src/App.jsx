import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import SubmitFeedback from './pages/SubmitFeedback'
import Inbox from './pages/Inbox'
import Memos from './pages/Memos'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/submit" element={<Layout><SubmitFeedback /></Layout>} />
        <Route path="/inbox" element={<Layout><Inbox /></Layout>} />
        <Route path="/memos" element={<Layout><Memos /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
