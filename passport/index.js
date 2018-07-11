const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GoogleCreds = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CB_URL
  }

  passport.use(new GoogleStrategy(GoogleCreds,
    (accessToken, refreshToken, profile, cb) => {
      const searchConditions = {
        $or: [
          { email: profile.emails[0].value},
          { google_id: profile.id.toString() }
        ]
      };
  
      const newUser = {
        email: profile.emails[0].value,
        google_id: profile.id.toString(),
        username: profile.displayName
      }
  
      users
        .findOrCreate({ where: searchConditions, defaults: newUser })
        .spread((user, created) => {
          readings.findAll({ where: { user_id: user.id } })
            .then(data => {
              logged = {user: user, account: data}
              cb(null, logged)
            })
        })
    }))

    module.exports = passport;