var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var SavedPlaceSchema = mongoose.Schema({
    name: String,
    loc: { 
        type: [Number], // [<longitude>, <latitude>]
        index: '2d'     //create geospatial index
    }
});

mongoose.model('SavedPlace', SavedPlaceSchema);