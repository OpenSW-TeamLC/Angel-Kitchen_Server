const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const getData = require('./router/getData');
const readData = require('./router/readData');
const scanKitchen = require('./router/scanKitchen');
const searchKitchen = require('./router/searchKitchen');
const {swaggerUi, specs} = require('./swagger/swaggerOptions');

app.use(cors()); //cors 미들웨어
app.use(express.json()); // 요청 값 Json파싱 미들웨어

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/getdata', getData); // 급식소 API 호출 트리거 모듈
app.use('/readdata', readData); // 급식소 전체 혹은 지정 갯수 만큼 데이터 출력 모듈
app.use('/scankitchen', scanKitchen); // 사용자 위치 반경내의 급식소 조회 모듈
app.use('/searchkitchen', searchKitchen); // 지정 급식소 정보 조회 모듈
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // API 문서화 모듈

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});