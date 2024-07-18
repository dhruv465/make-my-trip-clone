const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true,  // This ensures MongoDB ignores `null` values for uniqueness
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
