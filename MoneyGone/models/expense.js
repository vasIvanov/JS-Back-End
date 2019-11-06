const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    merchant: {
        type: String,
        required: true,
        minlength: [4, 'Merchant must be at least 4 chars long!']
    },
    date: {
        type: String,
    },
    total: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description must be at least 10 chars'],
        maxlength: [50, 'Description cant be longer than 50 chars']
    },
    report: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    vault: {
        type: String
    }

});

module.exports = mongoose.model('Expense', expenseSchema);