var request = require('supertest');
var assert = require('assert');
var url = 'http://localhost:3000';

describe('Admin', function () {
  it('should open the home page', function (done) {
    request(url)
      .get('/')
      .expect(200, done);
  });

  it('should NOT be able to access dashboard page before login', function (done) {
    request(url)
      .get('/dashboard')
      .expect(function (res) {
        assert(res.text, 'You are not authorized to view this page');
      })
      .end(done);
  });

  it('should be able to login', function (done) {
    request(url)
      .post('/login')
      .send({ "user_name": 'admin', "user_password": 'admin' })
      .expect(302, done);
  });

  it('should be able to access dashboard page after login', function (done) {
    request(url)
      .get('/dashboard')
      .expect(200, done);
  });
});