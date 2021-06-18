const argon2 = require("argon2");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const models = {};

UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await argon2.hash(this.password);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await argon2.verify(user.password, password);

  return compare;
};

models.Users = mongoose.model("user", UserSchema);

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
console.log("Database connected!");
db.emit("dbConnect");

module.exports = { db, models };
