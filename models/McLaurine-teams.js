/*
    ==================
    Title: mclaurine-composer.js, 
    Author: Trevor McLaurine
    Date: 7/17/2023
    Description: Initializes the Teams schema
*/

const mongoose = require('mongoose');

//initializes the composer Schema
const teamSchema = new mongoose.Schema({
    "name":
    { 
        type: String, 
    },
    "mascot": 
    {
        type: String, 
        
    },
    "players": 
    {
        type: [playerSchema]
    }
});

const playerSchema = new mongoose.Schema({
    "firstName":
    { 
        type: String, 
    },
    "lastName": 
    {
        type: String, 
        
    },
    "salary": {
        type: Number
    }
});

//exports the schema 
module.exports = mongoose.model('Teams', teamSchema);