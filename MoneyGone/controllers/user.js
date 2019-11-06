const userModel = require('../models/user');
const jwt = require('../utils/jwt');
const appConfig = require('../app-config');
const { validationResult } = require('express-validator');

module.exports = {
  get: {
    login: function(req, res) {
      res.render('login.hbs');
    },
    register: function(req, res) {
      res.render('register.hbs');
    },
    logout: function(req, res) {
      res.clearCookie(appConfig.authCookieName).redirect('/');
    }
  },


  post: {
    login: function(req, res) {
      const { username, password } = req.body;
      userModel.findOne({username})
          .then(user => Promise.all([user, user.matchPassword(password)]))
          .then(([user, match]) => {
              if(!match) {
                  res.render('login.hbs', {message: 'Wrong password or username'});
                  return;
              }
              const token = jwt.createToken({id: user._id});
              res.cookie('username', user.username);
              res.cookie(appConfig.authCookieName, token).redirect('/');
          }).catch(err => {
              res.render('login.hbs', {message: 'Wrong password or username'});
          })
    },
    register: function(req, res, next) {
      const { username, password, repeatPassword, amount } = req.body;
      if(password !== repeatPassword) {
          res.render('register.hbs', { errors: {repeatPassword: 'Passwords dont match'}});
          return;
      }

      let result;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        result = Promise.reject({ name: 'ValidationError', errors: errors.errors });
      } else {
        result = userModel.create({ username, password, amount });
      }

      return result.then(() => {
        res.redirect('/login');
      }).catch(err => {
        if (err.name === 'ValidationError') {
          res.render('register.hbs', {
            errors: err.errors
          });
          return;
        }
        next(err);
      });
    },
    refil: function(req, res) {
      const id = req.user.id;
      const refil = +req.body.refil;
      req.user.amount += refil;
      userModel.findByIdAndUpdate({ _id: id }, req.user).then(() => {
        res.redirect('/');
      })
    }
  }
}