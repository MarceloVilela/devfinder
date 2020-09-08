import React, { createContext, useCallback, useState, useContext, ReactNode } from 'react'
import api from '../services/api';

interface AuthProviderProps {
    children: ReactNode;
}

export interface UserData {
    likes: string[];
    deslikes: string[];
    follow: string[];
    ignore: [];
    _id: string;
    name: string;
    user: string;
    bio?: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

interface AuthData {
    token: string;
    user: UserData;
}

interface ReturnedCode {
    token: string;
}

interface AuthContextData {
    user: UserData;
    socialAuthCallback(data: ReturnedCode): void;
    signOut(): void;
    message: {
        content?: string;
        type?: string;
    };
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [message, setMessage] = useState({})
    const [data, setData] = useState<AuthData>(() => {
        const token = localStorage.getItem('@DevFinder:token');
        const user = localStorage.getItem('@DevFinder:user');

        if (token && user) {
            const userParsed = JSON.parse(user);
            api.defaults.headers.authorization = `Bearer ${token}`;

            return { token, user: userParsed };
        }

        return {} as AuthData;
    });

    const signOut = useCallback(() => {
        localStorage.removeItem('@DevFinder:token');
        localStorage.removeItem('@DevFinder:user');

        setData({} as AuthData);
    }, [])

    const socialAuthCallback = useCallback(({ token }) => {
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
    const context = useContext<AuthContextData>(AuthContext);

    return context;
}

export { AuthProvider, useAuth }
