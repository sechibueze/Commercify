process.env.NODE_ENV = 'test';
const app = require('../app');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const expect = require('chai').expect;
const request = supertest(app);

const Collection = require('../models/Collection');
const User = require('../models/User');

const mockCollection = {
  title: 'Test collection 1',
  description: 'Test description 1'
}
let plainPassword = '123456'
let mockUser = {
  firstname: 'Kevin',
  lastname: 'Hunt',
  email: 'thinkhunk-collection0@gmail.com',
  password: bcrypt.hashSync(plainPassword)
};
let dataToUpdateCollection = {
  _id: '',
  title: 'Test collection updated 1',
  description: 'Test description updated 1'
};
let adminToken = '';

describe('Manage Collection', function(){
  before(done => {
    User.create(mockUser, err => {
      if (err) return done(err);
        request.post('/api/users/auth')
          .send({ email: mockUser.email, password: plainPassword})
          .end((err, res) => {
            if (err) done(err);
            // console.log('Admin token : ', res.body)
              adminToken = res.body.token;
            done()
          })

      // done()
    });
  });

  // beforeEach(done => {
    // request.post('/api/users/auth')
    //   .send({ email: mockUser.email, password: plainPassword})
    //   .end((err, res) => {
    //     if (err) done(err);
    //     // console.log('Admin token : ', res.body)
    //       adminToken = res.body.token;
    //     done()
    //   })
  // })

  after( done => {
     User.deleteMany({  }, (err) => {
      if (err) done(err)
        Collection.deleteMany({}, err => {
          if (err) done(err)
          done()
        })
     })
  });

  it('Should create a new collection', function(done) {
     request.post('/api/collections')
      .send(mockCollection)
      .end((err, res) => {
          // console.log('New collection : ', res.body)
          dataToUpdateCollection._id = res.body.data._id ;
    
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('title');
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data.title).to.equal(mockCollection.title);
        done()

      });
  });


  it('Should return a list of all collections in database', function(done) {
    request
      .get('/api/collections')
      .end((err, res) => {
        
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');

        done();

      });

  });

  it('Should update a collections in database',  _ => {
    // console.log('Admin token', adminToken)
    // console.log('Data to update ', dataToUpdateCollection)
    request.put(`/api/collections/${ dataToUpdateCollection._id }`)
      .set({ 'x-access-token': adminToken })
      .send(dataToUpdateCollection)
      .end((err, res) => {
        if ( err ) _(err)
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        // expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data.title).to.equal(dataToUpdateCollection.title);
        expect(res.body.data.description).to.equal(dataToUpdateCollection.description);

        _()
      });

  });

  it('Should delete a collections in database', done => {
    request
      .delete(`/api/collections/${ dataToUpdateCollection._id }`)
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {

        if(err) return done(err);

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(true);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.equal(dataToUpdateCollection._id);

        done();
      });
  });
});

