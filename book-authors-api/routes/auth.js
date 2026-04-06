const express = require('express');
const router = express.Router();
const passport = require('../../passport'); 

// Login route
router.get(
  '/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // redirect to home or dashboard after login
    res.redirect('/');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect('/');
  });
});

// Profile (protected)
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'You are not logged in' });
  }

  res.json({
    message: 'You are logged in!',
    user: {
      name: req.user.displayName,
      email: req.user.emails ? req.user.emails[0].value : null,
    },
  });
});

module.exports = router;