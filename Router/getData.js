const express = require('express');
const router = express.Router();
let axios = require('axios');
const mysql = require('mysql');
const connection = mysql.createConnection(require('../Config/connectDB'));

let config = {
    method: 'get',
    url: 'http://api.data.go.kr/openapi/tn_pubr_public_free_mlsv_api?serviceKey=b7%2BNGZ' +
            '%2BxRbFG9ApCFAM3aCNPNwrEvmCyzXzVfIfbaXEpSDY8kSqxnU9j3eUAkZYKaVVzIlZMscxVYmyHKO' +
            'rarg%3D%3D&pageNo=1&numOfRows=1500&type=json',
    headers: {
        'Cookie': 'SCOUTER=x4n12f8688mjeh; clientid=040027336549'
    }
};

router.get('/', function (req, res) {
    connection.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('mysql connect completed!');
    });
    axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            if (response.data) {
                res.send('Success get Data!');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = router;