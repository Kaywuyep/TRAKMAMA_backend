const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

//const app =  express();

const options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title:"TrakmamaAPI",
            description:"CRUD API for managing TRAKMAMA",
            version:"1.0",
        },
        servers:[
            {
                url:"http://localhost:4000/"
            },
        ],
    },
    apis: ['./routes/*.js'],
};




const swaggerSpec=swaggerJsDoc(options);

module.exports = {
    serveMiddleware: swaggerUi.serve,
    setupMiddleware: swaggerUi.setup(swaggerSpec)

};