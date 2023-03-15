
let mongoose = require('mongoose');

// create a model class
let Incident = mongoose.Schema({
    title: String,
    price: Number,
    author: String,
    genre: String
},
{
  collection: "incidents"
});

module.exports = mongoose.model('Incident', Incident);
