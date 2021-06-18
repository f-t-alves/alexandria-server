let mongo = require("../utils/database");
let express = require("express");
let router = express.Router();

const movie_collection = mongo.db.collection("movies");

// define the first route
router.get("/genres", async function (req, res) {
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
