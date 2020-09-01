const express = require('express')
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

const ChannelController = require('./controllers/ChannelController')

const YtdSubscriptionsController = require('./controllers/YtdSubscriptionsController')
const YtdQuickStartController = require('./controllers/YtdQuickStartController')

const CreateDevService = require('./services/CreateDev')

const routes = express.Router()

routes.get('/', (req, res) => {
  return res.json({ message: `Hello World`, params: req.params, body: req.body, query: req.query })
})

routes.use(passport.initialize());
routes.use(passport.session());

passport.serializeUser((dev, done) => {
  console.log('serializeUser', dev)
  done(null, dev._id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser', id)
  done(null, { dev: { _id: id } })
});

passport
  .use(
    new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.APP_API_URL + '/auth/github/callback'
    },
      async function (accessToken, refreshToken, profile, cb) {
        const dev = await CreateDevService({
          user: profile.username,
          name: profile.displayName,
          bio: profile._json.bio,
          avatar: profile.photos[0].value
        })

        return cb(null, dev);
      }
    ));

routes.get('/auth/github', passport.authenticate('github'));

routes.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    const { _id, name, user, bio, avatar, createdAt, updatedAt, likes, deslikes } = req.user;
    return res.redirect(process.env.APP_WEB_URL + `?id=${_id}`)
    return res.json({ 'auth': 'github', _id, name, user, bio, avatar, createdAt, updatedAt, likes, deslikes })
  }
);


routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.post('/devs/:username/likes', LikeController.store)
routes.post('/devs/:username/dislikes', DislikeController.store)

routes.get('/channels', ChannelController.index)
routes.post('/channels', ChannelController.store)

routes.get('/ytd/subscriptions', YtdSubscriptionsController.index)
routes.get('/ytd/auth', YtdQuickStartController.index)
//routes.get('/ytd/channel', YtdSubscriptionsController.getChannel)

module.exports = routes