'use strict';

const express = require('express');
const router = express.Router();
const Products = require('../models/products/products-model.js');
const product = new Products();


router.post('/products', addNewProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProducts);
router.put('/products/:id', updateProduct);
router.patch('/products/:id', updateProductByPatch);
router.delete('/products/:id', deleteProduct);

function addNewProduct(req, res, next) {
  console.log('req.body >>> ', req.body);
  let newProduct = req.body;
  product.create(newProduct).then(data => {
    res.status(200).json(data);
  }).catch(err => { // we can do .catch(next)
    console.log(err);
    next(err);
  });
}

function getProducts(req, res, next){
  const id = req.params.id;
  let resResult = {};
  product.get(id).then(data => {
    resResult = {
      count: data.length,
      results: data,
    };
    res.status(200).json(resResult);
  }).catch(next);
}

function updateProduct(req, res, next){
  const id = req.params.id;
  let updatedItem = req.body;
  product.update(id, updatedItem).then(data => {
    res.status(200).json(data);
  }).catch(next);

}
function updateProductByPatch(req, res, next){
  const id = req.params.id;
  let updatedItem = req.body;
  product.update(id, updatedItem).then(data => {
    res.status(200).json(data);
  }).catch(next);

}
function deleteProduct(req, res, next){
  const id = req.params.id;
  product.delete(id).then(data => {
    res.status(200).json(data);
  }).catch(next);
}



module.exports = router;

// {
//     "name": "camera2222",
//     "category": " electronics" ,
//     "price": 99.99,
//     "model": "xx435",
//     "inStock": 2200
// }