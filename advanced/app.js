const dotenv = require("dotenv").config(),
  express = require("express"),
  mongoose = require("mongoose"),
  gqlServer = require("./graphql");

mongoose.connect(
  process.env.DB_URL,
  { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false },
  error => {
    if (error) {
      throw error;
    }
    console.log("🚀 Successfully connected to database !");
  }
);

const app = express();
gqlServer.applyMiddleware({ app });

app.listen({ port: 1337 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:1337${gqlServer.graphqlPath}`
  )
);
