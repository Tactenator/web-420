/*
    ==================
    Title: mclaurine-composer.js, 
    Author: Trevor McLaurine
    Date: 7/3/2023
    Description: Initializes the customers schema
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const lineItemSchema = new mongoose.Schema({
    "name":
    { 
        type: String, 
    },
    "price": 
    {
        type: String, 
    },
    "quantity": {
        type: String
    }
    
});

const invoiceSchema = new mongoose.Schema({
    "subtotal":
    { 
        type: Number, 
    },
    "tax": 
    {
        type: Number, 
    },
    "dateCreated": {
        type: String
    },
    "dateShipped": {
        type: String
    },
    "lineItems": {
        type: [lineItemSchema]
    }
    
});

const customerSchema = new mongoose.Schema({
    "firstName":
    { 
        type: String, 
    },
    "lastName": 
    {
        type: String, 
    },
    "userName": {
        type: String
    },
    "invoices": {
        type: [invoiceSchema]
    }
    
});

//exports the schema 
module.exports = mongoose.model('Customer', customerSchema);
