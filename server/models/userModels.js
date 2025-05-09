const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true // לוודא שאין כפילות
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        default: "Seminar"
    },
    phone: {
        type: String,
        maxLength: 10
    }
}, { timestamps: true }); // מוסיף createdAt ו-updatedAt אוטומטית

module.exports = mongoose.model('User', userSchema);
