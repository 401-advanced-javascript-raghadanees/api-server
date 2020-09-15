'use strict';

module.exports = (( req,res,next)=>{
    let requestTimeDate = new Date()
    req.requestTime = requestTimeDate;
    console.log("reqqqqqqqqqqqqqqqq time ", req.requestTime);
    next();
})

        // let requestTime = Date.now()
 
// module.exports =function timeStamp() {

//     return( req,res,next)=>{

//         // let requestTime = Date.now()
//         let requestTimeDate = new Date()
//         req.requestTime = requestTimeDate;
//         console.log("reqqqqqqqqqqqqqqqq time ", req.requestTime);
//         next();
//     } 
// };