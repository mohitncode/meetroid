var request = require('supertest');
var assert = require('assert');
var url = 'http://localhost:3000';

describe('User', function () {
  it('should open the home page', function (done) {
    request(url)
      .get('/')
      .expect(200, done);
  });

  it('should NOT be able to logout before login', function (done) {
    request(url)
      .get('/logout')
      .expect(function (res) {
        assert(res.text, 'You need to be logged in before you can be logged out!')
      })
      .end(done);
  });

  it('should be able to login', function (done) {
    request(url)
      .post('/login')
      .send({ "user_name": 'jane', "user_password": 'jane' })
      .expect(302, done);
  });

  it('should NOT be able to access the dashboards page even after login', function (done) {
    request(url)
      .get('/dashboard')
      .expect(function (res) {
        assert(res.text, 'You are not authorized to view this page');
      })
      .end(done);
  });

  it('should be able to logout', function (done) {
    request(url)
      .get('/logout')
      .expect(function (res) {
        assert(res.text, 'Logged out successfully!')
      })
      .end(done);
  });

});