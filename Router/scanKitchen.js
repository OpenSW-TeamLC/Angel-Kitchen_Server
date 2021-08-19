const express = require('express');
const router = express.Router();
const connection = require('../Config/connectDB');

router.post('/', async (req, res) => {
    // console.log(req.body); res.send(req.body)
    const lat = parseFloat(req.body.latitude);
    const lot = parseFloat(req.body.longitude);
    const distance = parseInt(req.body.distance, 10);
    console.log(lat, lot, distance);

    if (!lat) {
        res
            .status(400)
            .json({err: 'Incorrect latitude'});
    } else if (!lot) {
        res
            .status(400)
            .json({err: 'Incorrect longitude'});
    } else if (!distance) {
        res
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
    res
        .status(201)
        .send(result[0]);
});

module.exports = router;