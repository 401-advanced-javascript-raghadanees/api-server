'use strict';

const express = require('express');
const app = express();
require('dotenv').config(); // npm i express dotenv
const cors = require('cors');

// const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const status_404 = require('./middleware/404.js');
const status_500 = require('./middleware/500.js');

// Global MiddleWare : app.use on the level of my application
app.use(express.json());
app.use(logger);
// app.use(timeStamp);
app.use(cors());

// ///testing
app.get('/', (req, res) => {
    res.status(200).send('HOME PAGE :) ');
});

///>>>>>>>>>>>>>>>>>>>>>>>>>> products routes >>>>>>>>>>>>>>>>>>>>>>>>>>>>

// get all products
let products = [];

app.get('/products', (req, res) => {
    let response = {
        count: products.length,
        results: products
    };
    // res.status(200).send(response);
    res.status(200).json(response);
});

//------------------------------------------------------ 
//get by id
app.get('/products/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    let id = req.params.id;
    let target = [];
    products.forEach(product => {
        if (product.id == id) {
            target.push(product);
        }
    });

    res.status(200).json(target);
});
//------------------------------------------------------ 
/// adding product
app.post('/products', (req, res) => {
    console.log('req.body', req.body);
    let product = req.body;
    products.push(product);
    res.status(200).send(product);
});


//------------------------------------------------------ 
//editing >> update
app.put('/products/:id', (req, res) => {
    let id = req.params.id;
    let newItem = req.body;
    let mapRes = products.map(product => {
        if (product.id == id) {

            product = newItem;
            return product;
        } else {
            res.status(200).send('product is not found')
        }
    });
    products.splice(mapRes, 1, newItem); /// in the products arr replace the mapRes item (one item) with the newItem 
    res.status(200).json(newItem);
    console.log('newItem', newItem)
});
//-------------------------------------------------------
/// patch product
app.patch('/products/:id', (req, res) => {
    let patchId = req.params.id;
    let newItem = {};
    products.forEach((product, index) => {
        if (product.id == patchId) {

            newItem = {
                name: req.body.name ? req.body.name : product.name,
                display_name: req.body.display_name ? req.body.display_name : product.display_name,
                description: req.body.description ? req.body.description : product.description,
                category: req.body.category ? req.body.category : product.category,
                id: patchId
            };

           products.splice(index, 1, newItem);

        } 
    
    });
    
    res.status(200).json(newItem);
    console.log('newItem', newItem)

});


//-------------------------------------------------------
/// deleting product by id
app.delete('/products/:id', (req, res) => {
    let id = req.params.id;
    products.forEach((product, index) => {
        if (product.id == id) {
            products.splice(index, 1)
        }
    });
    res.status(200).json(products);
});





///>>>>>>>>>>>>>>>>>>>>>>>>>> categories routes >>>>>>>>>>>>>>>>>>>>>>>>>>>>


let categories = [];

app.get('/categories', (req, res) => {
    let response = {
        count: categories.length,
        results: categories
    };
    // res.status(200).send(response);
    res.status(200).json(response);
});

//------------------------------------------------------ 
//get by id
app.get('/categories/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    let id = req.params.id;
    let target = [];
    categories.forEach(category => {
        if (category.id == id) {
            target.push(category);
        }
    });

    res.status(200).json(target);
});
//------------------------------------------------------ 
/// adding category
app.post('/categories', (req, res) => {
    console.log('req.body', req.body);
    let category = req.body;
    categories.push(category);
    res.status(200).send(category);
});


//------------------------------------------------------ 
//editing >> update
app.put('/categories/:id', (req, res) => {
    let id = req.params.id;
    let newItem = req.body;
    let mapRes = categories.map(category => {
        if (category.id == id) {

            category = newItem;
            return category;
        } else {
            res.status(200).send('category is not found')
        }
    });
    categories.splice(mapRes, 1, newItem); /// in the categories arr replace the mapRes item (one item) with the newItem 
    res.status(200).json(newItem);
    console.log('newItem', newItem)
});
//-------------------------------------------------------
/// patch category
app.patch('/categories/:id', (req, res) => {
    let id = req.params.id;
    let newItem = req.body;
    let mapRes = categories.map(category => {
        if (category.id == id) {

            category = newItem;
            return category;
        } else {
            res.status(200).send('category is not found')
        }
    });
    categories.splice(mapRes, 1, newItem); /// in the categories arr replace the mapRes item (one item) with the newItem 
    res.status(200).json(newItem);
    console.log('newItem', newItem)

})


//-------------------------------------------------------
/// deleting category by id
app.delete('/categories/:id', (req, res) => {
    let id = req.params.id;
    categories.forEach((category, index) => {
        if (category.id == id) {
            categories.splice(index, 1)
        }
    });
    res.status(200).json(categories);
});


// app.use('*', notFoundHandler);

// function notFoundHandler(req, res, next) {
//     res.status(404).send('404 Not Found');
// }

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


