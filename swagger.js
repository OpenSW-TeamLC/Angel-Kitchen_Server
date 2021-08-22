const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Angel-Kitchen API',
            version: '1.0.0',
            description: 'Angel-Kitchen APP backend API'
        },
        host: 'angelkitchen-1326.herokuapp.com',
        basePath: '/',
        contact: {
            name : 'CT-1326',
            email: 'smw7567@gmail.com'
        }
    },
    apis: ['./Router/*.js']
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};