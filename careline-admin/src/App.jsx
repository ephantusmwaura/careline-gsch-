import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Submissions from './pages/Submissions'
import MemosManager from './pages/MemosManager'
import Settings from './pages/Settings'
import { supabase } from './supabase'

import Layout from './components/Layout'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return null

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!session ? <Login /> : <Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={session ? <Layout><AdminDashboard /></Layout> : <Navigate to="/" />}
        />
        <Route
          path="/submissions"
          element={session ? <Layout><Submissions /></Layout> : <Navigate to="/" />}
        />
        <Route
          path="/memos"
          element={session ? <Layout><MemosManager /></Layout> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={session ? <Layout><Settings /></Layout> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
