// create an express app
require("dotenv").config();
const express = require("express");
const app = express();

const passport = require("passport");
const bodyParser = require("body-parser");

let cors = require("cors");

const config = require("./utils/constants");
const FRONT_URL_WHITELIST = config.url.FRONT_URL_WHITELIST;

const corsOptions = {
  origin: function (origin, callback) {
    if (FRONT_URL_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST",
  credentials: true,
};

require("./utils/auth.js");

//Allow cross-origin
app.use(cors(corsOptions));

// Activate body parser
app.use(bodyParser.urlencoded({ extended: false }));

//Bind routes
const movie = require("./routes/movie");
app.use("/api", movie);

const genres = require("./routes/genres");
app.use("/api", genres);

const login = require("./routes/login.js");
app.use("/api", login);

const profile = require("./routes/profile.js");
// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/api", passport.authenticate("jwt", { session: false }), profile);

// use the express-static middleware
app.use(express.static("public"));

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
  app.emit("appStarted");
});

module.exports = app;
