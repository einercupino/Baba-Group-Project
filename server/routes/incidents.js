
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport')

let incidentController = require('../controllers/incidents');

// define the User Model instance
let userModel = require('../models/user')
let User = userModel.User; // alias

// helper function for guard purposes
function requireAuth(req,res,next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET All Incidents. READ */
router.get('/',requireAuth, incidentController.displayIncidentList);

//  GET the Incident Details page in order to create new Incident
router.get('/create',requireAuth, incidentController.displayCreateIncident);

// POST process the Incident Details page and create a new Incident - CREATE
router.post('/create',requireAuth, incidentController.processCreateIncident);

// GET the Incident Details page in order to update an existing Incident
router.get('/update/:id',requireAuth, incidentController.displayUpdateIncident);

// POST - process the information passed from the details form and update the incident
router.post('/update/:id',requireAuth, incidentController.processUpdateIncident);

// GET - process the delete by user id
router.get('/delete/:id',requireAuth, incidentController.performDeleteIncident);

module.exports = router;
