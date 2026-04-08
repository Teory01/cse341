const express = require('express');
const router = express.Router();
const passport = require('../../passport');

// 🔐 Middleware to protect routes
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Not logged in' });
}

// ✅ LOGIN → shows Google "Choose account"
router.get(
  '/login',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
);

// ✅ CALLBACK
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/login',
    session: true,
  }),
  (req, res) => {
    res.redirect('/auth/profile'); // go to profile after login
  }
);

// ✅ PROFILE (protected)
router.get('/profile', ensureAuth, (req, res) => {
  res.json({
    message: 'You are logged in!',
    user: req.user
  });
});

// ✅ LOGOUT (FIXED PROPERLY)
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // remove session cookie
      res.redirect('/auth/login');
    });
  });
});

module.exports = router;