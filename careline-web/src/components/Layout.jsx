import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('careline_session')
        navigate('/')
    }

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/submit', label: 'New Submission', icon: '📝' },
        { path: '/inbox', label: 'My Inbox', icon: '📥' },
        { path: '/memos', label: 'Memos & Notices', icon: '📢' },
    ]

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
            {/* Sidebar */}
            <div
                style={{
                    width: isCollapsed ? '60px' : '250px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid rgba(255,255,255,0.3)',
                    transition: 'width 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem 0',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    zIndex: 10
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', padding: '0 1rem 2rem' }}>
                    {!isCollapsed && (
                        <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary)', fontWeight: '800' }}>CareLine</h2>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            color: 'var(--text-muted)'
                        }}
                    >
                        {isCollapsed ? '☰' : '«'}
                    </button>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 0.5rem' }}>
                    {navItems.map(item => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem 1rem',
                                background: location.pathname === item.path ? 'var(--primary)' : 'transparent',
                                color: location.pathname === item.path ? 'white' : 'var(--text)',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                                justifyContent: isCollapsed ? 'center' : 'flex-start',
                                transition: 'all 0.2s'
                            }}
                            title={isCollapsed ? item.label : ''}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            {!isCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div style={{ padding: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem 1rem',
                            background: 'transparent',
                            color: '#64748b',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            justifyContent: isCollapsed ? 'center' : 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                        }}
                        title="Exit Session"
                    >
                        <span style={{ fontSize: '1.1rem' }}>🚪</span>
                        {!isCollapsed && <span>Exit Session</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                {children}
            </div>
        </div>
    )
}
