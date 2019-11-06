const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true,
        minlength: [4, 'Username should be at least 4 chars long!'] 
    },
    password: {
        required: true,
        type: String,
        minlength: [8, 'Password must be at least 8 chars long!']
    },
    amount: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 0
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }]
});

userSchema.methods = {
    matchPassword: function(password) {
        return bcrypt.compare(password, this.password);
    }
}

  
userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) {
                next(err);
                return;
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if(err) {
                    next(err);
                    return;
                }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
})

module.exports = mongoose.model('User', userSchema);