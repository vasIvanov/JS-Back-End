const cubeModel = require('../models/cube');
const accessoryModel = require('../models/accessory');

function index(req, res, next) {
    const user = req.user;
    cubeModel.find().then(cubes => {
        if(user) {
            for (let cube of cubes) {
                cube.creator = cube.creatorId.toString() === user.id;
            }
        }
        res.render('index.hbs', { cubes, user });
    }).catch(next)
}

function details(req, res, next) {
    const user = req.user;
    const id = req.params.id;
    cubeModel.findOne({_id : id}).then(cube => {
        let creator;
        if(!user) {
            creator = false
        } else {
            creator = cube.creatorId.toString() === user.id;
        }
        Promise.all([cube, accessoryModel.find({ cubes: id }), creator, user]).then(([cube, accessories, creator, user]) => {
            res.render('details.hbs', {cube, accessories, creator, user})

        })
    }).catch(next); //error handler
}

function about(req, res) {
    const user  = req.user;
    res.render('about.hbs', {user});
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
    const creatorId = req.user.id;
    const newCube = {name, description, imageUrl, difficultyLevel, creatorId};
    cubeModel.insertMany(newCube).then(() => {
        res.redirect('/');
    });
}

function searching(req, res, next) {
    const { to, search, from } = req.query;
    const flag = true;
    let query = {};
    if (search) {
        query = { ...query, name: { $regex: search } };
    }
    if (to) {
        query = { ...query, difficultyLevel: { $lte: +to } };
    }
    if (from) {
        query = {
            ...query,
            difficultyLevel: { ...query.difficultyLevel, $gte: +from }
        };
    }

  cubeModel.find(query).then(cubes => {
    res.render('index.hbs', {
      cubes,
      search,
      from,
      to,
      flag
    });
  }).catch(next);
}

function edit(req, res) {
    const idEdit = req.params.id;

    cubeModel.findOne({_id: idEdit}).then(cube => {
        const levelString = cubeDifficulties(cube.difficultyLevel);
        res.render('edit.hbs', { cube, levelString });
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
    const user = req.user;
    const id = req.params.id;
    cubeModel.findOne({_id : id}).then(cube => {
        let creator;
        if(!user) {
            creator = false
        } else {
            creator = cube.creatorId.toString() === user.id;
        }
        if(creator) {
            const levelString = cubeDifficulties(cube.difficultyLevel);
            res.render('deleteCubePage.hbs', {cube, levelString});
            return;
        }
        res.redirect('/');
    });
  
}

function cubeDifficulties(level) {
    const difficulties = {
        1: 'Very Easy',
        2: 'Easy',
        3: 'Medium (Standard 3x3)',
        4: 'Intermediate',
        5: 'Expert',
        6: 'Hardcore'
    }
    return difficulties[level];
}

function postDelete(req, res) {
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
    postDelete,
    searching,
    edit,
    postEdit,
    notFound,
}