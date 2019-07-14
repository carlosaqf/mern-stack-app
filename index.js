const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')

require('./models/User')
// since nothing is returning from passport, we do not need to assign
require('./services/passport') 

mongoose.connect(keys.mongoURI)

const app = express()

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days in milliseconds
        keys: [keys.cookieKey] // array allows multiple keys
    }) // config object expects two things: maxAge (in ms) & keys (encrypt cookie)
)

app.use(passport.initialize())

app.use(passport.session())

 
// require returns a function which we immediately call with app
require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)

