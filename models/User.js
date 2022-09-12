const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    last_name: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    promo: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;