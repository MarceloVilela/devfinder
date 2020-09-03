const Dev = require('../models/Dev')
const Channel = require('../models/Channel')

module.exports = {
  async store(req, res) {
    const { authorization: user } = req.headers
    const { username } = req.params

    console.log(`user ${user} follow channel ${username}`)
    const loggedDev = await Dev.findById(user)
    const targetChannel = await Channel.findOne({ name: username })

    if (!targetChannel) {
      return res.status(400).json({ error: 'Channel not exists' })
    }

    if (!loggedDev.follow.includes(targetChannel._id)) {
      loggedDev.follow.push(targetChannel._id)
      await loggedDev.save()
    }

    return res.json(loggedDev)
  }
}