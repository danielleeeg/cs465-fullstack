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
const login = (req, res) => {
    // Validate message to ensure that email and password are present.
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }
    // Delegate authentication to passport module
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Error in Authentication Process
            return res
                .status(404)
                .json(err);
        }
        if (user) { // Auth succeeded - generate JWT and return to caller
            const token = user.generateJWT();
            res
                .status(200)
                .json({ token });
        } else { // Auth failed return error
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};
module.exports = {
    register,
    login
};