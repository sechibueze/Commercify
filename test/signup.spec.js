const supertest = require('supertest');
const app = require('../app');
const expect = require('chai').expect;

const request = supertest(app);

describe('User signup', () => {
  it('Should signup a nuew user', async () => {
    const res =  await request.get('/api/users');
    expect(res.status).to.equal(200)
    // done();

  })
});

