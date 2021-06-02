let db = require('../utils/database');
let express = require('express');
let router = express.Router();

const movie_collection = db.collection('movies');

// define the first route
router.get("/movie", async function (req, res) {

    try {
        // Query for a movie that has the title 'Back to the Future'
        const query = { genres: "Comedy", poster: { $exists: true }, runtime: 180 };
        const cursor = await movie_collection.aggregate([
            { $match: query },
            { $sample: { size: 1 } },
            {
                $project:
                {
                    title: 1,
                    fullplot: 1,
                    poster: 1
                }
            }
        ]);

        const movie = await cursor.next();

        return res.json(movie);
    } catch (err) {
        console.log("Error: ", err);
    }
});

console.log('Routes set!');
module.exports = router;