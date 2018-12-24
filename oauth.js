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
  redirect_uri: `${hostname}/callback`,
  scope: 'api'
})

class OAuthService {
  init (app) {
    // Initial page redirecting to Github
    app.get('/auth', (req, res) => {
      res.redirect(authorizationUri)
    })

    // Callback service parsing the authorization token and asking for the access token
    app.get('/callback', (req, res) => {
      const options = {
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `${hostname}/callback`
      }

      oauth2.authorizationCode.getToken(options, (error, result) => {
        if (error) {
          console.error('Access Token Error', error.message)
          return res.json('Authentication failed')
        }

        const token = oauth2.accessToken.create(result)

        res.cookie('token', token['token']['access_token'], {
          secure: true,
          expires: 0
        })
        res.redirect(`${hostname}/game`)
      })
    })
  }
}

module.exports = {
  OAuthService: new OAuthService()
}
