const { server }  = require('../lib/server.js'); // {server} >>>destructuring  

const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);


describe('web server', ()=> {


  it('can post() a product item', async ()=> {
    const productObj = { name: "camera", category: " electronics", price: 99.99, model: "xx435",inStock: 2200 };
    const data = await mockRequest.post('/api/v1/products').send(productObj);
    console.log("data.body : ",data.body);
    const record = data.body;
    Object.keys(productObj).forEach(key=> {
        expect(record[key]).toEqual(productObj[key]);
    });
});

// it('can get() a product item', async ()=> {
//     const productObj =  {
//       name: "camera",
//       category: "electronics" ,
//       price: 99.99,
//       model: "xx435",
//       inStock: 2200
//   };
//     const data = await mockRequest.post('/api/v1/products').send(productObj);
//     // console.log("data.body : ",data.body);
//     const record = data.body;
//     const productItemResponse = await mockRequest.get(`/api/v1/products/${record._id}`);
//     const productItem = productItemResponse.body[0];
//     Object.keys(productObj).forEach(key=> {
//         expect(productItem[key]).toEqual(productObj[key]);
//     });

// });


    it('should respond with 404 for not found routes', ()=>{
        return mockRequest.get('/dog').then(result=>{
            expect(result.status).toBe(404);
        }).catch(err=> {
            console.log(err);
        });
    });

  
   
    it('should respond with 500 for bad routes', ()=>{
        return mockRequest.get('/bad').then(result=>{
            expect(result.status).toBe(500);
        })
    });
    it('should respond with 404 for not found routes', ()=>{
        return mockRequest.get('/notFound').then(result=>{
          expect(result.status).toBe(404);
        })
      });

});