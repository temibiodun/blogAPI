//import ap
const express = require('express');
const logger = require('./logger/index');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = require('./app');

require('dotenv').config();



const connectToDB = require('./db/db');
connectToDB();
const PORT = process.env.PORT || 5050;
// const mongoose = require ('mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.render("home");
  });
//start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
