const express = require('express');
const router = express.Router();
const connection = require('../config/connectDB'); // DB 연결 및 쿼리작성 변수
/**
 * @swagger
 * tags:
 *   name: searchKitchen
 *   description: 지정 급식소 정보 조회
 * definitions:
 *   searchResults:
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
 *  /searchkitchen:
 *    get:
 *      tags: [searchKitchen]
 *      parameters:
 *        - in: query
 *          name: kitchenName
 *          description: 찾고자 하는 급식소 이름
 *          required: false
 *          schema:
 *            type: string
 *            description: 급식소 이름
 *        - in: query
 *          name: kitchenPlace
 *          description: 찾고자 하는 급식소 지번주소
 *          required: false
 *          schema:
 *            type: string
 *            description: 급식소 지번주소 이름
 *      responses:
 *       200:
 *        description: 해당 급식소 조회 성공 리스트
 *        schema:
 *          $ref: '#/definitions/searchResults'
 */
router.get('/', async (req, res) => {
    const kitchenName = req.query.kitchenName; // 조회 하고자 하는 급식소 이름
    const kitchenPlace = req.query.kitchenPlace; // 조회 하고자 하는 급식소 지번주소 이름
    // console.log('searchKitchen : ', kitchenName, kitchenPlace);

    if (!kitchenName && !kitchenPlace) {
        res
            .status(400)
            .json({error: 'Incorrect request query'}); // 요청 값이 없을 경우 400 에러 코드 응답 전송
    }

    let result = await(await connection).query(
        'SELECT * FROM kitchen_table WHERE fcltyNm LIKE ? OR lnmadr LIKE ?',
        [
            '%' + kitchenName + '%',
            '%' + kitchenPlace + '%'
        ], // 요청 값을 포함한 내용의 급식소 데이터만을 조회
        (err, results) => {
            if (err) {
                console.log('searchKitchen, Select query is now error by : ', err);
                throw err; // select 처리 실패 시 에러 전송
            }
            console.log('Search kitchen : ', results);
        }
    );
    // console.log(result[0]);
    if (result[0].length == 0) {
        return res
            .status(400)
            .json({error: 'No result found'}); // 조회된 급식소가 없을 시 400 에러 코드 응답 전송
    }
    res
        .status(201)
        .send(result[0]); // 조회 성공 시 201 성공 코드와 결과 값을 응답으로 전송
});

module.exports = router;