

module.exports = {
    get: {
        home: function(req, res) {
            if(!req.user){
                res.render('home.hbs');
            } else {
                res.render('expenses.hbs');
            }
           
        } 
    }
}