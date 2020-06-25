
const express = require('express');

var fs = require("fs");
const router = express.Router();
const app = express();


//Middleware function:
const logger = (req,res,next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}
//Middleware execue:
app.use(logger)

//Body Parser Middlware:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes:
app.use('/api/users', require("./api/user-routes"));
app.use('/api/auth', require("./api/auth-routes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));