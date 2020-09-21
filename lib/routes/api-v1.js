'use strict';

const express = require('express');

const findModel = require('../middleware/params');
const router = express.Router();
router.param('model', findModel);

router.post('/:model', handlerOfPost);

router.get('/:model', getHandleAll);
router.get('/:model/:id', getHandlerById);

router.put('/:model/:id', updateHandler);
router.patch('/:model/:id', patchHandler);

router.delete('/:model/:id', hanlingDelete);


function handlerOfPost(req, res, next) {
    
  req.model.create(req.body)
    .then(data => {
      res.status(201).json(data);
    }).catch(next);
}

function getHandleAll(req, res, next) {
  req.model.read()
    .then(data => {
      res.status(200).json({count: data.length, result: data });
    }).catch(next);
}

function getHandlerById(req, res, next) {
  req.model.read(req.params.id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}

function updateHandler(req, res, next) {
  req.model.update(req.params.id, req.body)
    .then(data => {
      res.status(201).json(data);
    }).catch(next);
}

function patchHandler(req, res, next) {
  req.model.patch(req.params.id, req.body)
    .then(data => {
      res.status(201).json(data);
    }).catch(next);
}

function hanlingDelete(req, res, next) {
  req.model.delete(req.params.id)
    .then(data => {
      res.status(200).json('deleted !!! ');
    }).catch(next);
}

module.exports = router;