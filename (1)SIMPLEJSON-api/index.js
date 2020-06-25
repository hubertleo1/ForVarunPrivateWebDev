const express = require('express');
const app = express();
const router = express.Router();

//Body Parser Middlware:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes:
app.use('/api/users', require("./src/api/user-routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));