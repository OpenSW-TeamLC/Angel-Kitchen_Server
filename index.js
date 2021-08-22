const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const getData = require('./Router/getData');
const readData = require('./Router/readData');
const scanKitchen = require('./Router/scanKitchen');
const searchKitchen = require('./Router/searchKitchen');
const {swaggerUi, specs} = require('./swagger');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/getdata', getData);
app.use('/readdata', readData);
app.use('/scankitchen', scanKitchen);
app.use('/searchkitchen', searchKitchen);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});