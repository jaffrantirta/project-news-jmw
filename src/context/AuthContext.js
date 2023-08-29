import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../auth/Client"
import Loader from "../utils/Loader"

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

const login = (email, password) => supabase.auth.signInWithPassword({ email, password })

const signOut = () => supabase.auth.signOut()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true);

    const checkSession = async () => {
        setLoading(true)
        const { data } = await supabase.auth.getSession()
        if (data.session === null) {
            setAuth(false)
            setUser(null)
        } else {
            setAuth(true)
            setUser(data.user)
        }
        setLoading(false)
    }
    const updateSession = async () => {
        await checkSession();
    };

    useEffect(() => {
        checkSession()
    }, [])

    if (loading) {
        return <Loader loadText={'Mohon tunggu...'} />
    }

    return (
        <AuthContext.Provider value={{ user, auth, login, signOut, updateSession }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
