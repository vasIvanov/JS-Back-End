const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: { type: String, required: true},
    imageUrl: {
        type: String,
        required: true,
        validate: function(link) {
            return link.includes('http') || link.includes('https');
        }
    },
    description: {
        type: String,
        required: true,
        max: 30
    },
    cubes: { type: mongoose.Schema.Types.ObjectId, ref: 'Cube'}
})

module.exports =  mongoose.model('Accessory', accessorySchema);