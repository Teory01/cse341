const express = require('express');
const router = express.Router();
const passport = require('../../passport');

router.get(
  '/login',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate("google", { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/');
  },
);

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/');
  });
});

router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'You are not logged in' });
  }
  res.json({
    message: 'You are logged in!',
    user: {
      name: req.user.displayName,
      email: req.user.emails[0].value,
    },
  });
});

module.exports = router;