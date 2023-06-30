/*
    ==================
    Title: mclaurine-user.js, 
    Author: Trevor McLaurine
    Date: 6/28/2023
    Description: Initializes the user schema
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    "userName":
    { 
        type: String, 
    },
    "password": 
    {
        type: String, 
    },
    "emailAddress": {
        type: String
    }
    
});

//exports the schema 
module.exports = mongoose.model('User', userSchema);