import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function SubmitFeedback() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: 'Suggestion', // Suggestion, Complaint, Emergency, Review
        category: 'General', // HR, Equipment, Patient Care, etc.
        message: '',
        isUrgent: false
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase
                .from('submissions')
                .insert([
                    {
                        submission_type: formData.type,
                        category: formData.category,
                        content: formData.message,
                        is_urgent: formData.isUrgent,
                        status: 'New'
                        // session_id is handled by RLS or backend logic if needed, 
                        // or we pass it if we have a valid session token from verification
                    }
                ])

            if (error) throw error

            alert('Feedback submitted successfully!')
            navigate('/dashboard')
        } catch (error) {
            console.error('Error submitting feedback:', error)
            alert('Failed to submit feedback. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '800px' }}>
            <button onClick={() => navigate('/dashboard')} className="btn" style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.5)' }}>
                ← Back to Dashboard
            </button>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <h1 style={{ color: 'var(--text)', marginBottom: '1.5rem' }}>Submit Feedback</h1>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.8)' }}
                            >
                                <option>Suggestion</option>
                                <option>Complaint</option>
                                <option>Review</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.8)' }}
                            >
                                <option>General</option>
                                <option>HR</option>
                                <option>Equipment</option>
                                <option>Safety</option>
                                <option>Patient Care</option>
                                <option>Management</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#ef4444', fontWeight: 'bold' }}>
                            <input
                                type="checkbox"
                                name="isUrgent"
                                checked={formData.isUrgent}
                                onChange={handleChange}
                                style={{ width: '1.2rem', height: '1.2rem' }}
                            />
                            Mark as Emergency / Urgent
                        </label>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.25rem', marginLeft: '1.7rem' }}>
                            Use this only for critical safety issues or immediate hazards.
                        </p>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            placeholder="Type your feedback here... Be as specific as possible."
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.8)', fontFamily: 'inherit' }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ padding: '1rem', fontSize: '1.1rem' }}
                    >
                        {loading ? 'Submitting...' : 'Submit Anonymously'}
                    </button>
                </form>
            </div>
        </div>
    )
}
