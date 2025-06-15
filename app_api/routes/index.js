const express = require('express');
const router = express.Router();

// get trips API call from controller
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);


//define route for trips endpoint
// route /trips to the triplist call
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);


// GET method returns trips by code:
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip)
    .delete(tripsController.tripsDeleteTrip);


module.exports = router;