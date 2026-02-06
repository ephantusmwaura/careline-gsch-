import React from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Settings() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/')
    }

    return (
        <div className="layout" style={{ display: 'flex', minHeight: '100vh' }}>
            <div className="sidebar" style={{ width: '250px', background: 'var(--sidebar-bg)', color: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '2rem' }}>CareLine Admin</h3>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span onClick={() => navigate('/dashboard')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Dashboard</span>
                    <span onClick={() => navigate('/submissions')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Submissions</span>
                    <span onClick={() => navigate('/memos')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Memos</span>
                    <span onClick={() => navigate('/settings')} style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Settings</span>
                </nav>
                <button onClick={handleLogout} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid #475569', color: '#cbd5e1', padding: '0.5rem', cursor: 'pointer', borderRadius: '4px' }}>Log Out</button>
            </div>

            <div className="main-content" style={{ flex: 1, padding: '2rem', background: 'var(--background)' }}>
                <h1 style={{ marginBottom: '2rem', color: 'var(--text)' }}>Settings</h1>
                <div className="card">
                    <h3>Admin Profile</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Functionality coming soon.</p>
                </div>
            </div>
        </div>
    )
}
