const cubeModel = require('../models/cube');

function index(req, res, next) {
    // const { form, to, search } = req.query;
    
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
        console.log({cube});
        
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

function search(req, res) {

    const { from, to, search } = req.query;
    const findFn = item => {
        let result = true;
        if(search) {
            result = item.name.includes(search);
        }
        if(from && result) {
            result = +item.difficultyLevel >= +from;
        }
        if(to && result) {
            result = +item.difficultyLevel <= +to;
        }
        if(!search && !from && !to) {
            result = false;
        }
        return result;
    }

    cubeModel.find(findFn).then(cubes => {
        
        res.render('index.hbs', { cubes });
    })
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
        console.log(e);
        
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

module.exports = {
    index,
    details,
    about,
    create,
    postCreate,
    deleteCube,
    search,
    edit,
    postEdit,
    notFound
}