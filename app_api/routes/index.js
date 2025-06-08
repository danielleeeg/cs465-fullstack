const express = require('express');
const router = express.Router();

// get trips API call from controller
const tripsController = require('../controllers/trips');

//define route for trips endpoint
// route /trips to the triplist call
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

// GET method returns trips by code:
router.route('/trips/:tripCode').get(tripsController.tripsFindByCode);

module.exports = router;