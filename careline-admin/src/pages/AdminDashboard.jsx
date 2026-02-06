import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        urgent: 0
    })

    useEffect(() => {
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

        fetchStats()
    }, [])



    return (
        <div className="container">
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
    )
}
