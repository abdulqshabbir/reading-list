const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const cors = require("cors");
const { MONGO_DB_URI } = require("./config");

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  await mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();

  app.use(cors({ origin: "http://localhost:3000/", credentials: true }));

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
