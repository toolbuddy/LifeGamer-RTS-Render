const express = require('express')
const path = require('path')

const app = express();

var port = process.env.PORT ||11000;

app.use(express.static(path.resolve(__dirname + "/dist")));


// setting server
var server = app.listen(port, () => {
    console.log(`server now listen at ${port} port.`)
})
