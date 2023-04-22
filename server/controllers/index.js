let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport')

//enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// define the User Model instance
let userModel = require('../models/user')
let User = userModel.User; // alias

// define the game model
let Incident = require('../models/incidents');  //*

module.exports.displayHomePage = (req, res, next) => {
  // find all incidents in the incident collection
  Incident.find( (err, incidents) => {
    if (err) {
      //return console.error(err);
      return res.json({success: false, msg: err});
    }
    else {
      /*res.render('incidents', {
        title: 'BBG Incident Central',
        incidents: incidents,
        displayName: req.user ? req.user.displayName: ''
      });*/
      res.json(incidents)
    }
  });
}

module.exports.displayLoginPage = (req, res, next) => {
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
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
  (err,user, info) => {
      // server error?
      console.log("The login user--------->>>>>",user);
      if(err){
          return next(err);
      }
      // is there a user login error?
      if(!user){
          req.flash('loginMessage','Authentication Error');
          res.status(400).json({success: false, msg: 'Authentication Error'});
          return res;
          //return res.redirect('/login')
      }
      req.login(user,(err) => {
          // server error?
          if(err){
              return next(err);
          }

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

      

          res.status(200).json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email,
                group: user.group
          }, token: authToken});

          return res;
          

          //return res.redirect('/incidents') //prep for res json
      });

  })(req,res,next)
}

module.exports.displayRegisterPage = (req, res, next) => {
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
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName,
        group: req.body.group 
    });
  
    User.register(newUser,req.body.password, (err) => {
        if(err){
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                /*req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log("Error: User already Exists")*/
                res.json({success: false, msg: 'Error: User already Exists'});
            }
            else{
                res.json({success: false, msg: 'An error occured while trying to insert New User'});
            }
            /*return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''

            })*/
        
        }
        else{
            // if no error exists then registration successful

            // redirect the user and authenticate them

           

            res.json({success: true, msg: 'User Registered Successfully!'});


            /*return passport.authenticate('local')(req,res,() => {
                res.redirect('/incidents')
            }); */   
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.session.destroy(function (err) {
        res.json({success: true, msg: 'User Logged out Successfully!'});
      });
}
