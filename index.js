const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const getData = require('./Router/getData');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());
app.use('/getdata', getData);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});