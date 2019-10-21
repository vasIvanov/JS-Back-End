const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v){
                return /^[a-zA-z0-9 ]+$/.test(v);
            },
            message: props => `${props.value} is not a valid name!`
        },
    },
    imageUrl: {
        type: String,
        required: true,
        validate:{
            validator: function(link) {
                return link.startsWith('http://') || link.startsWith('https://');
            },
            message: props => `${props.value} is not valid image url!`
        }
        
        
    },
    description: {
        type: String,
        required: true,
        minlength: [5, 'Description must be 5 chars or longer'],
        validate: {
            validator: function(v){
                return /^[a-zA-z0-9 ]+$/.test(v);
            },
            message: props => `${props.value} is not a valid description!`
        },
    },
    cubes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cube'}]
})

module.exports =  mongoose.model('Accessory', accessorySchema);