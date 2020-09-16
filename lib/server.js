'use strict';
require('dotenv').config(); // npm i express dotenv
const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const products = require('./routes/products.js');
const categories = require('./routes/categories.js');
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const logger = require('./middleware/logger.js');
const status_404 = require('./middleware/404.js');
const status_500 = require('./middleware/500.js');
// const timeStamp = require('./middleware/timestamp.js');
// app.use(timeStamp);
app.use(logger);



app.use('/api/v1', products);
app.use('/api/v1', categories);

// ///testing
app.get('/', (req, res) => {
    res.status(200).send('HOME PAGE :) ');
});



//server error testing
app.get('/bad', (req, res) => {
    throw new Error('bad Request');
});
app.use('*', status_404);

app.use(status_500);


module.exports = {
    server: app,
    start: PORT => {
        PORT = PORT || process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    }
};


