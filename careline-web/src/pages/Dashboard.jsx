import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate()
    const [session] = useState(() => {
        const sess = localStorage.getItem('careline_session')
        return sess ? JSON.parse(sess) : null
    })

    useEffect(() => {
        if (!session) {
            navigate('/')
        }
    }, [session, navigate])



    if (!session) return null

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>Staff Dashboard</h1>
                <p style={{ color: 'var(--text-light)' }}>Anonymous Session Active</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {/* Quick Actions */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text)' }}>Submit Feedback</h3>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        Share your concerns, suggestions, or urgent reports anonymously.
                    </p>
                    <button onClick={() => navigate('/submit')} className="btn-primary" style={{ width: '100%' }}>New Submission</button>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text)' }}>My Inbox</h3>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        View responses from administration. No identity check required.
                    </p>
                    <button onClick={() => navigate('/inbox')} style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--primary)',
                        background: 'transparent',
                        color: 'var(--primary)',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>Check Messages</button>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text)' }}>Memos & Notices</h3>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        Read official hospital announcements and updates.
                    </p>
                    <button onClick={() => navigate('/memos')} style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--text-light)',
                        background: 'transparent',
                        color: 'var(--text)',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>View Memos</button>
                </div>
            </div>
        </div>
    )
}
