const express = require('express');
const router = express.Router();
const connection = require('../Config/connectDB');

router.get('/', async (req, res) => {
    console.log(req.query.kitchenName, req.query.kitchenPlace);
    res
        .status(200)
        .send([req.query.kitchenName, req.query.kitchenPlace]);
});

module.exports = router;