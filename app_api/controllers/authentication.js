const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

// create registration method:
const register = async (req, res) => {
    // Validate message to ensure all parameters are present
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ 'message': 'All fields required' });
    }

    console.log("made it into the API Call, about to create the user...")
    // create user using body
    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: ''
        }
    );

    // set password using method to provide encryption services
    user.setPassword(req.body.password);

    // save user with added information
    const q = await user.save();

    // if the registration is not successful show error
    if (!q) {
        return res.status(400).json(err);
    } else {
        // return new user token
        const token = user.generateJWT();
        return res.status(200).json(token);
    }


};

module.exports = {
    register
};