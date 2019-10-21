const accessoryModel = require('../models/accessory');
const cubeModel = require('../models/cube');
const { validationResult } = require('express-validator');

function createAccessory(req, res) {
    res.render('createAccessory.hbs');
}

function postCreateAccessory(req, res) {
    const { name, description, imageUrl } = req.body;
    const newAccessory = {name, description, imageUrl};

    let result;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      result = Promise.reject({ name: 'ValidationError', errors: errors.errors });
    } else {
      result = accessoryModel.insertMany(newAccessory);
    }

    return result.then(() => {
      res.redirect('/');
    }).catch(err => {
      if (err.name === 'ValidationError') {
        res.render('createAccessory.hbs', {
          errors: err.errors
        });
        return;
      }
      next(err);
    });
}

function attachAccessory(req, res) {
    const id = req.params.id;
    cubeModel.findOne({_id: id}).then(
        cube => Promise.all([cube, accessoryModel.find({cubes: {$nin: id}})]))
        .then(([cube, accessories]) => {
            res.render('attachAccessory.hbs', {
                cube,
                accessories
            });
        })
}

function postAttachAccessory(req, res) {
    const { id } = req.params;
    const { accessory: accessoryId } = req.body;
    Promise.all([
        cubeModel.updateMany({ _id: id }, { $push: {accessories: accessoryId}}),
        accessoryModel.updateMany({ _id: accessoryId }, { $push: {cubes: id} })
    ]).then(() => {
        res.redirect('/');
    });
}

module.exports = {
    createAccessory,
    postCreateAccessory,
    attachAccessory,
    postAttachAccessory
}