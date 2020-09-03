const {Query} = require('mongoose')
const { validate: isUuid } = require('uuid');

const Dev = require('../models/Dev')
const createDevService = require('../services/CreateDev')

module.exports = {
  async index(req, res) {
    const { authorization: user } = req.headers

    let devs = [];

    if (isUuid(user)) {
      const loggedDev = await Dev.findById(user)
      console.log('usuario logado: ', loggedDev);

      if (!loggedDev) {
        throw new Error(`user ${user} not found`)
      }

      devs = await Dev.find({
        $and: [
          { _id: { $ne: user } },
          { _id: { $nin: loggedDev.likes } },
          { _id: { $nin: loggedDev.deslikes } },
        ],
      })
    }
    else {
      devs = await Dev.find()
    }

    return res.json(devs)
  },

  async store(req, res) {
    const { username: user } = req.body

    const dev = await createDevService({ user })

    return res.json(dev)
  }
}