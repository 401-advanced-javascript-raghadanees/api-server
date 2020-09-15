const { server }  = require('../lib/server.js'); // {server} >>>destructuring  

const supertest = require('supertest');
const mockRequest = supertest(server);


describe('web server', ()=> {

    it('should respond with 404 for not found routes', ()=>{
        return mockRequest.get('/dog').then(result=>{
            expect(result.status).toBe(404);
        }).catch(err=> {
            console.log(err);
        });
    });

    it('should respond with 200 for good routes', ()=>{
        return mockRequest.get('/products').then(result=>{
            console.log("result >>> ",result);
            expect(result.status).toBe(200);
        }).catch(err=> {
            console.log(err);
        });
    });
    it('should respond with 200 for good routes', ()=>{
        return mockRequest.get('/products/:id').then(result=>{
            console.log("result >>> ",result);
            expect(result.status).toBe(200);
        }).catch(err=> {
            console.log(err);
        });
    });
    it('post >> should respond with 200 for good routes', ()=>{
        let newItem = {
            name: 'Iphone',
            display_name: 'Iphon x',
            description: 'smart phone',
            category: 'electronics',
            id: 1,
        };
        return mockRequest.post('/products').send(newItem).then(result=>{
            console.log("result >>> ",result);
            expect(result.status).toBe(200);
            expect(result.body).toEqual(newItem);
        }).catch(err=> {
            console.log(err);
        });
    });
    it('should respond with 200 for good routes', ()=>{
        return mockRequest.put('/products/:id').then(result=>{
            console.log("result >>> ",result);
            expect(result.status).toBe(200);
        }).catch(err=> {
            console.log(err);
        });
    });

    it('should respond with 200 for good routes', ()=>{
        return mockRequest.patch('/products/:id').then(result=>{
            console.log("result >>> ",result);
            expect(result.status).toBe(200);
        }).catch(err=> {
            console.log(err);
        });
    });

    it('should respond with 200 for good routes', ()=>{
        return mockRequest.delete('/products/1').then(result=>{
            console.log("result >>> ",result);
            expect(result.status).toBe(200);
        }).catch(err=> {
            console.log(err);
        });
    });
    it('get categories should respond with 200', ()=>{
        return mockRequest.get('/categories/:id').then(result=>{
          expect(result.status).toBe(200);
        }).catch(err=> {
          console.log(err);
        });
      });
      
      it('post categories should respond with 200', ()=>{
        return mockRequest.post('/categories').then(result=>{
          expect(result.status).toBe(200);
        }).catch(err=> {
          console.log(err);
        });
      });
    
      it('put categories should respond with 200', ()=>{
        return mockRequest.put('/categories/:id').then(result=>{
          expect(result.status).toBe(200);
        }).catch(err=> {
          console.log(err);
        });
      });
    
      it('delete categories should respond with 200', ()=>{
        return mockRequest.delete('/categories/:id').then(result=>{
          expect(result.status).toBe(200);
        }).catch(err=> {
          console.log(err);
        });
      });
    it('should respond with 500 for bad routes', ()=>{
        return mockRequest.get('/bad').then(result=>{
            expect(result.status).toBe(500);
        }).catch(err=> {
            console.log(err);
        });
    });
    it('should respond with 404 for not found routes', ()=>{
        return mockRequest.get('/notFound').then(result=>{
          expect(result.status).toBe(404);
        }).catch(err=> {
          console.log(err);
        });
      });

});