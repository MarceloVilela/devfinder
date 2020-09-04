import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

import { useAuth } from '../hooks/auth';
import './Login.css'

export default function Login({ history }) {
  const location = useLocation();
  const { user, socialAuthCallback, signOut, message } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('id')
    const token = queryParams.get('token')
    const user = { id: userId }

    if (userId) {
      socialAuthCallback({ user, token })
    }
  }, [location.search, socialAuthCallback])

  useEffect(() => {
    if (user && Object.keys(user).includes('_id')) {
      history.push('/main');
    }
  }, [history, user])

  useEffect(() => {
    if (message) {
      toast.error(message.content);
    }
  }, [message])

  return (
    <div className='login-container'>
      <form>
        <h1 className="logo">DevFinder</h1>

        <Link to='main' className="login-visitor">Acessar como visitante</Link>

        <a href={process.env.REACT_APP_API_URL + '/auth/github'} className="login-social-github">Acessar com Github</a>
      </form>
    </div>
  )
}