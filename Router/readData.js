const express = require('express');
const router = express.Router();
const connection = require('../Config/connectDB');

router.get('/', async (req, res) => {
    let result = await(await connection).query("SELECT * FROM kitchen_table");
    // console.log(result[0]);
    res.send(result[0]);
});

module.exports = router;