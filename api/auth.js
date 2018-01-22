// Still in development- will handle any authentication with google... Can mostly ignore this stuff
var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const ETHICAL_SECRET = process.env.ETHICAL_SECRET;

const users = [
  {id: '2f24vvg', username: 'Andrew Linxie', password: ETHICAL_SECRET}
]
// var google = require('googleapis');
// var OAuth2 = google.auth.OAuth2;
//
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// var REDIRECT_URL = 'http://localhost:3000/auth/redir';
//
// var scopes = [
//   "https://www.googleapis.com/auth/admin.directory.group.readonly"
// ];
// // var url = oauth2Client.generateAuthUrl({
// //   // 'online' (default) or 'offline' (gets refresh_token)
// //   access_type: 'offline',
// //
// //   // If you only need one scope you can pass it as a string
// //   scope: scopes,
// //
// //   // Optional property that passes state parameters to redirect URI
// //   // state: 'foo'
// // });
// passport.use(new Strategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/login/facebook/return'
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // In this example, the user's Facebook profile is supplied as the user
//     // record.  In a production-quality application, the Facebook profile should
//     // be associated with a user record in the application's database, which
//     // allows for account linking and authentication with other identity
//     // providers.
//     return cb(null, profile);
//   }));
//
//
// // Configure Passport authenticated session persistence.
// //
// // In order to restore authentication state across HTTP requests, Passport needs
// // to serialize users into and deserialize users out of the session.  In a
// // production-quality application, this would typically be as simple as
// // supplying the user ID when serializing, and querying the user record by ID
// // from the database when deserializing.  However, due to the fact that this
// // example does not have a database, the complete Facebook profile is serialized
// // and deserialized.
// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });
//
// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });
//


// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'username',
    passwordField: 'loginSecret'
  },
  (username, password, done) => {
    console.log('Inside local strategy callback');
    // here is where you make a call to the database
    // to find the user based on their username or email address
    // for now, we'll just pretend we found that it was users[0]
    console.log(username);
    console.log(password);
    var user = users[0]
    console.log(user.password);
    if(!user.password || password === user.password) {
      console.log('Local strategy returned true')
      return done(null, user);
    } else {
      return done(true);
    }
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here')
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  const user = users[0].id === id ? users[0] : false;
  done(null, user);
});

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', (req, res, next) => {
  console.log('Inside POST /login callback')
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    console.log(`req.user: ${JSON.stringify(req.user)}`)
    req.login(user, (err) => {
      console.log('Inside req.login() callback')
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      if (err) {
        var err = new Error('Incorrect Password');
        err.status = 500;
        next(err);
      } else {
        res.json({user: user, authenticated: true});
      }
    })
  })(req, res, next);
});

/* GET home page. */
// router.post('/login', function(req, res, next) {
//   // var oauth2Client = new OAuth2(
//   //   YOUR_CLIENT_ID, j
//   //   YOUR_CLIENT_SECRET,
//   //   "http://localhost:3001/asana"
//   // );
//   //var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
//   console.log(req.sessionID);
//   var secret = req.body.loginSecret;
//   /* if (secret === "ethiCAL rules") { */
//   if (!ETHICAL_SECRET || secret === ETHICAL_SECRET) {
//     res.json({authenticated: true});
//     res.status(200);
//   } else {
//     var err = new Error('Incorrect Password');
//     err.status = 500;
//     next(err);
//   }
// });
router.get('/authenticated', (req, res, next) => {
  console.log("In authenticated");
  if(req.isAuthenticated()) {
      console.log("Is authenticated");
      res.json({authenticated: true})
    } else {
      console.log("Not authenticated");
      res.json({authenticated: false})
    }
  }
)

// router.get('')
// // Define routes.
// app.get('/',
//   function(req, res) {
//     res.render('home', { user: req.user });
//   });
//
// app.get('/login',
//   function(req, res){
//     res.render('login');
//   });
//
// app.get('/login/facebook',
//   passport.authenticate('facebook'));
//
// app.get('/login/facebook/return',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });
//
// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.render('profile', { user: req.user });
//   });

module.exports = router;
