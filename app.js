/*
    ==================
    Title: app.js, 
    Author: Trevor McLaurine
    Date: 6/01/2023
    Description: An application that begins a server for the Composer API
*/
const express = require('express')
const http = require('http');
const swaggerUIExpress = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

//Initializes express
const app = express();

//Grabs the routes being used for Composer, People, and Session
const composerRoutes = require('./routes/McLaurine-composer-routes')
const peopleRoutes = require('./routes/McLaurine-people-routes')
const sessionRoutes = require('./routes/McLaurine-session-routes')

//Tells express to use JSON
app.use(express.json())
app.use(express.urlencoded({'extended': true}))

//Grabs the port number from the .env file. If none, defaults to 3000
const port = 3000; 
//Grabs the MongoDB connect URI
const MONGO = 'mongodb+srv://web420_user:s3cret@web340db.93lxfky.mongodb.net/web420DB';

// Sets the options object for Open API
const options = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0'
        },
    },
    apis: ['./routes/*js'], //files containing annotations for the OpenAPI Specification
};

//initializes the open API specification using swaggerJSDoc
const openapiSpecification = swaggerJSDoc(options);

// Sets headers for any and all requests.
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

// Initializes the routes. 
app.use('/api', composerRoutes)
app.use('/api', peopleRoutes)
app.use('/api', sessionRoutes)
//Initializes the api-docs utilizing swaggerUI
app.use('/api-docs', swaggerUIExpress.serve, swaggerUIExpress.setup(openapiSpecification));

//Connects to MongoDB
mongoose.connect(MONGO).then(() => {
    console.log('Connection to MongoDB database was successful');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
});

//Begins the server to listen on the pre-defined port.
app.listen(port, () => {
    console.log('Listening on port', port);
})
