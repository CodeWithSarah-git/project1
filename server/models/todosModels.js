
const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    complete: {
        type: Boolean
       
    }
});

module.exports = mongoose.model('Todo', todosSchema);
