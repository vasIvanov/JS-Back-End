const mongoose = require('mongoose');


const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function(v){
                return /^[a-zA-z0-9 ]+$/.test(v);
            },
            message: props => `${props.value} is not a valid name!`
        },
    },
    description: {
        type: String, 
        minlength: [5, 'Description must be 5 chars or longer'],
        validate: {
            validator: function(v){
                return /^[a-zA-z0-9 ]+$/.test(v);
            },
            message: props => `${props.value} is not a valid description!`
        },
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function(v){
                return v.startsWith('http://') || v.startsWith('https://');
            },
            message: props => `Invalid image url!`
        },
    },
    difficultyLevel: Number,
    accessories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Accessory"}],
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
  
module.exports = mongoose.model('Cube', cubeSchema);
  