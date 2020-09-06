import React, { useEffect, useState, useMemo } from 'react'
import { Link, } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import api from '../services/api'
import { Header, Container } from '../components'
import './Channel.css'

export default function Main({ match }) {
  const [channels, setchannels] = useState([])
  const [loading, setloading] = useState(false)
  const loggedUserId = localStorage.getItem('@DevFinder:user')

  useEffect(() => {
    async function loadchannels() {
      try {
        setloading(true)

        const response = await api.get('/channels')
        setchannels(response.data)
      } catch (error) {
        toast.error('Erro ao listar canais')
      } finally {
        setloading(false)
      }

    }
    loadchannels()
  }, [loggedUserId])

  const channelsCategorized = useMemo(() => {
    const items = channels;
    const names = items.map(item => item.category)

    console.log(names)
    let data = {};
    names.forEach(category => {
      if (category !== 'Todos os canais') {
        data[category] = channels.filter(item => item.category === category)
      }
      else {
        data[category] = channels
      }
    })

    console.log(data)
    return data
  }, [channels])

  const categories = useMemo(() => {
    return Object.keys(channelsCategorized)
  }, [channelsCategorized])

  const categoryCount = useMemo(() => {
    let data = {};
    Object.keys(channelsCategorized).forEach(categoryName => {
      data[categoryName] = channelsCategorized[categoryName].length
    })
    return data;
  }, [channelsCategorized])

  return (
    <>
      <Header />

      <Container loading={loading}>
        <div className='channel-container'>

          <section>
            <Tabs>

              <TabList>
                {categories.map(name => (
                  <Tab key={name}>{name}({categoryCount[name]})</Tab>
                ))}
              </TabList>

              {categories.map(name => (
                <TabPanel key={name}>
                  <ul className='channels list-flex-row'>
                    {channelsCategorized[name].map((item) => (
                      <Link to={`/channel/${item.name}`} key={item._id}>
                        <li>
                          <div className="avatar">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={item.avatar ? item.avatar : 'https://yt3.ggpht.com/a/AATXAJzF6fuUyEFRBtZSpScb9M-Dq4QI6pyv0ic3pw=s100-c-k-c0xffffffff-no-rj-mo'}
                                alt={item.name}
                              />
                            </a>
                          </div>

                          <aside>
                            <strong>{item.name}</strong>
                            <small>{item.tags.join(", ")}</small>
                          </aside>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </TabPanel>
              ))}
            </Tabs>
          </section>
        </div>
      </Container>
    </>
  )
}