const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();

const getData = require('./Router/getData');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/getdata', getData);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});