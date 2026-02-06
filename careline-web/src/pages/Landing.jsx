import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Landing() {
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleVerify = async () => {
        if (!code.trim()) return
        setLoading(true)
        setError('')

        try {
            // PROD: Call Supabase RPC
            const { data, error } = await supabase.rpc('verify_access_code', { code_input: code })

            if (error) throw error
            if (!data || !data.success) {
                throw new Error('Invalid or expired access code')
            }

            // Success
            localStorage.setItem('careline_session', JSON.stringify({
                verified: true,
                timestamp: Date.now(),
                mode: 'anonymous',
                session_id: data.session_id
            }))

            navigate('/dashboard')
        } catch (err) {
            console.error(err)
            setError(err.message || 'Verification failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative', overflow: 'hidden' }}>

            {/* Decorative Orbs */}
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: -1 }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: -1 }} />

            <div className="glass-panel" style={{ padding: '3rem', maxWidth: '420px', width: '100%', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
                <div style={{ marginBottom: '2rem' }}>
                    {/* Logo Placeholder */}
                    <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, var(--primary), #3b82f6)', borderRadius: '16px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '24px', boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.5)' }}>
                        CL
                    </div>
                    <h1 style={{ color: 'var(--text)', fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>CareLine</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Secure. Anonymous. Safe.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text)', marginBottom: '0.5rem', marginLeft: '0.25rem' }}>Access Code</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="e.g. 8X92-K1"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(203, 213, 225, 0.5)',
                                background: 'rgba(255,255,255,0.6)',
                                outline: 'none',
                                fontSize: '1.1rem',
                                color: 'var(--text)',
                                transition: 'all 0.2s',
                                boxSizing: 'border-box',
                                textAlign: 'center',
                                letterSpacing: '0.1em',
                                fontWeight: '600'
                            }}
                            onFocus={(e) => e.target.style.background = 'white'}
                            onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.6)'}
                            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                        />
                    </div>

                    {error && (
                        <div style={{ color: '#ef4444', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                            {error}
                        </div>
                    )}

                    <button
                        className="btn-primary"
                        onClick={handleVerify}
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: loading ? '#94a3b8' : 'var(--primary)',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.2), 0 2px 4px -1px rgba(14, 165, 233, 0.1)'
                        }}
                    >
                        {loading ? 'Verifying...' : 'Enter Secure Portal'}
                    </button>

                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem' }}>
                        Access codes ensure only verified staff can submit feedback. No personal data is recorded.
                    </p>
                </div>
            </div>
        </div>
    )
}
