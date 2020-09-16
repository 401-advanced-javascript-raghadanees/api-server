'use strict';

const express = require('express');
const router = express.Router();
const categories = require('../models/categories/categories-model.js');
const category = new categories();


router.post('/categories', addNewcategory);
router.get('/categories', getcategories);
router.get('/categories/:id', getcategories);
router.put('/categories/:id', updatecategory);
router.patch('/categories/:id', updatecategoryByPatch);
router.delete('/categories/:id', deletecategory);

function addNewcategory(req, res, next) {
    console.log("req.body >>> ", req.body);
    let newcategory = req.body;
    category.create(newcategory).then(data => {
        res.status(200).json(data);
    }).catch(err => { // we can do .catch(next)
        console.log(err);
        next(err);
    });
}

function getcategories(req, res, next){
    const id = req.params.id;
// let resResult = {};
    category.get(id).then(data => {
        // resResult = {
        //     count: data.length,
        //     results: data
        // }
        res.status(200).json({count:data.length, results: data});
    }).catch(next);
}

function updatecategory(req, res, next){
    const id = req.params.id;
    let updatedItem = req.body;
    category.update(id, updatedItem).then(data => {
        res.status(200).json(data)
    }).catch(next);

}
function updatecategoryByPatch(req, res, next){
    const id = req.params.id;
    let updatedItem = req.body;
    category.update(id, updatedItem).then(data => {
        res.status(200).json(data)
    }).catch(next);

}
function deletecategory(req, res, next){
    const id = req.params.id;
    category.delete(id).then(data => {
        res.status(200).json(data);
    }).catch(next);
}



module.exports = router;


// {
//     "name": "Iphone",
//     "category": " electronics" ,
//     "price": 999.99,
//     "model": "xx435"
    
// }