// referencing the mongoose
const mongoose = require('mongoose');

//defining the scheme for the project
var projectSchema = new mongoose.Schema({
    taskName: { // name 
        type: String,
        required: true
    },
    dueDate: {
        type: Date
    },
    description: { // course
        type: String,
        required: true
    }
})

module.exports = mongoose.model('todoModel', projectSchema); // Project