import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function MemosManager() {
    const [memos, setMemos] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ title: '', content: '', is_urgent: false })

    useEffect(() => {
        fetchMemos()
    }, [])

    const fetchMemos = async () => {
        setLoading(true)
        const { data } = await supabase.from('memos').select('*').order('created_at', { ascending: false })
        if (data) setMemos(data)
        setLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { error } = await supabase.from('memos').insert([formData])
            if (error) throw error
            setShowForm(false)
            setFormData({ title: '', content: '', is_urgent: false })
            fetchMemos()
        } catch (err) {
            console.error(err)
            alert('Failed to publish memo')
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ margin: 0, color: 'var(--text)' }}>Memos & Notices</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn btn-primary" style={{ background: 'var(--primary)', color: 'white' }}>
                    {showForm ? 'Cancel' : 'New Memo'}
                </button>
            </div>

            {showForm && (
                <div className="card glass-panel" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--primary)', padding: '2rem' }}>
                    <h3 style={{ marginTop: 0 }}>Create New Memo</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                            style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                        />
                        <textarea
                            placeholder="Content"
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            required
                            rows={4}
                            style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                        />
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={formData.is_urgent}
                                onChange={e => setFormData({ ...formData, is_urgent: e.target.checked })}
                            />
                            Mark as High Importance
                        </label>
                        <button type="submit" disabled={loading} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                            {loading ? 'Publishing...' : 'Publish Memo'}
                        </button>
                    </form>
                </div>
            )}

            {loading && !showForm ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {memos.length === 0 && !showForm ? <p>No memos found.</p> : memos.map(memo => (
                        <div key={memo.id} className="card glass-panel" style={{ padding: '1.5rem', borderLeft: memo.is_urgent ? '4px solid #ef4444' : '4px solid var(--primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3 style={{ marginTop: 0 }}>{memo.title}</h3>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(memo.created_at).toLocaleDateString()}</span>
                            </div>
                            <p style={{ margin: 0, color: 'var(--text)' }}>{memo.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
