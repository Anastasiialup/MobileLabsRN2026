import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
    }, []);

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);
    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
