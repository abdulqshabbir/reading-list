const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MONGO_DB_URI } = require("./config");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const startServer = async () => {
  await mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();

  app.use(
    session({
      name: "qid",
      secret: "skldjfalqkwljerlkjdfsklfj",
      saveUninitialized: false, // don't create session until something stored
      resave: false, //don't save session if unmodified
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        touchAfter: 24 * 60 * 60, // 1 day
      }),
    })
  );

  // parse application/json requests
  app.use(bodyParser.json());

  // allow cookies and requests from any origin
  app.use(cors({ credentials: true, origin: "*" }));

  // parse cookie
  app.use(cookieParser());

  app.use((req, res, next) => {
    req["access-token"] = req.cookies["access-token"];
    req["refresh-token"] = req.cookies["refresh -token"];
    next();
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, cors: { origin: "*" } });

  app.listen({ port: 4000 }, () => {
    console.log("Server is listening at http://localhost:4000");
  });
};

startServer();
