const mongoose = require('mongoose');


const cubelSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Accessory"}]
});
  
module.exports = mongoose.model('Cube', cubelSchema);
  