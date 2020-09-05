const Video = require('../models/Video');
const Dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    const { userId } = req;

    let videos = [];

    if (userId) {
      const loggedDev = await Dev.findById(userId)

      if (!loggedDev) {
        throw new Error(`user ${userId} not found`)
      }

      console.log(`trending de ${loggedDev.name}, ignora os canais ${loggedDev.ignore.join(',')}`)
      videos = await Video.find({
        $and: [
          { channel_id: { $nin: loggedDev.ignore } },
        ],
      })
    }
    else {
      videos = await Video.find()
    }

    return res.json(videos)
  }
}