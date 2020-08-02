process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const expect = require('chai').expect;

const app = require('../app');
const request = supertest(app);

const User = require('../models/User');
let users = [
  {
    firstname: 'Mary',
    lastname: 'Hunt',
    email: 'maryhunt@gmail.com',
    password: '123456'
  },
  {
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@gmail.com',
    password: '123456'
  }
];
let newTestUser = users[0];
describe('User signup', () => {
  before( done => {
     User.deleteOne({ email: newTestUser.email }, (err) => {
      if (err) done(err)

       done()
     })
  });
  after( done => {
     User.deleteOne({ email: newTestUser.email }, (err) => {
      if (err) done(err)
       done()
     })
  });
  it('Should signup a new user', async () => {
    
    const res =  await request.post('/api/users').send(newTestUser);
    expect(res.status).to.equal(201);
    expect(res.body.status).to.equal(true);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('token');
    // done();

  })
});

