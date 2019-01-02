const express = require('express')
const path = require('path')

const { OAuthService } = require('./oauth')

const app = express();

var port = process.env.PORT || 5000;

app.use('/game', express.static(path.resolve(__dirname + "/dist")));

OAuthService.init(app)

// setting server
var server = app.listen(port, () => {
    console.log(`server now listen at ${port} port.`)
})
