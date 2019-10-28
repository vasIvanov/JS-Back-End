module.exports = {
    get: {
        home: function(req, res) {
            const user = req.user;
            res.render('index.hbs', { user });
        } 
    }
}