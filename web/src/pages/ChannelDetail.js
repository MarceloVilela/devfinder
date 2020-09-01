import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FaYoutube, FaGithub } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '../services/api'
import { Header, Container } from '../components'
import './ChannelDetail.css'

export default function Main({ match }) {
  const [channel, setchannel] = useState({})
  const [loading, setLoading] = useState(false)

  const history = useHistory();

  useEffect(() => {
    async function loadchannels() {
      try {
        setLoading(true)

        const response = await api.get('/channels', {
          headers: {
            user: match.params.id
          }
        })

        const { id } = match.params;
        const channelName = id.toLocaleLowerCase();

        const findById = response.data.find(item => item.name.toLocaleLowerCase() === channelName)
        if (!findById) {
          toast.error(`Ops! canal ${id} não encontrado.`);
          history.push('/channel');
        }

        const [data] = response.data.filter(item => item.name.toLocaleLowerCase() === channelName)
        console.log(match.params.id, data, response.data)

        setchannel(data)
      } catch (error) {

      } finally {
        setLoading(false)
      }

    }
    loadchannels()
  }, [history, match.params])

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