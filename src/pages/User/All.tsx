import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MdSyncDisabled, MdStarBorder } from 'react-icons/md'

import api from '../../services/api'
import { useAuth, UserData } from '../../hooks/auth'
import { Container, UserItem, Paginate } from '../../components'
import './style.css'

export default function All() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState<UserData[]>([] as UserData[])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  useEffect(() => {
    async function loaddocs() {
      try {
        setLoading(true)
        const { data } = await api.get('/devs', { params: { page } })
        setDocs(data.docs)
        setTotal(data.total);
        setItemsPerPage(data.itemsPerPage);
      } catch (error) {
        toast.error('Erro ao listar devs')
      } finally {
        setLoading(false)
      }
    }
    loaddocs()
  }, [page])

  async function handleDislike(username: string) {
    if (!user) {
      toast.error('Acessando como visitante, não é possível desabilitar.');
      return;
    }

    await api.post(`/devs/${username}/dislikes`)
    toast.success(`${username} foi para: Não seguidos`);
    setDocs(docs.filter(user => user.user !== username))
  }

  async function handleLike(username: string) {
    if (!user) {
      toast.error('Acessando como visitante, não é possível favoritar.');
      return;
    }

    await api.post(`/devs/${username}/likes`)
    toast.success(`${username} foi para: Favoritos`);
    setDocs(docs.filter(user => user.user !== username))
  }

  return (
    <Container loading={loading} unstylized className="container-full-width">

      <ul className="users list-flex-column">
        {docs.map((user) => (
          <UserItem key={user.user} user={user}>
            <div className='buttons'>
              <button type='button' onClick={() => handleDislike(user.user)}>
                <MdSyncDisabled className="dislike" />
              </button>

              <button type='button' onClick={() => handleLike(user.user)}>
                <MdStarBorder />
              </button>
            </div>
          </UserItem>
        ))}
      </ul>
      <Paginate page={page} totalItems={total} itemsPerPage={itemsPerPage} handlePaginate={setPage} />

    </Container>
  )
}