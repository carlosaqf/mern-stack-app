const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GithubStrategy = require('passport-github2').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

// turns user (user model instance/mongo model) to an ID
passport.serializeUser((user, done) => { // done is a callback that has to be called after passport is called
    done(null, user.id) // user.id is NOT profile ID, refers to mongo DB record ID 
})

// turn ID in to mongo model instance
// pass id to mongo DB and return specific user
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

// make use of specific strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback' // route matches authorized redirect uri
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId : profile.id })
            .then((existingUser) => {
                if (existingUser){
                    // we already have a profile with the given id
                    done(null, existingUser)
                }else{
                    // do not have a profile that exists, so create and save one
                    new User({ googleId : profile.id }) // creates mongo model instance
                        .save() // save instance
                        .then(user => done(null, user)) // 2nd instance
                }
            })
    })
)

// passport.use(
//     new GithubStrategy({
//         clientID: keys.githubClientID,
//         clientSecret: keys.githubClientSecret,
//         callbackURL: '/auth/github/callback'
//     }, (accessToken, refreshToken, profile, done) => {
//         User.findOne({ githubId : profile.id })
//             .then((existingUser) => {
//                 if (existingUser) {
//                     done(null, existingUser)
//                 }else{
//                     new User({ githubId : profile.id })
//                         .save()
//                         .then(user => done(null, user))
//                 }
//             })
//     })
// )