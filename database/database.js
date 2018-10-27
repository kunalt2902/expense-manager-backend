const mongoose = require("mongoose");

const connection = {
  user: "kunal.thorvat",
  password: "Password1",
  host: "ds035787.mlab.com",
  port: 35787,
  dbName: "expense-manager"
};

module.exports.connect = () => {
  mongoose.connect(
    "mongodb://" +
      connection.user +
      ":" +
      connection.password +
      "@" +
      connection.host +
      ":" +
      connection.port +
      "/" +
      connection.dbName
  );

  mongoose.connection.on("open", () => {
    console.log("Connected to database");
  });
};
