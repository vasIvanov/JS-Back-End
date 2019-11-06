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
                let author;
                if(user){
                    author = article.author.toString() === user.id;

                }

                res.render('article.hbs', { article, user, author });
            });
        },
        edit: function(req, res) {
            const id = req.params.id;
            const user = req.user;
            articleModel.findOne({ _id: id }).then(article => {
                res.render('edit.hbs', {article, user});
            })
        },
        delete: function(req, res) {
            const id = req.params.id;
            articleModel.deleteOne({_id: id}).then(() => {
                res.redirect('/');
            })
        },
        search: function(req, res) {
            const { searched } = req.query;
            const user = req.user;
            const query = {
                title: { $regex: searched }
            };
            articleModel.find(query).then(matches => {
                res.render('search-results.hbs', { matches, searched, user })
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
        },
        edit: function(req, res) {
            const id = req.params.id;
            const { description } = req.body;
            const updated = {
                description
            };

            articleModel.updateOne({ _id: id }, updated, { runValidators: true }).then(article => {
                res.redirect('/');
            }).catch(err => {
                if(err.name === 'ValidationError') {
                    res.render('edit.hbs', {
                        errors: err.errors
                    });
                    return;
                }
            });
        }
    }
}