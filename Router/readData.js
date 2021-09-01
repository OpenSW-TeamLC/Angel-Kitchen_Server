const express = require('express');
const router = express.Router();
const connection = require('../config/connectDB'); // DB 연결 및 쿼리작성 변수
/**
 * @swagger
 * tags:
 *   name: readData
 *   description: 급식소 전체 혹은 특정 개수 만큼 조회
 * definitions:
 *   readResults:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: primary key
 *       fcltyNm:
 *         type: string
 *         description: 급식소 이름
 *       rdnmadr:
 *         type: string
 *         description: 급식소 도로명주소
 *       lnmadr:
 *         type: string
 *         description: 급식소 지번주소
 *       phoneNumber:
 *         type: string
 *         description: 급식소 전화번호
 *       mlsvTrget:
 *         type: string
 *         description: 급식 대상
 *       mlsvTime:
 *         type: string
 *         description: 급식 시간
 *       mlsvDate:
 *         type: string
 *         description: 급식 요일
 *       operOpenDate:
 *         type: string
 *         format: date
 *         description: 급식소 운영시작일자
 *       latitude:
 *         type: number
 *         format: double
 *         description: 급식소 위도
 *       longitude:
 *         type: number
 *         format: double
 *         description: 급식소 경도
 */
/**
 * @swagger
 * /readdata:
 *   get:
 *     tags: [readData]
 *     parameters:
 *        - in: query
 *          name: kitchenCount
 *          description: 조회 하고자 하는 급식소 개수
 *          required: true
 *          schema:
 *            type: integer
 *            description: 급식소 개수
 *     responses:
 *       200:
 *         description: 조회 성공 리스트
 *         schema:
 *          $ref: '#/definitions/readResults'
 */
router.get('/', async (req, res) => {
    const kitchenCount = Math.abs(parseInt(req.query.kitchenCount, 10)); // 급식소 조회 개수
    // console.log('readData : ', kitchenCount);
    if (!kitchenCount) {
        return res
            .status(400)
            .json({error: 'Incorrect request query'}); // 요청 값이 없을 경우 400 에러 코드 전송
    }
    // console.log(kitchenCount);
    let result = await(await connection).query(
        "SELECT * FROM kitchen_table LIMIT ?",
        [kitchenCount], // 개수 만큼의 급식소 데이터 조회
        (err, results) => {
            if (err) {
                console.log('readData, Select query is now error by : ', err);
                throw err; // select 처리 실패 시 에러 전송
            }
            console.log('Count kitchen : ', results);
        }
    );
    // console.log(result[0]);
    if (result[0].length == 0) {
        return res
            .status(400)
            .json({error: 'No result found'}); // 조회된 데이터가 없을 경우 400 에러 코드 응답 전송
    }
    res
        .status(200)
        .send(result[0]); // 조회 성공시 성공 코드 및 결과 값을 응답으로 전송
});

module.exports = router;