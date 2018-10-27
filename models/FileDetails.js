const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileDetailsSchema = new Schema(
  {
    _id: String,
    name: String,
    startDate: String,
    endDate: String,
    uploadTime: String,
    status: String
  },
  { collection: "fileDetails" }
);

module.exports = mongoose.model("fileDetails", fileDetailsSchema);
