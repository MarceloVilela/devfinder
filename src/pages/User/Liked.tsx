import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MdStarBorder } from 'react-icons/md'

import api from '../../services/api'
import { useAuth, UserData } from '../../hooks/auth'
import { Container, UserItem } from '../../components'
import './style.css'

export default function Main() {
  const { user } = useAuth();

  const [docs, setDocs] = useState<UserData[]>([] as UserData[])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loaddocs() {
      try {
        setLoading(true)
        const { data } = await api.get('/devs/likes')
        setDocs(data)
      } catch (error) {
        toast.error('Erro ao listar devs')
      } finally {
        setLoading(false)
      }
    }
    loaddocs()
  }, [])

  async function handleUndoLike(username: string) {
    if (!user) {
      toast.error('Acessando como visitante, não é possível favoritar.');
      return;
    }

    await api.delete(`/devs/${username}/likes`)
    toast.success(`${username} saiu de: Favoritos`);
    setDocs(docs.filter(user => user.user !== username))
  }

  return (
    <Container loading={loading} unstylized className="container-full-width">
      <ul className="users list-flex-row">
        {docs.map((user) => (
          <UserItem key={user.user} user={user}>
            <div className='buttons single'>
              <button type='button' onClick={() => handleUndoLike(user.user)}>
                <MdStarBorder className="dislike" />Desmarcar
              </button>
            </div>
          </UserItem>
        ))}
      </ul>
    </Container>
  )
}