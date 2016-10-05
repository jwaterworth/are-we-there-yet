var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var LocationSchema = mongoose.Schema({
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    loc: { 
        type: [Number], // [<longitude>, <latitude>]
        index: '2d'     //create geospatial index
    },
    time: { type: Date, default: Date.now }
});

mongoose.model('Location', LocationSchema);