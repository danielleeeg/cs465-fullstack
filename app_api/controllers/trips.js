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
module.exports = {
    tripsList,
    tripsFindByCode
};