const mongoose = require('mongoose');


const cubelSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number
});
  
module.exports = mongoose.model('Cube', cubelSchema);
  