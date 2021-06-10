let db = require("../utils/database");
let express = require("express");
let router = express.Router();

const movie_collection = db.collection("movies");

// define the first route
router.get("/", async function (req, res) {
  try {
    
    console.log('Genres query!')

    const query = { genres: "Comedy", poster: { $exists: true }, runtime: 180 };
    const cursor = await movie_collection.distinct(
      "genres",
      function (error, results) {
        return res.json(results);
      }
    );
  } catch (err) {
    console.log('Genres query error...')
    console.log("Error: ", err);
  }
});

console.log("Routes set!");
module.exports = router;
