const express = require('express');
const router = express.Router();
const passport = require('../../passport');

// Start Google login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
);

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google',
    session: true,
  }),
  (req, res) => {
    res.redirect('/');
  }
);

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Profile route
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'You are not logged in' });
  }

  res.json({
    message: 'You are logged in!',
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

module.exports = router;