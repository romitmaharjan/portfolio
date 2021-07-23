const express = require('express')
const cors = require('cors')
const passsport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.sessionText,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}))

app.use(passsport.initialize())
app.use(passsport.session())

module.exports = app