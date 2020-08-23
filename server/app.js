const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  await mongoose.connect(
    "mongodb://abdulqshabbir:test123@ds219983.mlab.com:19983/reading-list",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log("conntected to database");

  const app = express();

  app.use(cookieParser());

  app.use((req, res, next) => {
    next();
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log("Server is listening at http://localhost:4000");
  });
};

startServer();
