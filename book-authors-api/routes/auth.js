// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('../../passport');

// Login route
router.get(
  '/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/login',
    session: true,
  }),
  (req, res) => {
    res.redirect('/'); // Successful login
  }
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Profile route (protected)
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'You are not logged in' });
  }
  res.json({
    message: 'You are logged in!',
    user: {
      id: req.user.id,
      name: req.user.displayName,
      email: req.user.emails ? req.user.emails[0].value : null,
    },
  });
});

module.exports = router;