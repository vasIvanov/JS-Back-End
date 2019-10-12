const jwt = require('./jwt');
const appConfig = require('../app-config');
const userModel = require('../models/user');

function auth(req, res, next) {
    const token = req.cookies[appConfig.authCookieName] || '';
    const data = jwt.verifyToken(token);
    userModel.findById(data.id).then(user => {
        req.user = user;
        next();
    }).catch(err => {

        res.redirect('/login');
    });
    
}

module.exports = {
    auth
}