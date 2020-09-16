'use strict';

 require('@code-fellows/supergoose');

const Product = require('../lib/models/categories/categories-model');
const product = new Product();

describe ('product Model', ()=> {
    it('it can create()', async ()=> {
        const productObj = { name: "camera", category: " electronics", price: 99.99};
        const result = await product.create(productObj);
        Object.keys(productObj).forEach(key=> {
            console.log('Object.keys(productObj),,,,',Object.keys(productObj));
            expect(result[key]).toEqual(productObj[key]);
            console.log('result >>>>>',result);
            // console.log('result[key]>>>>>',result[key]);
        });
    });

    it('it can get()', async ()=> {
        const productObj = { name: "camera", category: " electronics", price: 99.99};
        const result = await product.create(productObj);
        const records = await product.get(result._id); // []
        console.log("records >>>> ", records)
        Object.keys(productObj).forEach(key=> {
            expect(records[0][key]).toEqual(productObj[key]);
        });
    });

    it('it can delete()', async ()=> {
        const productObj = { name: "camera", category: " electronics", price: 99.99};
        const result = await product.create(productObj);
        const records = await product.delete(result._id);
        // console.log("records >>>> ", records)
        // console.log('result delet,,,,,,,,,,,,,,,,,,,,,,,,,,', result);
        Object.keys(productObj)
            expect(records.key).toEqual(productObj.key);
        
    });

    it('it can update()', async ()=> {
        const productObj = { name: "camera", category: " electronics", price: 99.99};
        const newategoryObj = { name: "iphon", category: " electronics", price: 99.99};
        const result = await product.create(productObj);
        const records = await product.update(result._id , newategoryObj);
      
        Object.keys(productObj)
            expect(records.key).toEqual(newategoryObj.key);
        
    });
    
});