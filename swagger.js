const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'FitTrack API',
        description:
            'API documentation for the FitTrack project (CSE 341 Final Project). ' +
            'POST and PUT on /workout and /progresslog require Google OAuth login ' +
            '(visit /login in a browser first, then use Swagger from that same browser session).',
    },
    host: 'fittrack-api-771x.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
