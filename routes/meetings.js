var MEETINGS = {
  "1": {
    "meeting_name": 'Meetroid\'s first meeting!',
    "meeting_desc": 'Innaugral meeting!',
    "meeting_date": 'Sat, 30 Apr 2016 20:00:57 GMT'
  },

  "2": {
    "meeting_name": 'Startup Sutra',
    "meeting_desc": 'A meeting event for budding entrepreneurs',
    "meeting_date": 'Mon, 2 May 2016 20:00:57 GMT'
  },

  "3": {
    "meeting_name": 'Latin Event',
    "meeting_desc": 'Lorum Ipsum Dolor',
    "meeting_date": 'Sun, 1 May 2016 20:00:57 GMT'
  },

  "4": {
    "meeting_name": 'Roundtable Meetup',
    "meeting_desc": 'A meeting around the big ol\` roundtable',
    "meeting_date": 'Sat, 30 Apr 2016 20:00:57 GMT'
  }
};

var LAST_ID = 4;

var express = require('express'),
    router = express.Router();

router.get('/', function (req, res, next) {
  res.json(MEETINGS);
});

router.get('/:id', function (req, res, next) {
  var meetingId = req.params.id;

  if (MEETINGS[meetingId]) {
    res.json(MEETINGS[meetingId]);
  } else {
    res.send('An error occured while getting the requested meeting!');
  }
});

router.delete('/:id', function (req, res, next) {
  var meetingId = req.params.id || 0;

  if (MEETINGS[meetingId]) {
    delete MEETINGS[meetingId];
    res.send('Meeting deleted with the ID ' + meetingId);
  } else {
    res.send('Unable to delete the requested meeting!');
  }
});

router.post('/', function (req, res, next) {
  var meetingName = req.body.meeting_name,
      meetingDesc = req.body.meeting_desc,
      meetingDate = req.body.meeting_date;

  MEETINGS[++LAST_ID] = {
    "meeting_name": meetingName,
    "meeting_desc": meetingDesc,
    "meeting_date": meetingDate
  };

  if (MEETINGS[LAST_ID]) {
    res.send('Meeting successfully created with the ID ' + LAST_ID);
  } else {
    res.send('Unable to schedule the meeting!');
  }
});

module.exports = router;