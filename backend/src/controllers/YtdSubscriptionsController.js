var { google } = require('googleapis');

const credentials = require('../../client_secret.json');
const authorized = require('../../youtube-nodejs-quickstart.json');

const YT3_API_KEY = process.env.YTD_API_KEY;

var OAuth2 = google.auth.OAuth2;
var clientSecret = credentials.installed.client_secret;
var clientId = credentials.installed.client_id;
var redirectUrl = credentials.installed.redirect_uris[0];
var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
oauth2Client.credentials = authorized;

const auth = oauth2Client;

const yt3 = google.youtube({
  version: 'v3',
  auth
});

module.exports = {
  async index(req, res) {

    const data = await getSubs(res);
    return res.json(data)

    async function getChannel() {
      const { data } = await yt3.channels.list({
        part: 'snippet,contentDetails,statistics',
        forUsername: 'GoogleDevelopers'
      });

      return data;
    }

    async function getSubs() {
      const { data } = await yt3.activities.list({
        part: 'id,snippet,contentDetails',
        home: true,
        
        //home: true
        //channelId: 'UC13UqsEmsJ9Z9w0--ABhxCg'
        //mine: true
        
        //part: 'snippet',
        //channelId: 'UC13UqsEmsJ9Z9w0--ABhxCg'

        //channelId: 'UC13UqsEmsJ9Z9w0--ABhxCg'
        //mine: true,
        //forChannelId: 'UC13UqsEmsJ9Z9w0--ABhxCg'

        //id: 'UC13UqsEmsJ9Z9w0--ABhxCg'
      });

      return data;
    }
  },
}