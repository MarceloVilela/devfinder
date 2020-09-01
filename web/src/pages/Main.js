import React, { useEffect, useState } from 'react'

import api from '../services/api'
import subsPlaceHolder from '../assets/subs.json'
import Thumbnail from '../assets/thumbnail.jpg'
import { Header, Container } from '../components'
import './Main.css'

export default function Main({ match }) {
  const [subs, setSubs] = useState([])
  const [loading, setloading] = useState(false)
  const loggedUserId = localStorage.getItem('@DevFinder:user')

  useEffect(() => {
    async function loadUsers() {
      try {
        setloading(true)

        await api.get('/devs', {
          headers: {
            user: loggedUserId
          }
        })
        setSubs(subsPlaceHolder.filter(item => !item.channel.includes('Zurubabel')))
      } catch (error) {
      } finally {
        setloading(false)
      }
    }
    loadUsers()
  }, [loggedUserId])

  return (
    <>
      <Header />

      <Container loading={loading} className="container-full-width">
        {subs.length > 0 ? (
          <ul className="subs list-flex-column">
            {subs.map((item) => (
              <li key={item.title}>
                <div className="thumb">
                  <img
                    src={Thumbnail}
                    alt={item.title}
                  />
                </div>

                <footer className='container-edge-spacing'>
                  <div className='avatar'>
                    <img
                      src={'https://yt3.ggpht.com/a/AATXAJzF6fuUyEFRBtZSpScb9M-Dq4QI6pyv0ic3pw=s100-c-k-c0xffffffff-no-rj-mo'}
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
      </Container>
    </>
  )
}