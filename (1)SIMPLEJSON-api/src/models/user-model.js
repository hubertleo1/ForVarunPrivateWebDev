const fs = require("fs");
const express = require("express");

module.exports = class User {
  //variables of the User
  // firstname = "Hubert";
  //constructor
  constructor() {}
  //functions
  getUsersJSON() {
    return new Promise((resolve, reject) => {
      //resolve if we get the users
      //reject if we don't get the users
      fs.readFile("./src/data/data.json", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  getUserByID(id) {
    //return a Promise, and return the User with that ID if that id matched.
    //if for some other reasons this is not true, reject with an error!
    return new Promise((resolve, reject) => {
      fs.readFile("./src/data/data.json", (err, data) => {
        if (err) {
          reject(err);
        } else {
          var parseData = JSON.parse(data);
          var userArray = parseData.users;
          const found = userArray.some((user) => user.id === id);
          if (found) {
            resolve(userArray.filter((user) => user.id === id));
          } else {
            reject("User Not found!");
          }
        }
      });
    });
  }
  createUserJSON() {}
  updateNewUser(user) {}
  deleteByID(id) {}
};
