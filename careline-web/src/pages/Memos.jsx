import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Memos() {
    const navigate = useNavigate()
    const [memos, setMemos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMemos = async () => {
            const { data } = await supabase
                .from('memos')
                .select('*')
                .order('created_at', { ascending: false })

            if (data) setMemos(data)
            setLoading(false)
        }
        fetchMemos()
    }, [])

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '800px' }}>
            <button onClick={() => navigate('/dashboard')} className="btn" style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.5)' }}>
                ← Back to Dashboard
            </button>

            <div className="glass-panel" style={{ padding: '2rem', minHeight: '50vh' }}>
                <h1 style={{ color: 'var(--text)', marginBottom: '1.5rem' }}>Hospital Memos & Notices</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : memos.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: '2rem' }}>
                        <p>No active memos.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {memos.map(memo => (
                            <div key={memo.id} style={{
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.6)',
                                borderRadius: 'var(--radius-sm)',
                                borderLeft: memo.is_urgent ? '4px solid #ef4444' : '4px solid var(--primary)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{memo.title}</h3>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                        {new Date(memo.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p style={{ margin: 0, color: 'var(--text)' }}>{memo.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
