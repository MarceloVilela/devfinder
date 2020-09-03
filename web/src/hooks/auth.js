import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        //const token = localStorage.getItem('@DevFinder:token');
        const user = localStorage.getItem('@DevFinder:user');
        console.log('auth-recover', user)

        if (/*token && */user) {
            const userParsed = JSON.parse(user);
            //api.defaults.headers.authorization = `Bearer ${token}`;
            api.defaults.headers.authorization = userParsed.id;

            console.log('auth-setData', userParsed)
            return { /*token,*/ user: userParsed };
        }

        return {};
    });

    const signOut = useCallback(() => {
        localStorage.removeItem('@DevFinder:token');
        localStorage.removeItem('@DevFinder:user');

        setData({});
    }, [])

    const socialAuthCallback = useCallback((user) => {
        api.defaults.headers.authorization = user.id;

        localStorage.setItem('@DevFinder:user', JSON.stringify(user));

        setData({
            //token: data.token,
            user
        })
    }, [setData])

    return (
        <AuthContext.Provider value={{ user: data.user, signOut, socialAuthCallback }}>
            {children}
        </AuthContext.Provider>
    )
};

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }
