'use strict';
const productsModel = require(`../models/products/products-model`);
const categoriesModel = require(`../models/categories/categories-model`);

const category = new categoriesModel();
const products = new productsModel();

module.exports = (req, res, next) => {
  let model = req.params.model;
  switch (model) {
  case 'products':
    req.model = products;
    next();
    break;
  case 'categories':
    req.model = category;
    next();
    break;
  default:
    next('Invalid Model !!!');
    return;
  }
};

// function getModel (req, res, next) {
//     let model = req.params.model;
//     switch(model) {
//         case "food":
//             req.model = food;
//             next();
//             break;
//         case "books":
//             req.model = books;
//             next();
//             break;
//         default:
//             next("Invalid Model!!! ");
//             break;
//     }
// }