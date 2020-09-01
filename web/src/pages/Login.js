import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

import './Login.css'

export default function Login({ history }) {
  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem('@DevFinder:user');
  }, [])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('id')

    if (userId) {
      console.log(`login-queryParam.id-${userId}`)
      localStorage.setItem('@DevFinder:user', userId)
      history.push('main')
    }
  }, [history, location.search])

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