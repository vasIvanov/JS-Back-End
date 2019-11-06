const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        unique: true,
        type: String,
    },
    description: {
        type: String,
        minlength: [5, 'Description must be at least 5 chars']
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    date: {
        type: String
    }
});

module.exports = mongoose.model('Article', articleSchema);