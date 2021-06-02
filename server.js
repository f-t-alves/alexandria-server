// create an express app
require('dotenv').config();
const express = require("express");
const app = express();

let cors = require("cors");

const config = require('./utils/constants');
const FRONT_URL = config.url.FRONT_URL;

const corsOptions = {
  origin: FRONT_URL,
  methods: "GET,POST",
  credentials: true
}

//Allow cross-origin
app.use(cors(corsOptions));

//Bind routes
const tasksRouter = require('./routes/routes');
app.use('/api', tasksRouter);

// use the express-static middleware
app.use(express.static("public"));

// start the server listening for requests
app.listen(process.env.PORT || 3000,
  () => {
    console.log("Server is running...");
    app.emit("appStarted");
  }
);

module.exports = app;