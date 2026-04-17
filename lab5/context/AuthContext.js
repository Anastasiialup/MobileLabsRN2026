import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState([]); // Тимчасове сховище користувачів

    const register = (email, password, name) => {
        const newUser = { email, password, name };
        setUsers((prev) => [...prev, newUser]);
        setIsAuthenticated(true); // Автоматичний вхід після реєстрації
    };

    const login = (email, password) => {
        // Шукаємо користувача в нашому масиві
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setIsAuthenticated(true);
            return true;
        }
        return false; // Користувача не знайдено
    };

    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
