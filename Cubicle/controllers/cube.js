const cubeModel = require('../models/cube');
const accessoryModel = require('../models/accessory');

function index(req, res, next) {
    // const { from, to, search } = req.query;
    
    cubeModel.find().then(cubes => {
        res.render('index.hbs', { 
            cubes,
            // search,
            // from,
            // to
        });
    }).catch(next)
}

function details(req, res, next) {
    
    const id = req.params.id;
    cubeModel.findOne({_id : id}).then(cube => {
        
        res.render('details.hbs', {cube})
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
    const {name, description, imageUrl} = req.body;
    const difficultyLevel = +req.body.difficultyLevel;
    const newCube = {name, description, imageUrl, difficultyLevel};
    cubeModel.insertMany(newCube).then(() => {
        res.redirect('/');
    });
}

function searching(req, res) {
    const { to, search } = req.query;
    const from = +req.query.from;
    cubeModel.find({}).where('name').equals(search).where('difficultyLevel').gt(from).then(cubes => {
        res.render('index.hbs', { cubes });
    })

    // const regex = new RegExp('/' + search + '/i') ;
    
    //     cubeModel.find({
    //         name: regex,
    //         difficultyLevel: {$gt: from}

    //     }).then(cubes => {
    //         res.render('index.hbs', { cubes });
    //     })
}

function edit(req, res) {
    const idEdit = req.params.id;

    cubeModel.findOne({_id: idEdit}).then(cube => {
        
        res.render('edit.hbs', { cube });
    })

}

function postEdit(req, res) {
    const id = req.params.id
    const {name, description, imageUrl, difficultyLevel} = req.body;
    const updated = {
        name,
        description, 
        imageUrl,
        difficultyLevel: +difficultyLevel
    }
    
    cubeModel.findByIdAndUpdate(id, {$set: updated}).then((e) => {
        
        res.redirect('/');
    }).catch(e => {
        console.log(e);
        
    })
}

function deleteCube(req, res) {
    const id = req.params.id;
    cubeModel.deleteOne({_id: id}).then(() => {
        res.redirect('/');
    })
}

function createAccessory(req, res) {
    res.render('createAccessory.hbs');
}

function postCreateAccessory(req, res) {
    const { name, description, imageUrl } = req.body;
    const newAccessory = {name, description, imageUrl};
    accessoryModel.insertMany(newAccessory).then(() => {
        res.redirect('/');
    }).catch(err => {
        console.error(err);
    });
}

module.exports = {
    index,
    details,
    about,
    create,
    postCreate,
    deleteCube,
    searching,
    edit,
    postEdit,
    notFound,
    createAccessory,
    postCreateAccessory
}