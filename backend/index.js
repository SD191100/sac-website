const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen (PORT, () => {
    console.log(`server listening on port ${PORT}`);
})