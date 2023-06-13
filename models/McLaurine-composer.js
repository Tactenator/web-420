const mongoose = require('mongoose');

const composerSchema = new mongoose.Schema({
    "firstName":
    { 
        type: String, 
        required: true, 
        unique: true 
    },
    "lastName": 
    {
        type: String, 
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Composer', composerSchema);