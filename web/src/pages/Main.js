import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import api from '../services/api'
import { Header, Container } from '../components'
import subsPlaceHolder from '../assets/subs.json'
import Thumbnail from '../assets/thumbnail.jpg'
import './Main.css'

export default function Main({ match }) {
  const [trendItems, setTrendItems] = useState([])
  const [subItems, setSubItems] = useState([])
  const [loading, setloading] = useState(false)

  useEffect(() => {
    async function loadTrend() {
      try {
        setloading(true)
        const { data } = await api.get('/feed/trending')
        setTrendItems(data)
      } catch (error) {
        toast.error('Erro ao listar feed')
      } finally {
        setloading(false)
      }
    }
    loadTrend()
  }, [])

  useEffect(() => {
    async function loadTrend() {
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
    loadTrend()
  }, [])

  return (
    <>
      <Header />

      <Container loading={loading} className="container-full-width">
        <Tabs>
          <TabList>
            <Tab>Explorar</Tab>
            <Tab>Inscrições</Tab>
          </TabList>

          <TabPanel>
            {trendItems.length > 0 ? (
              <ul className="subs list-flex-column">
                {trendItems.map((item) => (
                  <li key={item.title}>
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
          <TabPanel>
            {subItems.length > 0 ? (
              <ul className="subs list-flex-column">
                {subItems.map((item) => (
                  <li key={item.title}>
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
        </Tabs>


      </Container>
    </>
  )
}