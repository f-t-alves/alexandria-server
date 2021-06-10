let db = require("../utils/database");
let express = require("express");
let router = express.Router();

const movie_collection = db.collection("movies");

// define the first route
router.get("/", async function (req, res) {

  console.log("Movie query!")

  try {
    const genre = req.query.genre ? req.query.genre : "Comedy";
    console.log(genre);
    const query = { genres: genre, poster: { $exists: true }, imdb: { $exists: true}};
    const cursor = await movie_collection.aggregate([
      { $match: query },
      { $sample: { size: 4 } },
      {
        $project: {
          title: 1,
          fullplot: 1,
          poster: 1,
          imdb: 1
        },
      },
    ]);

    //const movie = await cursor.unwind();
    const movies = await cursor.toArray();

    return res.json(movies);
  } catch (err) {
    console.log("Error: ", err);
  }
});

router.post("/", async function (req, res) {
  const body = req.body;
  console.log("Received Movie API POST!");
  console.log(body);

  try {
    // Query for a movie that has the title 'Back to the Future'
    const query = { genres: body.genres, poster: { $exists: true } };
    const cursor = await movie_collection.aggregate([
      { $match: query },
      { $sample: { size: 1 } },
      {
        $project: {
          title: 1,
          fullplot: 1,
          poster: 1,
        },
      },
    ]);

    const movie = await cursor.next();

    return res.json(movie);
  } catch (err) {
    console.log("Error: ", err);
  }
});

console.log("Routes set!");
module.exports = router;
