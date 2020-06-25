const User = require('../models/user-model');

module.exports = class AuthService {
  constructor() {}

  login(credential) {
    return new Promise((resolve, reject) => {
        User.prototype
        .getUsersJSON()
        .then((users) => {
          var UsersArray = JSON.parse(users).users;
          const User = UsersArray.filter((user) => user.email === credential.email);
          if (User.length == 1) {
            //Exist a user with that email
            if (User[0].password === credential.password) {
              resolve(User[0]);
            } else {
              reject("Password Incorrect!");
            }
          } else {
            reject("No such email!");
          }
        })
        .catch((err) => {
          reject(err);
        });
    })
  }
};
