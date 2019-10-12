const userModel = require('../models/user');
const jwt = require('../utils/jwt');
const appConfig = require('../app-config');

function login(req, res) {
    res.render('loginPage.hbs');
}

function postLogin(req, res, next) {
    const { username, password } = req.body;
    userModel.findOne({username})
        .then(user => Promise.all([user, user.matchPassword(password)]))
        .then(([user, match]) => {
            if(!match) {
                res.render('login.hbs', {message: 'Wrong password or username'});
                return;
            }
            const token = jwt.createToken({id: user._id});
            res.cookie(appConfig.authCookieName, token).redirect('/');
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

    
    return userModel.create({username, password}).then(() => {
        res.redirect('/login')
    }).catch(err => {
        if(err.name === 'MongoError' && err.code === 11000) {
            res.render('registerPage.hbs', {
                errors: {
                    username: 'Username already taken'
                }
            });
            return;
        }
        next(err);
    });
}

function logout(req, res) {

}

module.exports = {
    login,
    postLogin,
    register,
    postRegister,
    logout
}