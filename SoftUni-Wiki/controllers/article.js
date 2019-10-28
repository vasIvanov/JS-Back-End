const articleModel = require('../models/article');
const { validationResult } = require('express-validator');

module.exports = {
    get: {
        create: function(req, res) {
            const user = req.user
            res.render('create.hbs', { user } );
        },
        allArticles: function(req, res) {
            const user = req.user;
            articleModel.find().then(articles => {
                
                res.render('all-articles.hbs', { articles, user });
            });
        },
        article: function(req, res) {
            const id = req.params.id;
            const user = req.user;
            articleModel.findOne({ _id: id }).then(article => {
                
                res.render('article.hbs', { article, user });
            })
        }
    },

    post: {
        create: function(req, res, next) {
            const { title, description } = req.body;
            
            const author = req.user.id;
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const newArticle = {title, description, author, date};
            let result;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              result = Promise.reject({ name: 'ValidationError', errors: errors.errors });
            } else {
              result = articleModel.insertMany(newArticle);
            }
        
            return result.then(() => {
              res.redirect('/');
            }).catch(err => {
              if (err.name === 'ValidationError') {
                res.render('create.hbs', {
                  errors: err.errors
                });
                return;
              }
              next(err);
            });
        }
    }
}