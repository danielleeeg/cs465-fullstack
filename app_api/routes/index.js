const express = require('express');
const router = express.Router();

// get trips API call from controller
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');


// pull in jsonwebtoken package for authorization
const jwt = require('jsonwebtoken');


// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    console.log('In Middleware');
    const authHeader = req.headers['authorization'];
    console.log('Auth Header: ' + authHeader);
    if (authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }
    let headers = authHeader.split(' ');
    if (headers.length < 1) {
        console.log('Not enough tokens in Auth Header: ' +
            headers.length);
        return res.sendStatus(501);
    }
    const token = authHeader.split(' ')[1];
    console.log('Token: ' + token);
    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }
    console.log(process.env.JWT_SECRET);
    console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err,
        verified) => {
        if (err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth paramto the decoded object
    });
    next(); // We need to continue or this will hang forever
}



router.route('/register').post(authController.register);
router.route('/login').post(authController.login);


//define route for trips endpoint
// route /trips to the triplist call
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(authenticateJWT, tripsController.tripsAddTrip);


// GET method returns trips by code:
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip)
    .delete(tripsController.tripsDeleteTrip);


module.exports = router;