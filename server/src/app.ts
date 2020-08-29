import { ApolloServer } from 'apollo-server-express'
import express from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config'
import session from 'express-session'
import { MikroORM } from 'mikro-orm'
import mongo from 'connect-mongo'
import mikroORMConfig from './mikro-orm.config'
import { buildSchema } from 'type-graphql'
import { BookResolver } from './resolvers/Book'

const MongoStore = mongo(session);

const startServer = async () => {
  // set up mikroORM

  const orm = await MikroORM.init(mikroORMConfig);

  const app = express();

  app.use(
    session({
      name: "qid",
      secret: "skldjfalqkwljerlkjdfsklfj",
      saveUninitialized: false, // don't create session until something stored
      resave: false, //don't save session if unmodified
      store: new MongoStore({
        url: config.MONGO_DB_URI,
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

  app.use((req: any, _, next) => {
    req["access-token"] = req.cookies["access-token"];
    req["refresh-token"] = req.cookies["refresh -token"];
    next();
  });

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver],
      validate: false
    }),
    context: () => ({ em: orm.em }),
  });

  server.applyMiddleware({ app, cors: { origin: "*" } });

  app.listen({ port: 4000 }, () => {
    console.log("Server is listening at http://localhost:4000");
  });
};

startServer().catch(e => console.error(e));
