const cubeModel = require('../models/cube');

function index(req, res) {
    cubeModel.getAll().then(cubes => {
        console.log(cubes);
        console.log({cubes});
        res.render('index.hbs', { cubes })
    })
}

module.exports = {
    index
}