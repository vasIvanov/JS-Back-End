const expenseModel = require('../models/expense');
const { validationResult } = require('express-validator');
const userModel = require('../models/user');

module.exports = {
    get: {
        addExpense: function(req, res) {
            res.render('new-expense.hbs');
        }
    },
    post: {
        addExpense: function(req, res) {
            const { merchant, category, description, report: reportOn, vault } = req.body;
            const user = req.user.id;
            const report = reportOn === 'on'; 
            const total = +req.body.total;
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            const newExpense = {merchant, total, category, description, user, report, vault, date};

            

            let result;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              result = Promise.reject({ name: 'ValidationError', errors: errors.errors });
            } else {
              result = expenseModel.create(newExpense);
            }
        
            return result.then((expense) => {
              req.user.expenses.push(expense._id);
              const id = req.user.id;
              userModel.findByIdAndUpdate({ _id: id}, req.user).then(() => {
                res.redirect('/');
              });
              
            }).catch(err => {
              if (err.name === 'ValidationError') {
                res.render('new-expense.hbs', {
                  errors: err.errors
                });
                return;
              }
              next(err);
            });
            
        }
    }
}