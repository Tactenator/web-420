const express = require('express')
const http = require('http');
const swaggerUIExpress = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config({path:__dirname+'/.env'});
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app)

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

app.use('/api-docs', swaggerUIExpress.serve, swaggerUIExpress.setup(openapiSpecification));

mongoose.connect(MONGO)
    .then(() => {
        server.listen(port, () => {
            console.log('Listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })
