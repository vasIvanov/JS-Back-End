const expenseModel = require('../models/expense');
const userModel = require('../models/user');

module.exports = {
    get: {
        home: function(req, res) {
            if(!req.user){
                res.render('home.hbs');
            } else {
                expenseModel.find().then((allExpenses) => {
                    const expenses = allExpenses.filter(e => e.user.toString() === req.user.id);
                    res.render('expenses.hbs', { expenses })
                })
                
            }
        },
        notFound: function(req, res) {
            res.render('404.hbs');
        } 
    }
}