/*
    ==================
    Title: mclaurine-composer.js, 
    Author: Trevor McLaurine
    Date: 6/17/2023
    Description: Initializes the composer schema
*/

const mongoose = require('mongoose');

//initializes the composer Schema
const composerSchema = new mongoose.Schema({
    "firstName":
    { 
        type: String, 
    },
    "lastName": 
    {
        type: String, 
        
    }
});

//exports the schema 
module.exports = mongoose.model('Composer', composerSchema);