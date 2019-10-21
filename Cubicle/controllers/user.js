const userModel = require('../models/user');
const jwt = require('../utils/jwt');
const appConfig = require('../app-config');
const tokenBlacklistModel =  require('../models/tokenBlacklist');
const { validationResult } = require('express-validator');

function login(req, res) {
    res.render('loginPage.hbs');
}

function postLogin(req, res, next) {
    const { username, password } = req.body;
    userModel.findOne({username})
        .then(user => Promise.all([user, user.matchPassword(password)]))
        .then(([user, match]) => {
            if(!match) {
                res.render('loginPage.hbs', {message: 'Wrong password or username'});
                return;
            }
            const token = jwt.createToken({id: user._id});
            res.cookie(appConfig.authCookieName, token).redirect('/');
        }).catch(err => {
            res.render('loginPage.hbs', {message: 'Wrong password or username'});
        })
}

function register(req, res) {
    res.render('registerPage.hbs');
}

function postRegister(req, res, next) {
    const { username, password, repeatPassword } = req.body;
    if(password !== repeatPassword) {
        res.render('registerPage.hbs', { errors: {repeatPassword: 'Passwords dont match'}});
        return;
    }

    let result;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      result = Promise.reject({ name: 'ValidationError', errors: errors.errors });
    } else {
      result = userModel.create({ username, password });
    }

    return result.then(() => {
      res.redirect('/login');
    }).catch(err => {
      if (err.name === 'ValidationError') {
        res.render('registerPage.hbs', {
          errors: err.errors
        });
        return;
      }
      next(err);
    });
}

function logout(req, res) {
    const token = req.cookies[appConfig.authCookieName];
    tokenBlacklistModel.create({ token }).then(() => {
        res.clearCookie(appConfig.authCookieName).redirect('/');
    });
}

module.exports = {
    login,
    postLogin,
    register,
    postRegister,
    logout
}