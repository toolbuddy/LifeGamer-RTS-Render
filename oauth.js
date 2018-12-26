const hostname = 'https://pd2a.imslab.org'
const simpleOauthModule = require('simple-oauth2')

const oauth2 = simpleOauthModule.create({
  client: {
    id: process.env.OAUTH_APP_ID,
    secret: process.env.OAUTH_APP_SECRET
  },
  auth: {
    tokenHost: hostname,
    tokenPath: '/gitlab/oauth/token',
    authorizePath: '/gitlab/oauth/authorize'
  }
})

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: `${hostname}/game/callback`,
  scope: 'api'
})

class OAuthService {
  init (app) {
    // Initial page redirecting to Github
    app.get('/game/auth', (req, res) => {
      res.redirect(authorizationUri)
    })

    // Callback service parsing the authorization token and asking for the access token
    app.get('/game/callback', async (req, res) => {
        const options = {
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `${hostname}/game/callback`
        }
	    try {
            const result = await oauth2.authorizationCode.getToken(options)
            const token = await oauth2.accessToken.create(result)
            res.cookie('token', token['token']['access_token'], {
                secure: true,
                expires: 0
            })
            res.redirect(`${hostname}/game`)
        } catch(error) {
            console.log(error)
        }
    })
  }
}

module.exports = {
  OAuthService: new OAuthService()
}
