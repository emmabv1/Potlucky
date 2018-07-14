const express = require("express");
const path = require("path");
const passport = require("passport");

const PORT = process.env.PORT || 8000;
const app = express();
var Strategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//var db = require("./models");

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID:"1702573343197074",
    clientSecret:"addac29a80ac0236f58becb2e13e06f7",
    callbackURL: 'http://localhost:3000/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
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



// Define routes.

/*
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });


  */
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
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });



  //Google Authentication 

  const GoogleCreds = {
    clientID: "291603085891-4s8cn8js9dq62v9bodcueo09v2r1kb8h.apps.googleusercontent.com" ,
    clientSecret: "rcixvYhmBoiq98aBA1S9jGbt",
    callbackURL: 'http://localhost:8000/login/google/return'
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


  app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

console.log("APP STARTED");
app.listen(PORT)
