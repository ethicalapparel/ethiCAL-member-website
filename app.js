var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uuid = require('uuid/v4');
var session = require('express-session');
var helmet = require('helmet');
const FileStore = require('session-file-store')(session);
const passport = require('passport');

var asana = require('./api/asana').asana;
var loginRoster = require('./api/asana.js').loginRoster;
var authRoster = require('./api/asana.js').authRoster;
var auth = require('./api/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
const LocalStrategy = require('passport-local').Strategy;

const ETHICAL_SECRET = process.env.ETHICAL_SECRET;


app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware');
    console.log(req.sessionID);
    return uuid();
  },
  store: new FileStore(),
  secret: 'ethiCAL Number One',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

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

//
app.use(express.static(path.join(__dirname, 'client/build')));

function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(500).send("Not Authenticated \n");
    }
}

app.use('/asana', loggedIn, asana);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.send(`Error: ${res.locals.message}`);
  res.status(err.status || 500);
});

module.exports = app;
