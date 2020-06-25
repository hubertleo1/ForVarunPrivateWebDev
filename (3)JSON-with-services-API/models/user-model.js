const fs = require("fs");
const express = require("express");

module.exports = class User {
  constructor() {}

  //Models should only be CRUD. If there is some sort of logic,
  //should go into services. So simple routes -> models -> routes. Advanced
  //routes -> models -> service -> route
  //Read
  getUsersJSON() {
    return new Promise((resolve, reject) => {
      fs.readFile("./data/data.json", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  //Read by ID (put in the routes.. models is just for CRUD)
  getUserByID(id) {
    return new Promise((resolve, reject) => {
      fs.readFile("./data/data.json", (err, data) => {
        if (err) {
          reject(err);
        } else {
          var parseData = JSON.parse(data);
          var userArray = parseData.users;
          const found = userArray.some((user) => user.id === id);
          if (found) {
            resolve(userArray.filter((user) => user.id === id));
          } else {
            reject("User not found!");
          }
        }
      });
    });
  }
  //Create
  createUserJSON(user) {
    const NewUser = user;
    var lastID = 1;
    return new Promise((resolve, reject) => {
      fs.readFile("./data/data.json", (err, data) => {
        if (err) {
          reject(err);
        } else {
          //check if data is valid JSON?
          var ParseData = JSON.parse(data);
          var userArray = ParseData.users;
          const sameEmail = userArray.some((user) => {
            return user.email === NewUser.email;
          });
          lastID = userArray[userArray.length - 1].id;

          if (!sameEmail) {
            const newUserObject = {
              id: (parseInt(lastID) + 1).toString(),
              name: NewUser.name,
              surname: NewUser.surname,
              cellPhone: NewUser.cellPhone,
              email: NewUser.email,
              password: NewUser.password,
              role: NewUser.role,
            };
            userArray.push(newUserObject);
            //write the array back into the JSON
            fs.writeFile(
              "./data/data.json",
              JSON.stringify(ParseData),
              (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(ParseData);
                }
              }
            );
          } else {
            reject("Email Already in use!");
          }
        }
      });
    });
  }

  //Update
  updateNewUser(user) {
    const NewUser = user;
    return new Promise((resolve, reject) => {
      fs.readFile("./data/data.json", (err, data) => {
        if (err) {
          reject(err);
        } else {
          //success in reading the JSON
          var ParseData = JSON.parse(data);
          var userArray = ParseData.users;
          const sameEmail = userArray.some((user) => {
            return user.email === NewUser.email;
          });

          if (sameEmail) {
            userArray.forEach((user) => {
              if (user.email === NewUser.email) {
                user.name = NewUser.name;
                user.surname = NewUser.surname;
                user.cellPhone = NewUser.cellPhone;
                user.password = NewUser.password;
                user.role = NewUser.role;
              }
            });
            //write the array back into the JSON
            fs.writeFile(
              "./data/data.json",
              JSON.stringify(ParseData),
              (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(ParseData);
                }
              }
            );
          } else {
            reject("Email already in use!");
          }
        }
      });
    });
  }

  deleteByID(id) {
    const newId = id;
    return new Promise((resolve, reject) => {
        fs.readFile("./data/data.json", (err, data) => {
            if (err) {
                reject(err);
            } else {
              //success in reading the JSON
              var ParseData = JSON.parse(data);
              var userArray = ParseData.users;
      
              const newArray = userArray.filter((user, index) => {
                return user.id !== newId;
              });
              ParseData.users = newArray;
              //Write the array back into the JSON
              fs.writeFile("./data/data.json", JSON.stringify(ParseData), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Succesfully deleted id");
                }
              });
            }
          });
    });
  }
};
