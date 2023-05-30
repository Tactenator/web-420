const express = require('express')
const http = require('http');
const swaggerUIExpress = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({'extended': true}))

const port = process.env.PORT || 3000; 

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

server.listen(port, () => {
    console.log(`Application started and listening on port ${port}.`)
})