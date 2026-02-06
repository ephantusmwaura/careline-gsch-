import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        urgent: 0
    })

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                navigate('/')
                return
            }
            fetchStats()
        }

        const fetchStats = async () => {
            try {
                setLoading(true)

                // Fetch stats in parallel for efficiency
                const [
                    { count: totalCount },
                    { count: newCount },
                    { count: urgentCount }
                ] = await Promise.all([
                    supabase.from('submissions').select('*', { count: 'exact', head: true }),
                    supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'New'),
                    supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('is_urgent', true)
                ])

                setStats({
                    total: totalCount || 0,
                    new: newCount || 0,
                    urgent: urgentCount || 0
                })
            } catch (error) {
                console.error('Error fetching stats:', error)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [navigate])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/')
    }

    return (
        <div className="layout" style={{ display: 'flex', minHeight: '100vh' }}>
            <div className="sidebar" style={{ width: '250px', background: 'var(--sidebar-bg)', color: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '2rem' }}>CareLine Admin</h3>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span onClick={() => navigate('/dashboard')} style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Dashboard</span>
                    <span onClick={() => navigate('/submissions')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Submissions</span>
                    <span onClick={() => navigate('/memos')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Memos</span>
                    <span onClick={() => navigate('/settings')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Settings</span>
                </nav>
                <button
                    onClick={handleLogout}
                    style={{ marginTop: 'auto', background: 'transparent', border: '1px solid #475569', color: '#cbd5e1', padding: '0.5rem', cursor: 'pointer', borderRadius: '4px' }}
                >
                    Log Out
                </button>
            </div>

            <div className="main-content" style={{ flex: 1, padding: '2rem', background: 'var(--background)' }}>
                <h1 style={{ marginBottom: '2rem', color: 'var(--text)' }}>Dashboard Overview</h1>

                {loading ? (
                    <p>Loading stats...</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Submissions</h3>
                            <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.total}</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>New (Review Needed)</h3>
                            <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.new}</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Urgent / Emergency</h3>
                            <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444' }}>{stats.urgent}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
