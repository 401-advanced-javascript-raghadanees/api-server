'use strict';

 require('@code-fellows/supergoose');

const Category = require('../lib/models/categories/categories-model');
const category = new Category();

describe ('Category Model', ()=> {
    it('it can create()', async ()=> {
        const categoryObj = { name: "camera", category: " electronics", price: 99.99};
        const result = await category.create(categoryObj);
        Object.keys(categoryObj).forEach(key=> {
            console.log('Object.keys(categoryObj),,,,',Object.keys(categoryObj));
            expect(result[key]).toEqual(categoryObj[key]);
            console.log('result >>>>>',result);
            // console.log('result[key]>>>>>',result[key]);
        });
    });

    it('it can get()', async ()=> {
        const categoryObj = { name: "camera", category: " electronics", price: 99.99};
        const result = await category.create(categoryObj);
        const records = await category.get(result._id); // []
        console.log("records >>>> ", records)
        Object.keys(categoryObj).forEach(key=> {
            expect(records[0][key]).toEqual(categoryObj[key]);
        });
    });

    it('it can delete()', async ()=> {
        const categoryObj = { name: "camera", category: " electronics", price: 99.99};
        const result = await category.create(categoryObj);
        const records = await category.delete(result._id);
        // console.log("records >>>> ", records)
        // console.log('result delet,,,,,,,,,,,,,,,,,,,,,,,,,,', result);
        Object.keys(categoryObj)
            expect(records.key).toEqual(categoryObj.key);
        
    });

    it('it can update()', async ()=> {
        const categoryObj = { name: "camera", category: " electronics", price: 99.99};
        const newategoryObj = { name: "iphon", category: " electronics", price: 99.99};
        const result = await category.create(categoryObj);
        const records = await category.update(result._id , newategoryObj);
      
        Object.keys(categoryObj)
            expect(records.key).toEqual(newategoryObj.key);
        
    });
    
});