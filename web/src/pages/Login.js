import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import api from '../services/api'
import './Login.css'

export default function Login({ history }) {
  const [username, setUsername] = useState('MarceloVilela')
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await api.post('/devs', {
      username,
    })
    const { _id } = response.data
    history.push(`/main/${_id}`)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('id')
    if (userId) {
      console.log(`login-queryParam.id-${userId}`)
      setUsername(userId)
      localStorage.setItem('@DevFinder:user', userId)
      history.push('main')
    }
  }, [history, location.search])

  return (
    <div className='login-container'>
      <form onSubmit={e => handleSubmit(e)}>
        <h1 className="logo">DevFinder</h1>
        <input
          placeholder='Digite seu usuário no GitHub'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type='submit'>Enviar</button>
        <a href={process.env.REACT_APP_API_URL + '/auth/github'}>Acessar com Github</a>
      </form>
    </div>
  )
}