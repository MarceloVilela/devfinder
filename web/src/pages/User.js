import React, { useEffect, useState } from 'react'
import { MdSyncDisabled, MdStarBorder } from 'react-icons/md'
import { toast } from 'react-toastify'

import api from '../services/api'
import { useAuth } from '../hooks/auth'
import { Header, Container } from '../components'
import './User.css'

export default function Main({ match }) {
  const { user } = useAuth();
  const [users, setUsers] = useState([])
  const [loading, setloading] = useState(false)

  useEffect(() => {
    async function loadUsers() {
      try {
        setloading(true)

        const { data } = await api.get('/devs')

        console.log(data)
        setUsers(data)
      } catch (error) {
        toast.error('Erro ao listar devs')
      } finally {
        setloading(false)
      }
    }
    loadUsers()
  }, [])

  async function handleDislike(username) {
    if (!user) {
      toast.error('Acessando como visitante, não é possível desabilitar.');
      return;
    }

    await api.post(`/devs/${username}/dislikes`)
    setUsers(users.filter(user => user.user !== username))
  }

  async function handleLike(username) {
    if (!user) {
      toast.error('Acessando como visitante, não é possível favoritar.');
      return;
    }

    await api.post(`/devs/${username}/likes`)
    setUsers(users.filter(user => user.user !== username))
  }

  return (
    <>
      <Header />

      <Container loading={loading}>
        {users.length > 0 ? (
          <ul className="users list-flex-column">
            {users.map((user) => (
              <li key={user.user}>
                <div className="avatar">
                  <img src={user.avatar} alt={user.name} />
                </div>

                <footer>
                  <div className='bio'>
                    <strong>{user.name}</strong>
                    <small>{user.bio}</small>
                  </div>

                  <div className='buttons'>
                    <button type='button' onClick={() => handleDislike(user.user)}>
                      <MdSyncDisabled className="dislike" />
                    </button>
                    <button type='button' onClick={() => handleLike(user.user)}>
                      <MdStarBorder />
                    </button>
                  </div>

                </footer>

              </li>
            ))}
          </ul>
        ) : <div className="empty">Acabou :(</div>}
      </Container>
    </>
  )
}