/* GET homepage */
const about = (req, res) => {
    res.render('about', { title: "Travlr Getaways" });
};

module.exports = {
    about
}