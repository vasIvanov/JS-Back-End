const mongoose = require('mongoose');


const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Accessory"}],
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
  
module.exports = mongoose.model('Cube', cubeSchema);
  