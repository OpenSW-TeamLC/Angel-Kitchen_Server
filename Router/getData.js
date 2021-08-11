const express = require('express');
const router = express.Router();
let axios = require('axios');
const mysql = require('mysql');

const connection = mysql.createConnection(require('../Config/connectDB'));
connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('mysql connect completed!');
});

let config = {
    method: 'get',
    url: process.env.API_URL,
    headers: {
        'Cookie': 'SCOUTER=x4n12f8688mjeh; clientid=040051352092'
    }
};

router.get('/', function (req, res) {
    axios(config)
        .then(function (response) {
            const dataLength = response.data.response.body.items.length;
            console.log(dataLength);
            // for (let index = 0; index < dataLength; index++) {
            //     let readData = JSON.stringify(response.data.response.body.items[index]);
            //     let Data = JSON.parse(readData);
            //     console.log(Data);
            // }
        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = router;