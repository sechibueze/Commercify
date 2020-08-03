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
let password = '123456'
let mockUser = {
  firstname: 'Kevin',
  lastname: 'Hunt',
  email: 'thinkhunk@gmail.com',
  password: bcrypt.hashSync(password)
};
let dataToUpdateCollection = {
  title: 'Test collection updated 1',
  description: 'Test description updated 1'
};
let adminToken = '';

describe('Manage Collection', function(){
  before(done => {
    User.create(mockUser, err => {
      if (err) done(err);

      done()
    });
  });

  afterEach(done => {
    request.post('/api/users/auth')
      .send({ email: mockUser.email, password: mockUser.password})
      .end((err, res) => {
        if (err) done(err);
          adminToken = res.body.token;
        done()
      })
  })

  it('Should create a new collection', async _ => {
    const res = await request.post('/api/collections')
      .send(mockCollection);

    expect(res.status).to.equal(201);
    expect(res.body.status).to.equal(true);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.have.property('title');
    expect(res.body.data).to.have.property('_id');
    expect(res.body.data.title).to.equal(mockCollection.title);
  });


  it('Should return a list of all collections in database', async _ => {
    const res = await request.get('/api/collections')
      // .send(mockCollection);
    // dataToUpdateCollection = res.body.data;

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal(true);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('array');
    // expect(res.body.data).to.have.property('_id');
    // expect(res.body.data.title).to.equal(mockCollection.title);
  });

  it('Should update a collections in database', async _ => {
    const res = await request.put(`/api/collections/${ dataToUpdateCollection._id }`)
      .set({ 'x-access-token': adminToken })
      .send(dataToUpdateCollection);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal(true);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
    // expect(res.body.data).to.be.an('array');
    expect(res.body.data).to.have.property('_id');
    expect(res.body.data.title).to.equal(dataToUpdateCollection.title);
    expect(res.body.data.description).to.equal(dataToUpdateCollection.description);
  });

  it('Should delete a collections in database', async _ => {
    const res = await request.delete(`/api/collections/${ dataToUpdateCollection._id }`)
      .set({ 'x-access-token': adminToken })
      // .send(dataToUpdateCollection);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal(true);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
    // expect(res.body.data).to.be.an('array');
    expect(res.body.data).to.equal(dataToUpdateCollection._id);
    // expect(res.body.data.title).to.equal(dataToUpdateCollection.title);
    // expect(res.body.data.description).to.equal(dataToUpdateCollection.description);
  });
});

