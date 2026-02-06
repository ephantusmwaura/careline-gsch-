import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Submissions() {
    const [loading, setLoading] = useState(true)
    const [submissions, setSubmissions] = useState([])
    const [filter, setFilter] = useState('All') // All, New, Urgent
    const [selectedSubmission, setSelectedSubmission] = useState(null)

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



    return (
        <div className="container">
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
                            <button onClick={() => setSelectedSubmission(sub)} className="btn" style={{ border: '1px solid #e2e8f0', cursor: 'pointer' }}>View Details</button>
                        </div>
                    ))}
                </div>
            )}

            {selectedSubmission && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="glass-panel" style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '600px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h2 style={{ margin: 0 }}>Submission Details</h2>
                            <button onClick={() => setSelectedSubmission(null)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>
                        <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '4px' }}>
                            <p><strong>Type:</strong> {selectedSubmission.submission_type}</p>
                            <p><strong>Category:</strong> {selectedSubmission.category}</p>
                            <p><strong>Date:</strong> {new Date(selectedSubmission.created_at).toLocaleString()}</p>
                            {selectedSubmission.is_urgent && <p style={{ color: '#ef4444', fontWeight: 'bold' }}>URGENT PRIORITY</p>}
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ marginBottom: '0.5rem' }}>Content:</h4>
                            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{selectedSubmission.content}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button onClick={() => setSelectedSubmission(null)} className="btn">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
