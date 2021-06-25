import { createContext, ReactNode } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { auth, firebase } from '../services/firebase'

type User = {
    id: string,
    username: string,
    avatar: string
}

type AuthContextType = {
    user: User | undefined,
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<User>()

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                const { displayName, photoURL, uid } = user
    
                if(!displayName || !photoURL) {
                    throw new Error ('yeah, no.')
                }
    
                setUser({
                    id: uid,
                    username: displayName,
                    avatar: photoURL
                })
            }
        })

        return () => {unsubscribe()}
    }, [])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        
        const result = await auth.signInWithPopup(provider)
        
        if(result.user) {
            const { displayName, photoURL, uid } = result.user

            if(!displayName || !photoURL) {
                throw new Error ('yeah, no.')
            }

            setUser({
                id: uid,
                username: displayName,
                avatar: photoURL
            })
        }
    }

    async function signOut() {
        await auth.signOut()
        setUser(undefined)
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}