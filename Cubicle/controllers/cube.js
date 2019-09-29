const cubeModel = require('../models/cube');

function index(req, res, next) {
    cubeModel.getAll().then(cubes => {
        res.render('index.hbs', { cubes })
        
    }).catch(next); //error handler
}

function details(req, res, next) {
    
    const id = +req.params.id;
    cubeModel.getOne(id).then(cube => {
        res.render('details.hbs', { cube })
    }).catch(next); //error handler
}

function about(req, res) {
    res.render('about.hbs');
}

function notFound(req, res, next) {
    res.render('404.hbs')
}

module.exports = {
    index,
    details,
    about,
    notFound
}