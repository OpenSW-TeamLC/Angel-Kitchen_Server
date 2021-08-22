const express = require('express');
const router = express.Router();
const connection = require('../Config/connectDB');
/**
 * @swagger
 * tags:
 *   name: readData
 *   description: kitchen_table DB 전체 조회
 * definitions:
 *   readResults:
 *     type: object
 *     required:
 *       - fcltyNm
 *       - latitude
 *       - longitude
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
 *     responses:
 *       200:
 *         description: 조회 성공 리스트
 *         schema:
 *          $ref: '#/definitions/readResults'
 */
router.get('/', async (req, res) => {
    let result = await(await connection).query("SELECT * FROM kitchen_table");
    // console.log('readData : ', result[0]);
    if (result[0].length == 0) {
        return res
            .status(400)
            .json({err: 'No result found'});
    }
    res
        .status(200)
        .send(result[0]);
});

module.exports = router;