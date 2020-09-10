import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import api from '../../services/api'
import { useAuth } from '../../hooks/auth';
import { Header, Container, Paginate } from '../../components'
import './style.css'

interface VideoData {
  _id: string;
  title: string;
  url: string;
  channel_id: string;
  channel: string;
  channel_url: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Main() {
  const { user } = useAuth();

  const [loading, setloading] = useState(false)
  const [trendItems, setTrendItems] = useState<VideoData[]>([] as VideoData[])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const [subItems, setSubItems] = useState<VideoData[]>([] as VideoData[])

  useEffect(() => {
    async function loadTrend() {
      try {
        setloading(true)
        const { data } = await api.get('/feed/trending', { params: { page } })
        setTrendItems(data.docs)
        setTotal(data.total);
        setItemsPerPage(data.itemsPerPage);
      } catch (error) {
        toast.error('Erro ao listar feed')
      } finally {
        setloading(false)
      }
    }
    loadTrend()
  }, [page])

  useEffect(() => {
    if (!user) {
      //toast.warn('Acesse através de login social para listar videos das inscrições.')
      return;
    }

    async function loadSubscriptions() {
      try {
        setloading(true)
        const { data } = await api.get('/feed/subscriptions')
        setSubItems(data)
      } catch (error) {
        toast.error('Erro ao listar feed das inscrições')
      } finally {
        setloading(false)
      }
    }
    loadSubscriptions()
  }, [user])

  return (
    <>
      <Header />

      <Container loading={loading} className="container-full-width">
        <Tabs>
          <TabList>
            <Tab>Explorar</Tab>
            {(user && user._id) &&
              <Tab>Inscrições</Tab>
            }

          </TabList>

          <TabPanel>
            {trendItems.length > 0 ? (
              <ul className="subs list-flex-column">
                {trendItems.map((item) => (
                  <li key={item._id}>
                    <div className="thumb">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                      />
                    </div>

                    <footer className='container-edge-spacing'>
                      <div className='avatar'>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                        />
                      </div>

                      <div className='bio'>
                        <strong>{item.title}</strong>
                        <small>{item.channel}</small>
                      </div>
                    </footer>

                  </li>
                ))}
              </ul>
            ) : <div className="empty">Acabou :(</div>}
            <div>{total} / {itemsPerPage}</div>
            <Paginate page={page} totalItems={total} itemsPerPage={itemsPerPage} handlePaginate={setPage} />
          </TabPanel>
          {(user && user._id) &&
            <TabPanel>
              {subItems.length > 0 ? (
                <ul className="subs list-flex-column">
                  {subItems.map((item) => (
                    <li key={item._id}>
                      <div className="thumb">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                        />
                      </div>

                      <footer className='container-edge-spacing'>
                        <div className='avatar'>
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        </div>

                        <div className='bio'>
                          <strong>{item.title}</strong>
                          <small>{item.channel}</small>
                        </div>
                      </footer>

                    </li>
                  ))}
                </ul>
              ) : <div className="empty">Acabou :(</div>}
            </TabPanel>
          }
        </Tabs>


      </Container>
    </>
  )
}