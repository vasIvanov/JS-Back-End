const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const secret = 'secret';
const { authCookieName } = require('../app-config');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser({ secret }));
    app.use(express.static('./static'));
    app.engine('.hbs', handlebars({ 
        layoutsDir:'views',
        extname: '.hbs', 
        defaultLayout: 'main-layout',
        partialsDir: 'views/partials'
    }));
    app.use((req, res, next) => {
        res.locals.isLogged = req.cookies[authCookieName] !== undefined;
        res.locals.username = req.cookies['username'];
        next();
    })
    app.set('view engine', 'hbs');

};