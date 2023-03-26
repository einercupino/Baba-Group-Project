
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let passport = require('passport');

// enable jwt 
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

let passport = require('passport')

// define the User Model instance
let userModel = require('../models/user')
let User = userModel.User; // alias


// define the game model
let Incident = require('../models/incidents');  //*

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



/* GET home page. wildcard */
router.get('/', requireAuth, (req, res, next) => {
  // find all incidents in the incident collection
  Incident.find( (err, incidents) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('incidents', {
        title: 'BBG Incident Central',
        incidents: incidents,
        displayName: req.user ? req.user.displayName: ''
      });
    }
  });

});

/* GET Route for displaying the login Page */
router.get('/login',(req, res, next) => {
     // check if the user is already logged in
     if(!req.user)
     {
         res.render('auth/login',
         {
             title: "Login",
             messages: req.flash('loginMessage'),
             displayName: req.user ? req.user.displayName : ''
         })
     }
     else{
         return res.redirect('/');
     }

});

/*  POST Route for processing the login Page */
router.post('/login',(req, res, next) => {

  passport.authenticate('local',
  (err,user, info) => {
      // server error?
      if(err){
          return next(err);
      }
      // is there a user login error?
      if(!user){
          req.flash('loginMessage','Authentication Error');
          return res.redirect('/login')
      }
      req.login(user,(err) => {
          // server error?
          if(err){
              return next(err)
          }
          // jwt
          const payload = 
          { 
            id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.email
          }

          const authToken = jwt.sign(payload, DB.Secret, { 
            expiresIn: 604800 // 1 week
          });

          /* TODO - GETTING READY TO CONVERT TO API 
          res.json({success: true, msg: 'User Logged in Successfully', user: { 
            id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.emai
          }, token: authToken});
          */

          return res.redirect('/incidents')
      });

  })(req,res,next)



});


/* GET Route for displaying the registration Page */
router.get('/register',(req, res, next) => {

   // check if the user is not already logged in
   if(!req.user)
   {
       res.render('auth/register',
       {
           title: 'Register',
           messages: req.flash('registerMessage'),
           displayName: req.user ? req.user.displayName: ''
       });
   }
   else{
       return res.redirect('/');
   }



});

/*  POST Route for processing the registration Page  */
router.post('/register',(req, res, next) => {

    // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName

  });

User.register(newUser,req.body.password, (err) => {
    if(err){
        console.log("Error: Inserting New User");
        if(err.name == "UserExistsError")
        {
            req.flash(
                'registerMessage',
                'Registration Error: User Already Exists!'
            );
            console.log("Error: User already Exists")
        }
        return res.render('auth/register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''

        })
    
    }
    else{
        // if no error exists then registration successful

        // redirect the user and authenticate them

        /* TODO - GETTING READY TO CONVERT TO API 
        res.json({success: true, msg: 'User Registered Successfully'});
        */ 
        return passport.authenticate('local')(req,res,() => {
            res.redirect('/incidents')
        });    
    }
});


});

/*  Get Route to perform user log out */
router.get('/logout',(req, res, next) => {

    req.session.destroy(function (err) {
        res.redirect('/'); 
      });


});

module.exports = router;
