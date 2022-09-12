const mongoose = require('mongoose');
const QCMSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    score: {
        type: Number,
        required: true
    }
});

const QCM = mongoose.model('QCM', QCMSchema);
module.exports = QCM;