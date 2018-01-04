// Still in development- will handle any authentication with google...
var express = require('express');
var router = express.Router();

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
/* GET home page. */
router.get('/login', function(req, res, next) {
  // var oauth2Client = new OAuth2(
  //   YOUR_CLIENT_ID, j
  //   YOUR_CLIENT_SECRET,
  //   "http://localhost:3001/asana"
  // );
  //var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
  console.log(req.secret);
  res.json({authenticated: True});
});
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
