const express = require("express");
const database = require("./database/database");
const graphQLHttp = require("express-graphql");
const schema = require("./schema/schema");
const PORT = 4000;
const app = express();

//connect to database
database.connect();

//middleware for graphql
app.use(
  "/graphql",
  graphQLHttp({
    schema: schema,
    graphiql: true
  })
);

//start the server
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
