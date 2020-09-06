import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FaYoutube, FaGithub } from 'react-icons/fa';
import { MdSyncDisabled, MdStarBorder } from 'react-icons/md'
import { toast } from 'react-toastify';

import api from '../services/api'
import { useAuth } from '../hooks/auth';
import { Header, Container } from '../components'
import './ChannelDetail.css'

export default function Main({ match }) {
  const { user } = useAuth();
  console.log('detail.useAuth', user);
  const [channel, setchannel] = useState({})
  const [loading, setLoading] = useState(false)

  const history = useHistory();

  useEffect(() => {
    async function loadchannels() {
      const { id } = match.params;
      const channelName = id.toLocaleLowerCase();

      try {
        setLoading(true)

        const response = await api.get('/channels')

        const findById = response.data.find(item => item.name.toLocaleLowerCase() === channelName)
        if (!findById) {
          toast.error(`Ops! canal ${id} não encontrado.`);
          history.push('/channel');
        }

        const [data] = response.data.filter(item => item.name.toLocaleLowerCase() === channelName)

        setchannel(data)
      } catch (error) {
        toast.error(`Erro ao detalhes do canal: ${id}`)
      } finally {
        setLoading(false)
      }

    }
    loadchannels()
  }, [history, match.params])

  async function handleDislike() {
    if (!user) {
      toast.error('Acessando como visitante, não é possível desabilitar.');
      return;
    }

    try {
      await api.post(`/channels/${channel.name}/dislikes`)
      toast.success('Desabilitado com sucesso')
    } catch (error) {
      toast.error('Erro ao desabilitar.');
    }
  }

  async function handleLike() {
    if (!user) {
      toast.error('Acessando como visitante, não é possível favoritar.');
      return;
    }

    try {
      await api.post(`/channels/${channel.name}/likes`)
      toast.success('Favoritado com sucesso')
    } catch (error) {
      toast.error('Erro ao favoritar.');
    }
  }

  return (
    <>
      <Header />

      <Container loading={loading}>

        {
          '_id' in channel && (
            <>
              <ul className="about">
                <li key={channel._id}>
                  <div className="avatar">
                    <img
                      src={channel.avatar ? channel.avatar : 'https://yt3.ggpht.com/a/AATXAJzF6fuUyEFRBtZSpScb9M-Dq4QI6pyv0ic3pw=s100-c-k-c0xffffffff-no-rj-mo'}
                      alt={channel.name}
                    />
                  </div>

                  <aside>
                    <h3>{channel.name}</h3>

                    <div>
                      <strong>Tags</strong>
                      <p>{channel.tags.join(", ")}</p>
                    </div>

                    <div>
                      <strong>Sobre</strong>
                      <p>{channel.description}</p>

                      <div className='buttons'>
                        <button type='button' onClick={() => handleDislike()}>
                          <MdSyncDisabled className="dislike" />
                        </button>
                        <button type='button' onClick={() => handleLike()}>
                          <MdStarBorder />
                        </button>
                      </div>
                    </div>

                    <div>
                      <strong>Acessar</strong>
                      <a
                        href={channel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaYoutube color="#ff0000" />
                      </a>
                      {channel.userGithub &&
                        <a
                          href={`https://github.com/${channel.userGithub}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub color="#fff" />
                        </a>
                      }
                    </div>
                  </aside>
                </li>
              </ul>
            </>
          )
        }
      </Container>
    </>
  )
}