const express = require("express");
const path = require("path");
const passport = require("passport");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.static('client/build'))

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(PORT)