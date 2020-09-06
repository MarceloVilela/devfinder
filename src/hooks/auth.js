import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [message, setMessage] = useState({})
    const [data, setData] = useState(() => {
        const token = localStorage.getItem('@DevFinder:token');
        const user = localStorage.getItem('@DevFinder:user');

        if (/*token && */user) {
            const userParsed = JSON.parse(user);
            api.defaults.headers.authorization = `Bearer ${token}`;

            return { token, user: userParsed };
        }

        return {};
    });

    const signOut = useCallback(() => {
        localStorage.removeItem('@DevFinder:token');
        localStorage.removeItem('@DevFinder:user');

        setData({});
    }, [])

    const socialAuthCallback = useCallback(({ user: userId, token }) => {
        api.defaults.headers.authorization = `Bearer ${token}`;
        localStorage.setItem('@DevFinder:token', token);

        async function loadProfile() {
            try {
                const { data: user } = await api.get('/me')

                localStorage.setItem('@DevFinder:user', JSON.stringify(user));

                setData({
                    token,
                    user
                })
            } catch (error) {
                setMessage({ content: 'Erro ao listar perfil - ' + error.message, type: 'error' })
            }
        }
        loadProfile()

        return;
    }, [setData])

    return (
        <AuthContext.Provider value={{ user: data.user, signOut, socialAuthCallback, message }}>
            {children}
        </AuthContext.Provider>
    )
};

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }
