var db = require('./db'),
    express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    http = require('http'),
    app = express(),
    server = http.Server(app),
    io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
  "cookie": {
    "path": '/',
    "httpOnly": true,
    "secure": false,
    "maxAge": null
  },
  "secret": 'meetroid',
  "saveUninitialized": false,
  "resave": true
}));

var adminSocket = null;

app.post('/login', function (req, res, next) {
  var username = req.body.user_name,
      password = req.body.user_password;

  db.login(username, password, function(err, result) {
    if (err) {
      res.status(404).json({ "status": 404, "error": 'Invalid credentials!' });
    }

    if (result) {
      updateLoggedInUsers(db.getLoggedInUsers());
      req.session.username = result.username;
      req.session.is_admin = result.is_admin;

      if (result.is_admin) {
        res.status(200).redirect('/dashboard');
      } else {
        res.status(200).redirect('/meetings');
      }
    }
  });
});

app.get('/dashboard', function (req, res, next) {
  if (req.session.is_admin === 1) {
    res.status(200).sendFile('./public/dashboard.html', { "root": __dirname });
  } else {
    res.send('You are not authorized to view this page');
  }
});

app.get('/logout', function (req, res, next) {
  if (req.session) {
    db.logout(req.session.username);
    req.session.destroy();
    updateLoggedInUsers(db.getLoggedInUsers());
    res.send('Logged out successfully!');
  } else {
    res.send('You need to be logged in before you can be logged out!');
  }
});

var meetings = require('./routes/meetings');
app.use('/meetings', meetings);

server.listen(process.env.port || 3000, function () {
  console.log('Clients server listening on http://localhost:' + this.address().port);
});

io.on('connection', function (socket) {
  adminSocket = socket;
  updateLoggedInUsers(db.getLoggedInUsers());
});

function updateLoggedInUsers(users) {
  if (adminSocket) {
    adminSocket.emit('update-user-status', users);
  }
}