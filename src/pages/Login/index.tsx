import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/auth';
import { LoginContainer } from './style'

interface LoginProps {
  history: {
    push(route: string): void;
  }
}

const Login: React.FC<LoginProps> = ({ history }) => {
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
    const queryParams = new URLSearchParams(location.search);
    const logout = queryParams.get('logout');

    if (logout) {
      return
    }

    if (user && Object.keys(user).includes('_id')) {
      history.push('/main');
    }
  }, [history, user, location.search])

  useEffect(() => {
    if (message) {
      toast.error(message.content);
    }
  }, [message])

  return (
    <LoginContainer>
      <form>
        <h1 className="logo">{process.env.REACT_APP_TITLE}</h1>

        <Link to='main' className="login-visitor">Acessar como visitante</Link>

        <a href={process.env.REACT_APP_API_URL + '/auth/github'} className="login-social-github">Acessar com Github</a>
      </form>
    </LoginContainer>
  )
}

export default Login;