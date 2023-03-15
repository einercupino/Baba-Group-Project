
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the incident model
let Incident = require('../models/incidents');

/* GET books List page. READ */
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
      title: 'Add Incident'
     });

});

// POST process the Incident Details page and create a new Incident - CREATE
router.post('/create', (req, res, next) => {

    let newIncident = Incident({
      "title": req.body.title,
      "price": req.body.price,
      "author": req.body.author,
      "genre": req.body.genre,
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

    /*****************
     * ADD CODE HERE *
     *****************/

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
      "title": req.body.title,
      "price": req.body.price,
      "author": req.body.author,
      "genre": req.body.genre,
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
