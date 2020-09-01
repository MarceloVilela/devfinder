import React, {useState} from 'react'
import logo from '../assets/logo.svg';
import './Login.css'
import api from '../services/api'

export default function Login({history}) {
    const [username, setUsername] = useState('MarceloVilela')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await api.post('/devs', {
            username,
        })
        const {_id} = response.data
        history.push(`/main/${_id}`)
    }

    return (
        <div className='login-container'>
            <form onSubmit={e => handleSubmit(e)}>
                <img src={logo} alt='Tindev' />
                <input 
                    placeholder='Digite seu usuário no GitHub'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}