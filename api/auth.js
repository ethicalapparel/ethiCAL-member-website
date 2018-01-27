// Still in development- will handle any authentication with google... Can mostly ignore this stuff
var express = require('express');
var router = express.Router();
var axios = require('axios');
const passport = require('passport');


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
