const express = require('express');
const router = express.Router();
const connection = require('../Config/connectDB');

router.get('/', async (req, res) => {
    const kitchenName = req.query.kitchenName;
    const kitchenPlace = req.query.kitchenPlace;
    console.log('searchKitchen : ', kitchenName, kitchenPlace);

    if (!kitchenName && !kitchenPlace) {
        res
            .status(400)
            .json({err: 'Incorrect request query'});
    }

    let result = await(await connection).query(
        'SELECT * FROM kitchen_table WHERE fcltyNm LIKE ? OR lnmadr LIKE ?',
        [
            '%' + kitchenName + '%',
            '%' + kitchenPlace + '%'
        ],
        (err, results, fields) => {
            if (err) {
                throw err;
            }
            console.log(results);
        }
    );
    if (result[0].length == 0) {
        return res
            .status(400)
            .json({err: 'No result found'});
    }
    res
        .status(201)
        .send(result[0]);
});

module.exports = router;