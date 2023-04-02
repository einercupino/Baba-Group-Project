
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//controllers
let indexController = require('../controllers/index');

// helper function for guard purposes
function requireAuth(req,res,next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        //return res.redirect('/login');
        return res.json({success: false, msg: 'Error, User is not Authenticated!'});
    }
    next();
}


/* GET home page. wildcard */
router.get('/', requireAuth, indexController.displayHomePage);

/* GET Route for displaying the login Page */
router.get('/login', indexController.displayLoginPage);

/*  POST Route for processing the login Page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the registration Page */
router.get('/register', indexController.displayRegisterPage);

/*  POST Route for processing the registration Page  */
router.post('/register', indexController.processRegisterPage);

/*  Get Route to perform user log out */
router.get('/logout', indexController.performLogout);

module.exports = router;
