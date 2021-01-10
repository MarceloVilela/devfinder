import React, { useCallback, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { LoginContainer } from './style'

interface LoginProps {
  history: {
    push(route: string): void;
  }
}

const Login: React.FC<LoginProps> = ({ history }) => {
  const location = useLocation();
  const { user, socialAuthCallback, signOut, message } = useAuth();

  const loadProfile = useCallback(async function(token: string) {
    try {
      api.defaults.headers.authorization = `Bearer ${token}`;
      const config = {
        headers: { authorization: `Bearer ${token}` }
      };

      const { data: user } = await api.get('/me', config);

      socialAuthCallback({ token, user });
    } catch (error) {
      toast.error(`Erro ao listar perfil - ${error.message}`);
    }
  }, [socialAuthCallback]);

  useEffect(() => {
    signOut();
  }, [signOut])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (typeof token === 'string') {
      loadProfile(token);
    }
  }, [location.search, loadProfile])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const logout = queryParams.get('logout');

    if (logout) {
      return
    }

    if (user && Object.keys(user).includes('_id')) {
      history.push('/');
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

        <Link to='/' className="login-visitor">Acessar como visitante</Link>

        <a href={process.env.REACT_APP_API_URL + '/auth/github'} className="login-social-github">Acessar com Github</a>
      </form>
    </LoginContainer>
  )
}

export default Login;