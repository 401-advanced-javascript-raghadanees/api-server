'use strict';

// I will require the server file and start the server here.
const serverModule = require('./lib/server.js');

// require mongoose and connect to db
const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.connect(MONGODB_URL, mongooseOptions);

// run my application
serverModule.start();

// node index.js
// node .