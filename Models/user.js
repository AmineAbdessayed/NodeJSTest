const mongo = require("mongoose");
const Schema = mongo.Schema;
const User = new Schema({
  name: String,
  email: String,
  cin: Number,
});

module.exports = mongo.model("user", User);
