process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const app = require('../app')
const request = supertest(app);
const bcrypt = require('bcryptjs');
const expect = require('chai').expect;

const Product = require('../models/Product');
const User = require('../models/User');
const Collection = require('../models/Collection');

// ?Test data?
let plainPassword = '123456';
let authToken = '';
let mockUserId = '';
let mockProductId = '';
let mockCollectionId = '';
let mockUser = {
  // _id: '',
  firstname: 'Kevin',
  lastname: 'Hunt',
  email: 'thinkhunk-collection0@gmail.com',
  password: bcrypt.hashSync(plainPassword)
};

let mockCollection = {
  // _id: '',
  title: 'Mock Product Collection',
  description: 'Mock product description'
}

let mockProduct = {
  // owner: '',
  title: 'Test product title',
  category: '',
  price: '50',
  description: 'Tes product description',
  productImage: 'https://picsum.com/200/200.png',
  tags: 'tag1, tag2, tag3'
};

let mockProductUpdate = {
  title: 'Updated product',
  description: 'Updated description'
}



describe('Manage Products', function(done){
  before(done => {

    User.create(mockUser, (err, newTestUser) => {

      mockUserId = newTestUser._id;

      if(err) return done(err);

      // Login
      request
        .post('/api/users/auth')
        .send({ email: mockUser.email, password: plainPassword})
        .end((err, authUserResponse) => {
          if(err) return done(err);
          authToken = authUserResponse.body.token;

          // Create Collection

          request
            .post('/api/collections')
            .send(mockCollection)
            .end((err, collectionResponse) => {
              if(err) return done(err);
              mockCollectionId = collectionResponse.body.data._id;
              done();
            });

        })

    });

  });


  after(done => {
    User.deleteMany({}, err => {
      if(err) return done(err);

      Collection.deleteMany({}, err => {
        if(err) return done(err);

        Product.deleteMany({}, err => {
        if(err) return done(err);
        
        done();
      });
        
        // done();
      });
    });
  });

  // describe('Manage Products', function(done){
    it('Should create a new product in database', done => {
      
      mockProduct.category = mockCollectionId;

      request
        .post('/api/products')
        .set({'x-access-token': authToken })
        .send(mockProduct)
        .end((err, res) => {
          if(err) return done(err);
          
          mockProductId = res.body.data._id;
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status')
          expect(res.body.status).to.equal(true);
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.title).to.equal(mockProduct.title);
          done()
        });
    });
  // });

    it('Should get all products in database', done => {
      
      request
        .get('/api/products')
        // .send(mockProduct)
        .end((err, res) => {
          if(err) return done(err);

          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status')
          expect(res.body.status).to.equal(true);
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('array')
          expect(res.body.data.length).to.equal(1);
          done()
        });
    });

    it('Should update a  product in database', done => {
      // mockProduct.owner = mockUserId;
      // mockProduct.category = mockCollectionId;

      request
        .put(`/api/products/${ mockProductId }`)
        .set({'x-access-token': authToken })
        .send(mockProductUpdate)
        .end((err, res) => {
          if(err) return done(err);

          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status')
          expect(res.body.status).to.equal(true);
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.title).to.equal(mockProductUpdate.title);
          expect(res.body.data._id).to.equal(mockProductId);
          done()
        });
    });

    it('Should delete a  product in database', done => {
    
      request
        .delete(`/api/products/${ mockProductId }`)
        .set({'x-access-token': authToken })
        .end((err, res) => {
          if(err) return done(err);

          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status')
          expect(res.body.status).to.equal(true);
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.a('string')
          expect(res.body.data).to.equal(mockProductId);
          done()
        });
    });
});
