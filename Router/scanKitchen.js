const express = require('express');
const router = express.Router();
const connection = require('../Config/connectDB');

router.post('/', async (req, res) => {
    console.log(req.body);
    res.send(req.body)
});

module.exports = router;