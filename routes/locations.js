var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

router.get('/hidden', auth, (req, res, next) => {
    res.json({ 'secret': 'cookies', 'user': req.payload.username });
});

module.exports = router;