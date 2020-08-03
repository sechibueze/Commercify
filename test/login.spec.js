process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const expect = require('chai').expect;
const app = require('../app');
const request = supertest(app);
const User = require('../models/User');

let email = 'kevinhunt@gmail.com';
let password = '123456';
let authToken = '';
let mockUser = {
  firstname: 'Kevin',
  lastname: 'Hunt',
  email,
  password: bcrypt.hashSync(password)
};

describe('User login', function() {
  // Seed user to DB
  before(done => {
    
    User.create(mockUser, err => {
      if (err) done(err);

      done()
    });
  });

  after( done => {
     User.deleteOne({ email: mockUser.email }, (err) => {
      if (err) done(err)
       done()
     })
  });

  it('should allow registered user to login', async () => {
    const res = await request.post('/api/users/auth').send({email, password});

    // setup JWT for use with authentication
    authToken = res.body.token;

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal(true);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('token');
  });
});