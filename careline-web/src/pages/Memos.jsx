import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Memos() {
    const [memos, setMemos] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedMemo, setSelectedMemo] = useState(null)

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
        <div className="container" style={{ padding: '0', maxWidth: '800px' }}>
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
                                <p style={{ margin: '0 0 1rem 0', color: 'var(--text)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{memo.content}</p>
                                <button
                                    onClick={() => setSelectedMemo(memo)}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid var(--primary)',
                                        color: 'var(--primary)',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedMemo && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                    <div className="glass-panel" style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '600px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary)' }}>{selectedMemo.title}</h2>
                            <button onClick={() => setSelectedMemo(null)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-light)' }}>&times;</button>
                        </div>

                        {selectedMemo.is_urgent && (
                            <div style={{ background: '#fee2e2', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '6px', marginBottom: '1.5rem', display: 'inline-block', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                ⚠️ HIGH IMPORTANCE
                            </div>
                        )}

                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: 'var(--text)', fontSize: '1rem' }}>{selectedMemo.content}</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                                Posted: {new Date(selectedMemo.created_at).toLocaleString()}
                            </span>
                            <button onClick={() => setSelectedMemo(null)} className="btn-primary">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
