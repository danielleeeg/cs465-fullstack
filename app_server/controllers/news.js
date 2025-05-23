/* GET meals view */
var fs = require('fs');

// Read trip data from json file
var articles = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));
var sidebardata = JSON.parse(fs.readFileSync('./data/newssidebar.json', 'utf8'));

const news = (req, res) => {
    res.render('news', { title: 'Travlr Meals', articles, sidebardata });
};

module.exports = {
    news
}
