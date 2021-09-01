const express = require('express');
const router = express.Router();
const connection = require('../config/connectDB'); // DB 연결 및 쿼리작성 변수
/**
 * @swagger
 * tags:
 *   name: scanKitchen
 *   description: 사용자 위치 반경내의 급식소 검색
 * definitions:
 *   scanResults:
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
 *       scanResult:
 *         type: number
 *         format: double
 *         description: 사용자 위치로부터 급식소까지의 거리
 */
/**
 * @swagger
 * /scankitchen:
 *   post:
 *     tags: [scanKitchen]
 *     parameters:
 *      - name: requestBody
 *        in: body
 *        description: 반경 내 급식소 검색에 필요한 요청 내용
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *              latitude:
 *                  type: number
 *                  format: double
 *                  description: 사용자의 위치 위도 값
 *              longitude:
 *                  type: number
 *                  format: double
 *                  description: 사용자의 위치 경도 값
 *              distance:
 *                  type: integer
 *                  description: 검색하고자 하는 반경 값
 *     responses:
 *       200:
 *         description: 검색 성공
 *         schema:
 *          $ref: '#/definitions/scanResults'
 *       400:
 *         description: 요청 값이 올바르지 않음
 *         schema:
 *          type: object
 *          properties:
 *              error:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: integer
 *                          example: 400
 *                          description: 상태 코드
 *                      contents:
 *                          type: string
 *                          example: Incorrect ???
 *                          description: 에러 내용
 *       404:
 *         description: 검색된 급식소가 없음
 *         schema:
 *          type: object
 *          properties:
 *              error:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: integer
 *                          example: 404
 *                          description: 상태 코드
 *                      contents:
 *                          type: string
 *                          example: No result found
 *                          description: 에러 내용
 */
router.post('/', async (req, res) => {
    // console.log(req.body); res.send(req.body)
    const lat = parseFloat(req.body.latitude); // 사용자 위치 위도
    const lot = parseFloat(req.body.longitude); // 사용자 위치 경도
    const distance = Math.abs(parseInt(req.body.distance, 10)); // 검색 반경 거리
    // console.log('scanKitchen : ', lat, lot, distance);

    if (!lat) {
        return res
            .status(400)
            .json({error: 'Incorrect latitude'});
    } else if (!lot) {
        return res
            .status(400)
            .json({error: 'Incorrect longitude'});
    } else if (!distance) {
        return res
            .status(400)
            .json({error: 'Incorrect distance'});
    } // 각각의 요청 값이 없을 경우 400 에러 코드 및 관련 메시지를 응답 전송

    let result = await(await connection).query(
        'SELECT *,(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(l' +
                'ongitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS scanRe' +
                'sult FROM kitchen_table HAVING scanResult <= ? ORDER BY scanResult',
        [
            lat, lot, lat, distance
        ], // 하버사인 공식을 통한 반경 내 급식소만을 조회
        (err, results) => {
            if (err) {
                console.log('scanKitchen, Select query is now error by : ', err);
                throw err; // select 처리 실패 시 에러 전송
            }
            console.log('Scan kitchen : ', results);
        }
    );
    // console.log(result[0]);
    if (result[0].length == 0) {
        return res
            .status(404)
            .json({error: 'No result found'}); // 검색된 급식소가 없을 시 404 에러 코드 응답 전송
    }
    res
        .status(201)
        .send(result[0]); // 검색 성공 시 201 성공 코드 및 결과 값을 응답으로 전송
});

module.exports = router;