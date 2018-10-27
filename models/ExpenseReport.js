const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const ExpenseReport = new Schema(
  {
    reportID: String,
    transDate: String,
    description: String,
    amount: Number,
    userIds: [String]
  },
  { collection: "expenseReport" }
);

module.exports = mongoose.model("expenseReport", ExpenseReport);
