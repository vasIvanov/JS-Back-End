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

function create(req, res, next) {
    res.render('create.hbs')
}

function postCreate(req, res) {
    const {name, description, imageUrl, difficultyLevel} = req.body;
    const newCube = cubeModel.create(name, description, imageUrl, +difficultyLevel);
    cubeModel.insert(newCube).then(() => {
        res.redirect('/');
    });
}

function deleteCube(req, res) {
    const id = +req.params.id;
    cubeModel.delete(id).then(() => {
        res.redirect('/');
    })
}

module.exports = {
    index,
    details,
    about,
    create,
    postCreate,
    deleteCube,
    notFound
}