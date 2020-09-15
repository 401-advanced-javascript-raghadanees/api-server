'use strict';

const express = require('express');
const app = express();
require('dotenv').config(); // npm i express dotenv

const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const status_404 = require('./middleware/404.js');
const status_500 = require('./middleware/500.js');

// Global MiddleWare : app.use on the level of my application
app.use(express.json());
app.use(logger);
app.use(timeStamp);

// ///testing
// app.get('/cat', (req, res)=> {
//     res.status(200).send('Meow2');
// });

///>>>>>>>> products routes

// get all products
let products = [];

app.get('/products', (req, res) => {
    let response = {
        count: products.length,
        results: products,
    };
    res.status(200).send(response);
});

/// adding product
app.post('/products', (req, res) => {
    let product = req.body;
    products.push(product);
    res.status(200).send(product);
});

//get by id
app.get('/products/:id', (req, res) => {
    let id = req.params.id;
    let response = products.find((element) => {
        return element.id === id;
    });
    res.status(200).json(response);
});



//>>>>>>>> CATEGORIES  routes

let categories = [];

app.get('/categories', (req, res) => {
    let response = {
        count: categories.length,
        results: categories,
    };
    res.status(200).send(response);
});

app.post('/categories', (req, res) => {
    let category = req.body;
    categories.push(category);
    res.status(200).send(category);
});


// app.use('*', notFoundHandler);

// function notFoundHandler(req, res, next) {
//     res.status(404).send('404 Not Found');
// }
app.use('*', status_404);

app.use(status_500);


module.exports = {
    server: app,
    start: PORT => {
        PORT = PORT || process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    }
};


