import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'

import Main from './pages/Main'
import User from './pages/User'
import Channel from './pages/Channel'
import ChannelDetail from './pages/ChannelDetail'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Login} />

      <Route path='/main' component={Main} />

      <Route path='/user' component={User} />

      <Route path='/channel' component={Channel} exact />
      <Route path='/channel/:id' component={ChannelDetail} />
    </BrowserRouter>
  )
}