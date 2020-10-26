import React, { useEffect, useState, useMemo } from 'react'
import { Link, } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import api from '../../services/api'
import { useAuth } from '../../hooks/auth';
import { Header, Container } from '../../components'
import { ChannelData } from '../ChannelDetail'
import './style.css'

interface ChannelsGroupedByCategory {
  [key: string]: ChannelData[];
}

interface CategoryCounter {
  [key: string]: number;
}

export default function Channel() {
  const { user } = useAuth();

  const [tabIndex, setTabIndex] = useState(0);
  const [channels, setchannels] = useState<ChannelData[]>([])
  const [loading, setloading] = useState(false)

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
  }, [])

  const channelsCategorized = useMemo(() => {
    const items = channels;
    const categoriesName = items.map(item => item.category)

    let data = { 'Todos os canais': channels } as ChannelsGroupedByCategory;

    if (user && user.follow) {
      data['Favoritos'] = channels.filter(item => user.follow.includes(item._id));
      data['Não seguidos'] = channels.filter(item => user.ignore.includes(item._id));
    }

    categoriesName.forEach(category => {
      if (category !== 'Todos os canais') {
        data[category] = channels.filter(item => item.category === category)
      }
    })

    return data
  }, [channels])

  const categories = useMemo(() => {
    return Object.keys(channelsCategorized)
  }, [channelsCategorized])

  const categoryCount = useMemo(() => {
    let data = {} as CategoryCounter;
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
            {tabIndex}
            <select onChange={(e) => setTabIndex(Number(e.target.value))}>
              {categories.map((name, key) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>

            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>

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