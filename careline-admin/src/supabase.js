import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client

try {
    if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
        console.warn('Supabase URL missing or invalid. Check .env file.')
        throw new Error('Missing Supabase Configuration')
    }
    client = createClient(supabaseUrl, supabaseKey)
} catch (error) {
    // Fallback mock to prevent app crash on load
    client = {
        from: () => ({
            select: () => ({ order: () => ({}) }),
            insert: () => ({})
        }),
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } }),
            signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signOut: () => Promise.resolve()
        },
        rpc: () => Promise.resolve({ error: { message: 'Supabase not configured' } })
    }
}

export const supabase = client
