
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// define the incident model
let Incident = require('../models/incidents');

/* GET All Incidents. READ */
router.get('/', (req, res, next) => {
  // find all incidents in the incident collection
  Incident.find( (err, incidents) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('incidents', {
        title: 'Incidents',
        incidents: incidents
      });
    }
  });

});

//  GET the Incident Details page in order to create new Incident
router.get('/create', (req, res, next) => {

    res.render('incidents/create', {
      title: 'Create Incident'
     });

});

// POST process the Incident Details page and create a new Incident - CREATE
router.post('/create', (req, res, next) => {

    let now = new Date();
    let day = now.getDate().toString().padStart(2, "0");
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let year = now.getFullYear().toString().slice(-2);
    let hour = now.getHours().toString().padStart(2, "0");
    let minute = now.getMinutes().toString().padStart(2, "0");
    let second = now.getSeconds().toString().padStart(2, "0");
    let incidentNumber = "INC"+ year + month + day + hour + minute;

    let newIncident = Incident({
        "number": incidentNumber,
        "state": req.body.state,
        "priority": req.body.priority,
        "type": req.body.type,
        "custname": req.body.custname,
        "custcontact": req.body.custcontact,
        "created": new Date(),
        "createdby": req.body.createdby,
        "resolved": req.body.resolved,
        "resolvedby": req.body.resolvedby,
        "description": req.body.description
    });

    Incident.create(newIncident,(err,Incident) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          res.redirect('/incidents');
      }
    });

});

// GET the Incident Details page in order to update an existing Incident
router.get('/update/:id', (req, res, next) => {

    let id = req.params.id;
    Incident.findById(id,(err,incidentToEdit) => {
      if(err) 
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the edit view
          res.render('incidents/update', {title: 'Update Incident Details', incident: incidentToEdit});
      }
  });
});

// POST - process the information passed from the details form and update the incident
router.post('/update/:id', (req, res, next) => {

    let id = req.params.id;

    let updatedIncident = Incident({
      "_id":id,
      "number": req.body.number,
      "state": req.body.state,
        "priority": req.body.priority,
        "type": req.body.type,
        "custname": req.body.custname,
        "custcontact": req.body.custcontact,
        "created": req.body.created,
        "createdby": req.body.createdby,
        "resolved": req.body.resolved,
        "resolvedby": req.body.resolvedby,
        "description": req.body.description
    });

    Incident.updateOne({_id: id}, updatedIncident, (err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the incident list
            res.redirect('/incidents');
        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    let id = req.params.id;

    Incident.remove({_id: id},(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the user list
            res.redirect('/incidents');
        }
    });
});


module.exports = router;
