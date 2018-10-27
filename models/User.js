const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    _id: String,
    firstName: String,
    lastName: String,
    displayName: String,
    contribution: Number
  },
  { collection: "user" }
);

module.exports = mongoose.model("user", User);
