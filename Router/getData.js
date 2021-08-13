const express = require('express');
const router = express.Router();
let axios = require('axios');
const connection = require('../Config/connectDB');

let config = {
    method: 'get',
    url: process.env.API_URL,
    headers: {
        'Cookie': 'SCOUTER=x4n12f8688mjeh; clientid=040051352092'
    }
};

router.get('/', function (req, res) {
    axios(config)
        .then(async (response) => {
            const dataLength = response.data.response.body.items.length;
            console.log(dataLength);
            for (let index = 0; index < dataLength; index++) {
                let readData = JSON.stringify(response.data.response.body.items[index]);
                let data = JSON.parse(readData);

                await(await connection).query(
                    'INSERT INTO kitchen_table(fcltyNm, rdnmadr, lnmadr, phoneNumber, mlsvTrget, ml' +
                            'svTime, mlsvDate, operOpenDate, latitude, longitude) SELECT ?,?,?,?,?,?,?,?,?,' +
                            '? FROM DUAL WHERE NOT EXISTS(SELECT * FROM kitchen_table WHERE fcltyNm = ? AND rdnmadr = ?)',
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
                        data.rdnmadr
                    ],
                    (err, results, fields) => {
                        if (err) {
                            throw err;
                        }
                        console.log(results);
                    }
                );
            }
            (await connection).end();
            res
                .status(201)
                .json({"status": "success!"});
        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = router;