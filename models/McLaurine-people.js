/*
    ==================
    Title: mclaurine-people.js, 
    Author: Trevor McLaurine
    Date: 6/20/2023
    Description: Initializes the composer schema
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    "text": {
        type: string
    }
})

const dependentSchema = new Schema({
    "firstName":
    { 
        type: String, 
        
    },
    "lastName": 
    {
        type: String, 
        
    }
})
const personSchema = new mongoose.Schema({
    "firstName":
    { 
        type: String, 
    },
    "lastName": 
    {
        type: String, 
    },
    "roles": [roleSchema],
    "dependents": [dependentSchema],
    "birthDate": {
        type: string
    }
});

//exports the schema 
module.exports = mongoose.model('Person', personSchema);