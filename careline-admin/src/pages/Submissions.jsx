import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Submissions() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [submissions, setSubmissions] = useState([])
    const [filter, setFilter] = useState('All') // All, New, Urgent

    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true)
            try {
                let query = supabase
                    .from('submissions')
                    .select('*')
                    .order('created_at', { ascending: false })

                if (filter === 'New') {
                    query = query.eq('status', 'New')
                } else if (filter === 'Urgent') {
                    query = query.eq('is_urgent', true)
                }

                const { data, error } = await query
                if (error) throw error
                setSubmissions(data)
            } catch (error) {
                console.error('Error fetching submissions:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchSubmissions()
    }, [filter])

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
                    <span onClick={() => navigate('/submissions')} style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Submissions</span>
                    <span onClick={() => navigate('/memos')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Memos</span>
                </nav>
                <button onClick={handleLogout} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid #475569', color: '#cbd5e1', padding: '0.5rem', cursor: 'pointer', borderRadius: '4px' }}>Log Out</button>
            </div>

            <div className="main-content" style={{ flex: 1, padding: '2rem', background: 'var(--background)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ margin: 0, color: 'var(--text)' }}>Submissions</h1>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {['All', 'New', 'Urgent'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`btn ${filter === f ? 'btn-primary' : ''}`}
                                style={{ background: filter === f ? 'var(--primary)' : 'white', border: '1px solid #e2e8f0', color: filter === f ? 'white' : 'var(--text)' }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {submissions.length === 0 ? <p>No submissions found.</p> : submissions.map(sub => (
                            <div key={sub.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: sub.is_urgent ? '4px solid #ef4444' : '4px solid transparent' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <span style={{ fontWeight: 'bold', color: 'var(--text)' }}>{sub.submission_type}</span>
                                        {sub.is_urgent && <span style={{ background: '#fee2e2', color: '#ef4444', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>URGENT</span>}
                                        {sub.status === 'New' && <span style={{ background: '#d1fae5', color: '#059669', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>NEW</span>}
                                    </div>
                                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{sub.category} • {new Date(sub.created_at).toLocaleDateString()}</p>
                                    <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '600px' }}>
                                        {sub.content}
                                    </p>
                                </div>
                                <button className="btn" style={{ border: '1px solid #e2e8f0' }}>View Details</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
