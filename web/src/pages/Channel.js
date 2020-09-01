import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Link, } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa';

import api from '../services/api'
import { Header, Container, IconCategory } from '../components'
import './Channel.css'

export default function Main({ match }) {
  const [channels, setchannels] = useState([])
  const [loading, setloading] = useState(false)
  const [filter, setFilter] = useState('')
  const loggedUserId = localStorage.getItem('@DevFinder:user')

  useEffect(() => {
    async function loadchannels() {
      try {
        setloading(true)

        const response = await api.get('/channels', {
          headers: {
            user: undefined
          }
        })
        setchannels(response.data)
      } catch (error) {

      } finally {
        setloading(false)
      }

    }
    loadchannels()
  }, [loggedUserId])

  const categories = useMemo(() => {
    const items = channels;

    const names = items.map(item => item.category)
    const uniqueNames = ['Todos os canais', ...new Set(names)]

    return uniqueNames
  }, [channels])

  const channelsFiltered = useMemo(() => {
    return filter ? channels.filter(item => item.category === filter) : channels
  }, [channels, filter])

  const channelsCount = useMemo(() => {
    return filter ? channels.filter(item => item.category === filter).length : channels.length
  }, [channels, filter])

  const handleSetCategory = useCallback((categoryName) => {
    const value = channels.filter(item => item.category === categoryName).length
      ? categoryName
      : ''

    setFilter(value)
  }, [channels])

  return (
    <>
      <Header />

      <Container loading={loading}>
        <div className='channel-container'>

          <aside>
            {categories.length > 1 ? (
              <ul className='categories list-flex-row'>
                {categories.map((name) => (
                  <li
                    key={name}
                    onClick={() => handleSetCategory(name)}
                    className={(name === filter) || (filter === '' && name === 'Todos os canais') ? 'selected' : ''}
                  >
                    <div><IconCategory name={name} /></div>
                    <p>{name}</p>
                  </li>
                ))}
              </ul>
            ) : ''}
          </aside>

          <section>
            <div className="channels-description">
              <p>
                <strong>{channelsCount} </strong> canais
                {!!filter && (<>&nbsp; sobre <strong>{filter}</strong></>)}
                , essa lista foi baseada no projeto
                <a
                  href="https://github.com/carolsoaressantos/videos-pt.br-tecnologia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </a>
              </p>
            </div>

            {(channelsFiltered.length > 0) && (
              <ul className='channels list-flex-row'>
                {channelsFiltered.map((item) => (
                  <Link to={`/channel/${item._id}`} key={item._id}>
                    <li>
                      <div className="avatar">
                        <img
                          src={item.avatar ? item.avatar : 'https://yt3.ggpht.com/a/AATXAJzF6fuUyEFRBtZSpScb9M-Dq4QI6pyv0ic3pw=s100-c-k-c0xffffffff-no-rj-mo'}
                          alt={item.name}
                        />
                      </div>

                      <aside>
                        <strong>{item.name}</strong>
                        <small>{item.tags.join(", ")}</small>
                      </aside>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </section>
        </div>
      </Container>
    </>
  )
}