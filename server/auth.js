const express = require('express')
const router = express.Router()
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const nconf = require('./nconf');

passport.use(new GitHubStrategy({
    clientID: nconf.get('oauth:github:id'),
    clientSecret: nconf.get('oauth:github:secret'),
    callbackURL: nconf.get('oauth:callbackURL'),
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    done();
  }
));

router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
