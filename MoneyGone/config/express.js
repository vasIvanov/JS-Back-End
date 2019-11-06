const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const secret = 'secret';

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser({ secret }));
    app.use(express.static(path.resolve(__basedir + '/static')));
    app.engine('.hbs', handlebars({ 
        layoutsDir:'views',
        extname: '.hbs', 
        defaultLayout: 'main-layout',
        partialsDir: 'views/partials'
    }));
    app.set('views', path.resolve(__basedir + '/views'));

};