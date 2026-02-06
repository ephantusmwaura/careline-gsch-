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
        {
            path: '/dashboard',
            label: 'Dashboard',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        },
        {
            path: '/submit',
            label: 'New Submission',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        },
        {
            path: '/inbox',
            label: 'My Inbox',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        },
        {
            path: '/memos',
            label: 'Memos & Notices',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        },
    ]

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
            {/* Sidebar */}
            <div
                style={{
                    width: isCollapsed ? '70px' : '260px',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'var(--backdrop-blur)',
                    borderRight: '1px solid var(--glass-border)',
                    transition: 'width 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.5rem 0',
                    position: 'sticky',
                    top: 0,

                    height: '100vh',
                    zIndex: 10,
                    boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', padding: '0 1.5rem 2rem' }}>
                    {!isCollapsed && (
                        <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary)', fontWeight: '800', letterSpacing: '-0.5px' }}>CareLine</h2>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px'
                        }}
                    >
                        {isCollapsed ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        )}
                    </button>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 1rem' }}>
                    {navItems.map(item => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.8rem 1rem',
                                background: location.pathname === item.path ? 'var(--primary)' : 'transparent',
                                color: location.pathname === item.path ? 'white' : 'var(--text-light)',
                                border: 'none',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: location.pathname === item.path ? '600' : '500',
                                justifyContent: isCollapsed ? 'center' : 'flex-start',
                                transition: 'all 0.2s',

                            }}
                            title={isCollapsed ? item.label : ''}
                        >
                            <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                            {!isCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.8rem 1rem',
                            background: isCollapsed ? 'transparent' : 'rgba(0,0,0,0.03)',
                            color: 'var(--text)',
                            border: '1px solid transparent',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            justifyContent: isCollapsed ? 'center' : 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            transition: 'all 0.2s'
                        }}
                        title="Exit Session"
                    >
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </span>
                        {!isCollapsed && <span>Exit Session</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    {children}
                </main>
                <footer style={{
                    padding: '1rem',
                    textAlign: 'center',
                    color: 'var(--text-light)',
                    fontSize: '0.8rem',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'var(--backdrop-blur)',
                    borderTop: '1px solid var(--glass-border)'
                }}>
                    gsch careline service system@2026
                </footer>
            </div>
        </div>
    )
}
