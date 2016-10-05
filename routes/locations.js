var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var debug = require('debug')('awty');
var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var SavedPlace = mongoose.model('SavedPlace');

var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

router.post('save', auth, (req, res, next) => {
    if (!req.body.latLong) {
        return res.status(400).json({ message: 'Please provide latlong data' });
    }

    
});

router.post('/visit', auth, (req, res, next) =>  {
    if (!req.body.latLong) {
        return res.status(400).json({ message: 'Please provide latlong data' });
    }

    var latLong = req.body.latLong.split(',');

    var location = new Location();
    // We store longitude first in mongoose
    location.loc = [latLong[1], latLong[0]];
    location.userId = req.payload._id;
    debug(location);
    location.save((err) => {
        if (err) { return next(err); }

        res.json({ 'result': 'success' });
    });
});

router.get('/visited', auth, (req, res, next) => {
    Location.find({ userId: req.payload._id }, (err, docs) => {
        return res.json(docs);
    });
});

module.exports = router;