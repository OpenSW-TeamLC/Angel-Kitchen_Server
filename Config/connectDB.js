require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    waitForConnections: true, // 연결 요청을 대기열 I/O 설정
    connectionLimit: 10, // 한 번에 생성 가능한 최대 연결 수
    queueLimit: 0 // 오류 반환 전 대기열에 넣을 최대 연결요청 수
});

module.exports = connection;