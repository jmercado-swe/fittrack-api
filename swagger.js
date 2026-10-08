const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'FitTrack API',
        description: 'API documentation for the FitTrack project (CSE 341 Final Project)',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
