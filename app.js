const express = require('express')
const http = require('http');
const swaggerUIExpress = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config({path:__dirname+'/.env'});
const mongoose = require('mongoose');

const app = express();
const composerRoutes = require('./routes/McLaurine-composer-routes')

app.use(express.json())
app.use(express.urlencoded({'extended': true}))

const port = process.env.PORT || 3000; 
const MONGO = process.env.MONGO_URI;

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

const openapiSpecification = swaggerJSDoc(options);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.use('/composers', composerRoutes)
app.use('/api-docs', swaggerUIExpress.serve, swaggerUIExpress.setup(openapiSpecification));

mongoose.connect(MONGO).then(() => {
    console.log('Connection to MongoDB database was successful');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
});

app.listen(port, () => {
    console.log('Listening on port', process.env.PORT);
})
