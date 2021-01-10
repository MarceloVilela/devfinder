import React from 'react'
import { Link } from 'react-router-dom'
import { FaYoutube, FaGithub, FaSignOutAlt, FaHome } from 'react-icons/fa';

import { Wrapper } from './style'

export default function Header() {
  return (
    <Wrapper>
      <section>
        <Link to={`/`}>
          <h1 className="logo">{process.env.REACT_APP_TITLE}</h1>
        </Link>

        <nav>
          <Link to={`/`}>
            <FaHome />
            <span>Home</span>
          </Link>

          <Link to={`/user`}>
            <FaGithub />
            <span>Usuários</span>
          </Link>

          <Link to={`/channel`}>
            <FaYoutube />
            <span>Canais</span>
          </Link>

          <Link to={`/login?logout=1`}>
            <FaSignOutAlt />
            <span>Sair</span>
          </Link>
        </nav>
      </section>
    </Wrapper>
  )
}