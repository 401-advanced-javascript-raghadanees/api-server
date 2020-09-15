'use strict';

module.exports = (req, res, next) => {
   
    // let requestTime = Date.now()
    let requestTimeDate = new Date()
    req.requestTime = requestTimeDate;
    next();
};