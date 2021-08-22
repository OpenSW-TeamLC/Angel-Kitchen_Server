const express = require('express');
const router = express.Router();
const connection = require('../Config/connectDB');
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
 *      - name:
 *        in: body
 *        description: 반경 내의 급식소 검색에 필요한 요청 값
 *        schema:
 *          type: object
 *          required:
 *              - latitude
 *              - longitude
 *              - distance
 *          properties:
 *              latitude:
 *                  type: number
 *                  format: double
 *                  description: 사용자의 위도 값
 *              longitude:
 *                  type: number
 *                  format: double
 *                  description: 사용자의 경도 값
 *              distance:
 *                  type: integer
 *                  description: 검색하고자 하는 반경 값
 *     responses:
 *       200:
 *         description: 검색된 급식소 정보 리스트
 *         schema:
 *          $ref: '#/definitions/scanResults'
 */
router.post('/', async (req, res) => {
    // console.log(req.body); res.send(req.body)
    const lat = parseFloat(req.body.latitude);
    const lot = parseFloat(req.body.longitude);
    const distance = parseInt(req.body.distance, 10);
    console.log('scanKitchen : ', lat, lot, distance);

    if (!lat) {
        return res
            .status(400)
            .json({err: 'Incorrect latitude'});
    } else if (!lot) {
        return res
            .status(400)
            .json({err: 'Incorrect longitude'});
    } else if (!distance) {
        return res
            .status(400)
            .json({err: 'Incorrect distance'});
    }

    let result = await(await connection).query(
        'SELECT *,(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(l' +
                'ongitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS scanRe' +
                'sult FROM kitchen_table HAVING scanResult <= ? ORDER BY scanResult',
        [
            lat, lot, lat, distance
        ],
        (err, results, fields) => {
            if (err) {
                throw err;
            }
            console.log(results);
        }
    );
    if (result[0].length == 0) {
        return res
            .status(400)
            .json({err: 'No result found'});
    }
    res
        .status(201)
        .send(result[0]);
});

module.exports = router;