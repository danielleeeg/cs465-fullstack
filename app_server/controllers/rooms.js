/* GET travel view */
var fs = require('fs');

// Read trip data from json file
var room = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));


const rooms = (req, res) => {
    res.render('rooms', { title: 'Travlr Getaways', room });
};

module.exports = {
    rooms
}
