const express = require('express');
const router = express.Router();
let axios = require('axios');
const connection = require('../config/connectDB'); // DB 연결 및 쿼리작성 변수

let config = {
    method: 'get',
    url: process.env.API_URL,
    headers: {
        'Cookie': 'SCOUTER=x4n12f8688mjeh; clientid=020048023665'
    }
};

router.get('/', function (req, res) {
    axios(config)
        .then(async (response) => {
            const dataLength = response.data.response.body.items.length; // 호출된 급식소 전체 데이터 개수
            console.log(dataLength);
            for (let index = 0; index < dataLength; index++) {
                let readKitchen = JSON.stringify(response.data.response.body.items[index]);
                let data = JSON.parse(readKitchen); // 파싱된 급식소 하나 당 데이터
                // console.log(data);

                await(await connection).query(
                    'INSERT INTO kitchen_table(fcltyNm, rdnmadr, lnmadr, phoneNumber, mlsvTrget, ml' +
                            'svTime, mlsvDate, operOpenDate, latitude, longitude) SELECT ?,?,?,?,?,?,?,?,?,' +
                            '? FROM DUAL WHERE NOT EXISTS(SELECT * FROM kitchen_table WHERE fcltyNm = ? AND' +
                            ' lnmadr = ?)',
                    [
                        data.fcltyNm,
                        data.rdnmadr,
                        data.lnmadr,
                        data.phoneNumber,
                        data.mlsvTrget,
                        data.mlsvTime,
                        data.mlsvDate,
                        data.operOpenDate,
                        data.latitude,
                        data.longitude,
                        data.fcltyNm,
                        data.lnmadr
                    ], // 중복을 배제한 급식소 데이터 추가
                    (err, results) => {
                        if (err) {
                            console.log('getData, Insert query is now error by : ', err);
                            throw err; // insert 처리 실패 시 에러 전송
                        }
                        console.log('Getting data : ', results);
                    }
                );
            }
            res
                .status(200)
                .json({status: "success!"}); // 성공 코드 응답 전송
        })
        .catch(function (error) {
            console.log('getData is now error by : ', error);
        });
});

module.exports = router;