const express = require("express");
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;
const app = express();
var Strategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

require("./routes.js")(app);

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.

// Edited by Cameron at lines 121-124 for security on 07/28
passport.use(new Strategy({
    //clientID: process.env.facebookClientId,
    //clientSecret: process.env.facebookClientSecret,
    /*old none secure code:*/ clientID:"1702573343197074",
    /* old none secure code:*/ clientSecret:"addac29a80ac0236f58becb2e13e06f7",
    callbackURL: 'https://secure-wave-40762.herokuapp.com/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    const searchConditions = {
       email: profile.username
    };

    const newUser = {
      email: profile.username,
      name: profile.displayName
    }

   db.User
     .findOrCreate({ where: searchConditions, defaults: newUser })
     .spread((user, created) => {
       return cb(null, user)
     })
    //return cb(null, profile);
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Create a new Express application.

app.use('/static', express.static(path.join(__dirname, 'client/build/static')));

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//Emma's code
app.get('/', function(req, res) {
  console.log("IN Emma's code!!!!")
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.get('/api/test', function(req, res) {
  console.log("IN TEST");
})

app.get('/login',
  function(req, res){
    console.log("IN LOGIN!!!!")
    res.render('login');
  });

app.get('/login/facebook',
passport.authenticate('facebook'));

app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(`/#/${req.user.id}/home`);
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

  //Google Authentication 
  // Edited by Cameron at lines 121-124 for security on 07/28
const GoogleCreds = {
  //clientID: process.env.googleClientID,
  //clientSecret: process.env.googleClientSecret,
  /* old none secure code: */ clientID: "291603085891-hbrfsgkng5vpr0big7i451e477srptbo.apps.googleusercontent.com" ,
  /* old none secure code: */ clientSecret: "vPiuuQ-Y_TD6QQv4ktiwiGKM",
  //callbackURL: 'https://secure-wave-40762.herokuapp.com/auth/google/callback'
  callbackURL: 'http://localhost:8000/auth/google/callback'
}

passport.use(new GoogleStrategy(GoogleCreds,
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
      const searchConditions = {
        email: profile.emails[0].value
      };

      const newUser = {
        email: profile.emails[0].value,
        name: profile.displayName
      }

    db.User
      .findOrCreate({ where: searchConditions, defaults: newUser })
      .spread((user, created) => {
        return cb(null, user)
      })
  }))


app.get('/auth/google',
passport.authenticate('google', { scope: ['profile','email'] }));


app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.user);
    // Successful authentication, redirect home.
    res.redirect(`/#/${req.user.id}/home`);
  });

db.sequelize.sync().then(function() {
//db.sequelize.sync({force:true}).then(function() {

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});