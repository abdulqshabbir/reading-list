const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./queries");

const server = new ApolloServer({ typeDefs, resolvers, cors: true });

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});

mongoose.connect(
  "mongodb://abdulqshabbir:test123@ds219983.mlab.com:19983/reading-list",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});
