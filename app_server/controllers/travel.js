const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: "GET",
    headers: {
        Accept: 'application/json'
    }
};
// travel function for returning API response for GET request of trip data
const travel = async function (req, res, next) {
    //console.log("Travel controller begin");

    // issue get request
    await fetch(tripsEndpoint, options)

        // when response is returned, convert to json
        .then((res) => res.json())

        // after converted to json, validate contents
        .then((json) => {

            // initalize message
            let message = null;

            // if the json response is not an array
            if (!(json instanceof Array)) {

                // set message as an error and let the array by null
                message = "API lookup error";
                json = [];

                // if the json response is an empty array
            } else {
                if (!json.length) {

                    // set message to inform of empty response (no results found)
                    message = "No trips exist in our database!";
                }
            }

            // render the travel page with the message
            res.render("travel", { title: "Travlr Getaways", trips: json, message });
        })

        // catch errors and send corresponding response
        .catch((err) => res.status(500).send(err.message));
}

// /* GET travel view */
// var fs = require('fs');

// // Read trip data from json file
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));


// const travel = (req, res) => {
//     res.render('travel', { title: 'Travlr Getaways', trips });
// };

module.exports = {
    travel
}
