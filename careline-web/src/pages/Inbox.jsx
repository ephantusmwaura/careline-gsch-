import React, { useState, useEffect } from 'react'

export default function Inbox() {
    const [messages] = useState([])
    const [loading] = useState(false)

    useEffect(() => {
        // Ideally, we would fetch based on the anonymous session_id stored in localStorage
        // For now, we'll fetch all public demos or verify session logic
        // specific to how "anonymous" sessions are tracked (e.g. tracking cookie/ID in DB)
        const fetchMessages = async () => {
            // Mocking fetch or using logic if session_id exists
        }
        fetchMessages()
    }, [])

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '800px' }}>


            <div className="glass-panel" style={{ padding: '2rem', minHeight: '50vh' }}>
                <h1 style={{ color: 'var(--text)', marginBottom: '1.5rem' }}>My Inbox</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : messages.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: '2rem' }}>
                        <p>No messages yet.</p>
                        <small>Responses from admin will appear here.</small>
                    </div>
                ) : (
                    <ul>
                        {messages.map(msg => <li key={msg.id}>{msg.content}</li>)}
                    </ul>
                )}
            </div>
        </div>
    )
}
