const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        // Note: Validation for "8 chars + 1 number" is usually handled 
        // in the Application Tier (Controller) before hashing.
    },
    role: {
        type: String,
        enum: ['Fan', 'Admin'],
        default: 'Fan'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);