'use strict';

module.exports = (req, res, next) => {
  console.log('__REQUEST__: ', req.method, req.path, req.requestTime);
  // console.log("__REQUEST TIME__: ", Date.now());
  console.log('__REQUEST TIME__: ', new Date());
  next();
};