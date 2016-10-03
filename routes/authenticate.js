var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
var mongoose = require('mongoose');

var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });
var User = mongoose.model('User');

var router = express.Router();

router.post('/register', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  var user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save((err) => {
    if (err) { return next(err); }

    return res.json({ token: user.generateJWT() });
  });
});

router.post('/authenticate', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }

    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
