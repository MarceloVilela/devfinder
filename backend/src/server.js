const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

require('dotenv').config({path: path.resolve(__dirname, '..', '.env')});
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
const server = express()

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(process.env.APP_PORT, () => {
  console.log('listen on: '+process.env.APP_PORT)
})