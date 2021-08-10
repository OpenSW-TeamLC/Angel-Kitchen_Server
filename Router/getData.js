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

const urlString = process.env.API_URL;
let config = {
    method: 'get',
    url: urlString,
    headers: {
        'Cookie': 'SCOUTER=x4n12f8688mjeh; clientid=020097385071'
    }
};

router.get('/', function (req, res) {
    axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            if (response.data) {
                // res.send(JSON.stringify(response.data));
                res.send('Get success Data!')
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = router;