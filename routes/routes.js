let express = require('express');
let router = express.Router();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

let client = new MongoClient();
let database;
let movie_collection;

async function connect_db() {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    database = client.db('sample_mflix');
    movie_collection = database.collection('movies');
}

connect_db();

// define the first route
router.get("/movie", async function (req, res) {

    try {

        // Query for a movie that has the title 'Back to the Future'
        const query = { genres: "Comedy", poster: { $exists: true } };
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

module.exports = router;