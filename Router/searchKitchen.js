const express = require('express');
const router = express.Router();
const connection = require('../Config/connectDB');
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
    const kitchenName = req.query.kitchenName;
    const kitchenPlace = req.query.kitchenPlace;
    console.log('searchKitchen : ', kitchenName, kitchenPlace);

    if (!kitchenName && !kitchenPlace) {
        res
            .status(400)
            .json({err: 'Incorrect request query'});
    }

    let result = await(await connection).query(
        'SELECT * FROM kitchen_table WHERE fcltyNm LIKE ? OR lnmadr LIKE ?',
        [
            '%' + kitchenName + '%',
            '%' + kitchenPlace + '%'
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