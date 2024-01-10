const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .catch(error => handleError(error))
    .then(() => console.log('connected to database'));

module.exports = app;