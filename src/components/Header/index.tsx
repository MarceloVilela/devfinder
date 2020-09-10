import React from 'react'
import { Link } from 'react-router-dom'
import { FaYoutube, FaGithub, FaSignOutAlt, FaHome } from 'react-icons/fa';

import './style.css'

export default function Header() {
  return (
    <header>
      <section>
        <Link to={`/main`}>
          <h1 className="logo">{process.env.REACT_APP_TITLE}</h1>
        </Link>

        <nav>
          <Link to={`/main`}>
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

          <Link to={`/`}>
            <FaSignOutAlt />
            <span>Sair</span>
          </Link>
        </nav>
      </section>
    </header>
  )
}