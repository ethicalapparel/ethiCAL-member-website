// Still in development- will handle any authentication with google... Can mostly ignore this stuff
var express = require('express');
var router = express.Router();
var axios = require('axios');
var loginRoster = require('./asana.js').loginRoster;
var authRoster = require('./asana.js').authRoster;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const ETHICAL_SECRET = process.env.ETHICAL_SECRET;


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
    loginRoster((roster) => {
        console.log(`User: ${username}`);
        console.log(roster);
        if (roster[username]) {
          if(!ETHICAL_SECRET || password == ETHICAL_SECRET) {
            var user = roster[username]
            console.log('Local strategy returned true');
            return done(null, user);
          } else {
            console.log('Found user but password incorrect');
            return done(true);
          }
        } else {
          console.log('Cannot find user');
          return done(true);
        }
      }
    );
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
  authRoster((roster) => {
      console.log(roster);
      if (roster[id]) {
        user = roster[id]
        console.log('Local strategy returned true')
        return done(null, user);
      } else {
        return done(true);
      }
    }
    );
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

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status = 200;
  res.send('logout successful');
});


router.get('/authenticated', (req, res, next) => {
  console.log("In authenticated");
  if(req.isAuthenticated()) {
      console.log("Is authenticated");
      res.json({name: req.user.name, authenticated: true})
    } else {
      console.log("Not authenticated");
      res.json({authenticated: false})
    }
  }
)


module.exports = router;
