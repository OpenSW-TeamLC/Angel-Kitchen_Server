const express = require('express');
const router = express.Router();
const connection = require('../Config/connectDB');

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