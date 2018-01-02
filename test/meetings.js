var request = require('supertest');
var assert = require('assert');
var url = 'http://localhost:3000';

describe('User', function () {
  var lastCreatedMeeting = 0;

  it('should be able to schedule a meeting', function (done) {
    request(url)
      .post('/meetings', {
        "meeting_name": 'Test meeting',
        "meeting_desc": 'A test description for the meeting',
        "meeting_date": new Date().toUTCString()
      })
      .expect(function (res) {
        var resRegEx = /(Meeting successfully created with the ID) (\d)/gmi,
            result = resRegEx.exec(res.text) || [];

        if (result.length > 0) {
          lastCreatedMeeting = Number(result[2]);
        }
        assert(result.length > 0, true);
      })
      .end(done);
  });

  it('should be able to delete a meeting', function (done) {
    request(url)
      .delete('/meetings/' + lastCreatedMeeting)
      .expect(function (res) {
        var resRegEx = /(Meeting deleted with the ID) (\d)/gmi,
            result = resRegEx.exec(res.text) || [];

        assert(result.length > 0, true);
      })
      .end(done)
  });

  it('should be able to get ALL meetings', function (done) {
    request(url)
      .get('/meetings')
      .expect(200, done);
  });

  it('should be able to get a specific meeting', function (done) {
    request(url)
      .get('/meetings/1')
      .expect(function (res) {
        assert(res.text, `{"meeting_name":"Meetroid's first meeting!","meeting_desc":"Innaugral meeting!","meeting_date":"Sat, 30 Apr 2016 20:00:57 GMT"}`);
      })
      .expect(200, done);
  });

  it('should NOT be able to delete an invalid meeting', function (done) {
    request(url)
      .delete('/meetings/0')
      .expect(function (res) {
        assert(res.text, 'Unable to delete the requested meeting!');

      })
      .end(done);
  });
});