
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let moment = require('moment');

// define the game model
let Incident = require('../models/incidents');  //*

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  // find all incidents in the incident collection
  Incident.find( (err, incidents) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('incidents', {
        title: 'BBG Incident Central',
        incidents: incidents
      });
    }
  });

});

module.exports = router;
