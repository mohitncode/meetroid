var USERS = {
  "1": {
    "username": 'admin',
    "password": 'admin',
    "is_admin": 1
  },

  "2": {
    "username": 'john',
    "password": 'john',
    "is_admin": 0
  },

  "3": {
    "username": 'jane',
    "password": 'jane',
    "is_admin": 0
  }
};

var database = {};
var loggedInUsers = {};

database.login = function(username, password, callback) {
  var user = null;
  for (var i in USERS) {
    if (USERS[i].username === username && password === USERS[i].password) {
      user = USERS[i];
      user.id = i;
      break;
    }
  }

  if (user) {
    if (!loggedInUsers[username]) {
      loggedInUsers[username] = {
        "id": user.id,
        "loginTime": new Date().toUTCString()
      };
    }

    callback(null, user);
  } else {
    callback('An error occurred while retrieving the results', false);
  }
};

database.logout = function (username) {
  if (loggedInUsers[username]) {
    delete loggedInUsers[username];
  }
};

database.getLoggedInUsers = function () {
  return loggedInUsers;
};

module.exports = database;