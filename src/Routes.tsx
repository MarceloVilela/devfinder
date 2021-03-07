import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'

import Main from './pages/Main'
import VideoDetail from './pages/VideoDetail'

import User from './pages/User'
import UserDetail from './pages/UserDetail'

import Channel from './pages/Channel'
import ChannelDetail from './pages/ChannelDetail'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path='/login' component={Login} />

      <Route path='/' component={Main} exact />
      <Route path='/video/:id' component={VideoDetail} />

      <Route path='/user' component={User} exact />
      <Route path='/user/:username' component={UserDetail} />

      <Route path='/channel' component={Channel} exact />
      <Route path='/channel/:id' component={ChannelDetail} />
    </BrowserRouter>
  )
}