var mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
console.log('Database connected!')
db.emit ('dbConnect');

module.exports = db;