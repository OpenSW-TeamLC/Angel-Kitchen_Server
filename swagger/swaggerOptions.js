const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: { // 문서 정보
            title: 'Angel-Kitchen API',
            version: '1.0.0',
            description: 'Angel-Kitchen APP backend API'
        },
        host: 'angelkitchen-1326.herokuapp.com', // 서버 주소
        basePath: '/', // 기본 root 경로
        contact: { // 담당자 정보
            name: 'CT-1326',
            email: 'smw7567@gmail.com'
        }
    },
    apis: ['./Router/*.js'] // swagger가 인식할 api 경로
};

const specs = swaggereJsdoc(options); // 옵션 값을 토대로 문서화

module.exports = {
    swaggerUi,
    specs
};