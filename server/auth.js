const express = require('express')
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const router = express.Router()
const nconf = require('./nconf');
const knex = require('./knex.js');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => knex('users').where({ id })
  .first()
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); })
);

passport.use(new GitHubStrategy({
    clientID: nconf.get('oauth:github:id'),
    clientSecret: nconf.get('oauth:github:secret'),
    callbackURL: nconf.get('oauth:callbackURL'),
  },
  (accessToken, refreshToken, profile, done) => (
    knex('users')
    .where({ github_id: profile.id })
    .first()
    .then((user) => {

      if (!user) {
        knex('users').insert({
          github_id: profile.id,
          displayName: profile.displayName,
        })
          .returning('*')
          .then((row) => {
            return done(null, row[0]);
          });
      }

      return done(null, user);
    })
    .catch((err) => { return done(err); })
  )
));

router.use(session({
  store: new RedisStore({
    host: nconf.get('session:host'),
    port: nconf.get('session:port'),
  }),
  secret: nconf.get('session:secret'),
  resave: false,
  saveUninitialized: false,
}));

router.use(passport.initialize());
router.use(passport.session());

router.use((req, res, next) => {
  if (!req.session) {
    console.error('help, no session');
  }
  next(); // otherwise continue
});

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
