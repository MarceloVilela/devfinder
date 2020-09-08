import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/auth';
import './style.css'

interface LoginProps {
  history: {
    push(route: string): void;
  }
}

const Login: React.FC<LoginProps> = ({history}) => {
  const location = useLocation();
  const { user, socialAuthCallback, signOut, message } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token')
    //const userId = queryParams.get('id')
    //const user = { id: userId }

    if (typeof token === 'string') {
      socialAuthCallback({ token })
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

export default Login;