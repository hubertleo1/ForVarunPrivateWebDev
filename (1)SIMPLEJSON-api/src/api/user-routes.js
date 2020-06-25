const express = require("express");
const router = express.Router();
var fs = require("fs");

const User = require('../models/user-model');

router.get("/", (req, res) => {
  fs.readFile("./src/data/data.json", (err, data) => {
    if (err) throw err;
    //converts object to JSON
    var parseData = JSON.parse(data);
    //conversts JSON to object, and return it to us!
    res.json(parseData);
  });
  // User.prototype.getUsersJSON().then(users => {
  //   res.send(users);
  // }).catch(err => {
  //   res.status(400).send(err);
  // });
});

router.get("/:id", (req, res) => {
  fs.readFile("./src/data/data.json", (err, data) => {
    if (err) throw err;
    var parseData = JSON.parse(data);
    var userArray = parseData.users;
    const found = userArray.some((user) => user.id === req.params.id);
    if (found) {
      res.json(userArray.filter((user) => user.id === req.params.id));
    } else {
      res.status(400).json({ msg: "User not found" });
    }
  });
  // User.prototype.getUserByID(req.params.id).then(userObj => {
  //   res.send(userObj);
  // }).catch(err => {
  //   res.status(400).send(err);
  // });
});

router.post("/", (req, res) => {
  const NewUser = req.body;
  //first, read the json file.
  fs.readFile("./src/data/data.json", (err, data) => {
    var error = false;
    var errMsg = "";
    var lastID = 1;
    if (err) {
      throw err;
    } else {
      //success in reading the JSON
      var ParseData = JSON.parse(data);
      var userArray = ParseData.users;
      const sameEmail = userArray.some((user) => {
        return user.email === NewUser.email;
      });

      lastID = userArray[userArray.length - 1].id

      if (!sameEmail) {
        const newUserObject = {
          id: (lastID + 1).toString(),
          name: NewUser.name,
          surname: NewUser.surname,
          cellPhone: NewUser.cellPhone,
          email: NewUser.email,
          password: NewUser.password,
          role: NewUser.role,
        };
        userArray.push(newUserObject);
        //write the array back into the JSON
        fs.writeFile("./src/data/data.json", JSON.stringify(ParseData), (err) => {
          if (err) {
            throw err;
          }
          res.json(newUserObject);
        });
      } else {
        error = true;
        errMsg = "Email Already in Use!";
      }
    }
    //error handling
    if (error) {
      res.status(400).json({msg : errMsg});
    }  
  });

});

router.post("/update", (req, res) => {
  const NewUser = req.body;
  //first, read the json file.
  fs.readFile("./src/data/data.json", (err, data) => {
    var error = false;
    var errMsg = "";
    if (err) {
      error = true;
      errMsg = "Could Not Read data.json";
      throw err;
    } else {
      //success in reading the JSON
      var ParseData = JSON.parse(data);
      var userArray = ParseData.users;
      const sameEmail = userArray.some((user) => {
        return user.email === NewUser.email;
      });

      if (sameEmail) {
        userArray.forEach(user => {
          if (user.email === NewUser.email) {
            user.name = NewUser.name;
            user.surname = NewUser.surname;
            user.cellPhone = NewUser.cellPhone;
            user.password = NewUser.password;
            user.role = NewUser.role;
          }
        });
        //write the array back into the JSON
        fs.writeFile("./src/data/data.json", JSON.stringify(ParseData), (err) => {
          if (err) {
            error = true;
            errMsg = "Could not write to the file";
            throw err;
          }
          res.json(NewUser);
        });
      } else {
        error = true;
        errMsg = "Email Already in Use!";
      }
    }
    //error handling
    if (error) {
      res.status(400).json({msg : errMsg});
    }
  });
});

router.get("/delete/:id", (req, res) => {
  const newId = req.params.id;
  //first, read the json file.
  fs.readFile("./src/data/data.json", (err, data) => {
    var error = false;
    var errMsg = "";
    if (err) {
      error = true;
      errMsg = "Could Not Read data.json";
      throw err;
    } else {
      //success in reading the JSON

      var ParseData = JSON.parse(data);
      var userArray = ParseData.users;

      const newArray = userArray.filter((user, index) => {
        return user.id !== newId;
      })

      ParseData.users = newArray;

  //Write the array back into the JSON
        fs.writeFile("./src/data/data.json", JSON.stringify(ParseData), (err) => {
          if (err) {
            error = true;
            errMsg = "Could not write to the file";
          }
          res.send("Succesfully Delted id: " + req.param.id);
        });
    }
    //error handling
    if (error) {
      res.status(400).json({msg : errMsg});
    } 
  });
});

module.exports = router;
