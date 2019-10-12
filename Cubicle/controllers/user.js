const userModel = require('../models/user');


function login(req, res) {
    res.render('loginPage.hbs');
}

function postLogin(req, res) {

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