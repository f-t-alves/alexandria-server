// create an express app
require('dotenv').config();
const express = require("express");
const app = express();

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
  });

module.exports = app;