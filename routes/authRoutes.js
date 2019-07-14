const passport = require('passport')

// get app from index.js
module.exports = (app) => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', { // google string calls Google Strategy 
            scope: ['profile', 'email'] // specifies what access we want, in this case profile and email address
        })
    )

    app.get('/auth/google/callback', passport.authenticate('google'))

    app.get('/api/logout', (req, res) => {
        req.logout()
        res.send(req.user)
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

}


