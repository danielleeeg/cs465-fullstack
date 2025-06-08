const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips')

// GET: /trips - list of all trips
// regardless of outcome, response must include HTML status code
// and JSOn message to the requesting client
const tripsList = async (req, res) => {
    const q = await Model.find().exec(); // no filter

    console.log(q);

    if (!q) {
        return res.status(404).json(err);
    } else {
        return res.status(202).json(q);
    }

};

// GET: /trips - list of all trips
// regardless of outcome, response must include HTML status code
// and JSOn message to the requesting client
const tripsFindByCode = async (req, res) => {
    const q = await Model.find({ 'code': req.params.tripCode }).exec(); // filter by trip code

    console.log(q);

    if (!q) {
        return res.status(404).json(err);
    } else {
        return res.status(202).json(q);
    }

};



//POST: /trips - Adds a new Trip
// Regardless of outcome, response myst include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {

    console.log("Made it to trips Add Trip");
    const newTrip = new Trip({
        code: req.body.code,
        title: req.body.title,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });
    const q = await newTrip.save();
    if (!q) {
        //Database returned no data
        return res
            .status(400)
            .json(err);
    } else {
        //Return new trip
        return res
            .status(201)
            .json(q);
    }

    console.log(q);
};


// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML statuscode
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
    const q = await Model
        .findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                title: req.body.title,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();
    if (!q) { // Database returned no data
        return res
            .status(400)
            .json({ message: "no trips found" });
    } else { // Return resulting updated trip
        return res
            .status(201)
            .json(q);
    }
    // Uncomment the following line to show results ofoperation
    // on the console
    // console.log(q);
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};