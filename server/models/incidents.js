
let mongoose = require('mongoose');

// create a model class
let Incident = mongoose.Schema({
    number: String,
    state: String,
    priority: String,
    type: String,
    custname: String,
    custcontact: String,
    created: Date,
    createdby: String,
    resolved: Date,
    resolvedby: String,
    description: String
},
{
  collection: "incidents"
});

module.exports = mongoose.model('Incident', Incident);
