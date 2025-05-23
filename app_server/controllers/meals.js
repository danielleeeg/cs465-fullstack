/* GET meals view */
var fs = require('fs');

// Read trip data from json file
var meal = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));


const meals = (req, res) => {
    res.render('meals', { title: 'Travlr Meals', meal });
};

module.exports = {
    meals
}
